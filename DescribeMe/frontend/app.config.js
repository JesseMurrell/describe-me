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
    },
  };
};