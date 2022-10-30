const { UnitlessPlugin } = require('@unitless-io/loader');

module.exports = function override(config, env) {
  //do stuff with the webpack config...

  if (!config.module) {
    config.module = {};
  }

  if (!config.module.rules) {
    config.module.rules = [];
  }

  config.module.rules.push({
    test: /\.ts$/,
    use: [
      {
        loader: '@unitless-io/loader',
      },
    ],
  });

  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(new UnitlessPlugin());

  return config;
};
