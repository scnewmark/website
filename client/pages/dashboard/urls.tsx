import { deleteURL as deleteURLMutation } from '../../src/graphql/mutations';
import { OperationVariables, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { urls as urlsQuery } from '../../src/graphql/queries';
import { NotificationProps, URL } from '../../src/types';
import useRequest from '../../hooks/useRequest';
import { NotificationContext } from '../_app';
import styles from './dashboard.module.scss';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from '../../components';
import { useRouter } from 'next/router';
import { DashboardTemplate } from '.';

const URLs = () => {
	const [deleteURL] = useMutation<any, OperationVariables>(deleteURLMutation);
	const { result: { me } } = useAuth({ redirectTo: '/login' });
	const { data } = useRequest({ query: urlsQuery });
	const [urls, setURLs] = useState<Array<Partial<URL>>>(data?.urls);
	const router = useRouter();

	useEffect(() => {
		if (data?.urls) {
			setURLs(data?.urls);
		}
	}, [data]);

	// eslint-disable-next-line no-unused-vars
	const handleDelete = async (key: string, notify: (props: NotificationProps) => void) => {
		try {
			await deleteURL({
				variables: {
					key: key
				}
			});
			setURLs(urls.filter(url => url.key !== key));
			notify({ name: `delete-success-${key}`, message: `Successfully deleted URL ${key}`, color: '#50C878', persist: false });
		} catch (err) {
			notify({ name: `no-url-exists-${(Math.random() * 30) * (Math.random() * 15)}`, message: `Could not delete URL: ${err.message}`, color: '#FFC0CB', persist: false });
			return;
		}
	};

	return (
		<DashboardTemplate name="URLs" router={router} data={me}>
			<div className="container has-text-right">
				<Link to="/dashboard/urls/create" classes="button is-primary" name="Create URL"/>
			</div>
			<br/>
			<div className="container" style={{ height: 600, overflow: 'scroll' }}>
				{urls &&
				<table className="container is-fluid table">
					<thead>
						<tr>
							<th className="has-text-primary">ID</th>
							<th className="has-text-primary">Original URL</th>
							<th className="has-text-primary">Shortened URL</th>
							<th className="has-text-primary">Actions</th>
						</tr>
					</thead>
					<tbody>
						{Array.from(urls)?.sort((a, b) => b.updatedAt! - a.updatedAt!).map((url, idx) =>
							<tr key={idx} className="container has-text-info">
								<th className="has-text-primary">{idx + 1}</th>
								<td>{url.dest}</td>
								<td>{url.key}</td>
								<td>
									<NotificationContext.Consumer>
										{({ createNotification }) =>
											<>
												<span className={`icon ${styles['hoverable-icon']}`} onClick={() => handleDelete(url.key!, createNotification)}>
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
