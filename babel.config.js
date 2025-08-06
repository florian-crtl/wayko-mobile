module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'nativewind/babel'
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            components: './src/components',
            screens: './src/screens',
            hooks: './src/hooks',
            utils: './src/utils',
            services: './src/services',
            types: './src/types',
            constants: './src/constants',
            assets: './assets',
            context: './src/context',
            navigation: './src/navigation'
          },
        },
      ],
      'react-native-reanimated/plugin' // Must be last plugin
    ],
  };
}; 