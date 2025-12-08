import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, StatusBar } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import phoneIcon from "../../../assets/icons/phone_icon.png";
const UseOTP = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    <View style={styles.container}>
      {/* Top section with circle accent */}
      <View style={styles.header}>
        <View style={styles.circleAccent1} />
        <View style={styles.circleAccent2} />
        <View style={styles.circleAccent3} />
        <Text style={styles.title}>Welcome Back!</Text>
       
      </View>

      {/* Registration Card */}
      <View style={styles.card}>
        
        <View style={styles.inputRow}>
                  <Image source={phoneIcon} style={styles.icon} />
                 <TextInput
                   placeholder="Number"
                   value={number}
                   onChangeText={setNumber}
                   keyboardType="phone-pad"
                   style={styles.input}
                   placeholderTextColor="#7B7B7B"
                 />
               </View>
       
                <Text style={styles.subtitle}>
                       We will send a verification code to the number if its in our
                        system.
                      </Text>


        <TouchableOpacity style={styles.registerBtn}>
          <Text style={styles.registerBtnText} onPress={() => navigation.navigate('OTP')}>Send OTP</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.useBtn}>
          <Text style={styles.useBtnText} onPress={() => navigation.navigate('Login')}>Use Email Login</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Don't have an account? <Text style={styles.loginLink} onPress={() => navigation.navigate('Signup')}>Register</Text>
        </Text>
      </View>
    </View>
    </>
  );
};

export default UseOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(8, 21, 40, 1)",
  },
  header: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  circleAccent1: {
    position: "absolute",
    top: -110,
    left: -130,
    width: 271,
    height:246,
    borderRadius:135.5,
    backgroundColor: "rgb(39, 49, 66)",
    opacity: 0.25,
  },
  circleAccent2: {
    position: "absolute",
    top: -110,
    left: -130,
    width: 315,
    height:288,
    borderRadius:144,
    backgroundColor: "rgb(29, 40, 58)",
    opacity: 0.25,
  },
  circleAccent3: {
     position: "absolute",
    top: -130,
    left: -130,
    width: 377,
    height:377,
    borderRadius:188.5,
    backgroundColor: "rgb(19, 31, 49)",
    opacity: 0.25,
  },
  title: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 54,
    textAlign: "center",
    fontFamily: "Inter",
  },
  subtitle: {
    color: "rgba(55, 73, 87, 1)",
    fontSize: 20,
    marginTop: 7,
    textAlign: "center",
    fontFamily: "Inter",
    fontWeight: "400"
  
  },
  card: {
    marginTop: 32,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 18,
    flex: 1,
    alignItems: "center",
      },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 245, 245, 1)",
    borderRadius: 100,
    width: 391,
    height: 68,
    marginVertical: 7,
    paddingHorizontal: 12,
    marginTop: 80,
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
    width: 28,
    height: 26,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#324658",
    height: 46,
    fontFamily: "System",
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    alignSelf: "flex-start",
  },
  termsText: {
    marginLeft: 2,
    color: "rgba(55, 73, 87, 1)",
    fontFamily: "Inter",
    fontSize: 15,
  },
  linkText: {
    fontWeight: "bold",
    color: "rgba(55, 73, 87, 1)",
    fontFamily: "Inter",
    fontSize: 15,
  },
  registerBtn: {
    backgroundColor: "rgba(184, 254, 34, 1)",
    borderRadius: 100,
    width: 391,
    height: 68,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 8,
  },
  registerBtnText: {
    color: "rgba(55, 73, 87, 1)",
    fontWeight: "600",
    fontSize: 20,
    fontFamily: "Inter",
  },
   useBtn: {
    backgroundColor: "rgba(245, 245, 245, 1)",
    borderRadius: 100,
    width: 391,
    height: 68,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  useBtnText: {
    color: "rgba(55, 73, 87, 1)",
    fontWeight: "600",
    fontSize: 20,
    fontFamily: "Inter",
  },
  loginText: {
    fontSize: 15,
    color: "rgba(55, 73, 87, 1)",
    marginTop: -5,
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
