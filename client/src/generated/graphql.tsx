import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Login = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: User;
  logout: Scalars['Boolean'];
  createUser: User;
  createPost: Post;
  createURL: Url;
  editUser: User;
  editPost: Post;
  editURL: Url;
  updatePostViews: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  deleteURL: Scalars['Boolean'];
  updateMusic: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  data: Login;
};


export type MutationCreateUserArgs = {
  data: NewUser;
};


export type MutationCreatePostArgs = {
  data: NewPost;
};


export type MutationCreateUrlArgs = {
  data: NewUrl;
};


export type MutationEditUserArgs = {
  data: UserEdit;
};


export type MutationEditPostArgs = {
  data: PostEdit;
};


export type MutationEditUrlArgs = {
  data: UrlEdit;
};


export type MutationUpdatePostViewsArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  username: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUrlArgs = {
  key: Scalars['String'];
};


export type MutationUpdateMusicArgs = {
  id: Scalars['String'];
  title: Scalars['String'];
};

export type NewPost = {
  title: Scalars['String'];
  description: Scalars['String'];
  content: Scalars['String'];
  type: PostType;
  tags: Array<Scalars['String']>;
};

export type NewUrl = {
  key: Scalars['String'];
  dest: Scalars['String'];
};

export type NewUser = {
  username: Scalars['String'];
  password: Scalars['String'];
  avatar: Scalars['String'];
  bio: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  content: Scalars['String'];
  type: PostType;
  tags: Array<Scalars['String']>;
  views: Scalars['Int'];
  createdAt: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type PostEdit = {
  id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  content?: Maybe<Scalars['String']>;
};

export enum PostType {
  Public = 'PUBLIC',
  Unlisted = 'UNLISTED',
  Private = 'PRIVATE'
}

export type Query = {
  __typename?: 'Query';
  me: User;
  user: User;
  users: Array<User>;
  post: Post;
  postByTitle: Post;
  posts: Array<Post>;
  url: Url;
  urls: Array<Url>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostByTitleArgs = {
  title: Scalars['String'];
};


export type QueryUrlArgs = {
  key: Scalars['String'];
};

export type Url = {
  __typename?: 'URL';
  _id: Scalars['String'];
  key: Scalars['String'];
  dest: Scalars['String'];
  createdAt: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type UrlEdit = {
  key: Scalars['String'];
  dest?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  bio: Scalars['String'];
  avatar: Scalars['String'];
  createdAt: Scalars['Int'];
  updatedAt: Scalars['Int'];
  recentlyPlayed: Scalars['String'];
  nowPlaying: Scalars['String'];
};

export type UserEdit = {
  id: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & Pick<User, 'username'>
  ) }
);

export type DeleteUrlMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type DeleteUrlMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteURL'>
);

export type NewPostMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  content: Scalars['String'];
  tags: Array<Scalars['String']>;
  type: PostType;
}>;


export type NewPostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, '_id'>
  ) }
);

export type CreateUrlMutationVariables = Exact<{
  key: Scalars['String'];
  dest: Scalars['String'];
}>;


export type CreateUrlMutation = (
  { __typename?: 'Mutation' }
  & { createURL: (
    { __typename?: 'URL' }
    & Pick<Url, '_id'>
  ) }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type EditPostMutationVariables = Exact<{
  id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  content: Scalars['String'];
  tags: Array<Scalars['String']>;
}>;


export type EditPostMutation = (
  { __typename?: 'Mutation' }
  & { editPost: (
    { __typename?: 'Post' }
    & Pick<Post, '_id'>
  ) }
);

export type EditUserMutationVariables = Exact<{
  id: Scalars['String'];
  bio: Scalars['String'];
  avatar: Scalars['String'];
}>;


export type EditUserMutation = (
  { __typename?: 'Mutation' }
  & { editUser: (
    { __typename?: 'User' }
    & Pick<User, '_id'>
  ) }
);

export type EditUrlMutationVariables = Exact<{
  key: Scalars['String'];
  dest: Scalars['String'];
}>;


export type EditUrlMutation = (
  { __typename?: 'Mutation' }
  & { editURL: (
    { __typename?: 'URL' }
    & Pick<Url, '_id'>
  ) }
);

export type UpdatePostViewsMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type UpdatePostViewsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updatePostViews'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'bio' | 'avatar'>
  ) }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'title' | 'description' | 'content' | 'tags' | 'createdAt' | 'updatedAt'>
  )> }
);

export type UrLsQueryVariables = Exact<{ [key: string]: never; }>;


