import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import redis from 'redis'
import bluebird from 'bluebird'

import typeDefs from './schema'
import resolvers from './resolvers'

const PORT = 3000
const app = express()
const client = redis.createClient()

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const server = new ApolloServer({typeDefs, resolvers, context: {client}})

client.on('error', console.error)

server.applyMiddleware({app})

app.listen({port: PORT}, () =>
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`),
)
