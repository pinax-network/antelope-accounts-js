# Antelope Accounts substream

### Quickstart
This docker container runs key-value sink for [accounts substreams](https://github.com/pinax-network/substreams/releases/tag/accounts-v0.4.0) and offers multiple ways to access the data

#### Start the sink in Docker
```
$ docker compose up
```

#### Query


gRPC:
```
grpcurl --plaintext -d '{"key":"ha4tonjtgmge"}' localhost:8000 sf.substreams.sink.kv.v1.Kv/Get
```

Connect:
```
curl http://localhost:8000/sf.substreams.sink.kv.v1.Kv/Get -H 'content-type: application/json' --data-raw '{"key":"ha4tonjtgmge"}'
```
