import React from "react";
import { View, StyleSheet, Alert, Platform } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "@/navigation/RootStackParamList";
import { HeroUploadButton } from "@/components/inputs/buttons";
import { colours } from "@/theme/colours";

export function ImageSelectionScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSelectImage = async (source: "camera" | "gallery" | "file") => {
    let result;

    try {
      if (source === "camera") {
        // Request camera permission
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== "granted") {
          Alert.alert(
            "Permission Required",
            "Camera permission is required to take a photo.",
            [{ text: "OK" }]
          );
          return;
        }

        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
      } else if (source === "gallery") {
        // Request media library permission
        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaStatus !== "granted") {
          Alert.alert(
            "Permission Required",
            "Media library permission is required to select a photo.",
            [{ text: "OK" }]
          );
          return;
        }

        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
      } else {
        // Document picker for files
        const documentPicker = await import("expo-document-picker");
        result = await documentPicker.getDocumentAsync({
          type: "image/*",
        });

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

    Alert.alert(
      "Upload Image",
      "Choose an image source",
      options.map((opt) => ({
        text: opt.text,
        onPress: opt.onPress,
        style: opt.style,
      }))
    );
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