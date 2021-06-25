import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import normalizeTitle from '../../src/utils/normalizeTitle';
import { SEO, Navbar, Particles } from '../../components';
import { NextRouter, useRouter } from 'next/router';
import { BlogProps, Post } from '../../src/types';
import { initUrqlClient } from 'next-urql';
import styles from './blog.module.scss';
import { useEffect } from 'react';
import updateViewCount from '../../src/utils/updateViewCount';

const parsePosts = (props: BlogProps) => JSON.parse(props.urqlState[Object.keys(props.urqlState)?.[0]]?.data || '{}')?.posts;

type PostListProps = {
    posts: Array<Post>;
    router: NextRouter;
}

const PostList = (props: PostListProps) => {
	useEffect(() => updateViewCount());

	return (
		<>
			{props.posts?.length > 0 ? props.posts.sort((a, b) => b.updatedAt! - a.updatedAt!).map((post, idx) =>
				<div className={styles['clickable-div']} key={idx} onClick={() => props.router.push(`/blog/${normalizeTitle(post.title)}`)}>
					<div className="card-content">
						<div className="columns">
							<div className="column is-three-quarters">
								<p className="title is-5 has-text-info">{post.title}</p>
							</div>
							<div className="column">
								<p className="view-count has-text-danger has-text-weight-light has-text-right">0 views</p>
							</div>
						</div>
						<p className="subtitle is-6 has-text-weight-light">{post.description}</p>
						<div className="field is-grouped is-grouped-multiline">
							{post.tags?.map((tag, tidx) =>
								<div key={tidx} className="control">
									<div className="tags has-addons">
										<div className="tag is-primary">{tag}</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			) :
				<div className="card-content">
					<p className="title is-5 has-text-info">Nothing here yet.</p>
				</div>
			}
		</>
	);
};

// eslint-disable-next-line arrow-body-style
const Blog = (props: any) => {
	const router = useRouter();
	const posts: Array<Post> = parsePosts(props);

	return (
		<>
			<div>
				<SEO
					openGraph={{
						title: 'Blog',
						description: 'A collection of articles about various topics.',
						site: 'http://localhost:3000/blog',
						image: '/images/scnewmark.png',
						url: 'http://localhost:3000/blog',
						type: 'article'
					}}
					name="scnewmark • Blog"
					themeColor="#FBC403"
				/>
				<Navbar/>
				<Particles/>
				<div className="container" style={{ maxWidth: 700, paddingLeft: 30, paddingRight: 30, marginTop: '10vh' }}>
					<div className="title has-text-primary" style={{ fontSize: 62 }}>Blog</div>
					<div className="subtitle is-6 has-text-info" style={{ paddingTop: 10 }}>
                    This is where I write about various technology topics. In total,
                    I&apos;ve written {posts ? `${posts.length} article${posts.length === 0 ? 's' : posts.length > 1 ? 's' : ''}` : '0 articles'} on this site. Use the search below
                    to filter by title.
					</div>
					<div className={styles['form-container']}>
						<div className="field">
							<div className="control has-icons-right" style={{ height: 60 }}>
								<input
									className={`input has-text-info`}
									name="search"
									type="search"
									placeholder="Search articles"
								/>
								<span className="icon is-small is-right">
									<FontAwesomeIcon icon={['fas', 'search']}/>
								</span>
							</div>
						</div>
					</div>
					<br/>
					<div className="container">
						<div className="title is-2 has-text-primary">Most Popular</div>
						<PostList router={router} posts={posts?.filter(post => post.title === 'ffffff')}/>
					</div>
					<br/>
					<div className="container">
						<div className="title is-2 has-text-primary">All Posts</div>
						<PostList router={router} posts={posts}/>
					</div>
				</div>
				{/* <div className="container has-text-centered" style={{ maxWidth: 900, padding: 75, paddingBottom: 100, fontSize: 18 }}>
					<hr style={{ backgroundColor: '#FBFCD4', height: 0.15 }}/>
					<div className="content">
						<br/>
						<p className="content">Copyright 2021 © Sam Newmark</p>
					</div>
				</div> */}
			</div>
		</>
	);
};

export default Blog;

export const getStaticProps = async () => {
	const cache = ssrExchange({ isClient: false });
	const client = initUrqlClient({
		url: 'http://localhost:8000/graphql',
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
