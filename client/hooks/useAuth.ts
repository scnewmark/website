import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { me } from '../src/graphql/queries';

const useAuth = ({ redirectTo = '', redirectIfFound = false } = {}) => {
	const { data, loading, error } = useQuery(me);
	const router = useRouter();

	useEffect(() => {
		if (loading) return;

		if ((redirectTo && error?.message && !redirectIfFound) || (data && redirectIfFound)) {
			router.push(redirectTo);
			return;
		}
	}, [data, loading, error, redirectTo, redirectIfFound, router]);

	return { user: data };
};

export default useAuth;
