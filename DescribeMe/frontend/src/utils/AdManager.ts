import { AdMobInterstitial } from "expo-ads-admob";

export class AdManager {
  static async showInterstitialAd(onAdDismiss?: () => void) {
    try {
      AdMobInterstitial.setAdUnitID("YOUR_AD_UNIT_ID"); // Replace with your AdMob unit ID
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
      await AdMobInterstitial.showAdAsync();

      if (onAdDismiss) {
        AdMobInterstitial.addEventListener("interstitialDidDismiss", onAdDismiss);
      }
    } catch (error) {
      console.error("Ad failed to load or show:", error);
      if (onAdDismiss) {
        onAdDismiss(); // Proceed even if the ad fails
      }
    }
  }
}
