// src/utils/permissions.ts

import { Alert, Linking, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const openAppSettings = () => {
  const settingsURL = Platform.OS === "ios" ? "app-settings:" : `package:${Platform.constants?.AndroidPackage}`;
  Linking.openURL(settingsURL).catch(() => {
    Alert.alert(
      "Unable to Open Settings",
      "Please open the settings manually and enable the required permissions for this app."
    );
  });
};

export const requestPermission = async (type: "camera" | "photoLibrary") => {
  try {
    if (type === "camera") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        showPermissionAlert("camera");
        return false;
      }
      return true;
    } else if (type === "photoLibrary") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        showPermissionAlert("photo library");
        return false;
      }
      return true;
    }
  } catch (error) {
    console.error(`[requestPermission] Error requesting ${type} permission:`, error);
    return false;
  }
};

const showPermissionAlert = (type: "camera" | "photo library") => {
  Alert.alert(
    `${capitalize(type)} Permission Required`,
    `We need access to your ${type} to ${
      type === "camera" ? "take photos" : "select images"
    }. Please enable permissions in the app settings.`,
    [
      { text: "Cancel", style: "cancel" },
      { text: "Open Settings", onPress: openAppSettings },
    ]
  );
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);