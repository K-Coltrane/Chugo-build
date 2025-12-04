import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuModal from "../../components/MenuModal";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";

const SCREEN_WIDTH = Dimensions.get("window").width;

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
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
        
        {/* Scan button - positioned above nav bar */}
        <TouchableOpacity style={styles.scanBtn}>
          <Text style={styles.scanText}>Scan</Text>
        </TouchableOpacity>
      </View>

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
    paddingHorizontal: 18,
    height: 60,
  },
  backArrow: {
    fontSize: 28,
    color: "#1c1c1c",
    fontWeight: "300",
    lineHeight: 28,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(55, 73, 87, 1)",
    marginLeft: -24,
  },

  scanWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
    top: -2,
    left: -2,
    width: 100,
    height: 100,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderTopLeftRadius: 24,
    borderColor: "#101C2A",
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  cornerTR: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 100,
    height: 100,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderTopRightRadius: 24,
    borderColor: "#101C2A",
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  cornerBL: {
    position: "absolute",
    bottom: -2,
    left: -2,
    width: 100,
    height: 100,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomLeftRadius: 24,
    borderColor: "#101C2A",
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  cornerBR: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 100,
    height: 100,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomRightRadius: 24,
    borderColor: "#101C2A",
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },

  scanBtn: {
    position: "absolute",
    bottom: 88,
    width: 391,
    height: 68,
    backgroundColor: "#101C2A",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    maxWidth: SCREEN_WIDTH - 28,
  },
  scanText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  bottomNav: {
    width: "100%",
    height: 70,
    backgroundColor: "#F7F8FA",
    flexDirection: "row",
    borderTopWidth: 0,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 11,
    color: "#101C2A",
    fontWeight: "500",
    marginTop: 4,
  },
  tabIconImg: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: "#101C2A",
  },
});
