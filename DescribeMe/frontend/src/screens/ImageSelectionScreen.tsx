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
      console.log(`[handleSelectImage] Source: ${source}`);
      
      if (source === "camera") {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        console.log(`[handleSelectImage] Camera Permission Status: ${cameraStatus}`);
        
        // If not granted, bail out
        if (cameraStatus !== "granted") {
          Alert.alert("Permission Required", "Camera permission is required to take a photo.");
          return;
        }
  
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.5, // compress to half to avoid large file issues
        });
        console.log(`[handleSelectImage] Camera result: ${JSON.stringify(result)}`);
      } 
      else if (source === "gallery") {
        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log(`[handleSelectImage] Gallery Permission Status: ${mediaStatus}`);
  
        if (mediaStatus !== "granted") {
          Alert.alert("Permission Required", "Media library permission is required to select a photo.");
          return;
        }
  
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
        console.log(`[handleSelectImage] Gallery result: ${JSON.stringify(result)}`);
      } 
      else {
        const documentPicker = await import("expo-document-picker");
        result = await documentPicker.getDocumentAsync({
          type: "image/*",
        });
        console.log(`[handleSelectImage] Document Picker result: ${JSON.stringify(result)}`);
  
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
        console.log(`[handleSelectImage] Navigating to ImagePicker with URI: ${result.assets[0].uri}`);
        navigation.navigate("ImagePicker", {
          selectedImage: result.assets[0].uri,
        });
      }
    } catch (error) {
      console.error("[handleSelectImage] Error selecting image:", error);
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