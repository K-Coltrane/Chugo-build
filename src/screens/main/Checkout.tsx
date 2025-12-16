import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, SafeAreaView, Modal, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
};

type RootStackParamList = {
  Orders: undefined;
};

const cartItemsInitial: CartItem[] = [
  {
    id: "1",
    name: "Beef sauce and goat...",
    price: 574,
    quantity: 1,
    image: require("../../../assets/images/fries.png"),
  },
  {
    id: "2",
    name: "Beef sauce and goat...",
    price: 572,
    quantity: 3,
    image: require("../../../assets/images/chicken.png"),
  },
];

const Checkout: React.FC = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<CartItem[]>(cartItemsInitial);
  const [promo, setPromo] = useState<string>("");

  const [showCardModal, setShowCardModal] = useState<boolean>(false);
  const [showMoMoModal, setShowMoMoModal] = useState<boolean>(false);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);

  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  const [networkType, setNetworkType] = useState<string>("");
  const [momoNumber, setMomoNumber] = useState<string>("");

  const updateQuantity = (id: string, diff: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + diff) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

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
          <Text style={styles.payment}>Payment</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Section title */}
        <Text style={styles.sectionTitle}>My</Text>
        <Text style={styles.sectionSubtitle}>Chugo list</Text>

        {/* Cart items */}
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={item.image} style={styles.cartImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{`₵ ${item.price.toFixed(2)}`}</Text>
              </View>
              <View style={styles.qtyControl}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, 1)}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, -1)}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          style={styles.cartList}
          showsVerticalScrollIndicator={false}
        />

        {/* Promo code */}
        <View style={styles.promoView}>
          <TextInput
            style={styles.promoInput}
            placeholder="Do you have any promo code ?"
            value={promo}
            onChangeText={setPromo}
            placeholderTextColor="#939393"
          />
        </View>

        {/* Summary */}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{`₵ ${subtotal.toFixed(2)}`}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>{`₵ ${total.toFixed(2)}`}</Text>
        </View>

        {/* Next button */}
        <TouchableOpacity style={styles.nextButton} onPress={() =>navigation.navigate("PaymentScreen" as never)}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>


      {/* CARD MODAL (Slide Up) */}
      <Modal visible={showCardModal} animationType="slide" transparent>
        <View style={styles.slideModalOverlay}>
          <View style={styles.slideModalBox}>
            <Text style={styles.modalTitle}>Enter Card Details</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Card number"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="number-pad"
              placeholderTextColor="#939393"
            />
            <View style={styles.modalRow}>
              <TextInput
                style={[styles.modalInput, { flex: 1, marginRight: 8 }]}
                placeholder="Expiry"
                value={expiry}
                onChangeText={setExpiry}
                keyboardType="number-pad"
                placeholderTextColor="#939393"
              />
              <TextInput
                style={[styles.modalInput, { flex: 1 }]}
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="number-pad"
                placeholderTextColor="#939393"
              />
            </View>
            <TouchableOpacity
              style={styles.modalSaveBtn}
              onPress={() => {
                setShowCardModal(false);
                setShowMoMoModal(true);
              }}>
              <Text style={styles.modalSaveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MOMO MODAL (Slide Up) */}
      <Modal visible={showMoMoModal} animationType="slide" transparent>
        <View style={styles.slideModalOverlay}>
          <View style={styles.slideModalBox}>
            <Text style={styles.modalTitle}>Enter Mobile Money Details</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Network type"
              value={networkType}
              onChangeText={setNetworkType}
              placeholderTextColor="#939393"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Mobile number"
              value={momoNumber}
              onChangeText={setMomoNumber}
              keyboardType="number-pad"
              placeholderTextColor="#939393"
            />
            <TouchableOpacity
              style={styles.modalSaveBtn}
              onPress={() => {
                setShowMoMoModal(false);
                setShowOrderModal(true);
              }}>
              <Text style={styles.modalSaveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ORDER SUCCESS MODAL (Slide Up) */}
      <Modal visible={showOrderModal} animationType="slide" transparent>
        <View style={styles.slideModalOverlay}>
          <View style={styles.slideModalBox}>
            <Text style={styles.orderCheckmark}>✓</Text>
            <Text style={styles.orderMessage}>Your order is successfully made</Text>
            <Text style={styles.orderDesc}>You can track your order in "Order Panel".</Text>
            <TouchableOpacity
              style={styles.modalSaveBtn}
              onPress={() => {
                setShowOrderModal(false);
                navigation.navigate('Orders' as never);
              }}>
              <Text style={styles.modalSaveBtnText}>Order Panel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
    </SwipeBackWrapper>
  );
};

