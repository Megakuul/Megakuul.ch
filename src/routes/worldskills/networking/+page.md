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

**Required Skilltree Features**: 

- 0.0.0.0/0 to <b class="text-indigo-500">IGW</b>
- ::/0 to <b class="text-indigo-500">EIGW</b>
- 

<Note type="info">
VPC uses symmetric route locks; unless you have not explicitly configured a reverse path to the router via route table it does NOT route any packets to the destination.

In practice this means that IGW and EIGWs do not route packets when assigned. They EXPLICITLY require a reverse 0.0.0.0/0 bzw. ::/0 route!
</Note>


### Private Subnet 🫡


### Isolated Subnet 🧻



## Quirks

