import {
	Navbar,
	Particles,
	SEO
} from '../components';
import { NotificationProps, NotificationState } from '../src/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotificationContext } from '../src/notifications';
import profileIcon from '../public/images/scnewmark.jpg';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Content = () =>
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
			name="scnewmark • Home"
			themeColor="#FBC403"
		/>
		<Particles/>
		<Navbar/>
		<div className="container" style={{ maxWidth: 700, paddingLeft: 30, paddingRight: 30 }}>
			<div className="card has-text-centered" style={{ marginTop: '20vh' }}>
				<div style={{ padding: 25, paddingBottom: 3 }} className="">
					<figure className="image is-150x150">
						<Image src={profileIcon} alt="Profile picture." width={150} height={150} className="is-rounded"/>
					</figure>
				</div>
				<div className="card-content">
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
				</div>
			</div>
		</div>
	</>;

const Home = () => {
	const [acceptedCookies, setAcceptedCookies] = useState<boolean>(false);

	useEffect(() => {
		const set = localStorage.getItem('closed-cookies-notification');
		if (set) setAcceptedCookies(true);
	}, [acceptedCookies]);

	// eslint-disable-next-line no-unused-vars
	const createNotifications = (notifications: NotificationState, createNotification: (_: NotificationProps) => void) => {
		const cookies = notifications.find(notif => notif.name === 'cookies');
		// const dataFetchFailed = notifications.find(notif => notif.name === 'data-fetch-failed');
		if (!acceptedCookies && !cookies) createNotification({ name: 'cookies', message: 'This site uses cookies to enhance user experience.', persist: true });
		// if (error && !dataFetchFailed) createNotification({ name: 'data-fetch-failed', color: '#FFC0CB', message: 'Failed to fetch data from API', persist: false });
	};

	return (
		<NotificationContext.Consumer>
			{({ notifications, createNotification }) =>
				<div onLoad={() => createNotifications(notifications, createNotification)}>
					<Content/>
				</div>
			}
		</NotificationContext.Consumer>
	);
};

export default Home;
