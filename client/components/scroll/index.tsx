import { ScrollProps } from '../../src/types';
import { useRef, useEffect } from 'react';

const Scroll = (props: ScrollProps) => {
	const elementRef: any = useRef();
	useEffect(() => props.enabled ? elementRef.current.scrollIntoView() : null);
	return <div ref={elementRef}/>;
};

export default Scroll;
