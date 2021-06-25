/* eslint-disable no-process-env */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
	webpackDevMiddleware: config => {
		config.watchOptions = {
			poll: 500,
			aggregateTimeout: 300
		};

		return config;
	},
	webpack: (config) => {
		Object.assign(config.resolve.alias, {
			react: 'preact/compat',
			'react-dom/test-utils': 'preact/test-utils',
			'react-dom': 'preact/compat'
		});

		return config;
	}
});
