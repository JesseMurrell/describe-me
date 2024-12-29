import React from "react";
import { View, StyleSheet, Alert, Platform } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "@/navigation/RootStackParamList";
import { HeroUploadButton } from "@/components/inputs/buttons";
import { colours } from "@/theme/colours";
import * as ExpoAds from "expo-ads-admob"; // For Ads

export function ImageSelectionScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSelectImage = async (source: "camera" | "gallery" | "file") => {
    let result;

    try {
      if (source === "camera") {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
      } else if (source === "gallery") {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
      } else {
        // For selecting from files, we use DocumentPicker (fallback for non-camera/gallery cases)
        const documentPicker = await import("expo-document-picker");
        result = await documentPicker.getDocumentAsync({
          type: "image/*",
        });

        // Make it compatible with ImagePicker result
        if (result.type === "success") {
          result = {
            canceled: false,
            assets: [{ uri: result.uri }],
          };
        } else {
          result = { canceled: true };
        }
      }

      if (!result.canceled) {
        // Show an ad before navigating to the next screen
        // try {
        //   await ExpoAds.AdMobInterstitial.setAdUnitID("YOUR_AD_UNIT_ID"); // Replace with your AdMob ad unit ID
        //   await ExpoAds.AdMobInterstitial.requestAdAsync();
        //   await ExpoAds.AdMobInterstitial.showAdAsync();
        // } catch (error) {
        //   console.error("Ad failed to show: ", error);
        // }

        navigation.navigate("ImagePicker", {
          selectedImage: result.assets[0].uri,
        });
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const showImagePickerOptions = () => {
    const options = [
      { text: "Take Photo", onPress: () => handleSelectImage("camera") },
      { text: "Select from Photos", onPress: () => handleSelectImage("gallery") },
      { text: "Choose from Files", onPress: () => handleSelectImage("file") },
      { text: "Cancel", style: "cancel" },
    ];

    if (Platform.OS === "ios") {
      Alert.alert(
        "Upload Image",
        "Choose an image source",
        options.map((opt) => ({
          text: opt.text,
          onPress: opt.onPress,
          style: opt.style,
        }))
      );
    } else {
      // For Android, we can use the same approach or a custom UI (e.g., ActionSheet)
      Alert.alert("Upload Image", "Choose an image source", options);
    }
  };

  return (
    <View style={styles.container}>
      <HeroUploadButton title="Select Image\nfor AI Description" onPress={showImagePickerOptions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.black,
    alignItems: "center",
    justifyContent: "center",
  },
});
