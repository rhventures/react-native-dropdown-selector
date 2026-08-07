const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const escape = require('escape-string-regexp');
const componentPackages = require('../package.json');

const componentPath = path.resolve(__dirname, '..');

const componentDeps = Object.keys({
  ...componentPackages.peerDependencies,
});

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  projectRoot: __dirname,
  watchFolders: [componentPath],

  resolver: {
    blockList: componentDeps
      .map(
        (m) =>
          new RegExp(`^${escape(path.join(componentPath, 'node_modules', m))}[\\/\\\\].*$`),
      )

      .concat(defaultConfig.resolver.blockList || []),

    extraNodeModules: componentDeps.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
  },
};

module.exports = mergeConfig(defaultConfig, config);