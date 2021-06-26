import { createClient } from 'urql';

const client = createClient({
	url: 'https://scnewmark.cloud.libraryofcode.org/graphql',
	maskTypename: true,
	fetchOptions: {
		credentials: 'include'
	}
});

export default client;
