<script>
    import Quirk from "../Quirk.svelte";
    import Note from "../Note.svelte";
</script>

## Table of Contents

## Client VPN

AWS Client VPN Endpoints were designed as a homage to this scene from the Dark Knight:

![joker_burning_meme](/images/joker_burning_meme.webp)

### Network Associations

Client VPN Endpoints must be hooked manually into your VPC network by adding a `Target network association` for every subnet.

Associating a subnet with the endpoint injects an ENI and automatically adds entries to its route table (the Client VPN route table not the VPC one).

<Note type="info">
Notice that Client VPN uses an ENI instead of direct VPC plane access. This means that you can jump to further routable networks (if authorization rules allow it) but it also means that an <b>SNAT</b> translation is performed (servers don't see your VPN CIDR IP but rather the ENI IP).
</Note>

### Route Tables

Endpoints maintain a custom route table, however, notice that this route table basically only serves the purpose to configure the OpenVPN behavior on your local machine. The routes configured in the table are exactly the routes your client will iptable-inject (can be verified with `ip route show`).


As outlined in the previous info, the route tables do NOT affect your ability to route communication further via VPC route table. Once a packet entered the Client VPN ENI the endpoint route table is not relevant anymore.

### Authorization Rules

To prevent a VPN user to literally jump through every network your VPC routes to, there is another security mechanism in place.

Authorization Rules block all client network access by default. They can be configured to allow specific client groups to access a set of CIDR prefixes.

<Note type="warning">
You have to add at least one authorization rule to the VPN, otherwise all client connections will fail. Notice that authorization rules take several seconds to initialize and sometimes allow "partial" access in this initialization phase.
</Note>


## Quirks

Besides burning a lot of money, Client VPN Endpoints are often also busy annoying users with literally random shit like:

- ACM Certificates cannot be selected

<Quirk score={7.3}>
The certificate MUST be in endpoint region and MUST contain a CN that is a domain and MUST be 1024 or 2048 bit RSA!
</Quirk>

- OpenVPN Client fails to connect due to missing key usage extension after generating the keypair with something like this:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -sha256 -days 365
```

<Quirk score={1.2}>
Ensure that your imported client certificate has the clientAuth and the server certificate the serverAuth extension:

<br>
<b>-addext "extendedKeyUsage = clientAuth"</b>
<br>
<b>-addext "extendedKeyUsage = serverAuth"</b>

While technically not AWS fault, it still feels kinda weird that they enforce specific Common Name formats while rubberstamping fully invalid mTLS certificates. 
</Quirk>


