// src/components/buttons/SubmitButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, GestureResponderEvent, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colours } from "@/theme/colours";
import { fontSizes } from "@/theme/sizing";

interface HeroUploadButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
}

export function HeroUploadButton({ title, onPress, style }: HeroUploadButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, style]}>
      {/* Outer gradient border from gray -> white */}
      <LinearGradient
        colors={[ colours.primary, "transparent"]} // from gray to white
        style={styles.borderGradient}
      >
        {/* Inner gradient background from secondary -> primary */}
        <View
          style={styles.innerButton}
        >
          <Text style={styles.text}>{title.replace('\\n','\n')}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowColor: colours.primary,
  },
  borderGradient: {
    borderRadius: 20,
    padding: 4,
    // The thickness of this padding becomes the border thickness
  },
  innerButton: {
    backgroundColor: colours.black,
    borderRadius: 20,
    paddingVertical: 50,
    paddingHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colours.primary,
    fontSize: fontSizes.headings.h3,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 1,
    lineHeight: 24,
  },
}); 