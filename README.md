# shoplist-service

A service providing functionality for managing and sharing shopping lists and their items through a REST API.

## Requirements

- [nodejs](https://nodejs.org/en/download/)
- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)

## Configuration

The service can be configured using the following environment variables:

### Environment

Name | Required | Default | Description
---- | -------- | ------- | -----------
`LOG_LEVEL` | `false` | `info` | Level below which log records will be suppressed
`DB_URL` | `false` | `postgres://shoplist:shoplist@localhost:5432/shoplist` | DB connection URL

## API documentation

The service exposes a Swagger UI. Simply run the service and navigate to the `/docs` path.

## Production

1. Run a PostgresSQL instance (used for data storage)
2. Build a docker image:
	```bash
	docker build -t shoplist-service .
	```
3. Run a docker container:
	```bash
	docker run -d \
		--name shoplist-service-1 \
		-e DB_URL="postgres://<postgres-user>:<postgres-password>@<postgres-host>:<postgres-port>/<postgres-schema>" \
		-p 3000:3000\
		shoplist-service
	```

## Development

### Run

1. Start a PostgreSQL instance listening on localhost:5432
2. Install dependencies
	```bash
	npm install
	```
3. Run service
	```bash
	nest start
	```

### Check code style

```bash
npm run lint
```

### Test

```bash
npm run test
```

## License

UNLICENSED
