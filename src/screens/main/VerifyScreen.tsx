import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuModal from "../../components/MenuModal";

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
    <SafeAreaView style={styles.safeArea}>
      {/* MAIN CONTENT */}
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image 
              source={require("../../../assets/icons/back.png")} 
              style={styles.backArrowIcon}
            />
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
          
          {/* Scan button */}
          <TouchableOpacity style={styles.scanBtn}>
            <Text style={styles.scanText}>Scan</Text>
          </TouchableOpacity>
        </View>
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
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#F7F8FA",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 18,
    height: 60,
  },
  backArrowIcon: {
    width: 20,
    height: 20,
    tintColor: "#1c1c1c",
    resizeMode: "contain",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cornerBase: {
    position: "absolute",
    width: 60,
    height: 60,
    borderColor: "#101C2A",
    borderRadius: 24,
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
    borderColor: "#101C2A",
  },
  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
    borderColor: "#101C2A",
  },
  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 50,
    height: 50,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
    borderColor: "#101C2A",
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
    borderColor: "#101C2A",
  },

  scanBtn: {
    marginTop: 40,
    backgroundColor: "#101C2A",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 200,
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
