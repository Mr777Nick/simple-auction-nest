<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Simple Auction Backend

## Summary

The backend that is being used for the Simple Auction Frontend. Made using [Nest JS](https://nestjs.com) framework.

- Dev: **Not deployed yet**
- Prod: **Not deployed yet**

For more settings, configurations and complete setup, go here: [Nest JS Documentation](https://docs.nestjs.com/)

## Tech Stacks and Features

- [Supabase Postgres Database](https://supabase.com/database), for databases
- [Supabase Auth](https://supabase.com/auth), for authentication services
- [Sentry](https://sentry.io/), for error reporting
- [Docker](https://www.docker.com/), for DB local development
- [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/), for code standarization
- [Husky](https://typicode.github.io/husky/), for git hooks
- [Commitizen](https://github.com/commitizen/cz-cli), for commit messages standarization
- [Nest JS](https://docs.nestjs.com/) features used:
  - [Guards](https://docs.nestjs.com/guards), for guarding endpoints with authorization guard
  - [Interceptors](https://docs.nestjs.com/interceptors), for customizing base http response and sentry logging on error
  - [TypeORM](https://docs.nestjs.com/recipes/sql-typeorm), for ORM and connection to the database
  - [Configurations](https://docs.nestjs.com/techniques/configuration), for managing environment variables
  - [Validation](https://docs.nestjs.com/techniques/validation), for input validation
  - [Versioning](https://docs.nestjs.com/techniques/versioning), for REST api versioning
  - [Task Scheduling](https://docs.nestjs.com/techniques/task-scheduling), for adding cron to manage item
  - [Serialization](https://docs.nestjs.com/techniques/serialization), for data serialization to remove sensitive and unused fields
  - [Rate Limiting](https://docs.nestjs.com/security/rate-limiting), for adding rate limit on endpoint
  - [Testing](https://docs.nestjs.com/fundamentals/testing), for doing unit and e2e testings
  - [OpenAPI and Swagger](https://docs.nestjs.com/openapi/introduction), for automated api documentation

## Installation

1. Go to [Database dashboard](https://app.supabase.com/projects), create a project on it, then take note of the project's DB connection info and API key.
2. Go to [Sentry dashboard](https://sentry.io/), create a project on it, then take note of the project's client key (DSN).
3. Set up the .env with all the required information of the project prerequisites (Supabase Auth, Supabase Postgres Connection, and Sentry DSN).
4. Run one of these commands:

- `npm run start` to start local development.
- `npm run start:dev` to start local development in watch mode.
- `npm run deploy:prod` to start in production mode.

## Usage

### To Run Locally

1. Create `.env.development.local` file, then set up the .env with all the required information of the project prerequisites (Supabase Auth, Supabase Postgres Connection, and Sentry DSN).
2. Add `NODE_ENV=development` to the .env file to turning on option for ORM to automatically creating DB tables without needing to run migration.
3. Install [Docker](https://www.docker.com/), run `docker compose --env-file ./.env.development.local up` to start local Postgres database.
4. Run `npm run start` or `npm run start:dev` to start local development.
5. Server will be running on `localhost:3000`.
6. To check API documentation, go to `localhost:3000\v1\docs`.

### To Deploy to Prod Environment

**TBD**

## Depending Services

None

## Dependent Services

- [Frontend](https://github.com/Mr777Nick/simple-auction-next)

## Technical Debt

- ORM Transaction to lock item data when multiple users doing item bid at the same time
- Sentry source mapping and integration with repository

## Known Issues

No known issues for now

## Tests

Run one of these commands:

- `npm run test` to start unit tests.
- `npm run test:e2e` to start e2e tests.
- `npm run test:cov` to check test coverage.
