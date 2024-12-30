export default ({ config }) => {
  return {
    ...config,
    name: "DescribeMe",
    slug: "DescribeMe",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/icon.png", // Updated path
    userInterfaceStyle: "light",
    newArchEnabled: true,
    assetBundlePatterns: ["**/*"],
    splash: {
      image: "./src/assets/splash-icon.png", // Updated path
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/adaptive-icon.png", // Updated path
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./src/assets/favicon.png", // Updated path
    },
    extra: {
      ngrokUrl: process.env.NGROK_URL || "http://localhost:5001",
      BACKEND_URL:
      process.env.ENVIRONMENT === 'prod'
        ? 'https://e222d6oyll.execute-api.eu-west-2.amazonaws.com'
        : process.env.NGROK_URL || 'http://localhost:5001',
    },
  };
};