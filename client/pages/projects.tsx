import {
	SEO,
	Navbar,
	Particles
} from '../components';

const Projects = () =>
	<>
		<div>
			<SEO
				openGraph={{
					title: 'scnewmark • Projects',
					description: 'A collection of projects I\'ve worked on.',
					site: 'http://localhost:3000/projects',
					image: '/images/scnewmark.png',
					url: 'http://localhost:3000/projects',
					type: 'article'
				}}
				name="Projects"
				themeColor="#FBC403"
			/>
			<Navbar/>
			<Particles/>
		</div>
	</>;

export default Projects;
