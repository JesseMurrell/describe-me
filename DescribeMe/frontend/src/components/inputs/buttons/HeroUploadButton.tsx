// src/components/buttons/SubmitButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, GestureResponderEvent, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colours } from "@/theme/colours";

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
  },
  borderGradient: {
    borderRadius: 0,
    padding: 2,
    // The thickness of this padding becomes the border thickness
  },
  innerButton: {
    backgroundColor: colours.black,
    borderRadius: 0,
    paddingVertical: 60,
    paddingHorizontal: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colours.primary,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
}); 