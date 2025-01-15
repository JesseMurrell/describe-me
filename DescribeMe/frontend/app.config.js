export default ({ config }) => {

  const environment = process.env.ENVIRONMENT || 'prod';

  const BACKEND_URL =
    environment === 'prod'
      ? 'https://e222d6oyll.execute-api.eu-west-2.amazonaws.com'
      : (process.env.NGROK_URL || 'http://localhost:5001');

  return {
    ...config,
    owner: "jessekmurrell",
    name: "DescribeMe",
    slug: "DescribeMe",
    version: "1.0.0",
    sdkVersion: "52.0.0",
    platforms: ["ios", "android"],
    orientation: "portrait",
    icon: "./src/assets/describe-me-app-logo.png",
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
      image: "./src/assets/describe-me-app-logo-splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      buildNumber: "4",
      bundleIdentifier: "com.jessekmurrell.describeme",
      supportsTablet: false,
      infoPlist: {
        ...config.ios?.infoPlist,
        NSCameraUsageDescription: "DescribeMe uses the camera to take photos for generating AI-powered captions. For example, take a photo of a dog, and get a caption like 'Paws-itively adorable!'",
        NSPhotoLibraryUsageDescription: "DescribeMe accesses your photo library to select images for generating AI-powered captions. For example, choose a picture of coffee, and get a caption like 'Mood: Espresso yourself.'",
        ITSAppUsesNonExemptEncryption: false, // No non-exempt encryption used
      },
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
      environment,
      BACKEND_URL,
    },
  };
};