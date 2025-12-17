import React, { useRef } from "react";
import { View, Animated, PanResponder, Dimensions, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH / 3;

interface SwipeBackWrapperProps {
  children: React.ReactNode;
  enabled?: boolean;
}

const SwipeBackWrapper: React.FC<SwipeBackWrapperProps> = ({ children, enabled = true }) => {
  const navigation = useNavigation();
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      // Important: don't steal simple taps (it can make buttons feel "not working").
      // We'll only become responder once we detect an actual swipe in onMoveShouldSetPanResponder.
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (!enabled) return false;
        // Only respond to rightward horizontal swipes from the left edge
        // Use nullish coalescing so a valid 0 value isn't treated as "missing".
        const touchX = (evt.nativeEvent.pageX ?? evt.nativeEvent.locationX ?? 0) as number;
        return touchX < 30 && gestureState.dx > 15 && Math.abs(gestureState.dy) < Math.abs(gestureState.dx) * 2;
      },
      onPanResponderGrant: () => {
        translateX.setValue(0);
        opacity.setValue(1);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx < SCREEN_WIDTH) {
          translateX.setValue(gestureState.dx);
          // Fade out as you swipe
          const opacityValue = 1 - (gestureState.dx / SCREEN_WIDTH) * 0.5;
          opacity.setValue(Math.max(0.5, opacityValue));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          // Swipe was far enough - navigate back
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: SCREEN_WIDTH,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start(() => {
            // Navigate back
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Home' as never);
            }
            // Reset values
            translateX.setValue(0);
            opacity.setValue(1);
          });
        } else {
          // Swipe wasn't far enough - spring back
          Animated.parallel([
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
              tension: 50,
              friction: 8,
            }),
            Animated.spring(opacity, {
              toValue: 1,
              useNativeDriver: true,
              tension: 50,
              friction: 8,
            }),
          ]).start();
        }
      },
      onPanResponderTerminate: () => {
        // Reset if gesture is interrupted
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.spring(opacity, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start();
      },
      // Allow other responders to take over if needed (e.g. nested touchables/scroll views).
      onPanResponderTerminationRequest: () => true,
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX }],
          opacity,
        },
      ]}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default SwipeBackWrapper;
