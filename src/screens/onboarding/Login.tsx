import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import emailIcon from "../../../assets/icons/mail_icon.png";
import lockIcon from "../../../assets/icons/password_icon.png";
import { scaleWidth, scaleHeight, scaleFont, scaleSize } from "../../utils/responsive";
const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : scaleHeight(20)}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top section with circle accent */}
        <View style={styles.header}>
          <View style={styles.circleAccent1} />
          <View style={styles.circleAccent2} />
          <View style={styles.circleAccent3} />
          <Text style={styles.title}>Welcome Back!</Text>
         
        </View>

        {/* Registration Card */}
        <View style={styles.card}>
          {/* Inputs */}
          <View>
            <View style={styles.inputRow}>
              <Image source={emailIcon} style={styles.icon} />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
                placeholderTextColor="#7B7B7B"
              />
            </View>
            <View style={styles.inputRow}>
              <Image source={lockIcon} style={styles.icon} />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#7B7B7B"
              />
            </View>
          </View>

          {/* Actions (kept low to match Signup's button position) */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.registerBtn}>
              <Text style={styles.registerBtnText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.useBtn} onPress={() => navigation.navigate("UseOTP")}>
              <Text style={styles.useBtnText}>Use OTP Login</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}>
              Don't have an account?{" "}
              <Text style={styles.loginLink} onPress={() => navigation.navigate("Signup")}>
                Register
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(8, 21, 40, 1)",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: scaleHeight(16),
  },
  header: {
    height: scaleHeight(300),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  circleAccent1: {
    position: "absolute",
    top: scaleHeight(-110),
    left: scaleWidth(-130),
    width: scaleWidth(271),
    height: scaleHeight(246),
    borderRadius: scaleSize(135.5),
    backgroundColor: "rgb(39, 49, 66)",
    opacity: 0.25,
  },
  circleAccent2: {
    position: "absolute",
    top: scaleHeight(-110),
    left: scaleWidth(-130),
    width: scaleWidth(315),
    height: scaleHeight(288),
    borderRadius: scaleSize(144),
    backgroundColor: "rgb(29, 40, 58)",
    opacity: 0.25,
  },
  circleAccent3: {
     position: "absolute",
    top: scaleHeight(-130),
    left: scaleWidth(-130),
    width: scaleWidth(377),
    height: scaleHeight(377),
    borderRadius: scaleSize(188.5),
    backgroundColor: "rgb(19, 31, 49)",
    opacity: 0.25,
  },
  title: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: scaleFont(32),
    fontWeight: "700",
    marginTop: scaleHeight(54),
    textAlign: "center",
    fontFamily: "Inter",
  },
  subtitle: {
    color: "rgba(217, 217, 217, 1)",
    fontSize: scaleFont(20),
    marginTop: scaleHeight(7),
    textAlign: "center",
    fontFamily: "Inter",
    fontWeight: "300"
  
  },
  card: {
    marginTop: scaleHeight(64),
    backgroundColor: "#fff",
    borderTopLeftRadius: scaleSize(20),
    borderTopRightRadius: scaleSize(20),
    paddingVertical: scaleHeight(24),
    paddingHorizontal: scaleWidth(20),
    flex: 1,
    alignItems: "stretch",
    width: "100%",
    alignSelf: "stretch",
    justifyContent: "space-between",
      },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 245, 245, 1)",
    borderRadius: scaleSize(100),
    width: "100%",
    height: scaleHeight(68),
    paddingHorizontal: scaleWidth(12),
    marginVertical: scaleHeight(7),
  },
  icon: {
    fontSize: 18,
    marginRight: scaleWidth(10),
    width: scaleSize(28),
    height: scaleSize(26),
  },
  input: {
    flex: 1,
    fontSize: scaleFont(15),
    color: "#324658",
    height: scaleHeight(46),
    fontFamily: "System",
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(10),
    width: "100%",
    alignSelf: "flex-start",
  },
  termsText: {
    marginLeft: scaleWidth(2),
    color: "rgba(55, 73, 87, 1)",
    fontFamily: "Inter",
    fontSize: scaleFont(15),
  },
  linkText: {
    fontWeight: "bold",
    color: "rgba(55, 73, 87, 1)",
    fontFamily: "Inter",
    fontSize: scaleFont(15),
  },
  registerBtn: {
    backgroundColor: "rgba(184, 254, 34, 1)",
    borderRadius: scaleSize(100),
    width: "100%",
    height: scaleHeight(68),
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(8),
  },
  registerBtnText: {
    color: "rgba(55, 73, 87, 1)",
    fontWeight: "600",
    fontSize: scaleFont(20),
    fontFamily: "Inter",
  },
   useBtn: {
    backgroundColor: "rgba(245, 245, 245, 1)",
    borderRadius: scaleSize(100),
    width: "100%",
    height: scaleHeight(68),
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaleHeight(12),
    marginBottom: scaleHeight(8),
  },
  useBtnText: {
    color: "rgba(55, 73, 87, 1)",
    fontWeight: "600",
    fontSize: scaleFont(20),
    fontFamily: "Inter",
  },
  actions: {
    paddingTop: scaleHeight(10),
  },
  loginText: {
    fontSize: scaleFont(15),
    color: "rgba(55, 73, 87, 1)",
    marginTop: scaleHeight(4),
    textAlign: "center",
    fontFamily: "Inter",
  },
  loginLink: {
    textDecorationLine: "underline",
    color: "rgba(55, 73, 87, 1)",
    fontWeight: "bold",
    fontFamily: "Inter",
  },
});
