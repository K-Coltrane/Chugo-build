import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from "react-native";

export default function Onboarding2({ navigation }: any) {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    <View style={styles.container}>
      {/* IMAGES SECTION */}
      <View style={styles.imagesContainer}>
        <Image
          source={require("../../../assets/images/oimg1.jpg")} 
          style={[styles.image, styles.imageTop]}
        />
        <Image
          source={require("../../../assets/images/oimg2.jpg")}
          style={[styles.image, styles.imageBottom]}
        />
      </View>

      {/* PAGE INDICATOR */}
      <View style={styles.indicatorContainer}>
        <View style={styles.dotInactive} />
        <View style={styles.dotActive} />
        <View style={styles.dotInactive} />
      </View>

      {/* TEXT SECTION */}
      <Text style={styles.title}>Tasty Meals,{'\n'}Smarter Choices</Text>
      <Text style={styles.subtitle}>
        Help reduce food waste by enjoying perfectly good leftover meals at a
        discount.
      </Text>

      {/* FOOTER */}
     <View style={styles.footer}>
  <TouchableOpacity style={styles.skipButton}>
    <Text style={styles.skipText}>Skip</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.nextButton}  onPress={() => navigation.navigate('Onboarding3')}>
   
    <View style={styles.nextButtonOuterCircle}>
      <View style={styles.nextButtonInnerCircle}>
        <Text style={styles.nextButtonArrow}>›</Text>
      </View>
    </View>
  </TouchableOpacity>
</View>
</View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingTop: 60,
    alignItems: "center",
  },
  imagesContainer: {
    width: 285,
    height: 267,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "rgba(184, 254, 34, 0.17)",
    borderRadius: 20,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 20,
   
    
  },
  imageTop: {
    position: "absolute",
    top: -30,
    left: -40,
    transform: [{ rotate: "-10deg" }],
    height: 279.2,
    width: 213.19,
    borderRadius: 20,
    
  },
  imageBottom: {
    position: "absolute",
    bottom: -100,
    right: -50,
    width: 207,
    height: 301,
  },
  indicatorContainer: {
    flexDirection: "row",
    marginTop: 150,
  },
  dotActive: {
    width: 36,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: "rgba(184, 254, 34, 1)",
  },
  dotInactive: {
    width: 10,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: "rgba(217, 217, 217, 1)",
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 30,
    color: "rgba(55, 73, 87, 1)",
    fontFamily: "Inter"
  },
  subtitle: {
    textAlign: "center",
    fontSize: 20,
    color: "rgba(55, 73, 87, 1)",
    marginTop: 12,
    lineHeight: 20,
    paddingHorizontal: 10,
    fontFamily: "Inter"
  },
  
footer: {
  width: "100%",
  position: "absolute",
  bottom: 60,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 25,
},
skipButton: {
  backgroundColor: "rgba(217, 217, 217, 0.25)",
  borderRadius: 20,
  paddingHorizontal: 22,
  paddingVertical: 9,
  justifyContent: "center",
  alignItems: "center",
  height: 45,
  width: 85,
},
skipText: {
  fontSize: 15,
  color: "rgba(55, 73, 87, 1)",
  fontFamily: "Inter",
},
nextButton: {
  justifyContent: "center",
  alignItems: "center",
  width: 39,
  height: 39,
},
nextButtonOuterCircle: {
  width: 50,
  height: 50,
  borderRadius: 25,
  borderColor: "rgba(184, 254, 34, 1)",
  borderWidth: 2,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
},
nextButtonInnerCircle: {
  width: 39,
  height: 39,
  borderRadius: 19.5,
  backgroundColor: "rgba(184, 254, 34, 1)",
  justifyContent: "center",
  alignItems: "center",
  bottom: 1,
},
nextButtonArrow: {
  fontSize: 26,
  color: "rgba(55, 73, 87, 1)",
  fontWeight: "700",
  marginLeft: 3,
  bottom: 2,
},

});
