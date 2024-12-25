// src/navigation/AppNavigator.tsx (for example)
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ImageSelectionScreen } from "@/screens/ImageSelectionScreen";
import { DescriptionInputScreen } from "@/screens/DescriptionInputScreen";
import { ResultsScreen } from "@/screens/ResultsScreen";
import { RootStackParamList } from "./RootStackParamList";

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="ImageSelection" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ImageSelection"
        component={ImageSelectionScreen}
        options={{ title: "Select an Image" }}
      />
      <Stack.Screen
        name="ImagePicker"
        component={DescriptionInputScreen}
        options={{ title: "Choose Generation & Tone" }}
      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{ title: "Caption Results" }}
      />
    </Stack.Navigator>
  );
}
