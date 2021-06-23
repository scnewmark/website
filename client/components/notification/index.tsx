import type { NotificationProps } from '../../src/types';
import { NotificationContext } from '../../pages/_app';
import styles from './notification.module.scss';

const Notification = (props: NotificationProps) =>
	<NotificationContext.Consumer>
		{({ deleteNotification }) =>
			<div id={props.name} className={`${styles['custom-notification']}`}>
				<div className="notification" style={{ backgroundColor: props.color ? props.color : '#FBC403' }}>
					<button className="delete" onClick={() => deleteNotification(props.name)}></button>
					{props.message}
				</div>
			</div>
		}
	</NotificationContext.Consumer>;

export default Notification;
