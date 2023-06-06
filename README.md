<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Simple Auction Backend

## Summary

The backend that is being used for the Simple Auction Frontend. Made using [Nest JS](https://nestjs.com) framework.

- Prod: https://d36q0ar0s7mew.cloudfront.net

For more settings, configurations and complete setup, go here: [Nest JS Documentation](https://docs.nestjs.com/)

## Tech Stacks and Features

- [AWS CodeBuild](https://aws.amazon.com/codebuild/), [AWS CodePipeline](https://aws.amazon.com/codepipeline/), [AWS ECS](https://aws.amazon.com/ecs/), [AWS ECR](https://aws.amazon.com/ecr/), and [AWS CloudFront](https://aws.amazon.com/cloudfront/), for CI/CD, hosting, and auto scaling
- [Supabase Postgres Database](https://supabase.com/database), for databases ([ERD](https://lucid.app/lucidchart/de502dff-3f1f-414e-aac9-fe0992d3d019/edit?viewport_loc=351%2C-76%2C1023%2C1224%2C0_0&invitationId=inv_4603624c-56cd-4182-847d-e7931ba07fef) used)
- [Supabase Auth](https://supabase.com/auth), for authentication services
- [Sentry](https://sentry.io/), for error reporting
- [Docker](https://www.docker.com/), for DB local development and deployment
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
- `npm run start:debug` to start local development in debug mode.
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

1. Create AWS ECR to store docker images for later.
2. Create AWS CodeBuild project, connect AWS to GitHub, then select this repository.
3. Create AWS ECS clusters, task, and service for the project. Select the previous CodeBuild project when asked.
4. Create AWS Load Balancer target group, for later to be selected as CodePipeline deploy target.
5. Create AWS CodePipeline project. Add Source of the Github repository and the branch name. Add Build of the previous CodeBuild project. Add Amazon ECS as deploy provider with the created clusters and services.
6. Create AWS CloudFront with the Load Balancer as the source. Use the CloudFront url directly or as proxy of the domain name of the server.
7. Any newer commits to the main branch of the repository will automatically trigger the deployment.

Note: See this link by [Modus Create](https://moduscreate.com/blog/deploy-a-nestjs-application-to-amazon-ecs-using-codepipeline/) for detailed instructions.

### To Commit using Commitizen CLI

1. Run `npm run commit`.
2. Follow along the guided wizard to create the commit.
3. Wait for the git hooks to finish doing Eslint, Prettier, and test.

### To Generate DB Migration from Entities

1. Make sure the DB engine is running and available to connect.
2. Configure .env file with the DB configuration.
3. Run `npm run migration:generate db/migrations/<MigrationName>`.
4. It will generate migration file based on the changes from the DB state and the current state of all files containing `*.entity.ts` name.
5. Commit the generated migration file(s).

### To Run DB Migration

1. Make sure the DB engine is running and available to connect.
2. Configure .env file with the DB configuration.
3. Run `npm run migration:run`.
4. It will check the migration files with the current state of the DB, then do any unapplied migrations if possible.

### To Revert DB Migration

1. Make sure the DB engine is running and available to connect.
2. Configure .env file with the DB configuration.
3. Run `npm run migration:revert`.
4. It will check the migration files with the current state of the DB, then do revert of one last migration if possible.
5. Repeat the command if migration revert is still needed.

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
