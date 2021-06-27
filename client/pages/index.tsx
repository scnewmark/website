import { HomeProps, NotificationProps, NotificationState, StaticPropsResult, ParsedStaticProps } from '@/types';
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { Navbar, Particles, SEO, Footer } from '@/components';
import { NotificationContext } from '@/src/notifications';
import profileIcon from '@/public/images/scnewmark.jpg';
import { useGetMusicQuery } from '@/graphql';
import { useState, useEffect } from 'react';
import { initUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { PostList } from './blog';
import Image from 'next/image';

const Content = (props: HomeProps) =>
	<>
		<SEO
			openGraph={{
				title: 'Home',
				description: 'My personal website.',
				site: 'http://localhost:3000',
				image: '/images/scnewmark.jpg',
				url: 'http://localhost:3000',
				type: 'article'
			}}
			name="scnewmark • Home"
			themeColor="#FBC403"
		/>
		<Particles/>
		<Navbar/>
		<div className="container" style={{ maxWidth: 700, paddingLeft: 30, paddingRight: 30, paddingTop: 75 }}>
			<figure className="image is-150x150">
				<Image src={profileIcon} alt="Profile picture." width={150} height={150} className="is-rounded"/>
			</figure>
			<div className="content" style={{ paddingTop: 15 }}>
				<p className="title has-text-primary">Hey, I am Sam Newmark</p>
				<div className="has-text-info">
					I&apos;m a student at the
					<a target="_blank" rel="noreferrer" href="https://scnewmark.vercel.app/lasa">{' '}Liberal Arts
						and Science Academy</a> in Austin, Texas. I enjoy coding, and my favorite technologies right now are Go, React w/Next.js, GraphQL, and PostgreSQL.
						I also like reading and photography.
				</div>
			</div>
			<div className="content" style={{ paddingTop: 15 }}>
				<p className="title is-4 has-text-primary">Recently Published</p>
				<PostList router={props.router} posts={props.posts}/>
			</div>
		</div>
		<Footer router={props.router}/>
	</>;

const Home = (props: StaticPropsResult) => {
	const { posts }: ParsedStaticProps = Object.keys(props.urqlState).map(key => JSON.parse(props.urqlState[key].data))[0];
	const [acceptedCookies, setAcceptedCookies] = useState<boolean>(false);
	const [{ data }] = useGetMusicQuery();
	const router = useRouter();

	useEffect(() => {
		const set = localStorage.getItem('closed-cookies-notification');
		if (set) setAcceptedCookies(true);
	}, [acceptedCookies, data]);

	// eslint-disable-next-line no-unused-vars
	const createNotifications = (notifications: NotificationState, createNotification: (_: NotificationProps) => void) => {
		const cookies = notifications.find(notif => notif.name === 'cookies');
		if (!acceptedCookies && !cookies) createNotification({ name: 'cookies', message: 'This site uses cookies to enhance user experience.', persist: true });
	};

	return (
		<NotificationContext.Consumer>
			{({ notifications, createNotification }) =>
				<div onLoad={() => createNotifications(notifications, createNotification)}>
					<Content
						router={router}
						posts={posts.sort((a, b) => b.createdAt - a.createdAt).slice(0, Math.min(posts.length, 3))}
					/>
				</div>
			}
		</NotificationContext.Consumer>
	);
};

export default Home;

export const getStaticProps = async () => {
	const cache = ssrExchange({ isClient: false });
	const client = initUrqlClient({
		url: 'https://scnewmark.cloud.libraryofcode.org/graphql',
		exchanges: [dedupExchange, cacheExchange, cache, fetchExchange],
		requestPolicy: 'network-only'
	}, false);

	await client?.query(`
        query Posts {
            posts {
                _id
                title
                description
                content
                tags
				views
                createdAt
                updatedAt
            }
        }
    `).toPromise();

	return {
		props: {
			urqlState: cache.extractData()
		},
		revalidate: 30
	};
};
