import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
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
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image 
              source={require("../../../assets/icons/back.png")} 
              style={styles.backArrowIcon}
            />
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
          <View style={{ height: 70 }} />
        </ScrollView>

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
      </View>
    </SafeAreaView>
    </SwipeBackWrapper>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
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
  backArrowIcon: {
    width: 20,
    height: 20,
    tintColor: "#1c1c1c",
    resizeMode: "contain",
  },
  pageTitle: {
    flex: 1,
    textAlign: "center",
    marginLeft: -24,
    fontSize: 20,
    fontWeight: "400",
    color: "rgba(55, 73, 87, 1)",
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
    flexDirection: "row",
    height: 65,
    borderTopWidth: 1,
    borderColor: "#F2F3F7",
    backgroundColor: "#f6f6f6",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    
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
