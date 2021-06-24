import { UseRequestProps } from '../src/types';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

const useRequest = (props: UseRequestProps) => {
	const { data, loading, error } = useQuery(props.query, { fetchPolicy: 'no-cache' });
	const [err, setErr] = useState<string>('');

	useEffect(() => {
		if (loading) return;

		if (error?.message === 'Failed to fetch') {
			setErr('Failed to fetch data from API');
			return;
		}
	}, [data, loading, error]);

	return { data: data, error: err };
};

export default useRequest;
