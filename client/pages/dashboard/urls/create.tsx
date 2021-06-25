import { useCreateUrlMutation, useMeQuery } from '../../../src/generated/graphql';
import { NotificationContext } from '../../../src/notifications';
import { NotificationProps } from '../../../src/types';
import styles from '../dashboard.module.scss';
import { useRouter } from 'next/router';
import { DashboardTemplate } from '..';
import { useState } from 'react';

const CreateURL = () => {
	const [{ fetching, error }] = useMeQuery({ requestPolicy: 'network-only' });
	const router = useRouter();
	const [, createURL] = useCreateUrlMutation();
	const [key, setKey] = useState<string>('');
	const [dest, setDest] = useState<string>('');

	if (fetching) return <></>;
	if (error) router.push('/login');

	// eslint-disable-next-line no-unused-vars
	const handleSubmit = async (notify: (props: NotificationProps) => void) => {
		if (key === '' || dest === '') {
			notify({ name: `failed-to-solve`, message: `Failed to create URL: Missing values`, color: '#FFC0CB', persist: false });
			return;
		}

		try {
			const res = await createURL({ key: key, dest: dest });
			if (res.data?.createURL) {
				notify({ name: `url-create-success-${key}`, message: `Successfully created URL ${key}`, color: '#50C878', persist: false });
				router.push('/dashboard/urls');
			} else {
				notify({ name: `url-create-failure-${(Math.random() * 30) * (Math.random() * 15)}`, message: `Could not create URL: ${res.error}`, color: '#FFC0CB', persist: false });
			}
		} catch (err) {
			notify({ name: `failed-to-fetch`, message: `Failed to fetch data from API`, color: '#FFC0CB', persist: false });
			return;
		}
	};

	return (
		<DashboardTemplate name="Create URL" router={router} data={null}>
			<div className="container" style={{ height: 600, overflow: 'scroll' }}>
				<div className={styles['textarea-custom']} style={{ paddingTop: 15 }}>
					<input
						className={`input has-text-info`}
						name="key"
						placeholder="Shortened URL"
						value={key}
						onChange={(event) => setKey(event.target.value)}/>
					<br/><br/>
					<input
						className={`input has-text-info`}
						name="dest"
						placeholder="Destintation URL"
						value={dest}
						onChange={(event) => setDest(event.target.value)}/>
					<br/><br/>
					<div className="field">
						<p className="control">
							<NotificationContext.Consumer>
								{({ createNotification }) =>
									<button className="button is-success has-text-dark" onClick={() => handleSubmit(createNotification)}>Create URL</button>
								}
							</NotificationContext.Consumer>
						</p>
					</div>
				</div>
			</div>
		</DashboardTemplate>
	);
};

export default CreateURL;
