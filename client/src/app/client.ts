import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql/',
});

const client = new ApolloClient({
  networkInterface: networkInterface,
  addTypename: true,
});

export function provideClient(): ApolloClient {
  return client;
}
