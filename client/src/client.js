import { ApolloClient, createNetworkInterface } from 'react-apollo'

// const wsClient = new SubscriptionClient(`ws://localhost:4000/ws`, {
//   reconnect: true
// });

const networkInterface = createNetworkInterface({
  uri: process.env.API_URL || 'http://195.210.46.219:4003/graphql',
})

// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//   networkInterface,
//   wsClient
// )

const client = new ApolloClient({
  // networkInterface: networkInterfaceWithSubscriptions,
  networkInterface,
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    const token = localStorage.getItem('token')
    if (token) {
      req.options.headers.authorization = token ? `Bearer ${token}` : null
    }
    next()
  }
}])

export default client