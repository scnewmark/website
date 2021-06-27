import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetMusicQuery } from '@/graphql';
import { FooterProps } from '@/types';

const Footer = (props: FooterProps) => {
	const [{ data }] = useGetMusicQuery({ requestPolicy: 'cache-and-network' });

	return (
		<div className="container has-text-centered" style={{ maxWidth: 700, paddingTop: 75, paddingLeft: 30, paddingRight: 30, paddingBottom: 100, fontSize: 18 }}>
			<div className="divider"/>
			<div className="content">
				<div style={{ borderRadius: 10, padding: 10, flex: 'true' }} className="has-text-left">
					<span className="icon">
						<i>
							<FontAwesomeIcon icon={['fab', 'apple']} size="lg" color="#FFC0CB"/>
						</i>
					</span>
					<span className="has-text-info" style={{ paddingLeft: 16, fontSize: 16 }}><strong>{data?.user.nowPlaying === 'N/A' ? `Not Playing` : data?.user.nowPlaying}</strong> - Apple Music</span>
				</div>
				<br/>
				<div className="columns">
					<div className="column has-text-left">
						<ul style={{ listStyle: 'none' }}>
							<li style={{ paddingBottom: 15 }}><a onClick={() => props.router.push('/')}>Home</a></li>
							<li style={{ paddingBottom: 15 }}><a onClick={() => props.router.push('/blog')}>Blog</a></li>
							<li style={{ paddingBottom: 15 }}><a onClick={() => props.router.push('/portfolio')}>Portfolio</a></li>
						</ul>
					</div>
					<div className="column has-text-left">
						<ul style={{ listStyle: 'none' }}>
							<li style={{ paddingBottom: 15 }}><a onClick={() => props.router.push('/contact')}>Contact</a></li>
							<li style={{ paddingBottom: 15 }}><a onClick={() => props.router.push('/github')}>GitHub</a></li>
						</ul>
					</div>
					<div className="column has-text-left"></div>
				</div>
				<br/>
				<br/>
			</div>
		</div>
	);
};

export default Footer;
