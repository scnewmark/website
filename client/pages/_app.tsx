import { faUser, faLock, faExclamationTriangle, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NotificationProps, NotificationState } from '../src/types';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { NotificationContext } from '../src/notifications';
import { faApple, faGithub } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Notification } from '../components';
import client from '../src/graphql-client';
import nprogress from 'nprogress';
import { Provider } from 'urql';
import '../public/globals.scss';
import Router from 'next/router';
import { useState } from 'react';

/* FontAwesome config */
config.autoAddCss = false;
library.add(
	faGithub,
	faUser,
	faLock,
	faExclamationTriangle,
	faEdit,
	faTrash,
	faSearch,
	faApple
);

/* Progress bar */
nprogress.configure({
	showSpinner: false
});

Router.events.on('routeChangeStart', () => nprogress.start());
Router.events.on('routeChangeComplete', () => nprogress.done());

/* Next.js config */
const App = ({ Component, pageProps }: AppProps) => {
	const [notifications, setNotifications] = useState<NotificationState>([]);

	const createNotification = (props: NotificationProps) => {
		setNotifications((prev) => [props, ...prev]);
	};

	const deleteNotification = (name: string) => {
		const notification = notifications.find(notif => notif.name === name);
		if (notification) {
			setNotifications((prev) => prev.filter(notif => notif.name !== notification.name));
			if (notification.persist) {
				localStorage.setItem(`closed-${notification.name}-notification`, 'true');
			}
		}
	};

	const ctx = {
		notifications,
		createNotification: createNotification,
		deleteNotification: deleteNotification
	};

	return (
		<Provider value={client}>
			<NotificationContext.Provider value={ctx}>
				<Component {...pageProps}/>
				<div style={{ position: 'absolute', bottom: '1vh', padding: 10 }}>
					{notifications.map((notification, idx) =>
						<Notification key={idx} message={notification.message} name={notification.name} color={notification.color} persist={notification.persist}/>
					)}
				</div>
			</NotificationContext.Provider>
		</Provider>
	);
};

export default App;
