export default ({ config }) => {
  const environment = process.env.ENVIRONMENT || "prod";

  const BACKEND_URL =
    environment === "prod"
      ? "https://e222d6oyll.execute-api.eu-west-2.amazonaws.com"
      : process.env.NGROK_URL || "http://localhost:5001";

  const ADMOB_INTERSTITIAL_AD_UNIT_ID =
    environment === "prod"
      ? "ca-app-pub-9777815065538075/4212536773"
      : "ca-app-pub-3940256099942544/1033173712"; // Test Ad Unit for development

  return {
    ...config,
    owner: "jessekmurrell",
    name: "DescribeMe",
    slug: "DescribeMe",
    version: "1.1.0",
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
    plugins: [
      "expo-router",
      [
        "react-native-google-mobile-ads",
        {
          androidAppID: "ca-app-pub-9777815065538075~7968218457", // replace once android created
          iosAppId: "ca-app-pub-9777815065538075~7968218457",
        },
      ],
    ],
    splash: {
      image: "./src/assets/describe-me-app-logo-splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      buildNumber: "2",
      bundleIdentifier: "com.jessekmurrell.describeme",
      supportsTablet: false,
      infoPlist: {
        ...config.ios?.infoPlist,
        GADApplicationIdentifier: "ca-app-pub-9777815065538075~1234567890", // iOS App ID for AdMob
        ITSAppUsesNonExemptEncryption: false, // No non-exempt encryption used
      },
    },
    android: {
      package: "com.jessekmurrell.describeme",
      adaptiveIcon: {
        foregroundImage: "./src/assets/describe-me-app-logo.png",
        backgroundColor: "#ffffff",
      },
      googleMobileAdsAppId: "ca-app-pub-9777815065538075~1234567890", // Android App ID for AdMob
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
      ADMOB_INTERSTITIAL_AD_UNIT_ID,
    },
  };
};