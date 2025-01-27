module.exports = async ({ config }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    };

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  };
