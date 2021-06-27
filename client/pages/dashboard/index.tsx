import { DashboardProps, ListElementProps } from '@/types';
import { Navbar, SEO, Particles } from '@/components';
import { useRouter } from 'next/router';
import { useMeQuery } from '@/graphql';

const normalizePath = (path: string) => path.toLowerCase();

const ListElement = (props: ListElementProps) =>
	<li style={{ paddingBottom: 10 }}>
		<a
			onClick={() => props.router.push(normalizePath(`/dashboard/${props.name}`))}
			className={`${props.selected === props.name ? 'is-active' : ''}`}>
			{props.name}
		</a>
	</li>;

export const DashboardTemplate = (props: DashboardProps) =>
	<div>
		<SEO
			openGraph={{
				title: 'Dashboard',
				description: 'Private dashboard.',
				site: 'http://localhost:3000/dashboard',
				image: '/images/scnewmark.jpg',
				url: 'http://localhost:3000/dashboard',
				type: 'article'
			}}
			name={`Dashboard •  ${props.name}`}
			themeColor="#FBC403"
		/>
		<Navbar/>
		<Particles/>
		<div className="container" style={{ maxWidth: 1500, paddingLeft: 30, paddingRight: 30, paddingTop: 125 }}>
			<div className="columns">
				<div className="column" style={{ maxWidth: 200 }}>
					<aside className="menu" style={{ zIndex: 5 }}>
						<p className="menu-label">Dashboard</p>
						<ul className="menu-list">
							<ListElement name="General" selected={props.name} router={props.router}/>
							<ListElement name="Posts" selected={props.name} router={props.router}/>
							<ListElement name="URLs" selected={props.name} router={props.router}/>
						</ul>
					</aside>
				</div>
				<div className="column">
					{props.children}
				</div>
			</div>
		</div>
	</div>;

const Dashboard = () => {
	const [{ data, error }] = useMeQuery({ requestPolicy: 'network-only' });
	const router = useRouter();

	if (error) router.push('/login');
	if (data) router.push('/dashboard/general');

	return <></>;
};

export default Dashboard;
