import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ImagePickerScreen from "./screens/ImagePickerScreen";
import ResultsScreen from "./screens/ResultsScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ImagePickerScreen} options={{ title: "Describe Me" }} />
        <Stack.Screen name="Results" component={ResultsScreen} options={{ title: "Caption Results" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
