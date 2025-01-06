import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-9777815065538075/4212536773';

class AdManager {
  static showInterstitialAd(onAdDismiss?: () => void) {
    const interstitialAd = InterstitialAd.createForAdRequest(adUnitId);

    interstitialAd.onAdEvent((type, error) => {
      if (type === AdEventType.LOADED) {
        interstitialAd.show();
      } else if (type === AdEventType.CLOSED) {
        if (onAdDismiss) {
          onAdDismiss();
        }
      } else if (type === AdEventType.ERROR) {
        console.error('Ad failed to load:', error);
        if (onAdDismiss) {
          onAdDismiss();
        }
      }
    });

    interstitialAd.load();
  }
}

export default AdManager;