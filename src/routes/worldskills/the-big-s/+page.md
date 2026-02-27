<script>
    import Quirk from "../Quirk.svelte";
</script>

## Table of Contents

## Watch Out 👀

- The AWS cli (e.g. `aws s3 cp`) execute more than just a simple GetObject api call; this can often lead to obscure errors (e.g. `aws s3 cp ...` reports `An error occurred (403) when calling the HeadObject operation: Forbidden`). To debug such errors you can use `aws s3api <operation> ...` calls which yield far better results in the majority of situations.

## Quirks
