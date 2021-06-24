import {
	Navbar,
	SEO,
	Particles
} from '../../components';
import { NextRouter, useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

type ListElementProps = {
    name: string;
    selected: string;
    router: NextRouter;
};

type DashboardProps = {
    children?: ReactNode;
    router: NextRouter;
    data: any;
    name: string;
};

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
				image: '/images/scnewmark.png',
				url: 'http://localhost:3000/dashboard',
				type: 'article'
			}}
			name={`Dashboard •  ${props.name}`}
			themeColor="#FBC403"
		/>
		<Navbar authed={props.data?.me !== null}/>
		<Particles/>
		<div className="container" style={{ maxWidth: 1500, paddingLeft: 30, paddingRight: 30, top: '10vh' }}>
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
	const router = useRouter();
	const { result: { me } } = useAuth({ redirectTo: '/login' });

	useEffect(() => {
		if (me) router.push('/dashboard/general');
	}, [me, router]);

	return <></>;
};

export default Dashboard;
