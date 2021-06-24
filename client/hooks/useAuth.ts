import { AuthProps, UseAuthResult } from '../src/types';
import { me } from '../src/graphql/queries';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const useAuth = (props: AuthProps = {}): UseAuthResult => {
	const { data, loading, error } = useQuery(me);
	const [err, setErr] = useState<string>('');
	const router = useRouter();

	const result = {
		...data
	};

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

	return { result: result, error: err };
};

export default useAuth;
