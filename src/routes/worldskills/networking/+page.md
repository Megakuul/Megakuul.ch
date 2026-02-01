<script>
    import Quirk from "../Quirk.svelte";
    import Note from "../Note.svelte";
</script>

## Table of Contents

## Networking

This section helps you bootload your brain into <b class="text-indigo-400">networking mode</b>.

1. Layer 3 is stateless and has addresses
2. Layer 4 has connections and ports
2. Every packet contains source and destination address / port
3. Every node has 3 layer 3 route options: DNAT, SNAT and PROXY

### DNAT (Ingress)

Destination NAT rewrites the packet Destination.

Example where `1.3.3.7` is your router with `192.168.1.10` being in one of its subnets:

```
src:10.1.1.10 -> dst:1.3.3.7
src:10.1.1.10 -> dst:192.168.1.10
```

Semantically all of those operations are DNATs they just differ in routing logic (determination of `192.168.1.10`):

- Port Forwarding
- Virtual IPs 
- Conntrack based routing

### SNAT (Egress)

Source NAT rewrites the packet source.

Example where `1.3.3.7` is your router with `192.168.1.10` being in one of its subnets:

```
src:192.168.1.10 -> dst:8.8.8.8
src:1.3.3.7 -> dst:8.8.8.8
```

Semantically all of those operations are SNATs they just differ in routing logic (determination of `1.3.3.7`):

- Conntrack based routing


### PROXY (Ingress / Egress)

Proxies rewrite packet source and destination.

The proxy situation is rarely used, most "proxies" are actually implemented on a higher level and loop traffic through layer 4 sockets (e.g. application aware loadbalancers).


A common use case is a `hairpin`/`reverse` NAT:

```
src:192.168.1.10 -> dst:1.3.3.7
src:1.3.3.7 -> dst:192.168.1.20
```

### Conntrack MAGIC 🪄

For both DNAT and SNAT it's rather ambiguous really clear what they actually mean. 
Like are we talking about layer 3 or layer 4, state or stateless, Java or C#, Coke or Pepsi?

Okay listen up:

Every layer 3 connection is completely stateless, this means that every DNAT requires a corresponding SNAT and vice versa:

For example, this DNAT operation from client `1.1.1.1` to server `192.168.1.10` via router `1.3.3.7`:
```
src:1.1.1.1 -> dst:1.3.3.7 (client knowledge)
src:1.1.1.1 -> dst:192.168.1.10
```

Requires the following SNAT in order to allow a response from `192.168.1.10` (because the client `1.1.1.1` does NOT know `192.16.1.0/24` he only knows `1.3.3.7`):

```
src:192.168.1.10 -> dst:1.1.1.1 (client knowledge)
src:1.3.3.7 -> dst:1.1.1.1
```

Now if you ever configured a router you probably know that you almost NEVER have to configure this SNAT behavior.... You just create a `0.0.0.0/0` default route and the rewriting is magically done.

This is due to `conntracks` (unofficially called "contracts") which is effectively a wild west system that tries to analyze requests and map it to a connection.

- For `TCP` this is fairly simple because it is already connection oriented. 
Every stream can be identified via `src`, `dst`, `srcport` and `dstport`. Conntrack then simply imitates the `TCP` state machine to understand in what state the connection is.
- For `UDP` and other stateless protocols the `conntracks` are more like eastern contracts: based on "trust me bro".
Due to the lack of knowledge about the connection state, most conntrack systems allow connection hijacking via tricks like `UDP hole punching` (yes this is why certain Games and VoIP can connect End-to-End even if both firewalls are locked down).

Once `conntracks` mapped a request to a connection it applies stateful routing and firewall rules.

For routing this means that it dynamically sets up SNAT / DNATs. 

#### Static SNAT and dynamic DNAT example: 

```yaml
Client 192.168.1.10:
    REQ src: 192.168.1.10:42069 -> dst: 1.1.1.1:80
Router 1.3.3.7:
    REQ src: 192.168.1.10:42069 -> dst: 1.1.1.1:80
    REQ src: 1.3.3.7:10001 -> dst: 1.1.1.1:80 # (static SNAT from WAN interface)
    MAP conntracks[1.3.3.7:10001, 1.1.1.1:80] = 192.168.1.10:42069
Server 1.1.1.1:
    RES src: 1.1.1.1:80 -> dst: 1.3.3.7:10001
Router 1.3.3.7:
    LOOKUP conntracks[1.3.3.7:10001, 1.1.1.1:80]
    RES src: 1.1.1.1:80 -> dst: 1.3.3.7:10001
    RES src: 1.1.1.1:80 -> dst: 192.168.1.10:42069 # (dynamic DNAT based on conntrack map)
```

