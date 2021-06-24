import { createPost as createPostMutation } from '../../../src/graphql/mutations';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { OperationVariables, useMutation } from '@apollo/client';
import { NotificationProps } from '../../../src/types';
import { NotificationContext } from '../../_app';
import styles from '../dashboard.module.scss';
import { Scroll } from '../../../components';
import useAuth from '../../../hooks/useAuth';
import { useRouter } from 'next/router';
import { DashboardTemplate } from '..';
import remark from 'remark';
import html from 'remark-html';
import Image from 'next/image';

const CreatePost = () => {
	const [createPost] = useMutation<any, OperationVariables>(createPostMutation);
	const { result: { me } } = useAuth({ redirectTo: '/login' });
	const [content, setContent] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [scroll, setScroll] = useState<boolean>(true);
	const router = useRouter();

	// eslint-disable-next-line no-unused-vars
	const loadSaved = (notify: (props: NotificationProps) => void) => {
		/* eslint-disable id-length, no-extra-parens */
		const t = localStorage.getItem('title') ?? '';
		const d = localStorage.getItem('description') ?? '';
		const c = localStorage.getItem('content') ?? '';
		if (t || d || c) {
			setTitle(t);
			setDescription(d);
			setContent(c);
			(document.getElementById('title') as HTMLInputElement).value = t;
			(document.getElementById('description') as HTMLInputElement).value = d;
			(document.getElementById('content') as HTMLTextAreaElement).value = c;
			notify({ name: 'load-saved', message: 'Successfully loaded post details', color: '#50C878', persist: false });
		} else {
			notify({ name: 'failed-to-load-saved', message: 'No saved post details to load', color: '#FFC0CB', persist: false });
		}
	};

	const handleChange = async (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, dispatch: Dispatch<SetStateAction<string>>) => {
		const res = await remark().use(html).process(event.target.value);
		if (event.target.name === 'content') dispatch(res.toString('utf-8'));
		else dispatch(event.target.value);
		localStorage.setItem(event.target.name, event.target.value);
	};

	// eslint-disable-next-line no-unused-vars
	const handlePublish = async (notify: (props: NotificationProps) => void) => {
		try {
			await createPost({
				variables: {
					title: title,
					description: description,
					content: content
				}
			});
			notify({ name: 'create-post-success', message: `Successfully published post`, color: '#50C878', persist: false });
			router.push('/dashboard/posts');
		} catch (err) {
			notify({ name: 'failed-to-publish', message: `Failed to publish post: ${err}`, color: '#FFC0CB', persist: false });
		}
	};

	return (
		<DashboardTemplate name="Create Post" router={router} data={me}>
			<div className="columns">
				<div className="column">
					<div className={styles['textarea-custom']} style={{ paddingTop: 15 }}>
						<input
							id="title"
							className={`input has-text-info`}
							name="title"
							placeholder="Title"
							onChange={(event) => handleChange(event, setTitle)}/>
						<br/><br/>
						<input
							id="description"
							className={`input has-text-info`}
							name="description"
							placeholder="Description"
							onChange={(event) => handleChange(event, setDescription)}/>
						<br/><br/>
						<textarea
							id="content"
							className="textarea has-text-info"
							placeholder="Content"
							name="content"
							rows={15}
							onChange={(event) => handleChange(event, setContent)}></textarea>
						<br/><br/>
						<div className="field">
							<div className="control">
								<NotificationContext.Consumer>
									{({ createNotification }) =>
										<>
											<div className="buttons navbar">
												<div className="navbar-start" style={{ paddingRight: 10 }}>
													<button className="button is-success" onClick={() => handlePublish(createNotification)}>Publish</button>
												</div>
												<div className="navbar-end">
													<button className="button is-primary" onClick={() => loadSaved(createNotification)}>Load Saved</button>
													<button className="button is-info" style={{ width: 130 }} onClick={() => setScroll(!scroll)}>{scroll ? 'Disable' : 'Enable'} Scroll</button>
												</div>
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
							<div className="title has-text-primary">{title}</div>
							<div className="subtitle has-text-info">{description}</div>
							<div className="media">
								<div className="media-left">
									<figure className="image is-48x48">
										<Image src="/images/scnewmark.png" alt="Profile icon." width={96} height={96}/>
									</figure>
								</div>
								<div className="media-content">
									<p className="title is-6 has-text-info" style={{ paddingTop: 10 }}>By Sam Newmark</p>
									<p className="subtitle has-text-info" style={{ fontSize: 15 }}>Created {new Date().toString().substring(0, 15)}</p>
								</div>
							</div>
							<div className="content" dangerouslySetInnerHTML={{ __html: content }}/>
						</div>
					</div>
					<Scroll enabled={scroll}/>
				</div>
			</div>
		</DashboardTemplate>
	);
};

export default CreatePost;
