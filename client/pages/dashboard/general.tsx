import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NotificationProps } from '../../src/types';
import { NotificationContext } from '../_app';
import styles from './dashboard.module.scss';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import { DashboardTemplate } from '.';

const General = () => {
	const { result: { me } } = useAuth({ redirectTo: '/login' });
	const [bio, setBio] = useState<string>(me?.bio || '');
	const [avatar, setAvatar] = useState<string>(me?.avatar || '');
	const router = useRouter();

	useEffect(() => {
		if (me?.bio) setBio(me.bio);
		if (me?.avatar) setAvatar(me.avatar);
	}, [me, router]);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, dispatch: Dispatch<SetStateAction<string>>) => {
		dispatch(event.target.value);
	};

	// eslint-disable-next-line no-unused-vars
	const handleSubmit = (notify: (props: NotificationProps) => void) => {
		notify({ message: 'Successfully saved changes!', name: 'save-changes', persist: false, color: '#50C878' });
	};

	return (
		<DashboardTemplate name="General" router={router} data={me}>
			<div className="container" style={{ height: 600, overflow: 'scroll' }}>
				<div className={styles['textarea-custom']} style={{ paddingTop: 15 }}>
					<p className="title has-text-primary">Bio</p>
					<textarea
						className="textarea has-text-info"
						placeholder="Enter your Bio here"
						value={bio}
						onChange={(event) => handleChange(event, setBio)}></textarea>
					<br/>
					<p className="title has-text-primary">Avatar</p>
					<input
						className={`input has-text-info`}
						name="avatar"
						placeholder="Avatar"
						value={avatar}
						onChange={(event) => handleChange(event, setAvatar)}/>
					<br/><br/>
					<div className="field">
						<p className="control">
							<NotificationContext.Consumer>
								{({ createNotification }) =>
									<button className="button is-primary" onClick={() => handleSubmit(createNotification)}>Save Changes</button>
								}
							</NotificationContext.Consumer>
						</p>
					</div>
				</div>
			</div>
		</DashboardTemplate>
	);
};

export default General;
