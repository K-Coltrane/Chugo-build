import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Modal,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";
import { scaleWidth, scaleHeight, scaleFont, scaleSize } from "../../utils/responsive";

interface PaymentMethod {
  id: string;
  type: "Credit" | "Momo";
  label: string;
  card?: string;
  phone?: string;
}

const initialMethods: PaymentMethod[] = [
  { id: "visa", type: "Credit", label: "VISA", card: "**** **** **** 5633" },
  { id: "momo", type: "Momo", label: "MTN", phone: "055 289 2433" },
  { id: "mastercard", type: "Credit", label: "MC", card: "**** **** **** 5633" },
];

const PaymentScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<"delivery" | "pickup">("delivery");
  const [momoModalVisible, setMomoModalVisible] = useState(false);
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialMethods);
  const [selectedMethodId, setSelectedMethodId] = useState<string>(initialMethods[0].id);

  // Form states
  const [momoNetwork, setMomoNetwork] = useState("");
  const [momoNumber, setMomoNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Add Momo
  const handleAddMomo = () => {
    if (momoNetwork && momoNumber) {
      setPaymentMethods((methods) => [
        ...methods,
        {
          id: `momo${methods.length}`,
          type: "Momo",
          label: momoNetwork,
          phone: momoNumber,
        },
      ]);
      setMomoNetwork("");
      setMomoNumber("");
      setMomoModalVisible(false);
    }
  };

  // Add Card
  const handleAddCard = () => {
    if (cardNumber && cardExpiry && cardCvv) {
      setPaymentMethods((methods) => [
        ...methods,
        {
          id: `card${methods.length}`,
          type: "Credit",
          label: cardNumber.startsWith("5") ? "MC" : "VISA",
          card: "**** **** **** " + cardNumber.slice(-4),
        },
      ]);
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
      setCardModalVisible(false);
    }
  };

  // Handler for "Order Panel" navigation
  const goToOrder = () => {
    setOrderModalVisible(false);
    if (navigation && navigation.navigate) {
      navigation.navigate("Orders" as never);
    }
  };

  return (
    <SwipeBackWrapper>
      <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        {/* Header Row */}
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
          <Text style={styles.header}>Payment</Text>
          <View style={{ width: scaleWidth(24) }} />
        </View>

        {/* Delivery Card */}
        <TouchableOpacity
          style={[
            styles.card,
            selected === "delivery" ? styles.cardSelected : styles.cardUnselected,
          ]}
          activeOpacity={1}
          onPress={() => setSelected("delivery")}
        >
          <View style={styles.radioLabelRow}>
            <View style={styles.radioCircle}>
              {selected === "delivery" && <View style={styles.radioDot} />}
            </View>
            <View>
              <Text
                style={[
                  styles.cardTitle,
                  selected === "delivery"
                    ? styles.cardTitleActive
                    : styles.cardTitleInactive,
                ]}
              >
                Delivery To
              </Text>
              <Text style={styles.cardSubtitle}>Nii ankrah raod spintex</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        {/* Pickup Card */}
        <TouchableOpacity
          style={[
            styles.card,
            selected === "pickup" ? styles.cardSelected : styles.cardUnselected,
          ]}
          activeOpacity={1}
          onPress={() => setSelected("pickup")}
        >
          <View style={styles.radioLabelRow}>
            <View style={styles.radioCircle}>
              {selected === "pickup" && <View style={styles.radioDot} />}
            </View>
            <Text
              style={[
                styles.cardTitle,
                selected === "pickup"
                  ? styles.cardTitleActive
                  : styles.cardTitleInactive,
              ]}
            >
              Pick up
            </Text>
          </View>
        </TouchableOpacity>
        {/* Add Credit and Add Momo Buttons */}
        <View style={styles.addBtnsRow}>
          <TouchableOpacity style={styles.addBtn} onPress={() => setCardModalVisible(true)}>
            <View style={styles.btnContent}>
              <View style={styles.plusCircle}>
                <Text style={styles.plusText}>+</Text>
              </View>
              <Text style={styles.addBtnText}>Add Credit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBtn} onPress={() => setMomoModalVisible(true)}>
            <View style={styles.btnContent}>
              <View style={styles.plusCircle}>
                <Text style={styles.plusText}>+</Text>
              </View>
              <Text style={styles.addBtnText}>Add Momo</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Payment method list */}
        <Text style={styles.sectionHeader}>Payment method</Text>
        {paymentMethods.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.payMethodCard}
            onPress={() => setSelectedMethodId(item.id)}
            activeOpacity={0.8}
          >
            <View style={styles.payMethodLeft}>
              {item.type === "Credit" && (
                <View style={[
                  styles.payLogo,
                  item.label === "VISA"
                    ? styles.logoVisa
                    : item.label === "MC"
                    ? styles.logoMC
                    : null
                ]}>
                  <Text style={styles.logoText}>
                    {item.label === "VISA"
                      ? "VISA"
                      : item.label === "MC"
                      ? "MC"
                      : ""}
                  </Text>
                </View>
              )}
              {item.type === "Momo" && (
                <View style={[styles.payLogo, styles.logoBlank]} />
              )}
              <Text style={styles.payMethodText}>
                {item.type === "Credit" ? item.card : item.phone}
              </Text>
            </View>
            <View style={styles.payMethodIcons}>
              {selectedMethodId === item.id && (
                <Text style={styles.checkMark}>✔</Text>
              )}
              <TouchableOpacity onPress={() => setPaymentMethods(methods => methods.filter(m => m.id !== item.id))}>
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        {/* Subtotal and Total */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Subtotal</Text>
          <Text style={styles.rowValue}>₵ 57.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Total</Text>
          <Text style={styles.rowValue}>₵ 57.00</Text>
        </View>
        {/* Checkout Button */}
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => setOrderModalVisible(true)}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>

        {/* ------ Momo Modal ------ */}
        <Modal
          visible={momoModalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setMomoModalVisible(false)}
        >
          <Pressable
            style={modalStyles.overlay}
            onPress={() => setMomoModalVisible(false)}
          >
            {/* Inner Pressable prevents taps inside the sheet from closing the modal */}
            <Pressable style={modalStyles.modalContent} onPress={() => {}}>
              <View style={modalStyles.swipeHandle} />
              <View style={modalStyles.inputField}>
                <View style={modalStyles.dropdown}>
                  <Text
                    style={modalStyles.dropdownText}
                    onPress={() =>
                      setMomoNetwork(momoNetwork === "" ? "MTN" : "")
                    }
                  >
                    {momoNetwork ? momoNetwork : "Network  type"}
                  </Text>
                  <Text style={modalStyles.dropdownCaret}>▼</Text>
                </View>
              </View>
              <View style={modalStyles.inputField}>
                <TextInput
                  style={modalStyles.input}
                  placeholder="Momo number"
                  value={momoNumber}
                  onChangeText={setMomoNumber}
                  keyboardType="phone-pad"
                />
              </View>
              <TouchableOpacity style={modalStyles.saveBtn} onPress={handleAddMomo}>
                <Text style={modalStyles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>

        {/* ------ Card Modal ------ */}
        <Modal
          visible={cardModalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setCardModalVisible(false)}
        >
          <Pressable
            style={modalStyles.overlay}
            onPress={() => setCardModalVisible(false)}
          >
            {/* Inner Pressable prevents taps inside the sheet from closing the modal */}
            <Pressable style={modalStyles.modalContent} onPress={() => {}}>
              <View style={modalStyles.swipeHandle} />
              <View style={modalStyles.inputField}>
                <TextInput
                  style={modalStyles.input}
                  placeholder="Card number"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="number-pad"
                />
              </View>
              <View style={{ flexDirection: "row", gap: scaleWidth(8) }}>
                <TextInput
                  style={[modalStyles.input, { flex: 1 }]}
                  placeholder="Expiry"
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                />
                <TextInput
                  style={[modalStyles.input, { flex: 1 }]}
                  placeholder="CVV"
                  value={cardCvv}
                  onChangeText={setCardCvv}
                  keyboardType="number-pad"
                  secureTextEntry
                />
              </View>
              <TouchableOpacity style={modalStyles.saveBtn} onPress={handleAddCard}>
                <Text style={modalStyles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>

        {/* ------ Order Success Modal ------ */}
        <Modal
          visible={orderModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setOrderModalVisible(false)}
        >
          <Pressable style={orderStyles.overlay} onPress={() => setOrderModalVisible(false)}>
            <View style={orderStyles.modal}>
              <View style={orderStyles.checkCircle}>
                <Text style={orderStyles.checkMark}>✓</Text>
              </View>
              <Text style={orderStyles.orderTitle}>Your order is{"\n"}successfully made</Text>
              <Text style={orderStyles.orderText}>
                You can Track your order{"\n"}in the orders panel
              </Text>
              <TouchableOpacity style={orderStyles.button} onPress={() => navigation.navigate("Orders" as never)}

>
                <Text style={orderStyles.buttonText}>Order Panel</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>
      </SafeAreaView>
    </SwipeBackWrapper>
  );
};

