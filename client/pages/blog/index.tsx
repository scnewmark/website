import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql';
import { BlogProps, Post, PostListProps, SearchResult } from '../../src/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import updateViewCount from '../../src/utils/updateViewCount';
import parseTagString from '../../src/utils/parseTagString';
import normalizeTitle from '../../src/utils/normalizeTitle';
import { SEO, Navbar, Particles } from '../../components';
import { useEffect, useState } from 'react';
import { initUrqlClient } from 'next-urql';
import styles from './blog.module.scss';
import { useRouter } from 'next/router';

const parsePosts = (props: BlogProps) => JSON.parse(props.urqlState[Object.keys(props.urqlState)?.[0]]?.data || '{}')?.posts;

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

const Blog = (props: any) => {
	const posts: Array<Post> = parsePosts(props);
	const [search, setSearch] = useState<SearchResult>({ title: '', tags: [] });
	const router = useRouter();

	return (
		<>
			<div>
				<SEO
					openGraph={{
						title: 'Blog',
						description: 'A collection of articles about various topics.',
						site: 'http://localhost:3000/blog',
						image: '/images/scnewmark.jpg',
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
                    to filter posts.
					</div>
					<div className={styles['form-container']}>
						<div className="field">
							<div className="control has-icons-right" style={{ height: 60 }}>
								<input
									className={`input has-text-info`}
									name="search"
									type="search"
									placeholder="Search by title or tags (eg. title:<title> tags:<tags...>)"
									onChange={(event) => {
										const title = event.target.value.match(/title:([\s\S]+)/)?.[1].trim() || event.target.value;
										const tags = event.target.value.match(/tags:([\s\S]+)/)?.[1].trim() || null;
										setSearch({
											tags: tags ? parseTagString(tags.replace(/title:([\s\S]+)/, '').trim()) : [],
											title: title.replace(/tags:([\s\S]+)/gi, '').replace(/tags:/gi, '').trim()
										});
									}}
								/>
								<span className="icon is-small is-right">
									<FontAwesomeIcon icon={['fas', 'search']}/>
								</span>
							</div>
						</div>
						<div className="field is-grouped is-grouped-multiline">
							{search.tags.map((tag, tidx) =>
								<div key={tidx} className="control">
									<div className="tags has-addons">
										<div className="tag is-primary">{tag}</div>
									</div>
								</div>
							)}
						</div>
					</div>
					<br/>
					{search.title !== '' || search.tags.length ?
						<div className="container">
							<div className="title is-2 has-text-primary">All Posts</div>
							<PostList router={router} posts={posts.filter(post => {
								if (search.title !== '' && search.tags.length) {
									return post.title.toLowerCase().includes(search.title.toLowerCase()) && post.tags.filter(tag => search.tags.includes(tag)).length === search.tags.length;
								} else if (search.title) {
									return post.title.toLowerCase().includes(search.title.toLowerCase());
								} else if (search.tags.length) {
									return post.tags.filter(tag => search.tags.includes(tag)).length === search.tags.length;
								}
								return false;
							})}/>
						</div> :
						<>
							<div className="container">
								<div className="title is-2 has-text-primary">Most Popular</div>
								<PostList router={router} posts={posts?.filter(post => post.title === 'ffffff')}/>
							</div>
							<br/>
							<div className="container">
								<div className="title is-2 has-text-primary">All Posts</div>
								<PostList router={router} posts={posts}/>
							</div>
						</>
					}
				</div>
				<div className="container has-text-centered" style={{ maxWidth: 900, padding: 75, paddingBottom: 100, fontSize: 18 }}>
					<hr style={{ backgroundColor: '#FBFCD4', height: 0.15 }}/>
					<div className="content">
						<br/>
						<p className="content">Copyright 2021 © Sam Newmark</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Blog;

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
