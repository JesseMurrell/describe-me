import React, { useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ImageOptionsContainer } from "@/components/ImageOptionsContainer";
import { SingleSelectCarousel } from "@/components/SingleSelectCarousel";
import { colours } from "@/theme/colours";
import { fontSizes } from "@/theme/sizing";
import { SubmitButton } from "@/components/SubmitButton";
import axios from "axios";
import Constants from 'expo-constants';
import { PulseAnimation } from "@/components/";

// TypeScript imports for navigation
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "@/navigation/RootStackParamList";

type DescriptionInputScreenRouteProp = RouteProp<RootStackParamList, "ImagePicker">;

export function DescriptionInputScreen() {
  const navigation = useNavigation();
  const route = useRoute<DescriptionInputScreenRouteProp>();
  const selectedImageUri = route.params?.selectedImage || null;

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGeneration, setSelectedGeneration] = useState<string>("Gen-Z");
  const [selectedTone, setSelectedTone] = useState<string>("Savage");

  const generationList = ["Gen-Alpha", "Gen-Z", "Millennial", "Gen-X", "Boomer"];
  const toneList = ["Savage", "Wholesome", "Funny", "Edgy", "Chill", "Cringe"];

  const handleDescribeMe = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: selectedImageUri,
        type: "image/jpeg",
        name: "photo.jpg",
      } as any);
      formData.append("generation", selectedGeneration);
      formData.append("tone", selectedTone);

      const ngrokURL = Constants.expoConfig?.extra?.ngrokUrl;
      if (!ngrokURL) {
        throw new Error("NGROK_URL is not defined in the configuration.");
      }

      const response = await axios.post(`${ngrokURL}/caption`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const caption = response.data.caption;

      // Navigate to the output screen with the caption
      navigation.navigate("Results", {
        image: selectedImageUri,
        generation: selectedGeneration,
        tone: selectedTone,
        caption, // Pass the caption
      });
    } catch (error) {
      console.error("Error fetching caption:", error);
    } finally {
      setLoading(false);
    }
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
      </View>

      {/* Loading or Input Section */}
      <View style={styles.bottomContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.smallLoadingText}>One sec...</Text>
            <Text style={styles.loadingText}>Analyzing the photo</Text>
            <View style={styles.indicatorContainer}>
              <PulseAnimation />
              <PulseAnimation />
              <PulseAnimation />
            </View>
          </View>
        ) : (
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
        )}
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
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    resizeMode: "cover",
  },
  placeholder: {
    color: colours.white,
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colours.black,
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  smallLoadingText: {
    color: colours.white,
    fontWeight: "600",
    textAlign: "left",
    fontSize: fontSizes.headings.h6,
    marginBottom: 4,
  },
  loadingText: {
    color: colours.white,
    textAlign: "left",
    fontWeight: "800",
    fontSize: fontSizes.headings.h3,
    marginBottom: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
