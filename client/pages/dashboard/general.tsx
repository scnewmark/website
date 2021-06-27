import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useEditUserMutation, useMeQuery } from '@/graphql';
import { NotificationContext } from '@/src/notifications';
import { NotificationProps } from '@/src/types';
import styles from './dashboard.module.scss';
import { useRouter } from 'next/router';
import { DashboardTemplate } from '.';

const General = () => {
	const [{ data, fetching, error }] = useMeQuery({ requestPolicy: 'network-only' });
	const [, updateUser] = useEditUserMutation();
	const [bio, setBio] = useState<string>('');
	const [avatar, setAvatar] = useState<string>('');
	const router = useRouter();

	useEffect(() => {
		if (data) {
			setBio(data.me.bio);
			setAvatar(data.me.avatar);
		}
	}, [data]);

	if (fetching) return <></>;
	if (error) router.push('/login');

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, dispatch: Dispatch<SetStateAction<string>>) => {
		dispatch(event.target.value);
	};

	// eslint-disable-next-line no-unused-vars
	const handleSubmit = async (notify: (props: NotificationProps) => void) => {
		if (!data?.me._id) {
			notify({ name: `failed-to-solve`, message: `Could not detect a user ID`, color: '#FFC0CB', persist: false });
			return;
		}

		try {
			const res = await updateUser({ id: data?.me._id, avatar: avatar, bio: bio });
			if (res.data?.editUser) {
				notify({ message: 'Successfully saved changes!', name: 'save-changes', persist: false, color: '#50C878' });
			} else {
				notify({ name: `failed-to-update-user-${(Math.random() * 30) * (Math.random() * 15)}`, message: `Could not update user: ${res.error}`, color: '#FFC0CB', persist: false });
			}
		} catch (err) {
			notify({ name: `failed-to-fetch`, message: `Failed to fetch data from API`, color: '#FFC0CB', persist: false });
			return;
		}
	};

	return (
		<DashboardTemplate name="General" router={router} data={null}>
			<div className="container">
				<div className={styles['textarea-custom']}>
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
