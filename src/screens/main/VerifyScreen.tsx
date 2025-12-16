import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuModal from "../../components/MenuModal";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCAN_BUTTON_WIDTH = 391;
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
          <View style={{ width: 24 }} />
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
    padding: 14,
    backgroundColor: "rgba(246, 246, 246, 1)",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginTop: 20,
    paddingHorizontal: 18,
    height: 60,
  },
  backButton: {
    width: 30,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: -10,
  },
  backArrow: {
    fontSize: 42,
    color: "#1c1c1c",
    fontWeight: "700",
    lineHeight: 42,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(55, 73, 87, 1)",
  },

  scanWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  scanArea: {
    width: 280,
    height: 280,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 80,
    height: 80,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 20,
    borderColor: "#101C2A",
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 80,
    height: 80,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 20,
    borderColor: "#101C2A",
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 80,
    height: 80,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 20,
    borderColor: "#101C2A",
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 80,
    height: 80,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 20,
    borderColor: "#101C2A",
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },

  scanBtn: {
    position: "absolute",
    bottom: 70,
    left: SCAN_BUTTON_LEFT,
    width: SCAN_BUTTON_WIDTH,
    height: 66,
    backgroundColor: "#101C2A",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  scanText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  bottomNav: {
    width: "100%",
    height: 65,
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
    fontSize: 11,
    color: "#949CA6",
  },
  tabIconImg: {
    width: 25,
    height: 25,
    marginBottom: 3,
    resizeMode: "contain",
  },
});
