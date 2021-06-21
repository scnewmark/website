import { NextRouter, useRouter } from 'next/router';
import { LinkProps } from '../../src/types';

const changePage = (router: NextRouter, path: string) => router.push(path);

const Link = (props: LinkProps) => {
	const router = useRouter();

	return (
		<>
			<a className={props.classes} onClick={() => changePage(router, props.to)}>{props.name}</a>
		</>
	);
};

export default Link;
