import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colours } from "@/theme/colours";
import { fontSizes } from "@/theme/sizing";

interface SelectionButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  selected?: boolean; 
}

export function SelectionButton({
  title,
  onPress,
  style,
  selected = false,
}: SelectionButtonProps) {
  if (selected) {
    return (
      <LinearGradient
        colors={[colours.secondary, colours.primary]}
        style={[styles.selectedBorderGradient, style]}
      >
        <TouchableOpacity style={styles.selectedButton} onPress={onPress}>
          <Text style={styles.selectedText}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  // Unselected state
  return (
    <TouchableOpacity style={[styles.unselectedButton, style]} onPress={onPress}>
      <Text style={styles.unselectedText}>{title}</Text>
    </TouchableOpacity>
  );
}

const baseButtonStyle = {
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 100,
  alignItems: "center" as const,
  backgroundColor: colours.white,

  // iOS shadow
  shadowOffset: { width: 0, height: 0 },
  shadowRadius: 10,
  shadowOpacity: 0.8,
  shadowColor: colours.primary,


  // Android
  elevation: 4,
};

// 2. Use StyleSheet.create() for final styles
const styles = StyleSheet.create({
  // ========== UNSELECTED STYLES ==========

  unselectedButton: {
    ...baseButtonStyle,
    // For unselected: white background, smaller primary-colored shadow
    backgroundColor: colours.white,
  },
  unselectedText: {
    color: colours.black,
    fontWeight: "600",
    fontSize: fontSizes.body.small,

  },

  // ========== SELECTED STYLES ==========

  selectedBorderGradient: {
    borderRadius: 100,
    padding: 5,
    shadowOpacity: 0.95,
    shadowRadius: 30,
    shadowColor: colours.primary,
    elevation: 17,
  },
  selectedButton: {
    ...baseButtonStyle,
  },
  selectedText: {
    color: colours.primary,
    fontWeight: "600",
    fontSize: fontSizes.body.m,
  },
});
