import React from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";

interface ImageContainerProps {
  uri?: string | null;
}

export const ImageContainer: React.FC<ImageContainerProps> = ({ uri }) => {
  return (
    <View style={styles.container}>
      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No Image Selected</Text>
        </View>
      )}
    </View>
  );
};

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes the full height of the parent
    width: "100%",
  },
  image: {
    flex: 1,
    resizeMode: "cover", // Ensures the image covers the space without distortion
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  placeholderText: {
    color: "#555",
  },
});