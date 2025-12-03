import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import MenuModal from "../../components/MenuModal"; // Keep if you use it
import SwipeBackWrapper from "../../components/SwipeBackWrapper";

// ---- Navigation Typings ----
type RootStackParamList = {
  Home: undefined;
  Notifications: undefined;
  Checkout: undefined;
  Orders: undefined;
  Menu: undefined;
};

// ---- Tab Icons ----
const TAB_ICONS: {
  key: string;
  label: string;
  route: keyof RootStackParamList;
  icon: any;
}[] = [
  {
    key: "home",
    label: "Home",
    route: "Home",
    icon: require("../../../assets/icons/home.png"),
  },
  {
    key: "notifications",
    label: "Notifications",
    route: "Notifications",
    icon: require("../../../assets/icons/notification.png"),
  },
  {
    key: "checkout",
    label: "Checkout",
    route: "Checkout",
    icon: require("../../../assets/icons/checkout.png"),
  },
  {
    key: "orders",
    label: "Orders",
    route: "Orders",
    icon: require("../../../assets/icons/orders.png"),
  },
  {
    key: "menu",
    label: "Menu",
    route: "Menu",
    icon: require("../../../assets/icons/menu.png"),
  },
];

const Notifications = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SwipeBackWrapper>
    <SafeAreaView style={styles.safeArea}>
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
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Notification Card */}
        <View style={styles.notifyCard}>
          <Text style={styles.notificationMsg}>
            Payment of <Text style={styles.bold}>GHC 340</Text> for{" "}
            <Text style={styles.bold}>#1</Text> is reversed back to account
            ending {"\u2022\u2022\u2022\u2022 7866"}
          </Text>
          <TouchableOpacity style={styles.notifyClose}>
            <Text style={styles.closeIcon}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {TAB_ICONS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => navigation.navigate(tab.route)}
            >
              <Image source={tab.icon} style={styles.tabIconImage} />
              <Text style={styles.tabLabel}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Menu Modal (if needed) */}
      {menuVisible && (
        <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
      )}
    </SafeAreaView>
    </SwipeBackWrapper>
  );
};

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

  // Header
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

  // Notification Card
  notifyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 20,
    padding: 10,  
    marginVertical: 12,
    position: "relative",
  },
  notificationMsg: {
    flex: 1,
    fontSize: 15,
    color: "rgba(55, 73, 87, 1)",
    fontWeight: "400",
    fontFamily: "Inter"
  },
  bold: {
    fontWeight: "600",
  },
  notifyClose: {
    marginLeft: 12,

  },
  closeIcon: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "700",
    backgroundColor: "rgba(8, 21, 40, 1)",
    borderRadius:30,
    width:20,
    height:20,
    top: -30,
    textAlign: "center",
    lineHeight: 20,
    left: 10,
  },

  // Bottom Navigation
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
  tabIconImage: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
    color: "#949CA6",
  },
});

export default Notifications;
