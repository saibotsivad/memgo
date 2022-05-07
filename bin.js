#!/usr/bin/env node

import { readFileSync } from 'node:fs'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { setup, server } from 'mongodb-local-data-api'
import sade from 'sade'

sade('memgo', true)
	.version(JSON.parse(readFileSync('./package.json', 'utf8')).version)
	.describe('Start an instance of an in-memory MongoDB Data API.')
	.option('--apiPort', 'Change the port this Data API uses. (Default: 3007)')
	.option('--key', 'The API key to require on all requests to the Data API. The default is no authentication required. Set the flag multiple times for multiple keys.')
	.option('--mongodbPort', 'Change the port that the in-memory MongoDB instance uses. (Default: 27017)')
	.option('--verbose', 'Be more verbose with logged output.')
	.example(' # use all defaults')
	.example('--apiPort 3001 # change the Data API port')
	.example('--key=abc123 --key=def456 # use multiple keys')
	.action(async ({ apiPort, key, mongodbPort, verbose }) => {
		if (!apiPort) apiPort = 3007
		apiPort = parseInt(apiPort, 10)

		if (!mongodbPort) mongodbPort = 27017
		mongodbPort = parseInt(mongodbPort, 10)

		const keys = key
			? (Array.isArray(key) ? key : [ key ])
			: []

		verbose = !!verbose

		const mongod = await MongoMemoryServer.create({
			instance: {
				port: mongodbPort,
				// `dbName` should be optionally set
			},
		})
		const url = mongod.getUri()
		console.log('In-memory MongoDB instance started at', url)

		const database = setup({ url })
		server({ database, keys, verbose }).start(apiPort, () => {
			console.log(new Date(), `Data API running on port ${apiPort}`)
		})
	})
	.parse(process.argv)
