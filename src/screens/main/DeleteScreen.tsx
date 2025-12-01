import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MenuModal from "../../components/MenuModal";
import { useNavigation } from "@react-navigation/native";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";
// Bottom tab data
const TAB_ICONS = [
  { key: "home", label: "Home", route: "Home", icon: require("../../../assets/icons/home.png") },
  { key: "notification", label: "Notification", route: "Notifications", icon: require("../../../assets/icons/notification.png") },
  { key: "checkout", label: "Checkout", route: "Checkout", icon: require("../../../assets/icons/checkout.png") },
  { key: "orders", label: "Orders", route: "Orders", icon: require("../../../assets/icons/orders.png") },
  { key: "menu", label: "Menu", route: "Menu", icon: require("../../../assets/icons/menu.png") },
];

const BackArrow = () => (
  <Text style={{ fontSize: 22, fontWeight: "bold", marginRight: 12 }}>←</Text>
);

const DeleteScreen: React.FC = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleTabPress = (key: string, route: string) => {
    if (key === "menu") {
      setMenuVisible(true);
    } else {
      // @ts-ignore
      navigation.navigate(route);
    }
  };

  const isInputValid = inputValue.trim().toLowerCase() === "chugo chopchop";

  return (
    <SwipeBackWrapper>
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delete account</Text>
        <View style={{ width: 22 }} /> {/* placeholder for symmetrical spacing */}
      </View>

      {/* Prompt Card & Input */}
      <KeyboardAvoidingView
        style={styles.flexGrowArea}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={120}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.promptTitle}>What is ChugoShopShop?</Text>
            <Text style={styles.promptSub}>Type 'Chugo chopchop'</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="TYPE HERE"
              placeholderTextColor="#CFCFCF"
              value={inputValue}
              onChangeText={setInputValue}
              autoCapitalize="none"
              autoCorrect={false}
              textAlign="center"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Delete Button & Bottom NavBar */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.deleteButton, !isInputValid && { opacity: 0.5 }]}
          activeOpacity={0.8}
          disabled={!isInputValid}
          onPress={() => {
            if (isInputValid) {
              setShowSuccessPopup(true); // Show the popup
              // Your account deletion logic here if needed
            }
          }}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        <View style={styles.bottomNav}>
          {TAB_ICONS.map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => handleTabPress(tab.key, tab.route)}
            >
              <Image source={tab.icon} style={styles.tabIcon} />
              <Text style={styles.tabLabel}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupCard}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkMark}>✓</Text>
            </View>
            <Text style={styles.popupTitle}>Your account is successfully removed</Text>
            <Text style={styles.popupDesc}>
              Your account will be removed{"\n"}after 21 days of inactivity
            </Text>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => {
                setShowSuccessPopup(false);
                // You can also navigate away or trigger another action here
              }}
            >
              <Text style={styles.popupButtonText}>Yes,Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8f8f8",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "400",
    color: "rgba(55, 73, 87, 1)",
  },
  flexGrowArea: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    alignItems: "center",
    minHeight: 250,
    justifyContent: "center",
  },
  promptTitle: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 8,
    color: "rgba(55, 73, 87, 1)",
    textAlign: "center",
  },
  promptSub: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 16,
    color: "rgba(55, 73, 87, 0.68)",
    textAlign: "center",
  },
  inputBox: {
    width: "100%",
    backgroundColor: "rgba(244, 244, 246, 1)",
    borderRadius: 100,
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "rgba(55, 73, 87, 0.37)",
    fontWeight: "400",
    letterSpacing: 1,
    height: 68,
  },
  bottomContainer: {
    backgroundColor: "transparent",
  },
  deleteButton: {
    backgroundColor: "rgba(8, 21, 40, 1)",
    marginHorizontal: 20,
    borderRadius: 100,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 2,
    marginTop: 10,
    height: 68,
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  bottomNav: {
    flexDirection: "row",
    height: 62,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#efefef",
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    elevation: 2,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  tabLabel: {
    fontSize: 10,
    color: "#222",
    marginTop: 2,
  },
  popupOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  popupCard: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 28,
    borderRadius: 18,
    alignItems: "center",
    elevation: 5,
  },
  checkCircle: {
    width: 102,
    height: 102,
    borderRadius: 51,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  checkMark: {
    fontSize: 52,
    color: "rgba(1, 0, 2, 1)",
    fontWeight: "400",
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 5,
  },
  popupDesc: {
    fontSize: 16,
    color: "rgba(20, 32, 50, 1)",
    textAlign: "center",
    marginBottom: 20,
  },
  popupButton: {
    backgroundColor: "rgba(8, 21, 40, 1)",
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: 42,
    alignItems: "center",
    marginTop: 5,
    height: 68,
    width: 287,
  },
  popupButtonText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 20,
    fontWeight: "500",
    top: 5,
  },
});

export default DeleteScreen;
