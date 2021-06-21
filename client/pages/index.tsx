import {
	Card,
	Navbar,
	Notification,
	Particles,
	SEO
} from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCookie } from '../helpers/cookies';
import { useState, useEffect } from 'react';

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
			name="Home"
			themeColor="#FBC403"
		/>
		<Particles/>
		<Navbar/>
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
	const [acceptedCookies, setAcceptedCookies] = useState<boolean>(true);

	useEffect(() => {
		const cookie = getCookie('closed-cookies-notification');
		if (!cookie || cookie.value !== 'true') {
			setAcceptedCookies(false);
		}
	}, [acceptedCookies]);

	if (acceptedCookies) {
		return <Content/>;
	}

	return (
		<div>
			<Content/>
			<Notification name="cookies" message="This site uses cookies to enhance user experience."/>
		</div>
	);
};

export default Home;
