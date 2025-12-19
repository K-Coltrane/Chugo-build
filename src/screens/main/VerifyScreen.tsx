import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuModal from "../../components/MenuModal";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";
import { scaleWidth, scaleHeight, scaleFont, scaleSize } from "../../utils/responsive";

const SCREEN_WIDTH = Dimensions.get("window").width;
// Keep the Scan button from spanning edge-to-edge on smaller phones.
const SCAN_BUTTON_WIDTH = Math.min(scaleWidth(320), SCREEN_WIDTH - scaleWidth(40));
const SCAN_BUTTON_LEFT = (SCREEN_WIDTH - SCAN_BUTTON_WIDTH) / 2;

const TAB_ICONS = [
  { key: "home", label: "Home", route: "Home", icon: require("../../../assets/icons/home.png") },
  { key: "notifications", label: "Notification", route: "Notifications", icon: require("../../../assets/icons/notification.png") },
  { key: "checkout", label: "Checkout", route: "Checkout", icon: require("../../../assets/icons/checkout.png") },
  { key: "orders", label: "Orders", route: "Orders", icon: require("../../../assets/icons/orders.png") },
  { key: "menu", label: "Menu", route: "Menu", icon: require("../../../assets/icons/menu.png") },
];

const VerifyScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleTabPress = (tab: typeof TAB_ICONS[0]) => {
    if (tab.key === "menu") {
      setMenuVisible(true);
    } else {
      // @ts-ignore
      navigation.navigate(tab.route);
    }
  };
  return (
    <SwipeBackWrapper>
      <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {/* MAIN CONTENT */}
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity 
            onPress={() => {
              const state = navigation.getState();
              if (state && state.index > 0) {
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
          <Text style={styles.headerTitle}>Verify</Text>
          <View style={{ width: scaleWidth(24) }} />
        </View>

        {/* Scan frame */}
        <View style={styles.scanWrapper}>
          <View style={styles.scanArea}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
          </View>
        </View>
      </View>

      {/* Scan button - positioned above nav bar */}
      <TouchableOpacity 
        style={styles.scanBtn}
        onPress={() => navigation.navigate("RatingScreen" as never)}
      >
        <Text style={styles.scanText}>Scan</Text>
      </TouchableOpacity>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        {TAB_ICONS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => handleTabPress(tab)}
          >
            <Image source={tab.icon} style={styles.tabIconImg} />
            <Text style={styles.tabLabel}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <MenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
      </SafeAreaView>
    </SwipeBackWrapper>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "rgba(246, 246, 246, 1)",
  },
  container: {
    flex: 1,
    padding: scaleWidth(14),
    backgroundColor: "rgba(246, 246, 246, 1)",
  },

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
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: scaleFont(20),
    fontWeight: "600",
    color: "rgba(55, 73, 87, 1)",
  },

  scanWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(60),
  },
  scanArea: {
    width: scaleWidth(280),
    height: scaleHeight(280),
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: scaleWidth(80),
    height: scaleHeight(80),
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: scaleSize(20),
    borderColor: "#101C2A",
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: scaleWidth(80),
    height: scaleHeight(80),
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: scaleSize(20),
    borderColor: "#101C2A",
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: scaleWidth(80),
    height: scaleHeight(80),
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: scaleSize(20),
    borderColor: "#101C2A",
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: scaleWidth(80),
    height: scaleHeight(80),
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: scaleSize(20),
    borderColor: "#101C2A",
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },

  scanBtn: {
    position: "absolute",
    bottom: scaleHeight(70),
    left: SCAN_BUTTON_LEFT,
    width: SCAN_BUTTON_WIDTH,
    height: scaleHeight(66),
    backgroundColor: "#101C2A",
    borderRadius: scaleSize(100),
    alignItems: "center",
    justifyContent: "center",
  },
  scanText: {
    color: "#FFFFFF",
    fontSize: scaleFont(16),
    fontWeight: "600",
  },

  bottomNav: {
    width: "100%",
    height: scaleHeight(65),
    backgroundColor: "#f6f6f6",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#F2F3F7",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    alignSelf: "center",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: scaleFont(11),
    color: "#949CA6",
  },
  tabIconImg: {
    width: scaleSize(25),
    height: scaleSize(25),
    marginBottom: scaleHeight(3),
    resizeMode: "contain",
  },
});
