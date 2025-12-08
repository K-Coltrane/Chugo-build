// Onboarding1.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, StatusBar } from 'react-native';

const FORK_IMAGE = require('../../assets/images/logo.png'); // adjust path

const Onboarding1 = ({ navigation }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // initial opacity 0

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Navigate after 2 seconds
    const timer = setTimeout(() => {
      // Fade out before navigating
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Onboarding2'); // replace with your main screen
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.circle}>
        <View style={styles.textIconRow}>
          <View>
            <Text style={styles.circleText}>Chugo</Text>
            <Text style={styles.circleText}>Chop</Text>
            <Text style={styles.circleText}>Chop</Text>
          </View>
          <Image source={FORK_IMAGE} style={styles.forkImage} resizeMode="contain" />
        </View>
      </View>
    </Animated.View>
    </>
  );
};

export default Onboarding1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(8, 21, 40, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'rgba(184, 254, 34, 1)',
    width: 276,
    height: 271,
    borderRadius: 276 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  textIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleText: {
    color: 'rgba(8, 21, 40, 1)',
    fontWeight: '700',
    fontSize: 36,
    lineHeight: 44,
    left: 40,
    fontFamily: 'Inter',
  },
  forkImage: {
    width: 143,
    height: 134,
    marginLeft: 10,
  },
});
