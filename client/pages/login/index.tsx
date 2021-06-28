import { FieldProps, InputField, NotificationProps } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction, useState } from 'react';
import { NotificationContext } from '@/src/notifications';
import { useLoginMutation, useMeQuery } from '@/graphql';
import { SEO, Navbar, Particles } from '@/components';
import styles from './login.module.scss';
import { useRouter } from 'next/router';

const Field = (props: FieldProps) =>
	<div className="field">
		<div className="control has-icons-left has-icons-right" style={{ height: 60 }}>
			{props.children}
			<span className="icon is-small is-left">
				<FontAwesomeIcon icon={props.leftIcon}/>
			</span>
			<span className="icon is-small is-right">
				<FontAwesomeIcon
					id={`${props.name}-error-icon`}
					icon={props.rightIcon}
					className={styles['form-error-icon']}
					style={{ display: props.field.error?.length > 0 ? 'block' : 'none' }}/>
			</span>
			<p
				id={`${props.name}-error-text`}
				className="help is-danger"
			>{props.field.error}</p>
		</div>
	</div>;

const Login = () => {
	const [username, setUsername] = useState<InputField>({ value: '', error: '' });
	const [password, setPassword] = useState<InputField>({ value: '', error: '' });
	const [loading, setLoading] = useState<boolean>(false);
	const [, login] = useLoginMutation();
	const router = useRouter();
	const [{ data, fetching }] = useMeQuery({ requestPolicy: 'network-only' });

	if (fetching) return <></>;
	if (data) router.push('/dashboard');

	const handleChange = (event: any, dispatch: Dispatch<SetStateAction<InputField>>) => {
		let error: string = '';
		if (event.target.value.length < 1) {
			error = 'This field is required';
		}

		dispatch({
			error: error,
			value: event.target.value
		});
	};

	// eslint-disable-next-line no-unused-vars
	const handleSubmit = async (notify: (props: NotificationProps) => void) => {
		setLoading(true);
		const res = await login({ username: username.value, password: password.value });
		setLoading(false);

		if (res.data) {
			router.push('/dashboard');
		} else if (res.error) {
			if (res.error.message === '[Network] Failed to fetch') {
				notify({ name: 'login-fetch-failed', message: 'Failed to fetch data from API', color: '#FFC0CB', persist: false });
				return;
			}

			setUsername({ ...username, error: 'Invaid username and/or password' });
			setPassword({ ...password, error: 'Invalid username and/or password' });
		}
	};

	return (
		<>
			<div>
				<SEO
					openGraph={{
						title: 'Login',
						description: 'Dashboard',
						site: 'https://scnewmark.vercel.app/login',
						image: '/images/scnewmark.jpg',
						url: 'https://scnewmark.vercel.app/login',
						type: 'article'
					}}
					description=""
					keywords=""
					name="scnewmark • Login"
					themeColor="#FBC403"
				/>
				<Navbar/>
				<div className={`container ${styles['form-container']}`}>
					<div className="card" style={{ padding: 25, paddingTop: 10 }}>
						<div className="card-content has-text-centered">
							<p className="title has-text-primary">Login</p>
						</div>
						<Field name="username" leftIcon={['fas', 'user']} rightIcon={['fas', 'exclamation-triangle']} field={username}>
							<input
								className={`input has-text-info ${username.error?.length > 1 ? 'is-danger' : ''}`}
								name="username"
								type="username"
								placeholder="Username"
								onChange={(event: any) => handleChange(event, setUsername)}
							/>
						</Field>
						<Field name="password" leftIcon={['fas', 'lock']} rightIcon={['fas', 'exclamation-triangle']} field={password}>
							<input
								className={`input has-text-info ${password.error?.length > 1 ? 'is-danger' : ''}`}
								name="password"
								type="password"
								placeholder="Password"
								onChange={(event: any) => handleChange(event, setPassword)}
							/>
						</Field>
						<div className="field">
							<p className="control">
								<NotificationContext.Consumer>
									{({ createNotification }) =>
										<button className={`button is-primary ${loading ? 'is-loading' : ''}`} onClick={() => handleSubmit(createNotification)}>Login</button>
									}
								</NotificationContext.Consumer>
							</p>
						</div>
					</div>
				</div>
				<Particles/>
			</div>
		</>
	);
};

export default Login;
