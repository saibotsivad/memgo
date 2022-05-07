# Memgo

An in-memory MongoDB Data API, useful for integration test suites.

## Install

The normal way:

```sh
npm install --save-dev memgo
```

## Using

This is meant to be used as a CLI tool, so you would start it simply like this:

```sh
$ memgo
In-memory MongoDB instance started at mongodb://127.0.0.1:27017/
2022-05-07T03:06:21.997Z Data API running on port 3007
```

## Options

There aren't many options to configure, just these:

- `apiPort` - The port that the Data API uses. Default: `3007`
- `mongodbPort` - The port that the in-memory MongoDB instance uses. Default: `27017`
- `key` - To require an authentication key for the Data API. Set the flag multiple times for multiple keys. Default: no authentication required.
- `verbose` - Set this flag if the Data API should be more verbose.

Here are some examples:

```sh
# default ports, but add a key
memgo --key battery-horse-staple
# add multiple keys
memgo --key secret1 --key secret2
# set the data api to a new port
memgo --apiPort 5001
# use mongodb on a different port
memgo --mongodbPort 27018
```

## MongoDB

The in-memory database is provided by the excellent [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) library.

From their documentation:

> This package spins up an actual/real MongoDB server programmatically from within nodejs, for testing or mocking during development. By default it holds the data in memory. A fresh spun up `mongod` process takes about 7Mb of memory. The server will allow you to connect your favorite ODM or client library to the MongoDB server and run integration tests isolated from each other.
>
> On install, this package downloads the latest MongoDB binaries and saves them to a cache folder. (only mongodb-memory-server-core does not download on postinstall)

## Data API

The official [MongoDB Atlas Data API](https://www.mongodb.com/docs/atlas/api/data-api/) is mocked using the [mongodb-local-data-api](https://github.com/saibotsivad/mongodb-local-data-api) library, which attempts to match it as exactly as possible.

## License

Published and released under the [Very Open License](http://veryopenlicense.com).

If you need a commercial license, [contact me here](https://davistobias.com/license?software=memgo).
