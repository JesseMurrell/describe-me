import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export const DescriptionOutputScreen = ({ route }: any) => {
  const { image, caption } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  caption: {
    fontSize: 18,
    textAlign: "center",
  },
});
