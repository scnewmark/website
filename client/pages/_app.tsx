import { AppProps } from 'next/dist/next-server/lib/router/router';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import nprogress from '../public/js/nprogress';
import '../public/nprogress.css';
import '../public/globals.scss';
import Router from 'next/router';

/* FontAwesome config */
config.autoAddCss = false;
library.add(faGithub);

/* Progress bar */
nprogress.configure({
	showSpinner: true
});

Router.events.on('routeChangeStart', () => nprogress.start());
Router.events.on('routeChangeComplete', () => nprogress.done());

/* Next.js config */
const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps}/>;

export default App;
