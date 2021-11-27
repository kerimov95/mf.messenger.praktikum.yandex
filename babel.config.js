module.exports = (api) => {
  // Cache configuration is a required option
  api.cache(false);

  const presets = [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ];
  const plugins = ['@babel/plugin-proposal-class-properties',
    ['babel-plugin-webpack-alias', {'config': './webpack.common.js'}]];

  return {presets, plugins};
};
