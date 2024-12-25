import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colours } from "@/theme/colours";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.xlButton} onPress={onPress}>
      <Text style={styles.xlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  xlButton: {
    backgroundColor: colours.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  xlButtonText: {
    color: colours.white,
    fontSize: 18,
    fontWeight: "600",
  },
});

