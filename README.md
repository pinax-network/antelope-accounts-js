# antelope-accounts-js
Get account origin information using Accounts substreams KV sink endpoint

## Quickstart

```
import { createClient } from "@pinax/antelope-accounts"
const client = createClient( process.env.SINK_ENDPOINT );
const one = await client.getOrigin("account");
const many = await client.getOrigins(["account1","accounts2"]);
```

## Example

```
> node example.js
```


## Server
You can start your own accounts sink server by running `docker compose up` in the `./server` directory
