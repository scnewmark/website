import {
	SEO,
	Navbar,
	Particles
} from '../components';
import useAuth from '../hooks/useAuth';

const Projects = () => {
	const { result: { me } } = useAuth();

	return (
		<>
			<div>
				<SEO
					openGraph={{
						title: 'Projects',
						description: 'A collection of projects I\'ve worked on.',
						site: 'http://localhost:3000/projects',
						image: '/images/scnewmark.png',
						url: 'http://localhost:3000/projects',
						type: 'article'
					}}
					name="scnewmark • Projects"
					themeColor="#FBC403"
				/>
				<Navbar authed={me !== null}/>
				<Particles/>
			</div>
		</>
	);
};

export default Projects;
