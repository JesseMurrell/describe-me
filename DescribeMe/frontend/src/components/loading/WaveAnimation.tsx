import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

export const WaveAnimation = () => {
  const translateY1 = React.useRef(new Animated.Value(0)).current;
  const translateY2 = React.useRef(new Animated.Value(0)).current;
  const translateY3 = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const wave = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: -20,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        { delay }
      );

    wave(translateY1, 0).start();
    wave(translateY2, 150).start();
    wave(translateY3, 300).start();

    return () => {
      translateY1.stopAnimation();
      translateY2.stopAnimation();
      translateY3.stopAnimation();
    };
  }, [translateY1, translateY2, translateY3]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { transform: [{ translateY: translateY1 }] }]} />
      <Animated.View style={[styles.bar, { transform: [{ translateY: translateY2 }] }]} />
      <Animated.View style={[styles.bar, { transform: [{ translateY: translateY3 }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  bar: {
    width: 10,
    height: 50,
    marginHorizontal: 5,
    backgroundColor: "#8a2be2",
    borderRadius: 5,
  },
});
