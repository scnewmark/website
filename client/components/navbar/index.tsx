import styles from './navbar.module.scss';
import { Link } from '..';

const Navbar = () =>
	<section>
		<nav className={`navbar is-fixed-top is-transparent ${styles['custom-nav']}`}>
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
					<Link name="Portfolio" to="/portfolio" classes="navbar-item"/>
					<Link name="Contact" to="/contact" classes="navbar-item"/>
					<Link name="Dashboard" to="/login" classes="navbar-item"/>
				</div>
			</div>
		</nav>
		<br/>
	</section>;

export default Navbar;
