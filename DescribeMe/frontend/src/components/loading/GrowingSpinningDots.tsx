import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { colours } from "@/theme/colours";

export const GrowingSpinningDots = () => {
  const rotation = React.useRef(new Animated.Value(0)).current;
  const scales = [
    React.useRef(new Animated.Value(1)).current,
    React.useRef(new Animated.Value(1)).current,
    React.useRef(new Animated.Value(1)).current,
  ];

  React.useEffect(() => {
    // Rotation animation
    const spin = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spin.start();

    // Scale animations for dots
    const createScaleAnimation = (dotIndex: number, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(scales[dotIndex], {
            toValue: 1.5,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scales[dotIndex], {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        { delay }
      );
    };

    createScaleAnimation(0, 0).start();
    createScaleAnimation(1, 100).start();
    createScaleAnimation(2, 300).start();

    return () => {
      spin.stop();
      scales.forEach((scale) => scale.stopAnimation());
    };
  }, [rotation, scales]);

  // Interpolating rotation
  const spinInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ rotate: spinInterpolate }] }]}
    >
      {scales.map((scale, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              transform: [{ scale }],
              // Position dots evenly around a circle
              position: "absolute",
              top: index === 0 ? 0 : "50%",
              left: index === 1 ? "100%" : "50%",
              marginLeft: index === 1 ? -10 : 0,
              marginTop: index === 0 ? 0 : -10,
              right: index === 2 ? 0 : undefined,
              bottom: index === 2 ? 0 : undefined,
            },
          ]}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colours.primary, // Change color as needed
  },
});
