const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/web.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.web.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      buffer: require.resolve('buffer/'),
    },
  },
  output: {
    filename: 'web.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
