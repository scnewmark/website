import { AppProps } from 'next/dist/next-server/lib/router/router';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ApolloProvider } from '@apollo/client';
import client from '../src/apollo-client';
import nprogress from 'nprogress';
import '../public/globals.scss';
import Router from 'next/router';

/* FontAwesome config */
config.autoAddCss = false;
library.add(faGithub, faUser, faLock, faExclamationTriangle);

/* Progress bar */
nprogress.configure({
	showSpinner: true
});

Router.events.on('routeChangeStart', () => nprogress.start());
Router.events.on('routeChangeComplete', () => nprogress.done());

/* Next.js config */
const App = ({ Component, pageProps }: AppProps) =>
	<ApolloProvider client={client}>
		<Component {...pageProps}/>
	</ApolloProvider>
;

export default App;
