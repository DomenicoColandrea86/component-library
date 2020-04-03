module.exports = {
	title: 'Component-library',
	tagline: 'UI component library and storybook for Real Capital Analytics',
	url: 'https://your-docusaurus-test-site.com',
	baseUrl: '/',
	favicon: 'img/favicon.ico',
	organizationName: 'Real Capital Analytics',
	projectName: 'component-library',
	themeConfig: {
		disableDarkMode: true,
		navbar: {
			title: 'component-library',
			logo: {
				alt: 'My Site Logo',
				src: 'img/logo.svg',
			},
			links: [
				{ to: 'docs/table', label: 'Docs', position: 'left' },
				{
					href: 'https://engineering.rcanalytics.io:8443/',
					label: 'Blog',
					position: 'left',
				},
				{
					href: 'https://github.com/rcanalytics/component-library',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'light',
			copyright: `Copyright © ${new Date().getFullYear()} Real Capital Analytics.`,
		},
	},
	presets: [
		[
			'@docusaurus/preset-classic',
			{
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl:
						'https://github.com/facebook/docusaurus/edit/master/website/',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			},
		],
	],
};
