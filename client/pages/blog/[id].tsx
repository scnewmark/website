import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import applescript from 'highlight.js/lib/languages/applescript';
import { getCookie, setCookie, normalizeTitle } from '@/utils';
import { SEO, Navbar, Particles, Footer } from '@/components';
import { useUpdatePostViewsMutation } from '@/graphql';
import profileIcon from '@/public/images/scnewmark.jpg';
import shell from 'highlight.js/lib/languages/shell';
import { initUrqlClient } from 'next-urql';
import hljs from 'highlight.js/lib/core';
import { useEffect } from 'react';
import router from 'next/router';
import Image from 'next/image';
import { Post } from '@/types';

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

const ViewPost = (props: PostProps) => {
	const [, updateViews] = useUpdatePostViewsMutation();

	useEffect(() => {
		const key = `visisted-${props.post._id}-post`;
		const cookie = getCookie(key);

		if (!cookie) {
			updateViews({ id: props.post._id });
			setCookie({
				// 5 days
				maxAge: 1 * 60 * 60 * 24 * 5,
				key: key,
				value: 'true',
				path: '/'
			});
		}

		hljs.registerLanguage('applescript', applescript);
		hljs.registerLanguage('shell', shell);
		hljs.highlightAll();
	});

	return (
		<>
			<div>
				<SEO
					openGraph={{
						title: props.post.title,
						description: props.post.description,
						site: `http://localhost:3000/blog/${normalizeTitle(props.post.title)}`,
						image: '/images/scnewmark.jpg',
						url: `http://localhost:3000/blog/${normalizeTitle(props.post.title)}`,
						type: 'article'
					}}
					name={`Blog • ${props.post.title}`}
					themeColor="#FBC403"
				/>
				<Navbar/>
				<Particles/>
				<div className="container" style={{ maxWidth: 700, paddingLeft: 30, paddingRight: 30, top: '10vh' }}>
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
							<figure className="image is-30x30">
								<Image src={profileIcon} alt="Profile icon" width={30} height={30} className="is-rounded"/>
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
				</div>
				<br/><br/><br/>
				<Footer router={router}/>
			</div>
		</>
	);
};

export default ViewPost;

export const getStaticProps = async (res: StaticPathsResult) => {
	const cache = ssrExchange({ isClient: false });
	const client = initUrqlClient({
		url: 'https://scnewmark.cloud.libraryofcode.org/graphql',
		exchanges: [dedupExchange, cacheExchange, cache, fetchExchange],
		requestPolicy: 'network-only'
	}, false);

	const result = await client?.query(`
    query {
        postByTitle(title: "${res.params.id}") {
			_id
            title
            description
            content
            tags
            type
			createdAt
        }
    }
    `).toPromise();

	if (!result?.data) {
		return {
			notFound: true
		};
	}

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
		url: 'https://scnewmark.cloud.libraryofcode.org/graphql',
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
