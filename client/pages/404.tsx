import {
	Card,
	Navbar,
	Particles,
	SEO
} from '../components';
import { useRouter } from 'next/router';

const ErrorNotFound = () => {
	const router = useRouter();

	return (
		<>
			<div>
				<SEO
					openGraph={{}}
					name="404"
				/>
				<Particles/>
				<Navbar/>
				<div className="container" style={{ maxWidth: 700, paddingLeft: 30, paddingRight: 30 }}>
					<Card>
						<p className="title has-text-link"><strong>404</strong></p>
						<p className="content has-text-info">The requested URL <code>{router.asPath}</code> was not found on this server.</p>
					</Card>
				</div>
			</div>
		</>
	);
};

export default ErrorNotFound;
