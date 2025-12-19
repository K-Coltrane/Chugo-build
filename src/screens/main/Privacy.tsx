import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import MenuModal from "../../components/MenuModal"; 
import { useNavigation } from "@react-navigation/native";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";
import { scaleWidth, scaleHeight, scaleFont, scaleSize } from "../../utils/responsive";

// Bottom tab data
const TAB_ICONS = [
  { key: "home", label: "Home", route: "Home", icon: require("../../../assets/icons/home.png") },
  { key: "notification", label: "Notification", route: "Notifications", icon: require("../../../assets/icons/notification.png") },
  { key: "checkout", label: "Checkout", route: "Checkout", icon: require("../../../assets/icons/checkout.png") },
  { key: "orders", label: "Orders", route: "Orders", icon: require("../../../assets/icons/orders.png") },
  { key: "menu", label: "Menu", route: "Menu", icon: require("../../../assets/icons/menu.png") },
];

const PrivacyPolicyScreen: React.FC = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleTabPress = (key: string, route: string) => {
    if (key === "menu") {
      setMenuVisible(true);
    } else {
      // Navigate to other screens
      // @ts-ignore
      navigation.navigate(route);
    }
  };

  return (
    <SwipeBackWrapper>
    <SafeAreaView style={styles.safeArea}>
    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
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
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: scaleWidth(24) }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ padding: scaleWidth(16), flexGrow: 1 }}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Privacy Policy</Text>
          <Text style={styles.cardText}>
            ChugoShopShop is a food-saving platform that connects users to restaurants offering surplus or leftover meals at discounted prices. You get delicious food, and we all help reduce waste.
          </Text>
        </View>
      </ScrollView>
    </View>

    {/* Bottom Navigation */}
    <View style={styles.bottomNav}>
      {TAB_ICONS.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tabItem}
          onPress={() => handleTabPress(tab.key, tab.route)}
        >
          <Image source={tab.icon} style={styles.tabIconImg} />
          <Text style={styles.tabLabel}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>

    {/* Menu Modal */}
    <MenuModal
      visible={menuVisible}
      onClose={() => setMenuVisible(false)}
      user={{
        name: "Pharm A.k",
        email: "madhu@gmail.com",
        photo: require("../../../assets/images/avatar.png"),
      }}
    />
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
    padding: scaleWidth(14),
    backgroundColor: "rgba(246, 246, 246, 1)",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(18),
    height: scaleHeight(60),
    marginTop: scaleHeight(20),  
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
    fontSize: scaleFont(20),
    fontWeight: "600",
    color: "rgba(55, 73, 87, 1)",
    textAlign: "center",
  },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: scaleSize(18),
    padding: scaleWidth(16),
    minHeight: scaleHeight(340),
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: scaleSize(4),
    shadowOffset: { width: 0, height: scaleHeight(2) },
    elevation: 2,
    height: scaleHeight(778),
  },
  cardTitle: {
    fontSize: scaleFont(20),
    fontWeight: "400",
    marginBottom: scaleHeight(8),
    color: "rgba(55, 73, 87, 1)",
    fontFamily: "Inter",
  },
  cardText: {
    fontSize: scaleFont(16),
    color: "rgba(55, 73, 87, 0.68)",
    lineHeight: scaleFont(20),
    fontFamily: "Inter",
  },

  // Bottom Navigation
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

export default PrivacyPolicyScreen;
