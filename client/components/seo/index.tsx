import type { SEOProps } from '@/types';
import Head from 'next/head';

const formatPropKey = (key: string) => `og:${key.replace(/[A-Z]/g, (char: string) => `-${char.toLowerCase()}`)}`;

const SEO = (props: SEOProps) =>
	<>
		<Head>
			<title>{props.name}</title>
			<link rel="icon" href="/images/favicon.png"/>
			<meta name="description" content={props.description}/>
			<meta name="keywords" content={props.keywords}/>
			<meta name="author" content="Sam Newmark"/>

			<meta property="og:site_name" content="Sam Newmark"/>
			{Object.keys(props.openGraph).map((key: string, idx: number) =>
				<meta key={idx} property={formatPropKey(key)} content={props.openGraph[key]}/>
			)}
			<meta name="theme-color" content={props.themeColor}/>
		</Head>
	</>
;

export default SEO;
