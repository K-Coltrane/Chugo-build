import React from "react";
import { View, Animated, PanResponder, Dimensions, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface SwipeBackWrapperProps {
  children: React.ReactNode;
}

const SwipeBackWrapper: React.FC<SwipeBackWrapperProps> = ({ children }) => {
  const navigation = useNavigation();
  const translateX = React.useRef(new Animated.Value(0)).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => {
        // Only capture if touch starts near the left edge (first 20px)
        // But not if it's in the top area where back buttons are (first 100px from top)
        const touchX = evt.nativeEvent.pageX || evt.nativeEvent.locationX || 0;
        const touchY = evt.nativeEvent.pageY || evt.nativeEvent.locationY || 0;
        return touchX < 20 && touchY > 100;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only respond to horizontal swipes from the left edge
        const touchX = evt.nativeEvent.pageX || evt.nativeEvent.locationX || 0;
        return touchX < 20 && gestureState.dx > 10 && Math.abs(gestureState.dy) < Math.abs(gestureState.dx);
      },
      onPanResponderGrant: () => {
        translateX.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx < SCREEN_WIDTH) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SCREEN_WIDTH / 3) {
          Animated.timing(translateX, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            const state = navigation.getState();
            if (state && state.index > 0) {
              navigation.goBack();
            } else {
              (navigation as any).navigate('Home');
            }
            translateX.setValue(0);
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderTerminationRequest: () => false,
    })
  ).current;

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX }] }]}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});

export default SwipeBackWrapper;
