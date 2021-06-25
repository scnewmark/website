import { useDeleteUrlMutation, useMeQuery, useUrLsQuery } from '../../../src/generated/graphql';
import { NotificationContext } from '../../../src/notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotificationProps, URL } from '../../../src/types';
import styles from '../dashboard.module.scss';
import { useEffect, useState } from 'react';
import { Link } from '../../../components';
import { useRouter } from 'next/router';
import { DashboardTemplate } from '../';

const URLs = () => {
	const router = useRouter();
	const [{ data }] = useUrLsQuery({ requestPolicy: 'network-only' });
	const [urls, setURLs] = useState<Array<Partial<URL>>>([]);
	const [, deleteURL] = useDeleteUrlMutation();

	useEffect(() => {
		if (data) {
			setURLs(data.urls);
		}
	}, [data]);

	const [{ fetching, error }] = useMeQuery({ requestPolicy: 'network-only' });

	if (fetching) return <></>;
	if (error) router.push('/login');

	// eslint-disable-next-line no-unused-vars
	const handleDelete = async (key: string, notify: (props: NotificationProps) => void) => {
		try {
			const res = await deleteURL({ key: key });
			if (res.data?.deleteURL) {
				setURLs(urls.filter(url => url.key !== key));
				notify({ name: `delete-success-${key}`, message: `Successfully deleted URL ${key}`, color: '#50C878', persist: false });
			} else {
				notify({ name: `no-url-exists-${(Math.random() * 30) * (Math.random() * 15)}`, message: `Could not delete URL: ${res.error}`, color: '#FFC0CB', persist: false });
			}
		} catch (err) {
			notify({ name: `failed-to-fetch`, message: `Failed to fetch data from API`, color: '#FFC0CB', persist: false });
			return;
		}
	};

	return (
		<DashboardTemplate name="URLs" router={router} data={null}>
			<div className="container has-text-right">
				<Link to="/dashboard/urls/create" classes="button is-primary" name="Create URL"/>
			</div>
			<br/>
			<div className="container" style={{ height: 600, overflow: 'scroll' }}>
				{urls &&
				<table className="table container is-fluid">
					<thead>
						<tr>
							<th className="has-text-primary">ID</th>
							<th className="has-text-primary">Original URL</th>
							<th className="has-text-primary">Shortened URL</th>
							<th className="has-text-primary">Actions</th>
						</tr>
					</thead>
					<tbody>
						{urls.sort((a, b) => b.updatedAt! - a.updatedAt!).map((url, idx) =>
							<tr key={idx} className="container has-text-info">
								<th className="has-text-primary">{idx + 1}</th>
								<td><a href={url.dest}>{url.dest}</a></td>
								<td>{url.key}</td>
								<td>
									<NotificationContext.Consumer>
										{({ createNotification }) =>
											<>
												<span className={`icon ${styles['hoverable-icon']}`} onClick={() => router.push(`/dashboard/urls/edit?key=${url.key}`)}>
													<i>
														<FontAwesomeIcon className={`${styles['edit-icon']}`} icon={['fas', 'edit']} size="1x"/>
													</i>
												</span>
												<span className={`icon ${styles['hoverable-icon']}`} onClick={() => handleDelete(url.key!, createNotification)}>
													<i>
														<FontAwesomeIcon className={`${styles['delete-icon']}`} icon={['fas', 'trash']} size="1x"/>
													</i>
												</span>
											</>
										}
									</NotificationContext.Consumer>
								</td>
							</tr>
						)}
					</tbody>
				</table>
				}
			</div>
		</DashboardTemplate>
	);
};

export default URLs;
