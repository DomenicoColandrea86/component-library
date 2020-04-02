const images = require('@rollup/plugin-image');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');

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
			})
		);
		return config;
	},
};
