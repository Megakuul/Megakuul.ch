<script>
    import Quirk from "../Quirk.svelte";
    import Note from "../Note.svelte";
</script>

## Table of Contents


### Global Resolvers

### Inbound Endpoints

### Outbound Endpoints

### Was it DNS?

In the scenario of an `us-east-1` failure it is quite obvious that it was DNS (or in rare cases BGP). AWS engineers are smart and know this! Therefore, they added a feature called `Accelerated Recovery` for public hosted zones which allows you to modify your DNS records on the restored Route53 control plane in `us-west-2` after a failover scenario.

The feature is free, enable it! 🎉


## Quirks

