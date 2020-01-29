module.exports = ({ config, mode }) => {
  config.module.rules = [
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
          }
        },
        {
          loader: require.resolve('react-docgen-typescript-loader')
        },
      ]
    },
    {
      test: /\.(css|sass|scss)$/,
      use: [
        {
          loader: "style-loader" // creates style nodes from JS strings
        },
        {
          loader: "css-loader" // translates CSS into CommonJS
        },
        {
          loader: "sass-loader" // compiles Sass to CSS
        }
      ]
    },
    {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
    },
    {
      test: /\.(png)$/,
      loader: 'url-loader'
    }
  ];
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
