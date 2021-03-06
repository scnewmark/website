import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { initUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { SEO } from '@/components';
import { useEffect } from 'react';
import { URL } from '@/types';

type StaticPathsResult = {
    params: {
        id: string;
    };
    locales: Array<string>;
    locale: string;
    defaultLocale: string;
}

type RedirectProps = {
    url: URL;
}

const Redirect = (props: RedirectProps) => {
	const router = useRouter();

	useEffect(() => {
		router.push(props.url.dest);
	});

	return (
		<>
			<div>
				<SEO
					openGraph={{
						title: props.url.key,
						description: `Redirects to ${props.url.dest}`,
						site: props.url.dest,
						image: '/images/scnewmark.jpg',
						url: props.url.dest,
						type: 'article'
					}}
					keywords={`redirect, ${props.url.key}`}
					description={`Redirects to ${props.url.dest}`}
					name={`scnewmark • ${props.url.key}`}
					themeColor="#FBC403"
				/>
			</div>
		</>
	);
};

export default Redirect;

export const getStaticProps = async (res: StaticPathsResult) => {
	const cache = ssrExchange({ isClient: false });
	const client = initUrqlClient({
		url: 'https://scnewmark.cloud.libraryofcode.org/graphql',
		exchanges: [dedupExchange, cacheExchange, cache, fetchExchange],
		requestPolicy: 'network-only'
	}, false);

	const result = await client?.query(`
    query {
        url(key: "${res.params.id}") {
            key
            dest
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
			url: result!.data.url
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
        query URLs {
            urls {
                key
            }
        }
    `).toPromise();

	return {
		paths: result?.data?.urls.map((url: URL) => ({ params: { id: url.key } })) || [],
		fallback: 'blocking'
	};
};
