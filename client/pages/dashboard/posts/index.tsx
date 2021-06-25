import { NotificationContext } from '../../../src/notifications';
import { useDeletePostMutation, useMeQuery, usePostsQuery } from '../../../src/generated/graphql';
import { NotificationProps, Post } from '../../../src/types';
import { useEffect, useState } from 'react';
import { Link } from '../../../components';
import { useRouter } from 'next/router';
import { DashboardTemplate } from '..';

const Posts = () => {
	const [{ fetching: fetch, error: err }] = useMeQuery({ requestPolicy: 'network-only' });
	const [{ data, fetching, error }] = usePostsQuery({ requestPolicy: 'network-only' });
	const [, deletePost] = useDeletePostMutation();
	const [posts, setPosts] = useState<Array<Partial<Post>>>([]);
	const router = useRouter();

	useEffect(() => {
		if (fetching) return;
		if (error) return;
		if (data) {
			setPosts(data.posts);
		}
	}, [data, fetching, error]);


	if (fetch) return <></>;
	if (err) router.push('/login');

	// eslint-disable-next-line no-unused-vars
	const handleDelete = async (id: string, notify: (props: NotificationProps) => void) => {
		try {
			const res = await deletePost({ id: id });
			if (res.data?.deletePost) {
				setPosts(posts.filter(post => post._id !== id));
				notify({ name: `delete-success-${id}`, message: `Successfully deleted post ${id}`, color: '#50C878', persist: false });
			} else {
				notify({ name: `no-post-exists-${(Math.random() * 30) * (Math.random() * 15)}`, message: `Could not delete post: ${res.error}`, color: '#FFC0CB', persist: false });
			}
		} catch {
			notify({ name: `failed-to-fetch`, message: `Failed to fetch data from API`, color: '#FFC0CB', persist: false });
			return;
		}
	};

	return (
		<DashboardTemplate name="Posts" router={router} data={null}>
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
								<div className="field is-grouped is-grouped-multiline">
									{post.tags?.map((tag, tidx) =>
										<div key={tidx} className="control">
											<div className="tags has-addons">
												<div className="tag is-primary">{tag}</div>
											</div>
										</div>
									)}
								</div>
								<br/>
								<div className="buttons">
									<button className="button is-success has-text-dark" disabled>Details</button>
									<button className="button is-primary" onClick={() => router.push(`/dashboard/posts/edit?id=${post._id}`)}>Edit</button>
									<NotificationContext.Consumer>
										{({ createNotification }) =>
											<button className="button is-danger" onClick={() => handleDelete(post._id!, createNotification)}>Delete</button>
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
