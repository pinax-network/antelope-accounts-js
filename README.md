# antelope-accounts-js

## Quickstart

```
import { createClient } from "@pinax/antelope-accounts"
const client = createClient( "http://yaro-accounts43.mar.eosn.io:8000" );
const data = await client.getOrigin("account");
console.log(data)
```