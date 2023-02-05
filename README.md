## Description

API for an automated charging station management system using NestJS, Typeorm and Sqlite.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Api documentation

Once the app is running, the available endpoints and api documentation can be consulted [here](http://localhost:3000/api) or downloaded in json format [here](http://localhost:3000/api-json).

Most of the endpoints are for general CRUD operations with the following exceptions:

- /companies/{id}/stations - takes a company id and responds with data (stationId,
stationName, maxPower) about all stations that belong to the given company and its child companies.
- /commands - script parser for controlling commands according to Task 2.

## ToDo (Sorry for the lack of time)

- Implement testing.


## License

Nest is [MIT licensed](LICENSE).
