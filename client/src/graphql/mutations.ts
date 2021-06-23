import { gql } from '@apollo/client';

export const login = gql(`
mutation Login($username: String!, $password: String!) {
	login(data: { username: $username, password: $password }) {
	  username
	}
  }
`);
