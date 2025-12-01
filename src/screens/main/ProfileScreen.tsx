import React, { useState } from "react";
import { 
  View, Text, StyleSheet, TextInput, Image, TouchableOpacity, SafeAreaView 
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // <-- Import added
import MenuModal from "../../components/MenuModal";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";
// Dummy navigation bar icons – replace with your own!
const TAB_ICONS = [
  { key: "home", label: "Home", route: "Home", icon: require("../../../assets/icons/home.png") },
  { key: "notification", label: "Notification", route: "Notifications", icon: require("../../../assets/icons/notification.png") },
  { key: "checkout", label: "Checkout", route: "Checkout", icon: require("../../../assets/icons/checkout.png") },
  { key: "orders", label: "Orders", route: "Orders", icon: require("../../../assets/icons/orders.png") },
  { key: "menu", label: "Menu", route: "Menu", icon: require("../../../assets/icons/menu.png") },
];

const ProfileScreen = () => {
  const [name, setName] = useState("Pharm Aingo kwame");
  const [email, setEmail] = useState("madhu@gmail.com");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("2/4/67");
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation(); // <-- Fixed
  const [menuVisible, setMenuVisible] = useState(false);

  const handleTabPress = (key: string, route: string) => {
    if (key === "menu") {
      setMenuVisible(true);
    } else {
      // @ts-ignore
      navigation.navigate(route);
    }
  };

  return (
    <SwipeBackWrapper>
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Avatar */}
      <View style={styles.avatarBox}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          style={styles.avatarImg}
        />
        <TouchableOpacity style={styles.avatarCircle}>
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Pencil_icon.png" }}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Full name</Text>
        <TextInput
          style={[styles.input, styles.inputActive]}
          value={name}
          onChangeText={setName}
          placeholder="Full name"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Phone number</Text>
        <View style={styles.phoneRow}>
          <View style={styles.flagBox}>
            <Image
              source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.png" }}
              style={styles.flagIcon}
            />
            <Text style={styles.flagText}>+233</Text>
          </View>
          <TextInput
            style={[styles.input, styles.inputPhone]}
            placeholder="Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={setDob}
          placeholder="Date of Birth"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Save</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
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
  safeArea: { flex: 1, backgroundColor: "#f8f9fa", justifyContent: "flex-start" },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 18,
    height: 60,
  },
  backArrow: { fontSize: 23, color: "#1c1c1c", fontWeight: "bold", paddingRight: 2 },
  profileTitle: { fontSize: 20, fontWeight: "600", color: "rgba(55, 73, 87, 1)", textAlign: "center" },

  avatarBox: {
    alignItems: "center",
    position: "relative",
    marginBottom: 12,
    marginTop: 6,
  },
  avatarImg: { width: 116, height: 107, borderRadius: 20 },
  avatarCircle: {
    position: "absolute",
    right: 54,
    bottom: 2,
    width: 29,
    height: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  editIcon: { width: 19, height: 19 },

  formGroup: { paddingHorizontal: 20, marginTop: 2 },
  label: { color: "rgba(55, 73, 87, 1)", fontSize: 20, marginTop: 14, fontWeight: "400" },
  input: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    height: 68,
    borderRadius: 100,
    fontSize: 20,
    paddingHorizontal: 14,
    color: "rgba(55, 73, 87, 1)",
    marginTop: 5,
  },
  inputActive: { },
  phoneRow: { flexDirection: "row", alignItems: "center", marginBottom: 0, marginTop: 5 },
  flagBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 6,
    marginRight: 4,
    borderWidth: 1,
    borderColor: "#f3f3f7",
    height: 47,
    width: 104,
  },
  flagIcon: { width: 30, height: 29, marginRight: 5, borderRadius: 3 },
  flagText: { color: "#232323", fontWeight: "700", fontSize: 15 },
  inputPhone: { flex: 1, marginLeft: 7 },

  saveBtn: {
    backgroundColor: "rgba(8, 21, 40, 1)",
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 24,
    height: 68,
  },
  saveBtnText: { color: "rgba(255, 255, 255, 1)", fontWeight: "500", fontSize: 20, letterSpacing: 1, top: 3 },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 13,
    paddingTop: 6,
    paddingHorizontal: 12,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: -1 },
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  tabItem: { flex: 1, alignItems: "center", justifyContent: "center" },
  tabIcon: { width: 28, height: 28, marginBottom: 2 },
  tabLabel: { fontSize: 11, color: "#232323" },
});

export default ProfileScreen;