export type UrLsQuery = (
  { __typename?: 'Query' }
  & { urls: Array<(
    { __typename?: 'URL' }
    & Pick<Url, '_id' | 'key' | 'dest' | 'createdAt' | 'updatedAt'>
  )> }
);

export type GetUrlQueryVariables = Exact<{
  key: Scalars['String'];
}>;


export type GetUrlQuery = (
  { __typename?: 'Query' }
  & { url: (
    { __typename?: 'URL' }
    & Pick<Url, 'key' | 'dest'>
  ) }
);

export type GetPostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { post: (
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'title' | 'description' | 'content' | 'tags' | 'type'>
  ) }
);

export type GetMusicQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMusicQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'recentlyPlayed' | 'nowPlaying'>
  ) }
);


export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(data: {username: $username, password: $password}) {
    username
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const DeleteUrlDocument = gql`
    mutation DeleteURL($key: String!) {
  deleteURL(key: $key)
}
    `;

export function useDeleteUrlMutation() {
  return Urql.useMutation<DeleteUrlMutation, DeleteUrlMutationVariables>(DeleteUrlDocument);
};
export const NewPostDocument = gql`
    mutation NewPost($title: String!, $description: String!, $content: String!, $tags: [String!]!, $type: PostType!) {
  createPost(
    data: {title: $title, description: $description, content: $content, tags: $tags, type: $type}
  ) {
    _id
  }
}
    `;

export function useNewPostMutation() {
  return Urql.useMutation<NewPostMutation, NewPostMutationVariables>(NewPostDocument);
};
export const CreateUrlDocument = gql`
    mutation CreateURL($key: String!, $dest: String!) {
  createURL(data: {key: $key, dest: $dest}) {
    _id
  }
}
    `;

export function useCreateUrlMutation() {
  return Urql.useMutation<CreateUrlMutation, CreateUrlMutationVariables>(CreateUrlDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: String!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const EditPostDocument = gql`
    mutation EditPost($id: String!, $title: String!, $description: String!, $content: String!, $tags: [String!]!) {
  editPost(
    data: {id: $id, description: $description, content: $content, tags: $tags, title: $title}
  ) {
    _id
  }
}
    `;

export function useEditPostMutation() {
  return Urql.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument);
};
export const EditUserDocument = gql`
    mutation EditUser($id: String!, $bio: String!, $avatar: String!) {
  editUser(data: {id: $id, bio: $bio, avatar: $avatar}) {
    _id
  }
}
    `;

export function useEditUserMutation() {
  return Urql.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument);
};
export const EditUrlDocument = gql`
    mutation EditURL($key: String!, $dest: String!) {
  editURL(data: {key: $key, dest: $dest}) {
    _id
  }
}
    `;

export function useEditUrlMutation() {
  return Urql.useMutation<EditUrlMutation, EditUrlMutationVariables>(EditUrlDocument);
};
export const UpdatePostViewsDocument = gql`
    mutation UpdatePostViews($id: String!) {
  updatePostViews(id: $id)
}
    `;

export function useUpdatePostViewsMutation() {
  return Urql.useMutation<UpdatePostViewsMutation, UpdatePostViewsMutationVariables>(UpdatePostViewsDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    _id
    bio
    avatar
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostsDocument = gql`
    query Posts {
  posts {
    _id
    title
    description
    content
    tags
    createdAt
    updatedAt
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const UrLsDocument = gql`
    query URLs {
  urls {
    _id
    key
    dest
    createdAt
    updatedAt
  }
}
    `;

export function useUrLsQuery(options: Omit<Urql.UseQueryArgs<UrLsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UrLsQuery>({ query: UrLsDocument, ...options });
};
export const GetUrlDocument = gql`
    query GetURL($key: String!) {
  url(key: $key) {
    key
    dest
  }
}
    `;

export function useGetUrlQuery(options: Omit<Urql.UseQueryArgs<GetUrlQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUrlQuery>({ query: GetUrlDocument, ...options });
};
export const GetPostDocument = gql`
    query GetPost($id: String!) {
  post(id: $id) {
    _id
    title
    description
    content
    tags
    type
  }
}
    `;

export function useGetPostQuery(options: Omit<Urql.UseQueryArgs<GetPostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostQuery>({ query: GetPostDocument, ...options });
};
export const GetMusicDocument = gql`
    query GetMusic {
  user(id: "1624671832803552000") {
    recentlyPlayed
    nowPlaying
  }
}
    `;

export function useGetMusicQuery(options: Omit<Urql.UseQueryArgs<GetMusicQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMusicQuery>({ query: GetMusicDocument, ...options });
};