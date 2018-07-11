import express from 'express'

import jwt from 'express-jwt';
import { JWT_SECRET } from './config';
import { Users } from './src/api/user/logic'
import SettingsLogic from './src/api/setting/logic'
import Tasks from './src/tasks'

import { 
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express'

import bodyParser from 'body-parser'

import { schema } from './src/api/schema'
import cors from 'cors'


import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';


import gridfs from './src/gridfs'

const PORT = 4003

const server = express()

var corsOptions = {
  origin: '*',
  credentials: true
}
server.use(cors(corsOptions))

server.use('/graphql', bodyParser.json(), jwt({
  secret: JWT_SECRET,
  credentialsRequired: false,
}), graphqlExpress(req => ({
  schema,
  context: {
    user: req.user 
      ? Users.findOne({ _id: req.user._id, version: req.user.version })
      : Promise.resolve(null),
  },
})))

// server.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
// }))

server.get('/cdn/(:fileId)', gridfs) 

server.get('/', function (req, res) {
  res.send('Hello')
})

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`))

SettingsLogic.rubToDb()
Tasks.nationalBank()

// const ws = createServer(server);

// ws.listen(PORT, () => {
//   console.log(`Apollo Server is now running on http://localhost:${PORT}`);
//   // Set up the WebSocket for handling GraphQL subscriptions
//   new SubscriptionServer({
//     execute,
//     subscribe,
//     schema
//   }, {
//     server: ws,
//     path: '/subscriptions',
//   });
// });