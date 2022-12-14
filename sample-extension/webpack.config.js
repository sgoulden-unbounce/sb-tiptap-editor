const path = require('path');

module.exports = (env) => ({
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  mode: env.production ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(js?|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      config: path.resolve(__dirname, './config'),
      'smart-builder-components': path.resolve(__dirname, './config/global-dependencies/smart-builder-components'),
      'ub-shared': path.resolve(__dirname, './config/global-dependencies/ub-shared'),
    },
  },
  externals: {
    react: 'react',
    'react-dom': 'reactDom',
    'styled-components': 'styled',
    'smart-builder-sdk': 'smartBuilderSdk',
  },
});
