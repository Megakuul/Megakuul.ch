---
title: "Auth Standard Matrjoschka"
description: "Some auth implementation patterns to use on top of OpenID Connect"
published: "15.09.2025"
mainimage: "auth-standard-matrjoschka.svg"
---

# OpenID, impressive very nice, but how do I do authentication / authorization now?

Maybe I'm the only one who is highly confused by page-long so-called "standards" that allow so much divergence that every implementation still requires a custom SDK for integration, but hey, what do I know...

For everyone else standing with a large question mark in front of the *OpenID Foundation* headquarters, before grabbing pitchfork and torch, let me give you some guidance from my experience on how exactly an authentication/authorization system with *OpenID* can be implemented.  

**Caution**: I'm unfortunately not a certified god and therefore don't know your requirements, issues and systems. 
This should just give you some inspiration, however don't be afraid to consider completely different approaches if these don't suit your use case.

---

## Glossary
- *idp* = identity provider (this is where you log in and where `/token`, `/userinfo`, etc. live)  
- *rp* = relying party (this is where `/callback` lives and where the *id token* is used)  
- *rs* = resource server (this is where your API lives, e.g. `/myapi/mycreativeendpoint`)  
- *atok* = access token (short-lived token issued to access the *rs*, used on *rs* only)  
- *rtok* = refresh token (long-lived token issued to get a new *atok*)  
- *itok* = id token (short-lived token issued to access the *idp* API, used on *rp* only)  

---

### Stateless Pattern

<center>
  <img alt="stateless pattern" src="/images/auth-standard-matrjoschka-stateless.png">
</center>

**When to use:**
- You want a stateless service that does not rely on its own auth system (no database, no cache, etc.)  
- You control the *idp* (you are using "MyCompany IAM" instead of Google, Okta, Auth0, ...)  
- Permissions are trivial and managed over a few static roles (e.g. `access`, `maintain`, `admin`)  
- The system tolerates permissions that, once revoked, are still valid for a few minutes  

**When not to use:**
- You want an extensive permission system with fine-grained permissions dynamically mapped to roles  
- Permission changes must apply immediately

The first pattern is very classical and relies heavily on the *idp*. There is no database and no cache in the backend. Users and permissions are stored and controlled only via the *idp* (requires a customizable *idp* that allows you to create and assign permissions of your *rs* inside the *idp* console).  
In this situation your application (*rs*) does not require any kind of cache or database that syncs users. This can be extremely simple for logical services that do not store any data but just perform control operations (for example, a dashboard for controlling window blinds).  

In this approach you just need a lightweight *rp* that implements `/callback`. When using PKCE flow, you can even do this directly in the frontend or via localhost endpoint (e.g. SPA or mobile app).  
In this callback you simply acquire the *atok* and *rtok* and store them in the frontend. The long-lived *rtok*, preferably an `HttpOnly; SameSite=Strict` cookie bzw. a secure location like a system keystore on mobile, can also be omitted, which just requires the user to re-login every `${accesstoken_expiration}` (usually ~15m). As most *idp* providers also store tokens to keep a user logged in, most of the time this re-login is silent and therefore tolerable.  

If you have the *atok* (either acquired directly or via *rtok*) you can then add it as `Authorization: Bearer` in the request to the *rs*. The *rs* then validates the token by simply checking the signature against the *jwks* public keys that are exposed in `/.well-known/openid-configuration → jwks_uri`.  
Then the *rs* also checks if the `aud` claim matches its identifier and uses the `scope` claim containing all permissions to authorize the user.  

That's it. The pattern couldn't be simpler.  

---

### Centralizer Pattern

<center>
  <img alt="centralizer pattern" src="/images/auth-standard-matrjoschka-centralizer.png">
</center>

**When to use:**
- You want to manage local users, permissions, and roles more extensively than the *idp* allows  
- You want excellent UX and simple extensibility (global logout, instant permission updates, ...)  
- Your application is a monolith, or your services have low-latency connections between each other  
- You want end-to-end TLS encryption without inspection or termination in between  

**When not to use:**
- You do not want additional complex logic between components in your application  
- Services in your application do not tolerate constant low-latency interconnections  

In the Centralizer Pattern we operate a centralized component which acts as *rp* and is also responsible for users, permissions, and roles.  
We use a database to store users, permissions, and roles, which can be synced from the *idp*. This is done by implementing the *rp* `/callback` in a way that it creates or updates users based on claims from the *itok*.  

In this pattern the flow works like this: the frontend authorizes with the *idp* and goes to `/callback`. The callback upserts the internal user in the database and then acquires an *atok* from the *idp*, which is provided to the frontend (preferably as `HttpOnly; SameSite=Strict` cookie). The frontend then calls the *rs* endpoint (similar to the stateless approach). Upon receiving the request, the *rs* does not just verify the token; it also checks if the token got revoked in the meantime. It does this by keeping a connection to the centralized *rp* component.  

This centralized component not only pushes revocation info, it also allows the service to pull policies of the user. So unlike in the stateless approach the *atok* does not contain authorization information, it only contains the identity, which is worthless until the associated permission policies are pulled from the centralized component.  

Because we have such a stream, upon policy updates the centralized service can also immediately push updates to the cached policies in the services.  

---

### Proxy Pattern

<center>
  <img alt="proxy pattern" src="/images/auth-standard-matrjoschka-proxy.png">
</center>

**When to use:**
- You want to add *idp* as an alternative login method and manage users and permissions in your app  
- You want excellent UX and simple extensibility (global logout, instant permission updates, ...)
- Your application consists of microservices that may live behind proxies or on the edge  
- You want a simple network topology with complexity shifted from components to a central system

**When not to use:**
- You cannot tolerate or scale a centralized proxy (e.g. due to central TLS termination or latency)  

In the Proxy Pattern we embrace the fact that we need at least one database and one cache, and both must scale horizontally.  
All requests to every API endpoint are routed through a centralized proxy. The proxy uses session-based authentication. This way a user has no critical tokens in the frontend, they only get a session ID which is mapped to a cached *itok*, *rtok*, and a permission policy.  

The proxy intercepts requests to the API and automatically refreshes the *itok* via *rtok* or authorization flow, then fetches the permission policy from the cache (or if uncached, from the database), and generates a one-shot JWT signed with its own private key containing the permission policy and the user's identity.

Due to this proxy, each *rs* API endpoint does not need complex logic or policy lookups. It just receives the one-shot token, verifies it with the proxy's public key, and applies the permission. No more network requests from there.  

For user, role, and permission management there is a separate *rs* endpoint. This endpoint is located on the proxy itself (though authentication is for those endpoints is still routed via the proxy as described above). The trick is that because this auth *rs* endpoint is proxy-aware, it can flush the proxy cache immediately if a session is revoked or a permission policy is changed. This forces the proxy to refetch it from the database on the next call.  

---

Those were just three patterns I recommend using for fitting scenarios (I didn't specify them in extreme detail, but if you can tie your own shoelaces you should get it). Obviously there are also a thousand other ways to solve authentication/authorization in your app. Ultimately there is a reason why the *s* in *OpenID Connect* stands for *standard*.