export default Checkout;

// --------- Stylesheet below ----------
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 18,
    height: 60,
    marginTop: 20,  
  },
  backButton: {
    width: 30,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: -10,
  },
  backArrow: {
    fontSize: 42,
    color: "#1c1c1c",
    fontWeight: "700",
    lineHeight: 42,
  },
  payment: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(55, 73, 87, 1)",
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    marginTop: 10,
  },
  sectionSubtitle: {
    fontSize: 32,
    fontWeight: "200",
    color: "rgba(20, 32, 50, 1)",
    marginBottom: 12,
  },
  cartList: { marginBottom: 8 },
  cartItem: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 13,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  cartImage: {
    width: 84,
    height: 84,
    borderRadius: 20,
    marginRight: 12,
  },
  itemDetails: { flex: 1 },
  itemName: {
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(20, 32, 50, 1)",
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: "400",
    color: "rgba(20, 32, 50, 1)",
    fontFamily: 'Inter',
  },
  qtyControl: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(246, 246, 246, 1)",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 47,
    justifyContent: "space-between",
  },
  qtyBtn: {
    backgroundColor: "#fff",
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  qtyBtnText: { fontSize: 18, fontWeight: "700", color: "#3A465C" },
  qtyText: { fontSize: 16, fontWeight: "500", color: "#222B45" },
  promoView: {
    alignItems: "center",
    marginVertical: 18,
  },
  promoInput: {
    width: 386,
    height: 67,
    borderRadius: 14,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    fontSize: 16,
    color: "rgba(20, 32, 50, 1)",
    fontFamily: 'Inter',
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
    marginHorizontal: 6,
  },
  summaryLabel: {
    fontSize: 20,
    color: "rgba(20, 32, 50, 1)",
    fontWeight: "500",
    fontFamily: 'Inter',
  },
  summaryValue: {
    fontSize: 20,
    color: "rgba(20, 32, 50, 1)",
    fontWeight: "500",
    fontFamily: 'Inter',
  },
  nextButton: {
    marginTop: 16,
    backgroundColor: "rgba(8, 21, 40, 1)",
    paddingVertical: 15,
    borderRadius: 100,
    alignItems: "center",
    marginBottom: 12,
    height: 68,
  },
  nextButtonText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 1,
    fontFamily: "Inter",
    bottom: -2,
  },
  // ------------ SLIDE-UP MODAL STYLES -------------
  slideModalOverlay: {
    flex: 1,
    backgroundColor: "#65e7ae77",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  slideModalBox: {
    width: '100%',
    backgroundColor: "#fff",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 26,
    alignItems: "center",
    elevation: 8,
    minHeight: 320,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 18,
    color: "rgba(20, 32, 50, 1)",
  },
  modalInput: {
    width: "100%",
    height: 52,
    borderRadius: 14,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#222",
    fontFamily: 'Inter',
    marginBottom: 14,
  },
  modalRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 14,
    gap: 10,
  },
  modalSaveBtn: {
    backgroundColor: "rgba(8, 21, 40, 1)",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 36,
    marginTop: 8,
    width: "100%",
    alignItems: "center",
  },
  modalSaveBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Inter",
  },
  orderCheckmark: {
    fontSize: 42,
    marginBottom: 10,
    color: "#61D394",
  },
  orderMessage: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(20, 32, 50, 1)",
    marginBottom: 7,
    marginTop: 7,
    textAlign: "center",
  },
  orderDesc: {
    fontSize: 14,
    color: "#222",
    marginBottom: 16,
    textAlign: "center",
  },
});
