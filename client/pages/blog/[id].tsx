import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import normalizeTitle from '../../src/utils/normalizeTitle';
import { SEO, Navbar, Particles } from '../../components';
import { initUrqlClient } from 'next-urql';
import { Post } from '../../src/types';
import router from 'next/router';
import Image from 'next/image';

type PostProps = {
    post: Post;
}

type StaticPathsResult = {
    params: {
        id: string;
    };
    locales: Array<string>;
    locale: string;
    defaultLocale: string;
}

const ViewPost = (props: PostProps) =>
	<>
		<div>
			<SEO
				openGraph={{
					title: props.post.title,
					description: props.post.description,
					site: `http://localhost:3000/blog/${normalizeTitle(props.post.title)}`,
					image: '/images/scnewmark.png',
					url: `http://localhost:3000/blog/${normalizeTitle(props.post.title)}`,
					type: 'article'
				}}
				name={`Blog • ${props.post.title}`}
				themeColor="#FBC403"
			/>
			<Navbar/>
			<Particles/>
			<div className="container" style={{ maxWidth: 900, paddingLeft: 30, paddingRight: 30, top: '10vh' }}>
				<nav className="breadcrumb" aria-label="breadcrumbs">
					<ul>
						<li><a onClick={() => router.push('/blog')}>Blog</a></li>
						<li className="is-active"><a href="#" aria-current="page">{props.post.title}</a></li>
					</ul>
				</nav>
				<div className="title is-1 has-text-primary">{props.post.title}</div>
				<div className="subtitle is-4 has-text-info">{props.post.description}</div>
				<div className="media">
					<div className="media-left">
						<figure className="image is-24x24">
							<Image src="/images/scnewmark.png" alt="Profile icon" width={48} height={48}/>
						</figure>
					</div>
					<div className="media-content">
						<p className="title is-6" style={{ paddingTop: 5, color: '#fffcec' }}>Sam Newmark
							<span style={{ color: '#FFDD03', paddingLeft: 10, paddingRight: 10 }}>/</span>
							{
								`${new Date(props.post.createdAt * 1000).toDateString()} at 
								${new Date(props.post.createdAt * 1000).getHours() % 12}:${new Date(props.post.createdAt * 1000).getMinutes()} 
								${new Date(props.post.createdAt * 1000).getHours() > 11 ? 'PM' : 'AM'}`
							}
						</p>
					</div>
				</div>
				<br/><br/>
				<div className="content" dangerouslySetInnerHTML={{ __html: props.post.content }}/>
				<div className="has-text-centered" style={{ paddingBottom: 150, paddingTop: 15 }}>
					<hr style={{ backgroundColor: '#FBC403' }}/>
					<br/><br/>
					<p>Copyright 2021 © Samuel Newmark</p>
				</div>
			</div>
		</div>
	</>;

export default ViewPost;

export const getStaticProps = async (res: StaticPathsResult) => {
	const cache = ssrExchange({ isClient: false });
	const client = initUrqlClient({
		url: 'http://localhost:8000/graphql',
		exchanges: [dedupExchange, cacheExchange, cache, fetchExchange],
		requestPolicy: 'network-only'
	}, false);

	const result = await client?.query(`
    query {
        postByTitle(title: "${res.params.id}") {
            title
            description
            content
            tags
            type
			createdAt
        }
    }
    `).toPromise();

	return {
		props: {
			post: result!.data.postByTitle
		},
		revalidate: 30
	};
};

export const getStaticPaths = async () => {
	const cache = ssrExchange({ isClient: false });
	const client = initUrqlClient({
		url: 'http://localhost:8000/graphql',
		exchanges: [dedupExchange, cacheExchange, cache, fetchExchange],
		requestPolicy: 'network-only'
	}, false);

	const result = await client?.query(`
        query Posts {
            posts {
                title
            }
        }
    `).toPromise();

	return {
		paths: result?.data?.posts.map((post: Post) => ({ params: { id: normalizeTitle(post.title) } })) || [],
		fallback: 'blocking'
	};
};
