import {
	Navbar,
	Particles,
	SEO,
	Footer
} from '@/components';
import { useRouter } from 'next/router';

const ErrorNotFound = () => {
	const router = useRouter();

	return (
		<>
			<div>
				<SEO
					openGraph={{}}
					name="scnewmark • 404"
				/>
				<Particles/>
				<Navbar/>
				<div className="container" style={{ maxWidth: 700, paddingLeft: 30, paddingRight: 30 }}>
					<div className="card has-text-centered" style={{ marginTop: '20vh' }}>
						<div className="card-content">
							<p className="title has-text-link"><strong>404</strong></p>
							<p className="content has-text-info">The requested URL <code>{router.asPath}</code> was not found on this server.</p>
						</div>
					</div>
				</div>
				<Footer router={router}/>
			</div>
		</>
	);
};

export default ErrorNotFound;
