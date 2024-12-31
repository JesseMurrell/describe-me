export default ({ config }) => {
  return {
    ...config,
    owner: "jessekmurrell",
    name: "DescribeMe",
    slug: "DescribeMe",
    version: "1.0.0",
    sdkVersion: "52.0.0",
    platforms: ["ios", "android"],
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    assetBundlePatterns: ["**/*"],
    updates: {
      url: "https://u.expo.dev/f950506a-c33c-49f0-a302-444c03361f82",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    splash: {
      image: "./src/assets/describe-me-app-logo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      bundleIdentifier: "com.jessekmurrell.describeme", // <-- key fix here
      supportsTablet: true,
    },
    android: {
      package: "com.jessekmurrell.describeme",
      adaptiveIcon: {
        foregroundImage: "./src/assets/describe-me-app-logo.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./src/assets/describe-me-app-logo.png",
    },
    extra: {
      eas: {
        projectId: "f950506a-c33c-49f0-a302-444c03361f82",
      },
      ngrokUrl: process.env.NGROK_URL || "http://localhost:5001",
      BACKEND_URL:
        process.env.ENVIRONMENT === 'prod'
          ? 'https://e222d6oyll.execute-api.eu-west-2.amazonaws.com'
          : process.env.NGROK_URL || 'http://localhost:5001',
    },
  };
};