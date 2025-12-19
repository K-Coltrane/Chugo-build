import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Image, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";
import { scaleWidth, scaleHeight, scaleFont, scaleSize } from "../../utils/responsive";

const ReviewScreen = ({ navigation: navProp }: any) => {
  const navigation = useNavigation();
  
  return (
    <SwipeBackWrapper>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity 
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate('Home' as never);
                }
              }} 
              activeOpacity={0.7}
              style={styles.backButton}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <View style={{ width: scaleWidth(24) }} />
          </View>
      <Text style={styles.orderTitle}>How’s your order?</Text>
      <Text style={styles.ratingLabel}>You’r overall rating</Text>
      <View style={styles.starsRow}>
        {[1,2,3,4,5].map(s=>
          <Text key={s} style={[
            styles.star,
            s < 3 ? styles.starFull : styles.starEmpty
          ]}>★</Text>
        )}
      </View>
      <Text style={styles.reviewLabel}>Add detailed review</Text>
      <TextInput
        style={styles.reviewInput}
        placeholder="Comment"
        placeholderTextColor="#A0A4AF"
        multiline
      />
      <TouchableOpacity style={styles.addPhotoRow}>
        <Text style={styles.photoIcon}>🖼</Text>
        <Text style={styles.addPhotoText}>Add photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.bottomNav}>
        {["Home", "Notification", "checkout", "Orders", "Menu"].map(label => (
          <TouchableOpacity key={label} style={styles.tabItem}>
            <Text style={styles.tabIcon}>⬤</Text>
            <Text style={styles.tabLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
        </View>
      </SafeAreaView>
    </SwipeBackWrapper>
  );
};

const styles = StyleSheet.create({
  // Safe area & container
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FA",
  },
  container: {
    flex: 1,
    padding: scaleWidth(14),
    backgroundColor: "#F6F7FA",
  },

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scaleHeight(12),
    marginTop: scaleHeight(20),
    paddingHorizontal: scaleWidth(18),
    height: scaleHeight(60),
  },
  backButton: {
    width: scaleWidth(30),
    height: scaleHeight(80),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: scaleHeight(-10),
  },
  backArrow: {
    fontSize: scaleFont(42),
    color: "#1c1c1c",
    fontWeight: "700",
    lineHeight: scaleFont(42),
  },
  orderTitle: {
    fontSize: scaleFont(19),
    fontWeight: "500",
    color: "#222B45",
    marginTop: scaleHeight(12),
    marginBottom: scaleHeight(18),
  },

  // Rating section
  ratingLabel: {
    fontSize: scaleFont(13),
    color: "#B4B6BC",
    marginBottom: scaleHeight(7),
    marginLeft: scaleWidth(3),
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: scaleHeight(18),
    justifyContent: "center",
  },
  star: {
    fontSize: scaleFont(32),
    marginRight: scaleWidth(8),
  },
  starFull: {
    color: "#222B45",
  },
  starEmpty: {
    color: "#CED0CB",
  },

  // Review section
  reviewLabel: {
    fontSize: scaleFont(15),
    fontWeight: "500",
    color: "#222B45",
    marginBottom: scaleHeight(5),
    marginLeft: scaleWidth(2),
  },
  reviewInput: {
    backgroundColor: "#fff",
    borderRadius: scaleSize(15),
    fontSize: scaleFont(15),
    minHeight: scaleHeight(65),
    padding: scaleWidth(11),
    marginBottom: scaleHeight(10),
    color: "#222B45",
  },

  // Add photo row
  addPhotoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(18),
  },
  photoIcon: {
    fontSize: scaleFont(19),
    color: "#B3B8C4",
    marginRight: scaleWidth(7),
  },
  addPhotoText: {
    fontSize: scaleFont(15),
    color: "#686C73",
  },

  // Submit button
  submitBtn: {
    backgroundColor: "#101C2A",
    paddingVertical: scaleHeight(15),
    borderRadius: scaleSize(20),
    alignItems: "center",
    marginBottom: scaleHeight(10),
  },
  submitText: {
    color: "#fff",
    fontSize: scaleFont(17),
    fontWeight: "600",
    letterSpacing: 1,
  },

  // Bottom navigation
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: scaleHeight(65),
    backgroundColor: "#fff",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#E2E3E4",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    fontSize: scaleFont(22),
    color: "#949CA6",
    marginBottom: scaleHeight(1),
  },
  tabLabel: {
    fontSize: scaleFont(11),
    color: "#949CA6",
  },
});

export default ReviewScreen;
