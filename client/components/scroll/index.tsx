import { useRef, useEffect } from 'react';
import { ScrollProps } from '@/types';

const Scroll = (props: ScrollProps) => {
	const elementRef: any = useRef();
	useEffect(() => props.enabled ? elementRef.current.scrollIntoView() : null);
	return <div ref={elementRef}/>;
};

export default Scroll;
