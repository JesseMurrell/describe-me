// src/components/buttons/SubmitButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, GestureResponderEvent, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colours } from "@/theme/colours";
import { fontSizes } from "@/theme/sizing";

interface SubmitButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
}

export function SubmitButton({ title, onPress, style }: SubmitButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, style]}>
      {/* Outer gradient border from gray -> white */}
      <LinearGradient
        colors={["#888888", "#FFFFFF"]} // from gray to white
        style={styles.borderGradient}
      >
        {/* Inner gradient background from secondary -> primary */}
        <LinearGradient
          colors={[colours.secondary, colours.primary]}
          style={styles.innerGradient}
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // The wrapper ensures the shadows appear outside the gradient container
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    width: "90%",
    marginTop: 16,
  },
  borderGradient: {
    borderRadius: 100,
    padding: 4, 
    // The thickness of this padding becomes the border thickness
  },
  innerGradient: {
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colours.white,
    fontSize: fontSizes.headings.h3,
    fontWeight: "600",
  },
}); 