*Notice that the router must also always perform <b>port address translation</b> in order to avoid port clashes when two clients use the same source / destination ports.*

#### Static DNAT and dynamic SNAT example: 

```yaml
Client 1.1.1.1:
    REQ src: 1.1.1.1:42069 -> dst: 1.3.3.7:443
Router 1.3.3.7:
    REQ src: 1.1.1.1:42069 -> dst: 1.3.3.7:443
    REQ src: 1.1.1.1:42069 -> dst: 192.168.1.10:443 # (configured DNAT port forwarding)
    MAP conntracks[1.1.1.1:42069, 192.168.1.10:443] = 1.3.3.7:443
Server 192.168.1.10:
    RES src: 192.168.1.10:443 -> dst: 1.1.1.1:42069 
Router 1.3.3.7:
    LOOKUP conntracks[1.1.1.1:42069, 192.168.1.10:443]
    RES src: 192.168.1.10:443 -> dst: 1.1.1.1:42069
    RES src: 1.3.3.7:443 -> dst: 1.1.1.1:42069 # (dynamic SNAT based on conntrack map)
```

*Notice that DNAT does not require <b>port address translation</b> like SNAT because it can identify the connection based on the source IP (which is not modified here)*


## VPC

### Security Groups

I mentioned `Conntracks` earlier; Security Groups rely on their mapping. They define stateful firewall rules in a least privilege mode (by default everything is blocked) and are directly attached to devices. 

Just always remember that Security Groups rely on `Conntracks`: 

- **Ingress** means "if I `net.Listen(...)` to traffic on this device".
- **Egress** means "if I `net.Dial(...)` the target from this device".


### NACLs

Unlike Security Groups, NACLs operate completely stateless. 
They provide a priority based `oneshot` filtering mechanism for VPC subnets. 

Every layer 3 packet (no matter if it is ingress or egress) is processed against the lowest priority rule with matching source IP and destination port. It's a `oneshot` algorithm because it ignores subsequent rules that also match (even if they explicitly deny).


Just always remember that NACLs rely on raw packets: 

- **Ingress** means "if an IPv4/6 packet is processed by the VPC router".
- **Egress** means "if an IPv4/6 packet is processed by the VPC router".


### Public Subnet 🌐

"Public Subnet" is a semantic description for an AWS VPC Subnet that uses a simple network router without NAT (IGW) as default gateway, which means interfaces inside such a network are directly addressable via public IP address.

#### IPv4

**Required Skilltree Features**: 

- 0.0.0.0/0 to <b class="text-amber-600">IGW</b>

#### IPv6

**Required Skilltree Features**: 

- ::/0 to <b class="text-amber-600">IGW</b>

#### Dualstack

**Required Skilltree Features**: 

- 0.0.0.0/0 to <b class="text-amber-600">IGW</b>
- ::/0 to <b class="text-amber-600">IGW</b>


<Note type="info">
VPC uses symmetric route locks; unless you have not explicitly configured a reverse path to the router via route table it does NOT route any packets to the destination.

In practice this means that IGW does not route packets when assigned. It must be EXPLICITLY configured with a reverse 0.0.0.0/0 bzw. ::/0 route!
</Note>

### Private Subnet 🫡

A "Private Subnet" is defined as a network space that uses an external network router with SNAT (NAT-Gateway or fck-nat) or egress only IPv6 routing (EIGW) as default gateway, which means interfaces inside such networks can communicate with the internet only via translated address (or with their real IP but only egress for IPv6).

#### IPv4

**Required Skilltree Features**: 

- `0.0.0.0/0` to <b class="text-indigo-400">NAT-Gateway</b> or <b class="text-indigo-500">fck-nat</b>

#### IPv6

**Required Skilltree Features**: 

- `::/0` to <b class="text-amber-500">EIGW</b> 
- `64:ff9b::/96` to <b class="text-indigo-400">NAT-Gateway</b> or <b class="text-indigo-500">fck-nat</b> 
- Enable `DNS64` option on route53 DNS.

#### Dualstack

**Required Skilltree Features**: 

- `::/0` to <b class="text-amber-500">EIGW</b> 
- `0.0.0.0/0` to <b class="text-indigo-400">NAT-Gateway</b> or <b class="text-indigo-500">fck-nat</b>
- Disable `DNS64` option on route53 DNS.


