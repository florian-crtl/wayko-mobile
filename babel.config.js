module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'nativewind/babel'],
    // Temporarily disabled for EAS Build compatibility
    // plugins: [
    //   'react-native-reanimated/plugin', // Must be last plugin
    // ],
  };
}; 