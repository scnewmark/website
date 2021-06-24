import { NavbarProps } from '../../src/types';
import styles from './navbar.module.scss';
import { Link } from '..';

const Navbar = (props: NavbarProps) =>
	<section>
		<nav className={`navbar is-transparent ${styles['custom-nav']}`}>
			<div className="navbar-brand">
				<div className="navbar-burger" data-target="navbar">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>

			<div id="navbar" className="navbar-menu">
				<div className="navbar-end">
					<Link name="Home" to="/" classes="navbar-item"/>
					<Link name="Blog" to="/blog" classes="navbar-item"/>
					<div className="navbar-item has-dropdown is-hoverable">
						<Link name="Projects" to="/projects" classes="navbar-link"/>
						<div className="navbar-dropdown is-boxed">
							<Link name="Chess AI" to="/projects/chess-ai" classes="navbar-item"/>
						</div>
					</div>
					<Link name="Contact" to="/contact" classes="navbar-item"/>
					<div className="navbar-item has-dropdown is-hoverable">
						<Link name="Dashboard" to="/login" classes="navbar-link"/>
						<div className="navbar-dropdown is-boxed">
							<Link name={props.authed ? 'Logout' : 'Login'} to={props.authed ? '/logout' : '/login'} classes="navbar-item"/>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</section>;

export default Navbar;