<Note type="caution">
<b>Eyeball Crash:</b> EC2 instances usually implement the "Happy Eyeball" algorithm to determine whether IPv4 or IPv6 has more Rizz for the connection. This algorithm sends two DNS queries at the same time (A and AAAA). With DNS64 option enabled in Route53 the DNS does NOT fail on missing AAAA records that have an according A record; instead it responds with a well known IPv6 space that encodes the IPv4 address: <b class="underline">64:ff9b::selectedipv4</b>.

On IPv6-only networks this is very practical because we can route those requests to a NAT64 capable router which performs a PROXY NAT (source (`2001:db8::1` -> `1.3.3.7`) and destination (`64:ff9b::0101:0101` -> `1.1.1.1`)) with the encoded IPv4 address.

However, for Dualstack networks this can be very dangerous, because it creates a race condition: If the DNS responds to the AAAA request with an encoded DNS64 message faster then the A request, the NAT64 emulation layer will be used. 
If this happens and the network does not have a `64:ff9b::/96` -> NAT64 route you will get a cryptic tcp timeout because the request is dropped by a border gateway. Arguably its even worse if you configured the route, because now your egress source is randomly either the instance IPv6 OR the NAT-Gateway IPv4 address. There is a saying that if you route IPv6 traffic via NAT-Gateway that could've gone directly IPv6-to-IPv6 your task in hell will be to migrate Github to IPv6.
</Note>


### Isolated Subnet 🧻

An "Isolated Subnet" is a network space that uses no default gateway at all, it only relies on the built in VPC router and can therefore only communicate with other subnets (there is no 0.0.0.0/0 route).

#### IPv4

**Required Skilltree Features**: 

- None

#### IPv6

**Required Skilltree Features**: 

- None

#### Dualstack

**Required Skilltree Features**: 

- None

### VPN-only Subnet 🛡️

"VPN-only Subnet" is effectively just an "Isolated Subnet" that uses a VPN router (VGW or TGW) as default gateway.

#### IPv4

**Required Skilltree Features**: 

- `0.0.0.0/0` to <b class="text-indigo-400">Virtual Private Gateway</b> or <b class="text-indigo-500">Transit Gateway</b>

#### IPv6

**Required Skilltree Features**: 

- `::/0` to <b class="text-indigo-500">Transit Gateway</b>

#### Dualstack

**Required Skilltree Features**: 

- `0.0.0.0/0` to <b class="text-indigo-500">Transit Gateway</b>
- `::/0` to <b class="text-indigo-500">Transit Gateway</b>


## VPC Extras

Every VPC subnet contains some extra addresses that must be considered when calculating IPv4 network sizes (for IPv6 please always just use `/64` networks with a human readable numbering):

- `.0`: Network address (kinda obvious)
- `.1`: VPC Router
- `.2`: Route53 Endpoint
- `.3`: For future use
- `.255`: Broadcast address (kinda obvious)

This means any AWS subnet must have a minimum size of `/29` (although they enforce `/28`).

## Routing

### Routing Table

Every VPC contains one or more stateless layer 3 routing tables. One of them is always configured to be the "main route table" which applies to all unassociated subnets by default.

If you want to configure routing it is highly recommended to create a separate route table and associate the corresponding subnets to it. 

This prevents confusion and ambiguity when accidentally creating a new subnet without association (imagine creating a subnet and suddenly instances are directly reachable via internet because you your main table acts as public route table).

### Gateway Routing Table

Via the `Edge associations` configuration every routing table can be configured to act as `Gateway Routing Table`.

While a `Routing Table` is applied to the VPC router, the `Gateway Routing Table` is associated with an edge router (IGW or VGW).

<Note type="info">
Notice that for private dualstack networks the behavior of the Gateway Routing Table can feel a bit undeterministic: While the EIGW edge router cannot be associated with a Gateway table, a NAT-Gatewy theoretically can because it uses an IGW as edge router.

To conclude: Even if gateway routes are inherently designed for inbound access they are still enforced on outbound responses with NAT-Gateway but NOT on outbound responses for EIGW.
</Note>

### Inspector 🕵️

You might ask yourself: why do I ever need `Gateway Routing Tables`?

Their primary application is to route traffic over IDS appliances to inspect inbound network traffic.

This system works by routing the ingress IGW traffic to a `Gateway Loadbalancer`. This "loadbalancer" encapsulates packets with the `GENEVE` protocol, sends them to a fleet of IDS appliances and returns the decapsulated IDS response back to the VPC router which processes them as usual. 

![networking_gwlb_ids](/images/networking_gwlb_ids.svg)

## Quirks

