module.exports = {
	title: 'Component-library',
	tagline: 'UI component library and storybook for Real Capital Analytics',
	url: 'https://your-docusaurus-test-site.com',
	baseUrl: '/',
	favicon: 'img/favicon.ico',
	organizationName: 'Real-Capital',
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
				{ to: 'docs/doc1', label: 'Docs', position: 'left' },
				{
					href: 'https://engineering.rcanalytics.io:8443/',
					label: 'Blog',
					position: 'left',
				},
				{
					href: 'https://github.com/Real-Capital/component-library',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'light',
			links: [
				{
					title: 'Docs',
					items: [
						{
							label: 'Style Guide',
							to: 'docs/doc1',
						},
						{
							label: 'API',
							to: 'docs/doc2',
						},
					],
				},
				{
					title: 'Social',
					items: [
						{
							label: 'Blog',
							href: 'https://engineering.rcanalytics.io:8443/',
						},
						{
							label: 'Open Source',
							href: 'https://github.com/Real-Capital',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
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
