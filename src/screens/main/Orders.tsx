import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from "react-native";
import MenuModal from '../../components/MenuModal';
import SwipeBackWrapper from "../../components/SwipeBackWrapper";

const orders = [
  {
    id: "1",
    name: "Beef sauce and goat...",
    price: "₵ 574.00",
    image: require("../../../assets/images/fries.png"),
    orderNo: 1,
  },
  {
    id: "2",
    name: "Beef sauce and goat...",
    price: "₵ 572.00",
    image: require("../../../assets/images/chicken.png"),
    orderNo: 2,
  },
];

const TAB_ICONS = [
  { key: "home", label: "Home", route: "Home", icon: require("../../../assets/icons/home.png") },
  { key: "notification", label: "Notification", route: "Notification", icon: require("../../../assets/icons/notification.png") },
  { key: "checkout", label: "Checkout", route: "Checkout", icon: require("../../../assets/icons/checkout.png") },
  { key: "orders", label: "Orders", route: "Orders", icon: require("../../../assets/icons/orders.png") },
  { key: "menu", label: "Menu", route: "Menu", icon: require("../../../assets/icons/menu.png") },
];

const Orders = ({ navigation }: { navigation: any }) => {

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SwipeBackWrapper>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chugo orders</Text>
        </View>
        <Text style={styles.sectionTitle}>My</Text>
        <Text style={styles.sectionSubtitle}>Chugo orders</Text>
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}>
              <View style={styles.orderCard}>
                <Image source={item.image} style={styles.orderImage} />
                <View style={styles.orderDetails}>
                  <Text style={styles.orderName}>{item.name}</Text>
                  <Text style={styles.orderPrice}>{item.price}</Text>
                </View>
                <Text style={styles.orderNo}>#{item.orderNo}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
        <View style={styles.bottomNav}>
          {TAB_ICONS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={
                tab.key === "menu"
                  ? () => setMenuVisible(true)
                  : () => navigation.navigate(tab.route)
              }
            >
              <Image source={tab.icon} style={styles.tabIconImg} />
              <Text style={styles.tabLabel}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
      </View>
    </SafeAreaView>
    </SwipeBackWrapper>
  );
};

export default Orders;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8F9FA" },
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 6,
    backgroundColor: "rgba(246, 246, 246, 1)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
    marginTop: 8,
  },
  backArrow: {
    fontSize: 34,
    color: "#101C2A",
    marginRight: 12,
    fontWeight: "100",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: "rgba(55, 73, 87, 1)",
    fontWeight: "400",
    marginLeft: -34, 
    fontFamily: "Inter",
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    marginTop: 0,
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 32,
    fontWeight: "200",
    color: "rgba(20, 32, 50, 1)",
    marginBottom: 10,
  },
  orderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    height: 107,
  },
  orderImage: {
    width: 84,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  orderDetails: { flex: 1 },
  orderName: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    marginBottom: 3,
    fontFamily: "Inter"
  },
  orderPrice: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
  },
  orderNo: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(55, 73, 87, 1)",
    marginLeft: 6,
  },
  bottomNav: {
    width: "100%",
    height: 65,
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
    fontSize: 11,
    color: "#949CA6",
  },
  tabIconImg: {
    width: 25,
    height: 25,
    marginBottom: 3,
    resizeMode: "contain",
  },
});
