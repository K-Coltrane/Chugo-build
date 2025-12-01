import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  VerifyScreen: undefined;
  TrackingScreen: undefined;
  [key: string]: undefined;
};

const TrackingScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  return (
  <SafeAreaView style={styles.safeArea}>
    {/* MAIN CONTENT */}
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tracking</Text>
        <View style={{ width: 32 }} />
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
      <View style={styles.progressRow}>
        <Text style={styles.progressItem}>Order waiting</Text>
        <Text style={styles.progressTime}>12:00PM</Text>
      </View>

      <View style={styles.progressRow}>
        <Text style={styles.progressItem}>Verify your secret code</Text>
        <View style={styles.secretCodeRow}>
          {["#", "#", "#", "#"].map((x, i) => (
            <Text key={i} style={styles.codeBox}>
              {x}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.progressRow}>
        <Text style={styles.progressItem}>Thank You</Text>
      </View>

      {/* VERIFY BUTTON */}
      <TouchableOpacity
        style={styles.verifyBtn}
        onPress={() => {navigation.navigate("VerifyScreen"); console.log("Verify button pressed")}}
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
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: "#F7F8FA",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
    marginTop: 10,
  },
  backArrow: {
    fontSize: 32,
    color: "#101C2A",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: "#949CA6",
    marginLeft: -32,
  },

  trackCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 11,
    marginBottom: 8,
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#ECECEC",
    marginRight: 8,
  },
  mealName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222B45",
  },
  trackDetails: {
    marginTop: 8,
    fontWeight: "500",
    fontSize: 13,
    color: "#959CA6",
  },
  trackDesc: {
    fontSize: 13,
    color: "#222B45",
    marginBottom: 4,
  },
  trackTotalTitle: {
    marginTop: 4,
    fontWeight: "500",
    fontSize: 13,
    color: "#959CA6",
  },
  trackTotal: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222B45",
    marginBottom: 12,
  },

  sellerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  vendorLogo: {
    width: 28,
    height: 28,
    borderRadius: 12,
    marginRight: 7,
  },
  vendorName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222B45",
    marginRight: 5,
  },
  vendorStatus: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6FCF97",
  },

  callRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    marginBottom: 3,
  },
  callBtn: {
    backgroundColor: "#F3F7FA",
    paddingVertical: 5,
    paddingHorizontal: 19,
    borderRadius: 12,
    marginRight: 12,
  },
  callText: {
    fontSize: 15,
    color: "#222B45",
    fontWeight: "500",
  },
  timeText: {
    fontSize: 15,
    color: "#222B45",
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
    alignItems: "center",
  },
  progressItem: {
    fontSize: 13,
    color: "#222B45",
    fontWeight: "400",
  },
  progressTime: {
    fontSize: 13,
    color: "#959CA6",
  },

  secretCodeRow: {
    flexDirection: "row",
    marginLeft: 10,
  },
  codeBox: {
    backgroundColor: "#F7F8FA",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginHorizontal: 2,
    fontSize: 21,
    color: "#222B45",
  },

  verifyBtn: {
    backgroundColor: "#222B45",
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  verifyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  bottomNav: {
    height: 65,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#E2E3E4",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    fontSize: 22,
    color: "#949CA6",
    marginBottom: 1,
  },
  tabLabel: {
    fontSize: 11,
    color: "#949CA6",
  },
});

export default TrackingScreen;
