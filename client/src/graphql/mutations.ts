import { gql } from '@apollo/client';

export const login = gql(`
mutation Login($username: String!, $password: String!) {
	login(data: { username: $username, password: $password }) {
	  username
	}
  }
`);

export const deleteURL = gql(`
mutation DeleteURL($key: String!) {
	deleteURL(key: $key)
}
`);

export const createPost = gql(`
mutation NewPost($title: String!, $description: String!, $content: String!) {
	createPost(
	  data: {
		title: $title
		description: $description
		content: $content
	  }
	) {
	  _id
	}
  }
`);

export const deletePost = gql(`
mutation DeletePost($id: String!) {
	deletePost(id: $id)
}
`);
