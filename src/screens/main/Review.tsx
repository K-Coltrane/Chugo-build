import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Image, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";

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
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <View style={{ width: 24 }} />
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
    padding: 14,
    backgroundColor: "#F6F7FA",
  },

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginTop: 20,
    paddingHorizontal: 18,
    height: 60,
  },
  backArrow: {
    fontSize: 28,
    color: "#1c1c1c",
    fontWeight: "300",
    lineHeight: 28,
  },
  orderTitle: {
    fontSize: 19,
    fontWeight: "500",
    color: "#222B45",
    marginTop: 12,
    marginBottom: 18,
  },

  // Rating section
  ratingLabel: {
    fontSize: 13,
    color: "#B4B6BC",
    marginBottom: 7,
    marginLeft: 3,
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 18,
    justifyContent: "center",
  },
  star: {
    fontSize: 32,
    marginRight: 8,
  },
  starFull: {
    color: "#222B45",
  },
  starEmpty: {
    color: "#CED0CB",
  },

  // Review section
  reviewLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222B45",
    marginBottom: 5,
    marginLeft: 2,
  },
  reviewInput: {
    backgroundColor: "#fff",
    borderRadius: 15,
    fontSize: 15,
    minHeight: 65,
    padding: 11,
    marginBottom: 10,
    color: "#222B45",
  },

  // Add photo row
  addPhotoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  photoIcon: {
    fontSize: 19,
    color: "#B3B8C4",
    marginRight: 7,
  },
  addPhotoText: {
    fontSize: 15,
    color: "#686C73",
  },

  // Submit button
  submitBtn: {
    backgroundColor: "#101C2A",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 1,
  },

  // Bottom navigation
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 65,
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
    fontSize: 22,
    color: "#949CA6",
    marginBottom: 1,
  },
  tabLabel: {
    fontSize: 11,
    color: "#949CA6",
  },
});

export default ReviewScreen;
