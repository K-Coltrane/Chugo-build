import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";
import { scaleWidth, scaleHeight, scaleFont, scaleSize } from "../../utils/responsive";

type RootStackParamList = {
  VerifyScreen: undefined;
  TrackingScreen: undefined;
  [key: string]: undefined;
};

const TrackingScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  return (
    <SwipeBackWrapper>
      <SafeAreaView style={styles.safeArea}>
    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    {/* MAIN CONTENT */}
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
        <Text style={styles.headerTitle}>Tracking</Text>
        <View style={{ width: scaleWidth(24) }} />
      </View>

      {/* Track Card */}
      <View style={styles.trackCard}>
        <View style={styles.trackRow}>
          <Image
            source={require("../../../assets/images/fries.png")}
            style={styles.mealImage}
          />
          <Text style={styles.mealName}>Beef sauce and goat</Text>
        </View>

        <Text style={styles.trackDetails}>Details</Text>
        <Text style={styles.trackDesc}>x3 chugo bag • Pick-up</Text>

        <Text style={styles.trackTotalTitle}>Total</Text>
        <Text style={styles.trackTotal}>₵ 574.00</Text>

        <View style={styles.sellerRow}>
          <Image
            source={require("../../../assets/images/Chickenman.jpg")}
            style={styles.vendorLogo}
          />
          <Text style={styles.vendorName}>Chiecknman pizzaman</Text>
          <Text style={styles.vendorStatus}>🟢 Open</Text>
        </View>

        <View style={styles.callRow}>
          <TouchableOpacity style={styles.callBtn}>
            <Text style={styles.callText}>Call</Text>
          </TouchableOpacity>
          <Text style={styles.timeText}>12:00</Text>
        </View>
      </View>

      {/* Progress */}
      <View style={[styles.progressRow, { marginTop: scaleHeight(24) }]}>
        <Text style={styles.progressItem}>Order waiting</Text>
        <Text style={styles.progressTime}>12:00PM</Text>
      </View>

      <View style={[styles.progressRow, { marginTop: scaleHeight(24) }]}>
        <Text style={styles.progressItem}>Verify your secret code</Text>
        <View style={styles.secretCodeRow}>
          {["#", "#", "#", "#"].map((x, i) => (
            <Text key={i} style={styles.codeBox}>
              {x}
            </Text>
          ))}
        </View>
      </View>

      <View style={[styles.progressRow, { marginTop: scaleHeight(24) }]}>
        <Text style={styles.progressItem}>Thank You</Text>
      </View>

      {/* VERIFY BUTTON */}
      <TouchableOpacity
        style={styles.verifyBtn}
        onPress={() => navigation.navigate("VerifyScreen")}
      >
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </View>

    
    <View style={styles.bottomNav}>
      {["Home", "Notification", "checkout", "Orders", "Menu"].map(label => (
        <TouchableOpacity key={label} style={styles.tabItem}>
          <Text style={styles.tabIcon}>⬤</Text>
          <Text style={styles.tabLabel}>{label}</Text>
        </TouchableOpacity>
      ))}
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

  headerRow: {
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
    textAlign: "center",
    fontSize: scaleFont(20),
    fontWeight: "600",
    color: "rgba(55, 73, 87, 1)",
  },

  trackCard: {
    backgroundColor: "#fff",
    borderRadius: scaleSize(16),
    padding: scaleWidth(11),
    marginBottom: scaleHeight(8),
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealImage: {
    width: scaleSize(48),
    height: scaleSize(48),
    borderRadius: scaleSize(10),
    backgroundColor: "#ECECEC",
    marginRight: scaleWidth(8),
  },
  mealName: {
    fontSize: scaleFont(15),
    fontWeight: "500",
    color: "#222B45",
  },
  trackDetails: {
    marginTop: scaleHeight(8),
    fontWeight: "500",
    fontSize: scaleFont(13),
    color: "#959CA6",
  },
  trackDesc: {
    fontSize: scaleFont(13),
    color: "#222B45",
    marginBottom: scaleHeight(4),
  },
  trackTotalTitle: {
    marginTop: scaleHeight(4),
    fontWeight: "500",
    fontSize: scaleFont(13),
    color: "#959CA6",
  },
  trackTotal: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: "#222B45",
    marginBottom: scaleHeight(12),
  },

  sellerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(7),
  },
  vendorLogo: {
    width: scaleSize(28),
    height: scaleSize(28),
    borderRadius: scaleSize(12),
    marginRight: scaleWidth(7),
  },
  vendorName: {
    fontSize: scaleFont(14),
    fontWeight: "500",
    color: "#222B45",
    marginRight: scaleWidth(5),
  },
  vendorStatus: {
    fontSize: scaleFont(12),
    fontWeight: "500",
    color: "#6FCF97",
  },

  callRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(7),
    marginBottom: scaleHeight(3),
  },
  callBtn: {
    backgroundColor: "#F3F7FA",
    paddingVertical: scaleHeight(5),
    paddingHorizontal: scaleWidth(19),
    borderRadius: scaleSize(12),
    marginRight: scaleWidth(12),
  },
  callText: {
    fontSize: scaleFont(15),
    color: "#222B45",
    fontWeight: "500",
  },
  timeText: {
    fontSize: scaleFont(15),
    color: "#222B45",
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    alignItems: "center",
  },
  progressItem: {
    fontSize: scaleFont(13),
    color: "#222B45",
    fontWeight: "400",
  },
  progressTime: {
    fontSize: scaleFont(13),
    color: "#959CA6",
  },

  secretCodeRow: {
    flexDirection: "row",
    marginLeft: scaleWidth(10),
  },
  codeBox: {
    backgroundColor: "#F7F8FA",
    borderRadius: scaleSize(6),
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(3),
    marginHorizontal: scaleWidth(2),
    fontSize: scaleFont(21),
    color: "#222B45",
  },

  verifyBtn: {
    backgroundColor: "#222B45",
    paddingVertical: scaleHeight(13),
    borderRadius: scaleSize(14),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(20),
  },
  verifyText: {
    color: "#fff",
    fontSize: scaleFont(16),
    fontWeight: "600",
  },

  bottomNav: {
    height: scaleHeight(65),
    backgroundColor: "#fff",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#E2E3E4",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scaleWidth(4),
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    fontSize: scaleFont(22),
    color: "#949CA6",
    marginBottom: scaleHeight(1),
  },
  tabLabel: {
    fontSize: scaleFont(11),
    color: "#949CA6",
  },
});

export default TrackingScreen;
