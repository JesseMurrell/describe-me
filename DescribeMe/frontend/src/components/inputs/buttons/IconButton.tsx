import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  View
} from "react-native";
import { SvgProps } from "react-native-svg";
import { colours } from "@/theme/colours";

type IconComponent = React.FC<SvgProps>;

interface IconButtonProps {
  title: string;
  onPress: () => void;
  // We pass in an SVG component (already imported) or a custom function
  Icon?: IconComponent;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconPosition?: "left" | "right";
  iconSize?: number; // optional: control icon size
  iconColor?: string; // optional: control icon color
}

export const IconButton: React.FC<IconButtonProps> = ({
  title,
  onPress,
  Icon,
  buttonStyle,
  textStyle,
  iconPosition = "right",
  iconSize = 20,
  iconColor = colours.white,
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      {/* If iconPosition is left, render the icon before the text */}
      {Icon && iconPosition === "left" && (
        <View style={{ marginRight: 8 }}>
          <Icon width={iconSize} height={iconSize} stroke={iconColor} fill={'transparent'} />
        </View>
      )}

      <Text style={[styles.title, textStyle]}>{title}</Text>

      {/* If iconPosition is right, render the icon after the text */}
      {Icon && iconPosition === "right" && (
        <View style={{ marginLeft: 8 }}>
          <Icon width={iconSize} height={iconSize} stroke={iconColor} fill={'transparent'} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 14,
    color: "#000",
  },
});