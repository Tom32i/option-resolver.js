const meta = require('./package.json');

module.exports = (env, argv) => ({
  entry: './src/OptionResolver.js',
  output: {
    filename: meta.name,
    path: __dirname,
    library: 'OptionResolver',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  devtool: argv.mode === 'production' ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      }
    ]
  },
});
