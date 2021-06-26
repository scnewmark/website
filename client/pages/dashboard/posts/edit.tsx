import { CreatePostState, EditPostProps, EditPostServerRequest, NotificationProps } from '../../../src/types';
import { useEditPostMutation, useMeQuery, useGetPostQuery } from '../../../src/generated/graphql';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NotificationContext } from '../../../src/notifications';
import styles from '../dashboard.module.scss';
import { Scroll } from '../../../components';
import { useRouter } from 'next/router';
import { DashboardTemplate } from '..';
import html from 'remark-html';
import Image from 'next/image';
import remark from 'remark';

const DEFAULT_POST = {
	title: '',
	description: '',
	content: '',
	tags: '',
	type: 'PUBLIC'
};

const parseTagString = (tags: string) => tags.trim().replace(/,$/g, '').split(',').map(tag => tag.trim());

const EditPost = (props: EditPostProps) => {
	const [{ error }] = useMeQuery({ requestPolicy: 'network-only' });
	const [{ data, error: err }] = useGetPostQuery({ requestPolicy: 'network-only', variables: { id: props.editID } });
	const [, editPost] = useEditPostMutation();
	const router = useRouter();

	const [post, setPost] = useState<CreatePostState>(DEFAULT_POST);
	const [scroll, setScroll] = useState<boolean>(true);

	useEffect(() => {
		if (data) {
			// eslint-disable-next-line no-extra-parens
			(document.getElementById('content') as HTMLTextAreaElement).value = data.post.content;
			setPost({
				...data.post,
				tags: data.post.tags.join(', ')
			});
		}
	}, [data]);

	if (error) router.push('/login');
	if (err) router.push('/dashboard/posts');

	const handleChange = async (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>, dispatch: Dispatch<SetStateAction<CreatePostState>>) => {
		if (event.target.name !== 'content') {
			dispatch((prev) => ({
				...prev,
				[event.target.name]: event.target.value
			}));
		} else {
			const res = await remark().use(html).process(event.target.value);
			dispatch((prev) => ({
				...prev,
				[event.target.name]: res.toString('utf-8')
			}));
		}
	};

	// eslint-disable-next-line no-unused-vars
	const handlePublish = async (notify: (_: NotificationProps) => void) => {
		const missing = Object.values(post).map(value => value.length < 1 ? null : value).filter(value => value === null);
		if (missing.length) {
			notify({ name: 'failed-to-edit', message: `Failed to edit post: Missing post details`, color: '#FFC0CB', persist: false });
			return;
		}

		try {
			const res = await editPost({
				id: props.editID,
				title: post.title,
				description: post.description,
				content: (await remark().use(html).process(post.content)).toString('utf-8'),
				tags: parseTagString(post.tags)
			});
			if (res.data?.editPost) {
				notify({ name: 'edit-post-success', message: `Successfully edited post`, color: '#50C878', persist: false });
				router.push('/dashboard/posts');
			} else if (res.error) {
				notify({ name: 'failed-to-edit', message: `Failed to edit post: ${res.error}`, color: '#FFC0CB', persist: false });
			}
		} catch {
			notify({ name: `failed-to-fetch`, message: `Failed to fetch data from API`, color: '#FFC0CB', persist: false });
			return;
		}
	};

	return (
		<DashboardTemplate name="Create Post" router={router} data={null}>
			<div className="columns">
				<div className="column">
					<div className={styles['textarea-custom']} style={{ paddingTop: 15 }}>
						<input
							id="title"
							className={`input has-text-info`}
							name="title"
							value={post.title}
							placeholder="Title"
							onChange={(event) => handleChange(event, setPost)}/>
						<br/><br/>
						<input
							id="description"
							className={`input has-text-info`}
							name="description"
							value={post.description}
							placeholder="Description"
							onChange={(event) => handleChange(event, setPost)}/>
						<br/><br/>
						<input
							id="tags"
							className={`input has-text-info`}
							name="tags"
							value={post.tags}
							placeholder="[Tags...]"
							onChange={(event) => handleChange(event, setPost)}/>
						<br/><br/>
						<textarea
							id="content"
							className="textarea has-text-info"
							placeholder="Content"
							name="content"
							rows={15}
							onChange={(event) => handleChange(event, setPost)}></textarea>
						<br/><br/>
						<div className="select is-primary">
							<select id="visibility" name="type" onChange={(event) => handleChange(event, setPost)}>
								<option disabled>Visibility</option>
								<option value="PUBLIC" defaultChecked={post.type === 'PUBLIC'}>Public</option>
								<option value="UNLISTED" defaultChecked={post.type === 'UNLISTED'}>Unlisted</option>
								<option value="PRIVATE" defaultChecked={post.type === 'PRIVATE'}>Private</option>
							</select>
						</div>
						<br/><br/>
						<div className="field">
							<div className="control">
								<NotificationContext.Consumer>
									{({ createNotification }) =>
										<>
											<div className="buttons">
												<button className="button is-success" onClick={() => handlePublish(createNotification)}>Save Changes</button>
												<button className="button is-primary" style={{ width: 130 }} onClick={() => setScroll(!scroll)}>{scroll ? 'Disable' : 'Enable'} Scroll</button>
											</div>
										</>
									}
								</NotificationContext.Consumer>
							</div>
						</div>
					</div>
				</div>
				<div className="column" style={{ maxHeight: 600, overflow: 'scroll' }}>
					<div className="card">
						<div className="card-content">
							<div className="title has-text-primary">{post.title}</div>
							<div className="subtitle has-text-info">{post.description}</div>
							<div className="media">
								<div className="media-left">
									<figure className="image is-48x48">
										<Image src="/images/scnewmark.jpg" alt="Profile icon." width={96} height={96}/>
									</figure>
								</div>
								<div className="media-content">
									<p className="title is-6 has-text-info" style={{ paddingTop: 10 }}>By Sam Newmark</p>
									<p className="subtitle has-text-info" style={{ fontSize: 15 }}>Created {new Date().toString().substring(0, 15)}</p>
								</div>
							</div>
							<div className="content" dangerouslySetInnerHTML={{ __html: post.content ?? '' }}/>
						</div>
					</div>
					<Scroll enabled={scroll}/>
				</div>
			</div>
		</DashboardTemplate>
	);
};

export default EditPost;

export const getServerSideProps = async ({ req }: EditPostServerRequest) => ({
	props: {
		editID: req.__NEXT_INIT_QUERY.id || null
	}
});
