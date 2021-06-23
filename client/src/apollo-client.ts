import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: createHttpLink({
		uri: 'http://localhost:8000/graphql',
		credentials: 'include'
	})
});

export default client;
