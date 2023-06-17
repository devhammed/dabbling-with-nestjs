# Dabbling with NestJS.

This project is created using [Nest.js](http://nestjs.com/).

## Requirements

- Node.js
- NPM
- MySQL

## Usage

- Clone this repository locally.
- Run `npm install` inside the local repo folder to install dependencies.
- Create a MySQL database and user to use.
- Run the SQL script inside `database.sql` file to setup the tables and other things in the database.
- Duplicate `.env.example` file to `.env` and fill in variables like `DB_NAME`, `DB_USER` etc.
- Run `npm run start:dev` to start the development server.
- And then, you can view the OpenAPI/Swagger documentation for the endpoints at [http://localhost:8080/docs](http://localhost:8080/docs)
