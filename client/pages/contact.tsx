import { Footer, Navbar, Particles, SEO } from '@/components';
import { useRouter } from 'next/router';

const Contact = () => {
	const router = useRouter();

	return (
		<div>
			<SEO
				openGraph={{
					title: 'Contact',
					description: 'My contact information',
					site: 'https://scnewmark.vercel.app/contact',
					image: '/images/scnewmark.jpg',
					url: 'https://scnewmark.vercel.app/contact',
					type: 'article'
				}}
				description="Sam Newmark's contact information."
				keywords="contact, info, information"
				name="scnewmark • Contact"
				themeColor="#FBC403"
			/>
			<Navbar/>
			<Particles/>
			<div className="container has-text-centered" style={{ maxWidth: 700, paddingLeft: 30, paddingRight: 30, paddingTop: 150, paddingBottom: -5 }}>
				<p className="title is-4 has-text-primary pb-4">Contact Info</p>
				<div className="container is-right" style={{ maxWidth: 200 }}>
					<div className="divider"/>
				</div>
				<p className="subtitle is-6 has-text-info"><strong>Email ::</strong> samcnewmark@gmail.com</p>
				<p className="subtitle is-6 has-text-info"><strong>Discord ::</strong>  Sap ✭#0727</p>
			</div>
			<Footer router={router}/>
		</div>
	);
};

export default Contact;
