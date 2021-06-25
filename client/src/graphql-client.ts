import { createClient } from 'urql';

const client = createClient({
	url: 'http://localhost:8000/graphql',
	maskTypename: true,
	fetchOptions: {
		credentials: 'include'
	}
});

export default client;
