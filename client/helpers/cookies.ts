import type { Cookie, CookieProps } from '../src/types';

const setCookie = (props: CookieProps) => {
	let cookie = `${props.key}=${props.value};`;
	if (props.maxAge) cookie += `max-age=${props.maxAge};`;
	if (props.path) cookie += `path=${props.path};`;

	document.cookie = cookie;
};

const getCookie = (name: string): Cookie => {
	const { cookie: cookies } = document;
	for (const cookie of cookies.split(';')) {
		const [key, value] = cookie.split('=').map(el => el.trim());
		if (key === name) {
			return {
				key: key,
				value: value
			};
		}
	}
	return null;
};

export {
	setCookie,
	getCookie
};
