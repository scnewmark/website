import type { SEOProps } from '../../src/types';
import Head from 'next/head';

const formatPropKey = (key: string) => `og:${key.replace(/[A-Z]/g, (char: string) => `-${char.toLowerCase()}`)}`;

const SEO = (props: SEOProps) =>
	<>
		<Head>
			<title>{props.name}</title>
			<link rel="icon" href="/images/scnewmark.jpg"/>

			<meta property="og:site_name" content="Sam Newmark"/>
			{Object.keys(props.openGraph).map((key: string, idx: number) =>
				<meta key={idx} property={formatPropKey(key)} content={props.openGraph[key]}/>
			)}
			<meta name="theme-color" content={props.themeColor}/>
		</Head>
	</>
;

export default SEO;
