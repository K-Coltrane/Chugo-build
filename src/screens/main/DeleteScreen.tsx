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
        <Text style={styles.headerTitle}>Delete account</Text>
        <View style={{ width: scaleWidth(24) }} />
      </View>

      {/* Prompt Card & Input */}
      <KeyboardAvoidingView
        style={styles.flexGrowArea}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={scaleHeight(120)}
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

      {/* Delete Button */}
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
  header: {
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
    fontSize: scaleFont(20),
    fontWeight: "600",
    color: "rgba(55, 73, 87, 1)",
    textAlign: "center",
  },
  flexGrowArea: {
    flex: 1,
    padding: scaleWidth(16),
    paddingBottom: 0,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: scaleSize(20),
    padding: scaleWidth(24),
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: scaleSize(4),
    shadowOffset: { width: 0, height: scaleHeight(2) },
    elevation: 2,
    alignItems: "center",
    minHeight: scaleHeight(250),
    justifyContent: "center",
  },
  promptTitle: {
    fontSize: scaleFont(20),
    fontWeight: "400",
    marginBottom: scaleHeight(8),
    color: "rgba(55, 73, 87, 1)",
    textAlign: "center",
  },
  promptSub: {
    fontSize: scaleFont(16),
    fontWeight: "400",
    marginBottom: scaleHeight(16),
    color: "rgba(55, 73, 87, 0.68)",
    textAlign: "center",
  },
  inputBox: {
    width: "100%",
    backgroundColor: "rgba(244, 244, 246, 1)",
    borderRadius: scaleSize(100),
    fontSize: scaleFont(20),
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(10),
    color: "rgba(55, 73, 87, 0.37)",
    fontWeight: "400",
    letterSpacing: 1,
    height: scaleHeight(68),
  },
  bottomContainer: {
    backgroundColor: "transparent",
  },
  deleteButton: {
    backgroundColor: "rgba(8, 21, 40, 1)",
    marginHorizontal: scaleWidth(20),
    borderRadius: scaleSize(100),
    paddingVertical: scaleHeight(14),
    alignItems: "center",
    marginBottom: scaleHeight(2),
    marginTop: scaleHeight(10),
    height: scaleHeight(68),
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: scaleFont(20),
    fontWeight: "500",
    letterSpacing: 0.5,
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
    padding: scaleWidth(28),
    borderRadius: scaleSize(18),
    alignItems: "center",
    elevation: 5,
  },
  checkCircle: {
    width: scaleSize(102),
    height: scaleSize(102),
    borderRadius: scaleSize(51),
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scaleHeight(14),
  },
  checkMark: {
    fontSize: scaleFont(52),
    color: "rgba(1, 0, 2, 1)",
    fontWeight: "400",
  },
  popupTitle: {
    fontSize: scaleFont(20),
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    textAlign: "center",
    marginBottom: scaleHeight(10),
    marginTop: scaleHeight(5),
  },
  popupDesc: {
    fontSize: scaleFont(16),
    color: "rgba(20, 32, 50, 1)",
    textAlign: "center",
    marginBottom: scaleHeight(20),
  },
  popupButton: {
    backgroundColor: "rgba(8, 21, 40, 1)",
    borderRadius: scaleSize(100),
    paddingVertical: scaleHeight(14),
    paddingHorizontal: scaleWidth(42),
    alignItems: "center",
    marginTop: scaleHeight(5),
    height: scaleHeight(68),
    width: scaleWidth(287),
  },
  popupButtonText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: scaleFont(20),
    fontWeight: "500",
    top: scaleHeight(5),
  },
});

export default DeleteScreen;
