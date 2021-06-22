## ❯ Getting Started

-   This is a simple project to store, retrieve, and modify notes via API
-   This project used this boilerplate project as a starting point: `https://github.com/w3tecch/express-typescript-boilerplate`

### Database Setup

-   Create a new database table named `node_notes_development` in your MySql or Postgres development database

-   Ensure the database config in the `.env` file is correct for your development environment
-   If using Postgres remove the MySql database config and uncomment the Postgres database config in the `.env` file

### Install

-   Install all dependencies with `yarn install`

### Database Migration

-   Run `yarn start db.migrate` to setup the Notes table

### Running

-   Run `yarn start serve` to start nodemon with ts-node, to serve the app.
-   The server address will be displayed to you as `http://0.0.0.0:3456`
-   You can change the localhost port in the `.env` file

### Swagger

-   View the API Docs and make API calls via the Swagger page `http://localhost:3456/swagger`

### API Routes

-   GET /api/notes
-   POST /api/notes
-   GET /api/notes/{id}
-   PUT /api/notes/{id}
-   DELETE /api/notes/{id}
-   POST /api/notes/bulk
-   PUT /api/notes/bulk
-   DELETE /api/notes/bulk
-   GET /api/search

### Linting

-   Run code quality analysis using `yarn start lint`. This runs tslint.
-   There is also a vscode task for this called `lint`.

### Tests

-   Run the unit tests using `yarn start test` (There is also a vscode task for this called `test`).
