import type { NotificationProps } from '../../src/types';
import { setCookie } from '../../helpers/cookies';
import styles from './notification.module.scss';
import { useEffect, useState } from 'react';

const Notification = (props: NotificationProps) => {
	const [deleted, setDeleted] = useState<boolean>(false);

	useEffect(() => {
		if (deleted) {
			const notification = document.getElementById('notification');
			if (notification) {
				notification.style.opacity = '0';
				setTimeout(() => {
					notification.remove();
					setCookie({
						key: `closed-${props.name}-notification`,
						value: 'true',
						maxAge: 86400,
						path: '/'
					});
				}, 300);
			}
		}
	}, [deleted, props.name]);

	return (
		<div id="notification" className={`container ${styles['custom-notification']}`}>
			<div className="notification is-primary">
				<button className="delete" onClick={() => setDeleted(true)}></button>
				{props.message}
			</div>
		</div>
	);
};

export default Notification;
