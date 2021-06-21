import type { CardProps } from '../../src/types';
import Image from 'next/image';

const Card = (props: CardProps) =>
	<div className="card has-text-centered" style={{ marginTop: '20vh' }}>
		<div style={{ padding: 25, paddingBottom: 3 }} className="card-image">
			{props.image ? <Image src={props.image} alt={props.alt} width={128} height={128}/> : <></>}
		</div>
		<div className="card-content">
			{props.children}
		</div>
	</div>
;

export default Card;
