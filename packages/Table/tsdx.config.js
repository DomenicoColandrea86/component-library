const images = require('@rollup/plugin-image');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const copy = require('rollup-plugin-copy');

module.exports = {
	rollup(config, options) {
		config.plugins.push(
			images({ include: ['**/*.png', '**/*.jpg'] }),
			postcss({
				extract: './styles.css',
				plugins: [autoprefixer()],
				modules: false,
				use: ['sass'],
				inject: true,
			}),
			copy({
				targets: [{ src: 'src/Table.scss', dest: 'dist' }],
			})
		);
		return config;
	},
};
