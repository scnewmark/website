import { faUser, faLock, faExclamationTriangle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { INotificationContext, NotificationProps, NotificationState } from '../src/types';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { createContext, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Notification } from '../components';
import client from '../src/apollo-client';
import nprogress from 'nprogress';
import '../public/globals.scss';
import Router from 'next/router';

/* FontAwesome config */
config.autoAddCss = false;
library.add(faGithub, faUser, faLock, faExclamationTriangle, faEdit, faTrash);

/* Progress bar */
nprogress.configure({
	showSpinner: true
});

Router.events.on('routeChangeStart', () => nprogress.start());
Router.events.on('routeChangeComplete', () => nprogress.done());

export const NotificationContext = createContext<INotificationContext>({
	notifications: [],
	createNotification: () => null,
	deleteNotification: () => null
});

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
		<NotificationContext.Provider value={ctx}>
			<ApolloProvider client={client}>
				<Component {...pageProps}/>
				<div style={{ position: 'absolute', bottom: '1vh', padding: 10 }}>
					{notifications.map((notification, idx) =>
						<Notification key={idx} message={notification.message} name={notification.name} color={notification.color} persist={notification.persist}/>
					)}
				</div>
			</ApolloProvider>
		</NotificationContext.Provider>
	);
};

export default App;
