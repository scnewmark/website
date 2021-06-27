import { EditURLProps, EditURLServerRequest, NotificationProps } from '@/types';
import { useEditUrlMutation, useGetUrlQuery, useMeQuery } from '@/graphql';
import { NotificationContext } from '@/src/notifications';
import styles from '../dashboard.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DashboardTemplate } from '..';

const EditURL = (props: EditURLProps) => {
	const [{ data, fetching, error }] = useGetUrlQuery({ requestPolicy: 'network-only', variables: { key: props.editKey } });
	const router = useRouter();
	const [, editURL] = useEditUrlMutation();
	const [key, setKey] = useState<string>('');
	const [dest, setDest] = useState<string>('');
	const [{ fetching: fetch, error: err }] = useMeQuery({ requestPolicy: 'network-only' });

	useEffect(() => {
		if (data) {
			setKey(data.url.key);
			setDest(data.url.dest);
		}
	}, [data]);

	if (fetching || fetch) return <></>;
	if (error) router.push('/dashboard/urls');
	if (err) router.push('/login');

	// eslint-disable-next-line no-unused-vars
	const handleSubmit = async (notify: (_: NotificationProps) => void) => {
		if (key === '' || dest === '') {
			notify({ name: `failed-to-solve`, message: `Failed to edit URL: Missing values`, color: '#FFC0CB', persist: false });
			return;
		}

		try {
			const res = await editURL({ key: key, dest: dest });
			if (res.data?.editURL) {
				notify({ name: `url-edit-success-${key}`, message: `Successfully edited URL ${key}`, color: '#50C878', persist: false });
				router.push('/dashboard/urls');
			} else {
				notify({ name: `url-edit-failure-${(Math.random() * 30) * (Math.random() * 15)}`, message: `Could not edit URL: ${res.error}`, color: '#FFC0CB', persist: false });
			}
		} catch {
			notify({ name: `failed-to-fetch`, message: `Failed to fetch data from API`, color: '#FFC0CB', persist: false });
			return;
		}
	};

	return (
		<DashboardTemplate name="Edit URL" router={router} data={null}>
			<div className="container" style={{ height: 600, overflow: 'scroll' }}>
				<div className={styles['textarea-custom']} style={{ paddingTop: 15 }}>
					<input
						className={`input has-text-info`}
						name="key"
						placeholder="Shortened URL"
						value={key}
						onChange={(event) => setKey(event.target.value)}
						disabled
					/>
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
									<button className="button is-primary" onClick={() => handleSubmit(createNotification)}>Save Changes</button>
								}
							</NotificationContext.Consumer>
						</p>
					</div>
				</div>
			</div>
		</DashboardTemplate>
	);
};

export default EditURL;

export const getServerSideProps = async ({ req }: EditURLServerRequest) => ({
	props: {
		editKey: req.__NEXT_INIT_QUERY.key || null
	}
});
