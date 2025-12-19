import React, { useState } from "react";
import { 
  View, Text, StyleSheet, TextInput, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Modal, FlatList, Alert
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"; // <-- Import added
import MenuModal from "../../components/MenuModal";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";
import { launchImageLibrary, ImagePickerResponse, MediaType } from "react-native-image-picker";
import { scaleWidth, scaleHeight, scaleFont, scaleSize } from "../../utils/responsive";
// Dummy navigation bar icons – replace with your own!
const TAB_ICONS = [
  { key: "home", label: "Home", route: "Home", icon: require("../../../assets/icons/home.png") },
  { key: "notification", label: "Notification", route: "Notifications", icon: require("../../../assets/icons/notification.png") },
  { key: "checkout", label: "Checkout", route: "Checkout", icon: require("../../../assets/icons/checkout.png") },
  { key: "orders", label: "Orders", route: "Orders", icon: require("../../../assets/icons/orders.png") },
  { key: "menu", label: "Menu", route: "Menu", icon: require("../../../assets/icons/menu.png") },
];

const countries = [
  { code: "+233", flag: "🇬🇭", name: "Ghana", flagUrl: "https://flagcdn.com/w40/gh.png" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria", flagUrl: "https://flagcdn.com/w40/ng.png" },
  { code: "+254", flag: "🇰🇪", name: "Kenya", flagUrl: "https://flagcdn.com/w40/ke.png" },
  { code: "+27", flag: "🇿🇦", name: "South Africa", flagUrl: "https://flagcdn.com/w40/za.png" },
  { code: "+1", flag: "🇺🇸", name: "United States", flagUrl: "https://flagcdn.com/w40/us.png" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom", flagUrl: "https://flagcdn.com/w40/gb.png" },
  { code: "+33", flag: "🇫🇷", name: "France", flagUrl: "https://flagcdn.com/w40/fr.png" },
  { code: "+49", flag: "🇩🇪", name: "Germany", flagUrl: "https://flagcdn.com/w40/de.png" },
  { code: "+91", flag: "🇮🇳", name: "India", flagUrl: "https://flagcdn.com/w40/in.png" },
  { code: "+86", flag: "🇨🇳", name: "China", flagUrl: "https://flagcdn.com/w40/cn.png" },
];

const ProfileScreen = () => {
  const [name, setName] = useState("Pharm Aingo kwame");
  const [email, setEmail] = useState("madhu@gmail.com");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("2/4/67");
  const [modalVisible, setModalVisible] = useState(false);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

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

  const handlePickProfilePhoto = () => {
    const options = {
      mediaType: "photo" as MediaType,
      quality: 0.8 as const,
      includeBase64: false,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert("Error", response.errorMessage);
        return;
      }
      const uri = response.assets?.[0]?.uri;
      if (uri) setProfileImageUri(uri);
    });
  };

  return (
    <SwipeBackWrapper>
    <SafeAreaView style={styles.safeArea}>
    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    <View style={styles.container}>
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
          style={styles.backButton}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar */}
          <View style={styles.avatarBox}>
            <Image
              source={profileImageUri ? { uri: profileImageUri } : require("../../../assets/images/avatar.png")}
              style={styles.avatarImg}
            />
            <TouchableOpacity style={styles.avatarCircle} activeOpacity={0.8} onPress={handlePickProfilePhoto}>
              <Text style={styles.editIconText}>✎</Text>
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
              <TouchableOpacity 
                style={styles.flagBox}
                onPress={() => setCountryModalVisible(true)}
              >
                <Image
                  source={{ uri: selectedCountry.flagUrl }}
                  style={styles.flagIcon}
                />
                <Text style={styles.flagText}>{selectedCountry.code}</Text>
                <Text style={styles.dropdownArrow}>▼</Text>
              </TouchableOpacity>
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
        </ScrollView>
      </KeyboardAvoidingView>
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

    {/* Country Code Modal */}
    <Modal
      visible={countryModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setCountryModalVisible(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setCountryModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <TouchableOpacity onPress={() => setCountryModalVisible(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={countries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.countryItem,
                  selectedCountry.code === item.code && styles.countryItemSelected
                ]}
                onPress={() => {
                  setSelectedCountry(item);
                  setCountryModalVisible(false);
                }}
              >
                <Image
                  source={{ uri: item.flagUrl }}
                  style={styles.countryFlag}
                />
                <Text style={styles.countryName}>{item.name}</Text>
                <Text style={styles.countryCode}>{item.code}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
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

  headerRow: {
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
  profileTitle: { 
    flex: 1,
    fontSize: scaleFont(20), 
    fontWeight: "600", 
    color: "rgba(55, 73, 87, 1)", 
    textAlign: "center",
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: scaleHeight(100),
  },

  avatarBox: {
    alignItems: "center",
    position: "relative",
    marginBottom: scaleHeight(12),
    marginTop: scaleHeight(6),
  },
  avatarImg: { width: scaleWidth(116), height: scaleHeight(107), borderRadius: scaleSize(20) },
  avatarCircle: {
    position: "absolute",
    right: scaleWidth(54),
    bottom: scaleHeight(2),
    width: scaleSize(29),
    height: scaleSize(29),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: scaleSize(20),
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  editIconText: { fontSize: scaleFont(16), color: "#111827", fontWeight: "600", marginTop: scaleHeight(-1) },

  formGroup: { paddingHorizontal: scaleWidth(20), marginTop: scaleHeight(2) },
  label: { color: "rgba(55, 73, 87, 1)", fontSize: scaleFont(20), marginTop: scaleHeight(14), fontWeight: "400" },
  input: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    height: scaleHeight(68),
    borderRadius: scaleSize(100),
    fontSize: scaleFont(20),
    paddingHorizontal: scaleWidth(14),
    color: "rgba(55, 73, 87, 1)",
    marginTop: scaleHeight(5),
  },
  inputActive: { },
  phoneRow: { flexDirection: "row", alignItems: "center", marginBottom: 0, marginTop: scaleHeight(5) },
  flagBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: scaleSize(12),
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(6),
    marginRight: scaleWidth(4),
    borderWidth: 1,
    borderColor: "#f3f3f7",
    height: scaleHeight(47),
    minWidth: scaleWidth(110),
    justifyContent: "flex-start",
  },
  flagIcon: { width: scaleWidth(24), height: scaleHeight(18), marginRight: scaleWidth(8), borderRadius: scaleSize(2), resizeMode: "cover" },
  flagText: { color: "#232323", fontWeight: "700", fontSize: scaleFont(15), marginRight: scaleWidth(6) },
  dropdownArrow: {
    fontSize: scaleFont(8),
    color: "#232323",
    marginLeft: "auto",
  },
  inputPhone: { flex: 1, marginLeft: scaleWidth(7) },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: scaleSize(20),
    borderTopRightRadius: scaleSize(20),
    maxHeight: "70%",
    paddingBottom: scaleHeight(20),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scaleWidth(20),
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f7",
  },
  modalTitle: {
    fontSize: scaleFont(20),
    fontWeight: "600",
    color: "#232323",
  },
  modalClose: {
    fontSize: scaleFont(24),
    color: "#232323",
    fontWeight: "300",
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: scaleWidth(15),
    paddingHorizontal: scaleWidth(20),
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f7",
  },
  countryItemSelected: {
    backgroundColor: "#f9f9fa",
  },
  countryFlag: {
    width: scaleWidth(32),
    height: scaleHeight(24),
    borderRadius: scaleSize(3),
    marginRight: scaleWidth(12),
    resizeMode: "cover",
  },
  countryName: {
    flex: 1,
    fontSize: scaleFont(16),
    color: "#232323",
    fontWeight: "400",
  },
  countryCode: {
    fontSize: scaleFont(16),
    color: "#232323",
    fontWeight: "600",
    marginLeft: scaleWidth(10),
  },

  saveBtn: {
    backgroundColor: "rgba(8, 21, 40, 1)",
    borderRadius: scaleSize(100),
    paddingVertical: scaleHeight(16),
    alignItems: "center",
    marginHorizontal: scaleWidth(20),
    marginTop: scaleHeight(24),
    height: scaleHeight(68),
  },
  saveBtnText: { color: "rgba(255, 255, 255, 1)", fontWeight: "500", fontSize: scaleFont(20), letterSpacing: 1, top: scaleHeight(3) },

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

export default ProfileScreen;
