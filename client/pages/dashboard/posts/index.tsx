import { deletePost as deletePostMutation } from '../../../src/graphql/mutations';
import { OperationVariables, useMutation } from '@apollo/client';
import { posts as postsQuery } from '../../../src/graphql/queries';
import { NotificationProps, Post } from '../../../src/types';
import useRequest from '../../../hooks/useRequest';
import { NotificationContext } from '../../_app';
import useAuth from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { Link } from '../../../components';
import { useRouter } from 'next/router';
import { DashboardTemplate } from '..';

const Posts = () => {
	const { result: { me }, error } = useAuth({ redirectTo: '/login' });
	const [deletePost] = useMutation<any, OperationVariables>(deletePostMutation);
	const { data } = useRequest({ query: postsQuery });
	const [posts, setPosts] = useState<Array<Partial<Post>>>(data?.posts);
	const router = useRouter();

	useEffect(() => {
		if (error) router.push('/login');
		if (data?.posts) {
			setPosts(data?.posts);
		}
	}, [data, error, router]);

	// eslint-disable-next-line no-unused-vars
	const handleDelete = async (id: string, notify: (props: NotificationProps) => void) => {
		try {
			await deletePost({
				variables: {
					id: id
				}
			});
			setPosts(posts.filter(post => post._id !== id));
			notify({ name: `delete-success-${id}`, message: `Successfully deleted post ${id}`, color: '#50C878', persist: false });
		} catch (err) {
			notify({ name: `no-post-exists-${(Math.random() * 30) * (Math.random() * 15)}`, message: `Could not delete post: ${err.message}`, color: '#FFC0CB', persist: false });
			return;
		}
	};

	return (
		<DashboardTemplate name="Posts" router={router} data={me}>
			<div className="container has-text-right">
				<Link to="/dashboard/posts/create" classes="button is-primary" name="Create Post"/>
			</div>
			<div className="container" style={{ maxHeight: 600, overflow: 'scroll' }}>
				{posts && Array.from(posts)?.sort((a, b) => b.updatedAt! - a.updatedAt!).map((post, idx) =>
					<div key={idx}>
						<div className="tile">
							<div className="card-content">
								<p className="title has-text-primary">{post.title}</p>
								<p className="subtitle has-text-info">{post.description}</p>
								<p className="content" dangerouslySetInnerHTML={{ __html: post.content ?? '' }}></p>
								<div className="buttons">
									<div className="button is-success has-text-dark">Details</div>
									<div className="button is-primary">Edit</div>
									<NotificationContext.Consumer>
										{({ createNotification }) =>
											<div className="button is-danger" onClick={() => handleDelete(post._id!, createNotification)}>Delete</div>
										}</NotificationContext.Consumer>
								</div>
							</div>
						</div>
						{idx < (posts.length - 1) ? <hr/> : <></>}
					</div>
				)}
			</div>
		</DashboardTemplate>
	);
};

export default Posts;
