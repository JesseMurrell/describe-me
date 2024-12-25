import React from "react";
import { View, StyleSheet, Animated } from "react-native";

export const TypingDots = () => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
      <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
      <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#8a2be2",
    marginHorizontal: 5,
  },
});
