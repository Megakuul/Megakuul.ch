<script>
    import Quirk from "../Quirk.svelte";
    import Note from "../Note.svelte";
</script>

## Table of Contents

> Transit Gateway is a centralized VPC peering with automatic internal route propagation that does not enforce the source/destination check like normal VPC routers. 

~ König Krösus der Erste


Furthermore, the TGW has some other differences:

- **Multicast support**: While VPC routers usually drop all IGMP multicast packets, TGW can be configured to snoop for reports inside the VPCs to allow targeted multicast.
- **ENI Trick**: Unlike VPC peering the TGW actually inserts an ENI to every VPC AZ. The reason for this is `transitive routing`: with VPC peering both peered routers push their full route tables to all nitro network cards, because the TGW supports transitive routing this behavior suffers from the `n:n` problem. Therefore, they just route traffic via ENI that acts as real router (the ENI knows all routes from TGW VPC and the source VPC however it does not know the routes of the target VPC, it just knows to which ENI it must route traffic for the target VPC via TGW routing table).
- **Latency**: Due to the mentioned *ENI Trick* the latency is not comparable to a peered VPC as there are always 2 more hops.
- **Cross-Region**: Due to the mentioned *ENI Trick* the latency is not comparable to a peered VPC as there are always 2 more hops.


The following graphic explains the ENI trick:

![tgw_eni_trick](/images/tgw_eni_trick.svg)


In contrast this is how VPC Peering works:

![peering_hyperplane_trick](/images/peering_hyperplane_trick.svg)

### Attachment

VPCs must be attached to the TGW. This does not only peer them under the hood, but also auto propagates the VPCs routes to the TGW route table.

- **DNS Support**: Magically enables fullautomatic splitdns support for AWS public DNS entries (not hosted zone). Every resolver with a DNS Support attachment can effectively resolve AWS allocated DNS entries to private TGW routable IPs.
- **Security Group Referencing support**: Enables cross VPC security group referencing (however only intra-region).
- **IPv6 Support**: Configures the route propagation to allow external networks to route IPv6 traffic to your VPC. 
- **Appliance Mode support**: Uses a partitioning algorithm based on `src/dst & src.port/dst.port` to route packets deterministically to either source AZ or destination AZ without conntrack (required for Palo Alto type shiii). This is required because otherwise VPCs would do this: `src(AZ.a) -> palo(AZ.a) -> dst(AZ.b) -> palo(AZ.b) -> src(AZ.a)`.

### Association

Every Attachment is associated with exactly one `Route Table`. This route table effectively determines the router view the ENI in the source VPC has; it tells the interface which other TGW ENIs exist and what routes they can route to.

The default TGW `Route Table` adds an automatic propagation for every attachment to build a full mesh network. 

You can create a custom `Route Table` that defines specific propagations and prefix routings via `Managed Prefixlists`.


### Propagation

The Transit Gateway primarily uses propagation for routing. A propagation effectively just adds a route table entry for the VPC CIDR to the VPC's TGW ENIs. 

This means that the source TGW ENI knows to which destination TGW ENI it must route the request by just looking at the associated route table.
