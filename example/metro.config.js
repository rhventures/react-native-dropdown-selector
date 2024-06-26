const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const escape = require('escape-string-regexp');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const componentPackages = require('../package.json');

const componentPath = path.resolve(__dirname, '..');

const componentDeps = Object.keys({
  ...componentPackages.peerDependencies,
});

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  projectRoot: __dirname,
  watchFolders: [componentPath],

  resolver: {
    blacklistRE: exclusionList(
      componentDeps.map(
        (m) =>
          new RegExp(`^${escape(path.join(componentPath, 'node_modules', m))}\\/.*$`),
      ),
    ),

    extraNodeModules: componentDeps.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);