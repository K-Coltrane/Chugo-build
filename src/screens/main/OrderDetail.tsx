import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";

const OrderDetail = () => {
  const navigation = useNavigation();
  // Dummy order data -- replace with real data or props if needed
  const order = {
    name: "Beef sauce and goat",
    details: "x3 chugo bag • Pick-up",
    price: 574,
    provider: "Chiecknenman pizzaman",
    image: require("../../../assets/images/fries.png"),
    providerLogo: require("../../../assets/images/chicken.png"),
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
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Tracking</Text>
        <View style={{ width: 24 }} />
      </View>
      
      {/* CARD */}
      <View style={styles.cardOuter}>
        <View style={styles.cardInner}>
          {/* 1st row: image + name */}
          <View style={styles.row1}>
            <Image source={order.image} style={styles.imgInCard} />
            <Text style={styles.productTitle}>{order.name}</Text>
          </View>
          <View style={styles.dashedDivider} />
          {/* 2nd row: details */}
          <View style={styles.row2}>
            <Text style={styles.detailLabel}>Details</Text>
            <Text style={styles.detailValue}>{order.details}</Text>
          </View>
          {/* 3rd row: total label + value */}
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₵ {order.price}.00</Text>
          <View style={styles.dashedDivider} />
          {/* Last row: provider info & call */}
          <View style={styles.vendorRow}>
            <Image source={order.providerLogo} style={styles.providerLogo} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.providerName}>{order.provider}</Text>
              <View style={styles.vendorBadges}>
                <View style={styles.badgeGreen}>
                  <Text style={styles.badgeText}>4.4</Text>
                </View>
                <View style={styles.badgeGrey}>
                  <Text style={styles.badgeTextGrey}>Verified</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.vendorCallBtn}>
              <Text style={styles.callBtnIcon}>📞</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* STATUS/STEPPER SECTION */}
      <View style={styles.stepperOuter}>
        {/* Step 1: Order Waiting */}
        <View style={styles.stepRow}>
          <View style={[styles.circle, styles.circleActive]}><Text style={styles.circleTick}>✓</Text></View>
          <View style={styles.stepMain}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <Text style={styles.stepTitleActive}>Order waiting</Text>
              <Text style={styles.stepTime}>12:00PM</Text>
            </View>
            <View style={styles.stepTimer}><Text style={styles.stepTimerText}>⏱ 00:00:00</Text></View>
          </View>
        </View>
        <View style={styles.verticalLine} />

        {/* Step 2: Scan to verify */}
        <View style={styles.stepRow}>
          <View style={styles.circle}><Text style={styles.circleDot}>•</Text></View>
          <View style={styles.stepMain}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <Text style={styles.stepTitle}>Scan to verify order</Text>
              <Text style={styles.stepTime}>00:00</Text>
            </View>
          </View>
        </View>
        <View style={styles.verticalLine} />

        {/* Step 3: Thank You */}
        <View style={styles.stepRow}>
          <View style={styles.circle}><Text style={styles.circleDot}>•</Text></View>
          <View style={styles.stepMain}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <Text style={styles.stepTitle}>Thank You</Text>
              <Text style={styles.stepTime}>00:00</Text>
            </View>
          </View>
        </View>
      </View>

      {/* VERIFY BUTTON */}
      <TouchableOpacity style={styles.verifyBtn}  onPress={() => {(navigation as any).navigate("VerifyScreen") }}>
        <Text style={styles.verifyBtnText}>Verify</Text>
      </TouchableOpacity>
      </View>
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
  // Header row
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 18,
    height: 60,
    marginTop: 20,  
  },
  backArrow: {
    fontSize: 28,
    color: "#1c1c1c",
    fontWeight: "300",
    lineHeight: 28,
  },
  header: { 
    flex: 1,
    fontSize: 20, 
    fontWeight: "600", 
    color: "rgba(55, 73, 87, 1)", 
    textAlign: "center",
    marginLeft: -24,
  },

  cardOuter: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 20,
    margin: 16,
    shadowColor: "#AAA",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardInner: {
    padding: 18,
    paddingBottom: 14,
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  imgInCard: {
    width: 84,
    height: 80,
    borderRadius: 20,
    
    marginRight: 9,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    flex: 1,
    fontFamily: "Inter"
  },
  dashedDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(100, 97, 97, 0.11)",
    borderStyle: "dashed",
    marginVertical: 7,
    marginTop: 10,
  },
  row2: { marginBottom: 3 },
  detailLabel: { fontSize: 20, color: "rgba(20, 32, 50, 1)", marginBottom: 1 },
  detailValue: { fontSize: 20, color: "rgba(20, 32, 50, 1)", fontWeight: "500", marginBottom: 7 },
  totalLabel: { fontSize: 20, color: "rgba(20, 32, 50, 1)", marginBottom: 1 },
  totalValue: { fontSize: 20, color: "rgba(20, 32, 50, 1)", fontWeight: "500", marginBottom: 2 },

  vendorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  providerLogo: {
    width: 69,
    height: 69,
    borderRadius: 17,
    borderColor: "rgba(184, 254, 34, 1)",
    borderWidth: 1,
 
  },
  providerName: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    marginBottom: 2,
  },
  vendorBadges: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 5,
  },
  badgeGreen: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 2,
  },
  badgeText: {
    color: "#2EA77C",
    fontSize: 11,
    fontWeight: "700",
  },
  badgeGrey: {
    backgroundColor: "#EEF2F6",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 4,
  },
  badgeTextGrey: {
    color: "#788993",
    fontSize: 11,
    fontWeight: "700",
  },
  vendorCallBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F4F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  callBtnIcon: { fontSize: 18 },

  // Stepper
  stepperOuter: {
    marginTop: 9,
    paddingHorizontal: 28,
    marginBottom: 20,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 43,
  },
  circle: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginRight: 12,
  },
  circleActive: {
    borderColor: "#FFD485",
    backgroundColor: "#FFD485",
  },
  circleTick: {
    color: "rgba(20, 32, 50, 1)",
    fontSize: 18,
    fontWeight: "400",
  },
  circleDot: {
    color: "#aaa",
    fontSize: 17,
    marginTop: -2,
  },
  stepMain: {
    flex: 1,
    flexDirection: "column",
    minHeight: 35,
    justifyContent: "center",
  },
  stepTitle: { fontSize: 15, color: "#22304F" },
  stepTitleActive: { fontSize: 15, color: "#22304F", fontWeight: "bold" },
  stepTime: { fontSize: 12, color: "#bcc2c8", marginLeft: 14 },
  stepTimer: { marginTop: 8, backgroundColor: "#F0F6F5", alignSelf: "flex-start", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2, },
  stepTimerText: { color: "#7DBE89", fontSize: 13, fontWeight: "600" },
  verticalLine: {
    width: 2,
    height: 29,
    backgroundColor: "#EEE",
    marginLeft: 10,
    marginBottom: 1,
    marginTop: 1,
    borderRadius: 2,
    alignSelf: "flex-start",
  },

  // Verify button
  verifyBtn: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 28,
    backgroundColor: "#101929",
    borderRadius: 80,
    alignItems: "center",
    paddingVertical: 18,
  },
  verifyBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default OrderDetail;
