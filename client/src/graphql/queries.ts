import { gql } from '@apollo/client';

export const me = gql(`
query Me {
    me {
      bio
      avatar
    }
  }
`);

export const posts = gql(`
query Posts {
  posts {
    _id
    title
    description
    content
    createdAt
    updatedAt
  }
}`);

export const urls = gql(`
query URLs {
  urls {
    key
    dest
    createdAt
    updatedAt
  }
}`);
