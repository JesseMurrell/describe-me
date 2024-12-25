import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ImageOptionsContainer } from "@/components/ImageOptionsContainer";
import { SingleSelectCarousel } from "@/components/SingleSelectCarousel";
import { colours } from "@/theme/colours";
import { SubmitButton } from "@/components/SubmitButton";

// TypeScript imports for navigation
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "@/navigation/RootStackParamList";

type DescriptionInputScreenRouteProp = RouteProp<RootStackParamList, "ImagePicker">;

export function DescriptionInputScreen() {
  const navigation = useNavigation();
  const route = useRoute<DescriptionInputScreenRouteProp>();
  const selectedImageUri = route.params?.selectedImage || null;

  const [selectedGeneration, setSelectedGeneration] = useState<string>("Gen-Z");
  const [selectedTone, setSelectedTone] = useState<string>("Savage");

  const generationList = ["Gen-Alpha", "Gen-Z", "Millennial", "Gen-X", "Boomer"];
  const toneList = ["Savage", "Wholesome", "Funny", "Edgy", "Chill", "Cringe"];

  const handleDescribeMe = () => {
    if (selectedImageUri) {
      navigation.navigate("Results", {
        image: selectedImageUri,
        generation: selectedGeneration,
        tone: selectedTone,
      });
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Full-Screen Image */}
      <View style={styles.imageContainer}>
        {selectedImageUri ? (
          <Image source={{ uri: selectedImageUri }} style={styles.image} />
        ) : (
          <View>
            {/* Placeholder for when there's no image */}
            <Text style={styles.placeholder}>No Image Selected</Text>
          </View>
        )}
        {/* Custom Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        <ImageOptionsContainer>
          <SingleSelectCarousel
            header="Generation"
            data={generationList}
            selectedValue={selectedGeneration}
            onSelect={(val) => setSelectedGeneration(val)}
          />
          <SingleSelectCarousel
            header="Tone"
            data={toneList}
            selectedValue={selectedTone}
            onSelect={(val) => setSelectedTone(val)}
          />
          <SubmitButton title="Describe Me" onPress={handleDescribeMe} />
        </ImageOptionsContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.black,
  },
  imageContainer: {
    flex: 2,
    position: "relative",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholder: {
    color: colours.white,
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 80, // Adjust for device notch area
    left: 20,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 8,
  },
  backButtonText: {
    color: colours.white,
    fontSize: 16,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colours.black,
    paddingHorizontal: 16,
    paddingTop: 0,
  },
});
