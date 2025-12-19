import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";
import { scaleWidth, scaleHeight, scaleFont, scaleSize } from "../../utils/responsive";

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
          style={styles.backButton}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Tracking</Text>
        <View style={{ width: scaleWidth(24) }} />
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
            <View style={{ flex: 1, marginLeft: scaleWidth(10) }}>
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
    padding: scaleWidth(14),
    backgroundColor: "rgba(246, 246, 246, 1)",
  },
  // Header row
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
  header: { 
    flex: 1,
    fontSize: scaleFont(20), 
    fontWeight: "600", 
    color: "rgba(55, 73, 87, 1)", 
    textAlign: "center",
  },

  cardOuter: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: scaleSize(20),
    
    shadowColor: "#AAA",
    shadowOpacity: 0.08,
    shadowRadius: scaleSize(8),
    elevation: 3,
    width: "100%",
    marginBottom: scaleHeight(50),
    
  },
  cardInner: {
    padding: scaleWidth(18),
    paddingBottom: scaleHeight(14),
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(6),
  },
  imgInCard: {
    width: scaleWidth(84),
    height: scaleHeight(80),
    borderRadius: scaleSize(20),
    
    marginRight: scaleWidth(9),
  },
  productTitle: {
    fontSize: scaleFont(20),
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    flex: 1,
    fontFamily: "Inter"
  },
  dashedDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(100, 97, 97, 0.11)",
    borderStyle: "dashed",
    marginVertical: scaleHeight(7),
    marginTop: scaleHeight(10),
  },
  row2: { marginBottom: scaleHeight(3) },
  detailLabel: { fontSize: scaleFont(20), color: "rgba(20, 32, 50, 1)", marginBottom: scaleHeight(1) },
  detailValue: { fontSize: scaleFont(20), color: "rgba(20, 32, 50, 1)", fontWeight: "500", marginBottom: scaleHeight(7) },
  totalLabel: { fontSize: scaleFont(20), color: "rgba(20, 32, 50, 1)", marginBottom: scaleHeight(1) },
  totalValue: { fontSize: scaleFont(20), color: "rgba(20, 32, 50, 1)", fontWeight: "500", marginBottom: scaleHeight(2) },

  vendorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(6),
  },
  providerLogo: {
    width: scaleSize(69),
    height: scaleSize(69),
    borderRadius: scaleSize(17),
    borderColor: "rgba(184, 254, 34, 1)",
    borderWidth: 1,
 
  },
  providerName: {
    fontSize: scaleFont(20),
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    marginBottom: scaleHeight(2),
  },
  vendorBadges: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleWidth(4),
    marginTop: scaleHeight(5),
  },
  badgeGreen: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: scaleWidth(6),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleSize(9),
    flexDirection: "row",
    alignItems: "center",
    marginRight: scaleWidth(2),
  },
  badgeText: {
    color: "#2EA77C",
    fontSize: scaleFont(11),
    fontWeight: "700",
  },
  badgeGrey: {
    backgroundColor: "#EEF2F6",
    paddingHorizontal: scaleWidth(7),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleSize(10),
    marginLeft: scaleWidth(4),
  },
  badgeTextGrey: {
    color: "#788993",
    fontSize: scaleFont(11),
    fontWeight: "700",
  },
  vendorCallBtn: {
    width: scaleSize(48),
    height: scaleSize(48),
    borderRadius: scaleSize(24),
    backgroundColor: "#F4F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: scaleWidth(10),
  },
  callBtnIcon: { fontSize: scaleFont(18) },

  // Stepper
  stepperOuter: {
    marginTop: scaleHeight(13),
    paddingHorizontal: scaleWidth(28),
    marginBottom: scaleHeight(20),
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: scaleHeight(43),
  },
  circle: {
    width: scaleSize(23),
    height: scaleSize(23),
    borderRadius: scaleSize(12),
    borderWidth: 2,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginRight: scaleWidth(12),
  },
  circleActive: {
    borderColor: "#FFD485",
    backgroundColor: "#FFD485",
  },
  circleTick: {
    color: "rgba(20, 32, 50, 1)",
    fontSize: scaleFont(18),
    fontWeight: "400",
  },
  circleDot: {
    color: "#aaa",
    fontSize: scaleFont(17),
    marginTop: scaleHeight(-2),
  },
  stepMain: {
    flex: 1,
    flexDirection: "column",
    minHeight: scaleHeight(35),
    justifyContent: "center",
  },
  stepTitle: { fontSize: scaleFont(15), color: "#22304F" },
  stepTitleActive: { fontSize: scaleFont(15), color: "#22304F", fontWeight: "bold" },
  stepTime: { fontSize: scaleFont(12), color: "#bcc2c8", marginLeft: scaleWidth(14) },
  stepTimer: { marginTop: scaleHeight(8), backgroundColor: "#F0F6F5", alignSelf: "flex-start", borderRadius: scaleSize(6), paddingHorizontal: scaleWidth(6), paddingVertical: scaleHeight(2), },
  stepTimerText: { color: "#7DBE89", fontSize: scaleFont(13), fontWeight: "600" },
  verticalLine: {
    width: scaleWidth(2),
    height: scaleHeight(29),
    backgroundColor: "#EEE",
    marginLeft: scaleWidth(10),
    marginBottom: scaleHeight(1),
    marginTop: scaleHeight(1),
    borderRadius: scaleSize(2),
    alignSelf: "flex-start",
  },

  // Verify button
  verifyBtn: {
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(20),
    marginHorizontal: scaleWidth(28),
    backgroundColor: "#101929",
    borderRadius: scaleSize(80),
    alignItems: "center",
    paddingVertical: scaleHeight(18),
  },
  verifyBtnText: {
    color: "#fff",
    fontSize: scaleFont(18),
    fontWeight: "500",
  },
});

export default OrderDetail;
