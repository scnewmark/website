import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { me } from '../src/graphql/queries';
import { AuthProps } from '../src/types';

const useAuth = (props: AuthProps = {}) => {
	const { data, loading, error } = useQuery(me);
	const [err, setErr] = useState<string>('');
	const router = useRouter();

	useEffect(() => {
		if (loading) return;

		if (error?.message === 'Failed to fetch') {
			setErr('Failed to fetch data from API');
			return;
		}

		if ((props.redirectTo && error?.message && !props.redirectIfFound) || (data && props.redirectIfFound && props.redirectTo)) {
			router.push(props.redirectTo);
			return;
		}
	}, [data, loading, error, props.redirectTo, props.redirectIfFound, router]);

	return { data: data, error: err };
};

export default useAuth;
