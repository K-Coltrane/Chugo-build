import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from "react-native";

const OTP = ({ navigation }: any) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(30); // countdown starts from 30
  const [canResend, setCanResend] = useState(false);

  // Handle OTP input
  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  // Countdown timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Resend code handler
  const handleResend = () => {
    // your resend OTP logic here (API call, etc.)
    setTimer(30);
    setCanResend(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    <View style={styles.container}>
      {/* Top section with circle accent */}
      <View style={styles.header}>
        <View style={styles.circleAccent1} />
        <View style={styles.circleAccent2} />
        <View style={styles.circleAccent3} />
        <Text style={styles.title}>OTP Login</Text>
      </View>

      {/* Registration Card */}
      <View style={styles.card}>
        {/* OTP Boxes */}
        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              style={styles.otpBox}
              keyboardType="number-pad"
              maxLength={1}
              value={value}
              onChangeText={(text) => handleOtpChange(text, index)}
            />
          ))}
        </View>

        {/* Timer Section (below boxes) */}
        <View style={styles.timerContainer}>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>Resend Code</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timerText}>Resend in {timer}s</Text>
          )}
        </View>

        <TouchableOpacity style={styles.registerBtn}>
          <Text style={styles.registerBtnText}>Verify OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.useBtn}onPress={() => navigation.navigate('Login')}>
          <Text style={styles.useBtnText}>Use Email Login</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Don’t have an account? <Text style={styles.loginLink }onPress={() => navigation.navigate('Signup')}>Register</Text>
        </Text>
      </View>
    </View>
    </>
  );
};

export default OTP;

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
    height: 246,
    borderRadius: 135.5,
    backgroundColor: "rgb(39, 49, 66)",
    opacity: 0.25,
  },
  circleAccent2: {
    position: "absolute",
    top: -110,
    left: -130,
    width: 315,
    height: 288,
    borderRadius: 144,
    backgroundColor: "rgb(29, 40, 58)",
    opacity: 0.25,
  },
  circleAccent3: {
    position: "absolute",
    top: -130,
    left: -130,
    width: 377,
    height: 377,
    borderRadius: 188.5,
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
  card: {
    marginTop: 32,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 18,
    flex: 1,
    alignItems: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 90,
    width: 380,
  },
  otpBox: {
    width: 65,
    height: 68,
    backgroundColor: "rgba(245, 245, 245, 1)",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
    color: "#324658",
    fontWeight: "600",
    
  },
  timerContainer: {
    marginTop: 20,
  },
  timerText: {
    fontSize: 16,
    color: "rrgba(55, 73, 87, 1)",
    fontWeight: "500",
  },
  resendText: {
    fontSize: 16,
    color: "rgba(55, 73, 87, 1)",
    fontWeight: "700",
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