export default PaymentScreen;

// ----------- General Styles -----------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "rgba(246, 246, 246, 1)",
  },
  container: { 
    flex: 1, 
    padding: scaleWidth(14), 
    backgroundColor: "rgba(246, 246, 246, 1)" 
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
  header: { 
    flex: 1,
    fontSize: scaleFont(20), 
    fontWeight: "600", 
    color: "rgba(55, 73, 87, 1)", 
    textAlign: "center",
  },

  card: { 
    backgroundColor: "#fff",
    borderRadius: scaleSize(16), 
    padding: scaleWidth(14), 
    marginBottom: scaleHeight(14),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1 
  },

  cardSelected: { 
    borderColor: "#dedede", 
    opacity: 1 
  },

  cardUnselected: { 
    borderColor: "#e6e6e6", 
    opacity: 0.5 
  },

  radioLabelRow: { 
    flexDirection: "row", 
    alignItems: "center" 
  },

  radioCircle: { 
    width: scaleSize(22), 
    height: scaleSize(22), 
    borderRadius: scaleSize(11),
    borderWidth: 2, 
    borderColor: "#bbb",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scaleWidth(12) 
  },

  radioDot: { 
    width: scaleSize(12), 
    height: scaleSize(12),
    borderRadius: scaleSize(6),
    backgroundColor: "#111" 
  },

  cardTitle: { 
    fontSize: scaleFont(18), 
    fontWeight: "bold" 
  },

  cardTitleActive: { 
    color: "#111" 
  },

  cardTitleInactive: { 
    color: "#bababa" 
  },

  cardSubtitle: { 
    color: "#bababa",
    fontSize: scaleFont(14), 
    marginTop: scaleHeight(2) 
  },

  editBtn: { 
    paddingVertical: scaleHeight(2), 
    paddingHorizontal: scaleWidth(10), 
    borderRadius: scaleSize(8) 
  },

  editText: { 
    fontSize: scaleFont(15), 
    color: "#bababa" 
  },

  addBtnsRow: { 
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(4), 
    marginBottom: scaleHeight(16) 
  },

  addBtn: { 
    flex: 1,
    marginHorizontal: scaleWidth(5),
    backgroundColor: "#fff",
    borderRadius: scaleSize(8),
    alignItems: "center",
    justifyContent: "center",
    padding: scaleWidth(12),
    shadowColor: "#e2ffed",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: scaleSize(2),
    elevation: 2 
  },

  btnContent: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center" 
  },

  plusCircle: { 
    width: scaleSize(44), 
    height: scaleSize(44), 
    borderRadius: scaleSize(22),
    backgroundColor: "rgba(184, 254, 34, 1)", 
    alignItems: "center",
    justifyContent: "center",
    marginRight: scaleWidth(8) 
  },

  plusText: { 
    color: "rgba(20, 32, 50, 1)", 
    fontWeight: "400",
    fontSize: scaleFont(32),
    lineHeight: scaleFont(32) 
  },

  addBtnText: { 
    color: "rgba(20, 32, 50, 1)", 
    fontWeight: "bold", 
    fontSize: scaleFont(16) 
  },

  sectionHeader: { 
    fontSize: scaleFont(20), 
    fontWeight: "500",
    marginTop: scaleHeight(20), 
    marginBottom: scaleHeight(10),
    color: "rgba(20, 32, 50, 1)" 
  },

  payMethodCard: { 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: scaleSize(10),
    padding: scaleWidth(9),
    marginBottom: scaleHeight(8),
    borderWidth: 1,
    borderColor: "#EEE",
    height: scaleHeight(56) 
  },

  payMethodLeft: { 
    flexDirection: "row", 
    alignItems: "center" 
  },

  payLogo: { 
    width: scaleWidth(34),
    height: scaleHeight(27),
    borderRadius: scaleSize(6),
    marginRight: scaleWidth(10),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee" 
  },

  logoVisa: { backgroundColor: "#3354e7" },
  logoMC: { backgroundColor: "#ff5c1a" },
  logoBlank: { backgroundColor: "#e0e0e0" },

  logoText: { 
    color: "#fff",
    fontWeight: "bold",
    fontSize: scaleFont(13) 
  },

  payMethodText: { 
    fontSize: scaleFont(15), 
    color: "#232630", 
    fontWeight: "500" 
  },

  payMethodIcons: { 
    flexDirection: "row", 
    alignItems: "center",
    gap: scaleWidth(10) 
  },

  checkMark: { 
    fontSize: scaleFont(18),
    color: "#789933",
    marginRight: scaleWidth(10) 
  },

  deleteIcon: { 
    fontSize: scaleFont(18), 
    color: "#bbb",
    marginLeft: scaleWidth(10) 
  },

  row: { 
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(8), 
    marginBottom: scaleHeight(4) 
  },

  rowLabel: { 
    fontSize: scaleFont(20),
    fontWeight: "300",
    color: "rgba(20, 32, 50, 1)",
    marginTop: scaleHeight(20) 
  },

  rowValue: { 
    fontSize: scaleFont(20),
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    marginTop: scaleHeight(20) 
  },

  checkoutBtn: { 
    backgroundColor: "rgba(8, 21, 40, 1)",
    borderRadius: scaleSize(100),
    alignItems: "center",
    paddingVertical: scaleHeight(18),
    height: scaleHeight(68),
    marginTop: scaleHeight(30) 
  },

  checkoutText: { 
    color: "#fff",
    fontSize: scaleFont(20),
    fontWeight: "500" 
  }
})

