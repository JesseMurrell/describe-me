import React from "react";
import { View, StyleSheet, Animated } from "react-native";

export const SpinningDots = () => {
  const rotation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    );
    spin.start();
    return () => spin.stop();
  }, [rotation]);

  const spinInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ rotate: spinInterpolate }] }]}
    >
      <View style={[styles.dot, styles.dot1]} />
      <View style={[styles.dot, styles.dot2]} />
      <View style={[styles.dot, styles.dot3]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "#8a2be2",
  },
  dot1: { top: 0 },
  dot2: { right: 0 },
  dot3: { bottom: 0 },
});
