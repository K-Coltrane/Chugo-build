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
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Payment</Text>
          <View style={{ width: 24 }} />
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
            <TouchableWithoutFeedback>
              <View style={modalStyles.modalContent}>
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
              </View>
            </TouchableWithoutFeedback>
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
            <TouchableWithoutFeedback>
              <View style={modalStyles.modalContent}>
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
                <View style={{ flexDirection: "row", gap: 8 }}>
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
              </View>
            </TouchableWithoutFeedback>
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
    padding: 14, 
    backgroundColor: "rgba(246, 246, 246, 1)" 
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 18,
    height: 60,
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

  card: { 
    backgroundColor: "#fff",
    borderRadius: 16, 
    padding: 14, 
    marginBottom: 14,
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
    width: 22, 
    height: 22, 
    borderRadius: 11,
    borderWidth: 2, 
    borderColor: "#bbb",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12 
  },

  radioDot: { 
    width: 12, 
    height: 12,
    borderRadius: 6,
    backgroundColor: "#111" 
  },

  cardTitle: { 
    fontSize: 18, 
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
    fontSize: 14, 
    marginTop: 2 
  },

  editBtn: { 
    paddingVertical: 2, 
    paddingHorizontal: 10, 
    borderRadius: 8 
  },

  editText: { 
    fontSize: 15, 
    color: "#bababa" 
  },

  addBtnsRow: { 
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4, 
    marginBottom: 16 
  },

  addBtn: { 
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    shadowColor: "#e2ffed",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2 
  },

  btnContent: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center" 
  },

  plusCircle: { 
    width: 44, 
    height: 44, 
    borderRadius: 22,
    backgroundColor: "rgba(184, 254, 34, 1)", 
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8 
  },

  plusText: { 
    color: "rgba(20, 32, 50, 1)", 
    fontWeight: "400",
    fontSize: 32,
    lineHeight: 32 
  },

  addBtnText: { 
    color: "rgba(20, 32, 50, 1)", 
    fontWeight: "bold", 
    fontSize: 16 
  },

  sectionHeader: { 
    fontSize: 20, 
    fontWeight: "500",
    marginTop: 20, 
    marginBottom: 10,
    color: "rgba(20, 32, 50, 1)" 
  },

  payMethodCard: { 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 9,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#EEE",
    height: 56 
  },

  payMethodLeft: { 
    flexDirection: "row", 
    alignItems: "center" 
  },

  payLogo: { 
    width: 34,
    height: 27,
    borderRadius: 6,
    marginRight: 10,
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
    fontSize: 13 
  },

  payMethodText: { 
    fontSize: 15, 
    color: "#232630", 
    fontWeight: "500" 
  },

  payMethodIcons: { 
    flexDirection: "row", 
    alignItems: "center",
    gap: 10 
  },

  checkMark: { 
    fontSize: 18,
    color: "#789933",
    marginRight: 10 
  },

  deleteIcon: { 
    fontSize: 18, 
    color: "#bbb",
    marginLeft: 10 
  },

  row: { 
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8, 
    marginBottom: 4 
  },

  rowLabel: { 
    fontSize: 20,
    fontWeight: "300",
    color: "rgba(20, 32, 50, 1)",
    marginTop: 40 
  },

  rowValue: { 
    fontSize: 20,
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    marginTop: 40 
  },

  checkoutBtn: { 
    backgroundColor: "rgba(8, 21, 40, 1)",
    borderRadius: 100,
    alignItems: "center",
    paddingVertical: 18,
    height: 68,
    marginTop: 30 
  },

  checkoutText: { 
    color: "#fff",
    fontSize: 20,
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
    width: 50,
    height: 7,
    borderRadius: 6,
    backgroundColor: "#e2e2e2",
    marginVertical: 12 
  },

  modalContent: { 
    backgroundColor: "#fff",
    padding: 22,
    paddingBottom: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 260,
    width: "100%" 
  },

  inputField: { 
    marginBottom: 13 
  },

  input: { 
    backgroundColor: "#fff",
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#dadada",
    paddingVertical: 11,
    paddingHorizontal: 13,
    fontSize: 16 
  },

  dropdown: { 
    height: 43,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#dadada",
    backgroundColor: "#fff",
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between" 
  },

  dropdownText: { 
    fontSize: 15,
    color: "#242424",
    flex: 1 
  },

  dropdownCaret: { 
    fontSize: 15, 
    color: "#bababa",
    marginLeft: 8,
    marginTop: 2 
  },

  saveBtn: { 
    backgroundColor: "#101929",
    borderRadius: 100,
    alignItems: "center",
    paddingVertical: 17,
    marginTop: 18 
  },

  saveBtnText: { 
    color: "#fff",
    fontSize: 18,
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
    borderRadius: 22,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    minWidth: 260,
    maxWidth: "85%",
    shadowColor: "#222",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.17,
    shadowRadius: 18,
    elevation: 7 
  },

  checkCircle: { 
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18 
  },

  checkMark: { 
    fontSize: 38,
    color: "#222",
    fontWeight: "bold",
    marginTop: -2 
  },

  orderTitle: { 
    fontSize: 18,
    fontWeight: "500",
    color: "#232630",
    textAlign: "center",
    marginBottom: 3 
  },

  orderText: { 
    fontSize: 15,
    color: "#888",
    textAlign: "center",
    marginBottom: 25 
  },

  button: { 
    backgroundColor: "#101929",
    borderRadius: 100,
    minWidth: 210,
    alignItems: "center",
    paddingVertical: 14 
  },

  buttonText: { 
    color: "#fff",
    fontWeight: "600",
    fontSize: 17,
    letterSpacing: 0.2 
  }
})