const modalStyles = StyleSheet.create({
  overlay: { 
    flex: 1,
    backgroundColor: "rgba(50, 50, 50, 0.35)",
    justifyContent: "flex-end" 
  },

  swipeHandle: { 
    alignSelf: "center",
    width: scaleWidth(50),
    height: scaleHeight(7),
    borderRadius: scaleSize(6),
    backgroundColor: "#e2e2e2",
    marginVertical: scaleHeight(12) 
  },

  modalContent: { 
    backgroundColor: "#fff",
    padding: scaleWidth(22),
    paddingBottom: scaleHeight(32),
    borderTopLeftRadius: scaleSize(20),
    borderTopRightRadius: scaleSize(20),
    minHeight: scaleHeight(260),
    width: "100%" 
  },

  inputField: { 
    marginBottom: scaleHeight(13) 
  },

  input: { 
    backgroundColor: "#fff",
    borderRadius: scaleSize(9),
    borderWidth: 1,
    borderColor: "#dadada",
    paddingVertical: scaleHeight(11),
    paddingHorizontal: scaleWidth(13),
    fontSize: scaleFont(16) 
  },

  dropdown: { 
    height: scaleHeight(43),
    borderRadius: scaleSize(9),
    borderWidth: 1,
    borderColor: "#dadada",
    backgroundColor: "#fff",
    paddingHorizontal: scaleWidth(13),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between" 
  },

  dropdownText: { 
    fontSize: scaleFont(15),
    color: "#242424",
    flex: 1 
  },

  dropdownCaret: { 
    fontSize: scaleFont(15), 
    color: "#bababa",
    marginLeft: scaleWidth(8),
    marginTop: scaleHeight(2) 
  },

  saveBtn: { 
    backgroundColor: "#101929",
    borderRadius: scaleSize(100),
    alignItems: "center",
    paddingVertical: scaleHeight(17),
    marginTop: scaleHeight(18) 
  },

  saveBtnText: { 
    color: "#fff",
    fontSize: scaleFont(18),
    fontWeight: "600",
    letterSpacing: 0.2 
  }
})

