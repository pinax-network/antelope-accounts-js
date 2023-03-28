# antelope-accounts-js
Get account origin information using Accounts substreams KV sink endpoint

## Quickstart

```
import { createClient } from "@pinax/antelope-accounts"
const client = createClient( "http://yaro-accounts43.mar.eosn.io:8000" );
const data = await client.getOrigin("account");
console.log(data)
```

## Example

```
> node example.js
```


## Server
You can start your own substreams server by running `docker compose up` in the `./server` directory