import React, { ReactNode } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { colours } from "@/theme/colours";

interface ImageOptionsContainerProps {
  children: ReactNode;
}

export function ImageOptionsContainer({ children }: ImageOptionsContainerProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      bounces={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 2,
    marginTop: 12,
    backgroundColor: colours.black,
    alignItems: "center",
  },
});