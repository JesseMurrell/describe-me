import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const ImagePickerScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generation, setGeneration] = useState<string>("gen-z");
  const [tone, setTone] = useState<string>("savage");
  const navigation = useNavigation();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      navigation.navigate("Results", { image: selectedImage, generation, tone });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an Image" onPress={pickImage} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <View style={styles.dropdownContainer}>
        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>Generation</Text>
          <Picker
            selectedValue={generation}
            onValueChange={(itemValue) => setGeneration(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Gen-Z" value="gen-z" />
            <Picker.Item label="Millennial" value="millennial" />
            <Picker.Item label="Gen-X" value="gen-x" />
            <Picker.Item label="Boomer" value="boomer" />
            <Picker.Item label="Silent Gen" value="silent-gen" />
            <Picker.Item label="Gen Alpha" value="gen-alpha" />
          </Picker>
        </View>
        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>Tone</Text>
          <Picker
            selectedValue={tone}
            onValueChange={(itemValue) => setTone(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Savage" value="savage" />
            <Picker.Item label="Wholesome" value="wholesome" />
            <Picker.Item label="Funny" value="funny" />
            <Picker.Item label="Edgy" value="edgy" />
            <Picker.Item label="Chill" value="chill" />
            <Picker.Item label="Cringe" value="cringe" />
          </Picker>
        </View>
      </View>
      {selectedImage && <Button title="Submit" onPress={handleSubmit} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  pickerWrapper: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  pickerLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: 150,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default ImagePickerScreen;
