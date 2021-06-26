import { useEffect, useState } from 'react';
import { Navbar, Particles, SEO } from '../components';

const Portfolio = () => {
	const [small, setSmall] = useState<boolean>(false);

	useEffect(() => {
		const update = (matches: boolean) => {
			setSmall(matches);
		};

		const maxWidth = window.matchMedia('(max-width: 800px)');
		if (maxWidth.matches) update(true);

		maxWidth.addEventListener('change', (ev) => update(ev.matches));
	});

	return (
		<div>
			<SEO
				openGraph={{
					title: 'Portfolio',
					description: 'Personal portfolio.',
					site: 'http://localhost:3000/portfolio',
					image: '/images/scnewmark.png',
					url: 'http://localhost:3000/portfolio',
					type: 'article'
				}}
				name="scnewmark • Portfolio"
				themeColor="#FBC403"
			/>
			<Navbar/>
			<Particles/>
			<div className="container" style={{ maxWidth: 800, paddingLeft: 30, paddingRight: 30, top: '3vh' }}>
				<div id="portfolio">
					{!small ? <iframe
						src="https://docs.google.com/document/d/e/2PACX-1vSCkqxzivLftobu1xvtJv1Kif48HyJ5RXMLw4CfynT4FKrSBSVchnEbVmuYDpV56T7h-5mVDKNY6fSe/pub?embedded=true"
						width={800}
						height={800}
						scrolling="no"
					/> :
						<div className="has-text-centered" style={{ marginTop: '10vh' }}>
							<p>Your screen size is too small to display the embedded document.</p>
						</div>
					}
				</div>
				<div className="has-text-centered" style={{ paddingBottom: 150, paddingTop: 15 }}>
					<hr style={{ backgroundColor: '#FBC403' }}/>
					<br/><br/>
					<p>Copyright 2021 © Samuel Newmark</p>
				</div>
			</div>
		</div>
	);
};

export default Portfolio;