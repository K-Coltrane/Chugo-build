import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import MenuModal, { RootStackParamList } from "../../components/MenuModal";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";

const FAQS = [
  {
    question: "What is ChugoShopShop?",
    answer:
      "ChugoShopShop is a food-saving platform that connects users to restaurants offering surplus or leftover meals at discounted prices. You get delicious food, and we all help reduce waste.",
  },
  {
    question: "How does ChugoShopShop work?",
    answer:
      "Restaurants list surplus meals, you place an order at a discount, and you pick up or get your food delivered. It's easy and helps reduce food waste.",
  },
  { question: "What is ChugoShopShop?", answer: "" },
  { question: "How does ChugoShopShop work?", answer: "" },
];

const TAB_ICONS = [
  { key: "home", label: "Home", route: "Home", icon: require("../../../assets/icons/home.png") },
  { key: "notification", label: "Notification", route: "Notifications", icon: require("../../../assets/icons/notification.png") },
  { key: "checkout", label: "Checkout", route: "Checkout", icon: require("../../../assets/icons/checkout.png") },
  { key: "orders", label: "Orders", route: "Orders", icon: require("../../../assets/icons/orders.png") },
  { key: "menu", label: "Menu", route: "Menu", icon: require("../../../assets/icons/menu.png") },
];

const FAQScreen = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleTabPress = (tabKey: string, route: string) => {
    if (tabKey === "menu") return setMenuVisible(true);
    navigation.navigate(route as keyof RootStackParamList);
  };

  return (
    <SwipeBackWrapper>
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={{ flex: 1 }}>
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
          <Text style={styles.pageTitle}>FAQ's</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* FAQ list */}
        <ScrollView style={{ flex: 1 }}>
          {FAQS.map((faq, i) => (
            <View key={i} style={styles.faqCard}>
              <TouchableOpacity
                style={styles.faqRow}
                onPress={() => setOpenIndex(openIndex === i ? null : i)}
                activeOpacity={0.7}
              >
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Text style={styles.arrowDown}>{openIndex === i ? "▲" : "▼"}</Text>
              </TouchableOpacity>
              {openIndex === i && faq.answer !== "" && (
                <View style={styles.faqAnswerCard}>
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom nav */}
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
  pageTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(55, 73, 87, 1)",
    marginLeft: -24,
  },

  // FAQ Card
  faqCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 13,
    marginTop: 13,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  faqRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  faqQuestion: {
    fontSize: 20,
    fontWeight: "400",
    color: "rgba(55, 73, 87, 1)",
  },
  arrowDown: {
    fontSize: 18,
    color: "#999",
  },
  faqAnswerCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 14,
    marginBottom: 13,
    padding: 13,
  },
  faqAnswer: {
    fontSize: 16,
    color: "rgba(55, 73, 87, 0.68)",
  },

  // Bottom Navigation
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
    justifyContent: "center",
    alignItems: "center",
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

export default FAQScreen;