const orderStyles = StyleSheet.create({
  overlay: { 
    flex: 1,
    backgroundColor: "rgba(50,50,50,0.32)",
    justifyContent: "center",
    alignItems: "center" 
  },

  modal: { 
    backgroundColor: "#fff",
    borderRadius: scaleSize(22),
    paddingVertical: scaleHeight(28),
    paddingHorizontal: scaleWidth(24),
    alignItems: "center",
    minWidth: scaleWidth(260),
    maxWidth: "85%",
    shadowColor: "#222",
    shadowOffset: { width: scaleWidth(2), height: scaleHeight(6) },
    shadowOpacity: 0.17,
    shadowRadius: scaleSize(18),
    elevation: 7 
  },

  checkCircle: { 
    width: scaleSize(64),
    height: scaleSize(64),
    borderRadius: scaleSize(32),
    borderWidth: 2,
    borderColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scaleHeight(18) 
  },

  checkMark: { 
    fontSize: scaleFont(38),
    color: "#222",
    fontWeight: "bold",
    marginTop: scaleHeight(-2) 
  },

  orderTitle: { 
    fontSize: scaleFont(18),
    fontWeight: "500",
    color: "#232630",
    textAlign: "center",
    marginBottom: scaleHeight(3) 
  },

  orderText: { 
    fontSize: scaleFont(15),
    color: "#888",
    textAlign: "center",
    marginBottom: scaleHeight(25) 
  },

  button: { 
    backgroundColor: "#101929",
    borderRadius: scaleSize(100),
    minWidth: scaleWidth(210),
    alignItems: "center",
    paddingVertical: scaleHeight(14) 
  },

  buttonText: { 
    color: "#fff",
    fontWeight: "600",
    fontSize: scaleFont(17),
    letterSpacing: 0.2 
  }
})
