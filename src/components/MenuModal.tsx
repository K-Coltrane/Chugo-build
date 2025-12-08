import React, { useRef, useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Define the expected navigation stack param list
export type RootStackParamList = {
  Profile: undefined;
  Privacy: undefined;
  FAQS: undefined;
  Terms: undefined;
  DeleteAccount: undefined;
  Logout: undefined; 
};

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const NAVBAR_HEIGHT = 56; // Adjust according to your bottom navbar height

interface MenuModalProps {
  visible: boolean;
  onClose: () => void;
  user?: { name: string; email: string; photo: any };
}

const MENU_OPTIONS = [
  { label: "Profile", icon: require("../../assets/icons/profile.png") },
  { label: "Privacy", icon: require("../../assets/icons/privacy.png") },
  { label: "FAQ's", icon: require("../../assets/icons/faqs.png") },
  { label: "T&C", icon: require("../../assets/icons/terms.png") },
  { label: "Delete Account", icon: require("../../assets/icons/delete.png") },
  { label: "Logout", icon: require("../../assets/icons/logout.png") },
];

const MenuModal: React.FC<MenuModalProps> = ({
  visible,
  onClose,
  user = {
    name: "Pharm A.k",
    email: "madhu@gmail.com",
    photo: require("../../assets/images/avatar.png"),
  },
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const sheetTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.timing(sheetTranslateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy > 5,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) sheetTranslateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 120) {
          Animated.timing(sheetTranslateY, {
            toValue: SCREEN_HEIGHT,
            duration: 200,
            useNativeDriver: true,
          }).start(onClose);
        } else {
          Animated.spring(sheetTranslateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handlePress = (label: string) => {
    if (label === "Logout") return setShowLogout(true);
    if (label === "Delete Account") {
      onClose();
      // Use push to create navigation history
      return (navigation as any).push("DeleteAccount");
    }

    onClose();
    // Small delay to allow modal to close before navigation
    setTimeout(() => {
      switch (label) {
        case "Profile":
          (navigation as any).push("Profile");
          break;
        case "Privacy":
          (navigation as any).push("Privacy");
          break;
        case "FAQ's":
          (navigation as any).push("FAQS");
          break;
        case "T&C":
          (navigation as any).push("Terms");
          break;
        default:
          break;
      }
    }, 100);
  };

  const confirmLogout = () => {
    setShowLogout(false);
    onClose();
    console.log("Log out confirmed.");
  };

  const renderGrid = () => {
    const rows = [];
    for (let i = 0; i < MENU_OPTIONS.length; i += 2) {
      rows.push(
        <View style={styles.optionRow} key={i}>
          {[MENU_OPTIONS[i], MENU_OPTIONS[i + 1]].map(
            (item, idx) =>
              item && (
                <TouchableOpacity
                  key={idx}
                  style={styles.optionCard}
                  onPress={() => handlePress(item.label)}
                  activeOpacity={0.8}
                >
                  <Image source={item.icon} style={styles.optionIcon} />
                  <Text style={styles.optionLabel}>{item.label}</Text>
                </TouchableOpacity>
              )
          )}
        </View>
      );
    }
    return rows;
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <>
        {/* Close menu if tapped outside sheet */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.sheet, { transform: [{ translateY: sheetTranslateY }] }]}
        >
          <View style={styles.handle} />
          <View style={styles.profileRow}>
            <Image source={user.photo} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.optionGrid}>{renderGrid()}</View>
        </Animated.View>

        {/* Logout popup */}
        {showLogout && (
          <TouchableWithoutFeedback onPress={() => setShowLogout(false)}>
            <View style={styles.popupOverlay}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.popup}>
                  <View style={styles.qCircle}>
                    <Text style={styles.qMark}>?</Text>
                  </View>
                  <Text style={styles.popupTitle}>You’ll be logged out</Text>
                  <Text style={styles.popupDesc}>Proceed to log out?</Text>
                  <TouchableOpacity style={styles.confirmBtn} onPress={confirmLogout}>
                    <Text style={styles.confirmText}>Yes, Logout</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        )}
      </>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.06)",
    zIndex: 1,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 65,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 16,
    minHeight: 340,
    zIndex: 2,
  },
  handle: {
    width: 50,
    height: 6,
    borderRadius: 6,
    backgroundColor: "#eee",
    alignSelf: "center",
    marginBottom: 18,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: { width: 52, height: 52, borderRadius: 15, marginRight: 16 },
  name: { fontSize: 15, fontWeight: "600", color: "#232323", marginBottom: 2 },
  email: { fontSize: 14, color: "#a5a5a5" },
  optionGrid: {},
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  optionCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9fa",
    borderRadius: 16,
    marginHorizontal: 4,
    paddingVertical: 14,
    paddingHorizontal: 13,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2.5,
    shadowOffset: { width: 0, height: 1 },
  },
  optionIcon: { width: 22, height: 22, marginRight: 13 },
  optionLabel: { fontSize: 15, fontWeight: "500", color: "#232323" },
  popupOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  popup: {
    backgroundColor: "rgba(246, 246, 246, 1)",
    width: 325,
    height: 411,
    padding: 30,
    borderRadius: 18,
    alignItems: "center",
  },
  qCircle: {
    width: 102,
    height: 102,
    borderRadius: 51,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 30,
  },
  qMark: { fontSize: 40, fontWeight: "300", color: "rgba(0, 0, 0, 1)", textAlign: "center" },
  popupTitle: { fontSize: 20, fontWeight: "500", marginBottom: 7, color: "rgba(20, 32, 50, 1)" },
  popupDesc: { fontSize: 16, color: "rgba(20, 32, 50, 1)", marginBottom: 22, textAlign: "center" },
  confirmBtn: {
    backgroundColor: "rgba(8, 21, 40, 1)",
    width: 287,
    height: 68,
    paddingVertical: 12,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 30,
  },
  confirmText: { color: "rgba(255, 255, 255, 1)", fontSize: 20, fontWeight: "500", bottom: -5 },
});

export default MenuModal;
