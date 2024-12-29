const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Exclude 'svg' from assetExts and include it in sourceExts
  config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
  config.resolver.sourceExts.push("svg");

  // Use the SVG transformer
  config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

  return config;
})();
