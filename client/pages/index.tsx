import {
	Card,
	Navbar,
	Particles,
	SEO
} from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotificationContext } from './_app';
import { NotificationProps, NotificationState } from '../src/types';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const Content = (data: any) =>
	<>
		<SEO
			openGraph={{
				title: 'Home',
				description: 'My personal website.',
				site: 'http://localhost:3000',
				image: '/images/scnewmark.png',
				url: 'http://localhost:3000',
				type: 'article'
			}}
			name="Home"
			themeColor="#FBC403"
		/>
		<Particles/>
		<Navbar data={data}/>
		<div className="container" style={{ maxWidth: 700, paddingLeft: 30, paddingRight: 30 }}>
			<Card image="/images/scnewmark.png">
				<div className="has-text-info">
					<strong className="has-text-info">Hello there!</strong> My name is Sam, and I&apos;m a student at the
					<a target="_blank" rel="noreferrer" href="https://scnewmark.vercel.app/r/lasa">{' '}Liberal Arts
						and Science Academy</a> in Austin, Texas. I enjoy coding, and am currently
						interested in artificial intelligence and machine learning. In my free time,
						I like to read and take photographs.
				</div>
				<p className="buttons" style={{ paddingTop: 15 }}>
					<a target="_blank" rel="noreferrer" href="https://github.com/scnewmark">
						<button className="button has-text-info" style={{ borderRadius: 10, padding: 22 }}>
							<span className="icon">
								<i>
									<FontAwesomeIcon icon={['fab', 'github']} size="2x" color="#FBC403"/>
								</i>
							</span>
							<span style={{ paddingLeft: 8 }}>GitHub</span>
						</button>
					</a>
				</p>
			</Card>
		</div>
	</>;

const Home = () => {
	const [acceptedCookies, setAcceptedCookies] = useState<boolean>(false);
	const { data, error } = useAuth();

	useEffect(() => {
		const set = localStorage.getItem('closed-cookies-notification');
		if (set) setAcceptedCookies(true);
	}, [acceptedCookies]);

	// eslint-disable-next-line no-unused-vars
	const createNotifications = (notifications: NotificationState, createNotification: (_: NotificationProps) => void) => {
		const cookies = notifications.find(notif => notif.name === 'cookies');
		const dataFetchFailed = notifications.find(notif => notif.name === 'data-fetch-failed');
		if (!acceptedCookies && !cookies && !acceptedCookies) createNotification({ name: 'cookies', message: 'This site uses cookies to enhance user experience.', persist: true });
		if (error && !dataFetchFailed) createNotification({ name: 'data-fetch-failed', color: '#FFC0CB', message: 'Failed to fetch data from API', persist: false });
	};

	return (
		<NotificationContext.Consumer>
			{({ notifications, createNotification }) =>
				<div onLoad={() => createNotifications(notifications, createNotification)}>
					<Content data={data}/>
				</div>
			}
		</NotificationContext.Consumer>
	);
};

export default Home;
