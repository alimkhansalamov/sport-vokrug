import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://beta.sosportom.ru/graphql/',
  cache: new InMemoryCache(),
});

export default client;
