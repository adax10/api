## NestJS starter with TypeORM (0.3), database MariaDB and i18n

For i18n add the appropriate header: `Accept-Language: en | pl`

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Migrations

Make sure to use npm for commands follow, because yarn does not support $npm_config_name.

```
# generate migration
npm run migration:generate --name=ExampleMigration

# create migration
npm run migration:create --name=ExampleMigration
```

Migration files are placed under src/database/migrations.

## Env configuration

```
NODE_ENV=development|production (optional enum NodeEnv, default development)
```

```
# express
API_PORT=3000 (optional number, default 3000)
API_HOST=0.0.0.0 (optional string, default 0.0.0.0)
```

```
# cors
CORS_ALLOWED_ORIGING=string (optional string, default *, for eg. http://localhost:3000)
```

```
# body parser
MAX_FILE_SIZE_KB=20971520 (optional number, default 20971520 - 20MB)
```

```
# morgan
USE_LOGS=boolean (optional boolean, default true)
```

```
# swagger config
USE_SWAGGER=true (optional boolean, default true)
SWAGGER_ROUTE=/swagger (required string, if USE_SWAGGER true)
```

```
# typeorm
TYPEORM_CONNECTION=mariadb (required)
TYPEORM_HOST=localhost (required string)
TYPEORM_USERNAME=user (required string)
TYPEORM_PASSWORD=password (required string)
TYPEORM_DATABASE=database (required string)
TYPEORM_PORT=3306 (required number)
TYPEORM_SYNCHRONIZE=false (optional boolean, default false)
TYPEORM_LOGGING=true (optional boolean, default false)
TYPEORM_DEBUG=false (optional boolean, default false)
```
