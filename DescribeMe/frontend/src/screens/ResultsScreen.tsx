import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import Constants from 'expo-constants';


const ResultsScreen = ({ route }: any) => {
  const { image, generation, tone } = route.params;
  const [caption, setCaption] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCaption = async () => {
      try {
        console.log("Fetching caption...");
        const formData = new FormData();
        formData.append("file", {
          uri: image,
          type: "image/jpeg",
          name: "photo.jpg",
        } as any);
        formData.append("generation", generation);
        formData.append("tone", tone);
    
        // Update the URL to your machine's IP address or Expo tunnel URL
        console.log("making request");
        const ngrokURL = Constants.expoConfig?.extra?.ngrokUrl;
        if (!ngrokURL) {
          throw new Error("NGROK_URL is not defined in the configuration.");
        }
        console.log("ngrokURL", ngrokURL);
        const response = await axios.post(`${ngrokURL}/caption`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("response", response);
        setCaption(response.data.caption);
      } catch (error) {
        console.error("Error fetching caption:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaption();
  }, [image, generation, tone]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      ) : (
        <Text style={styles.caption}>{caption}</Text>
      )}
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
  loading: {
    marginTop: 20,
  },
});

export default ResultsScreen;
