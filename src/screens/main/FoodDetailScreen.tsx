import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Linking,
  FlatList,
  StatusBar,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import MenuModal from "../../components/MenuModal";
import SwipeBackWrapper from "../../components/SwipeBackWrapper";
import { scaleWidth, scaleHeight, scaleFont, scaleSize } from "../../utils/responsive";

// Icon and image assets
const checkIcon = require("../../../assets/icons/check.png");
const callIcon = require("../../../assets/icons/phone_icon.png");
const directionIcon = require("../../../assets/icons/direction.png");
const shopIcon = require("../../../assets/images/Chickenman.jpg");
const allCircleIcon = require("../../../assets/icons/round_all.png");
const userAvatar = require("../../../assets/images/avatar.png");

const TAB_ICONS = [
  { key: "home", label: "Home", route: "Home", icon: require("../../../assets/icons/home.png") },
  { key: "notification", label: "Notification", route: "Notifications", icon: require("../../../assets/icons/notification.png") },
  { key: "checkout", label: "Checkout", route: "Checkout", icon: require("../../../assets/icons/checkout.png") },
  { key: "orders", label: "Orders", route: "Orders", icon: require("../../../assets/icons/orders.png") },
  { key: "menu", label: "Menu", route: "Menu", icon: require("../../../assets/icons/menu.png") },
];

const INGREDIENTS = [
  "3x chicken",
  "Pepper sauce",
  "3x chicken",
  "Pepper sauce",
];

const COMMENTS = [
  {
    id: "1",
    avatar: userAvatar,
    order: "1st/24",
    name: "Sandra Biom",
    stars: 5,
    highlight: false,
    text: "I have went with the seller to see this ad.i must confess i was impressed and i am willing to pay for it in the coming month.",
  },
  {
    id: "2",
    avatar: userAvatar,
    order: "2nd/24",
    name: "Sandra Biom",
    stars: 5,
    highlight: true,
    text: "I have went with the seller to see this ad.i must confess i was impressed and i am willing to pay for it in the coming month.",
  },
  {
    id: "3",
    avatar: userAvatar,
    order: "3th/25",
    name: "Sandra Biom",
    stars: 5,
    highlight: false,
    text: "I have went with the seller to see this ad.i must confess i was impressed and i am willing to pay for it in the coming month.",
  },
  {
    id: "4",
    avatar: userAvatar,
    order: "2nd/24",
    name: "Sandra Biom",
    stars: 5,
    highlight: false,
    text: "I have went with the seller to see this ad.i must confess i was impressed and i am willing to pay for it in the coming month.",
  },
  {
    id: "5",
    avatar: userAvatar,
    order: "3th/25",
    name: "Sandra Biom",
    stars: 5,
    highlight: false,
    text: "I have went with the seller to see this ad.i must confess i was impressed and i am willing to pay for it in the coming month.",
  },
];

const RATING_LABELS = [
  { label: "All", iconType: "star" },
  { label: "1", iconType: "star" },
  { label: "2", iconType: "star" },
  { label: "3", iconType: "star" },
  { label: "4", iconType: "star" },
  { label: "5", iconType: "star" },
];

type RootStackParamList = {
  Home: undefined;
  Notifications: undefined;
  Checkout: undefined;
  Orders: undefined;
  Menu: undefined;
  FoodDetail: { meal: any };
};

const FoodDetailScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState("All");
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleTabPress = (key: string, route: string) => {
    if (key === "menu") {
      setMenuVisible(true);
    } else {
      navigation.navigate(route as never);
    }
  };

  return (
    <SwipeBackWrapper>
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {/* HEADER */}
      <View style={styles.header}>
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
        <Text style={styles.headerTitle}>Chugo</Text>
        <View style={{ width: scaleWidth(24) }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: scaleHeight(180) }}>
        {/* --- IMAGE CARD + PROGRESS DOTS --- */}
        <View style={styles.imageCardWrapper}>
          <View style={styles.imageCard}>
            <Image
              source={require("../../../assets/images/beef.png")}
              style={styles.image}
            />
            <View style={styles.quantityControl}>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Text style={styles.plusMinus}>+</Text>
              </TouchableOpacity>
              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                <Text style={styles.plusMinus}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.progressWrapper}>
            <View style={styles.activeDot} />
            <View style={styles.inactiveDot} />
            <View style={styles.inactiveDot} />
          </View>
        </View>

        {/* -- TEXT, PRICE & INGREDIENTS -- */}
        <View style={styles.sectionPadding}>
          <Text style={styles.endTimeText}>
            <Text style={{fontSize: scaleFont(15)}}>🕒</Text> Ends: <Text style={{color: "#F66", fontWeight: "700"}}>12:00 PM</Text>
          </Text>
          <Text style={styles.foodTitle}>Beef sauce and goat meat</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>₵ 57.00</Text>
            <Text style={styles.oldPrice}>₵ 5799.00</Text>
          </View>
          <Text style={styles.description}>
            A hearty, flavor-packed delight — freshly prepared and waiting to make your day brighter. Simple, satisfying, and oh so good.
          </Text>
          <View style={styles.ingredientList}>
            {INGREDIENTS.map((item, idx) => (
              <View key={idx} style={styles.ingredientItem}>
                <Image source={checkIcon} style={styles.ingredientCheckIcon} />
                <Text style={styles.ingredientText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* -- SELLER CARD -- */}
        <View style={styles.sellerCard}>
          <Image source={shopIcon} style={styles.sellerLogo} />
          <View style={{ flex: 1, marginLeft: scaleWidth(10) }}>
            <Text style={styles.sellerName}>Chieckenman pizzaman</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: scaleHeight(4) }}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>4</Text>
              </View>
              <View style={styles.directionsBadge}>
                <Text style={styles.directionsText}>Direction</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.sellerCallBtn} onPress={() => Linking.openURL('tel:123456789')}>
            <Image source={callIcon} style={styles.callBtnIcon}/>
          </TouchableOpacity>
        </View>

        {/* -- RATING BUBBLE FILTER ROW -- */}
        <View style={styles.ratingStarsRow}>
          {RATING_LABELS.map(({label, iconType}, i) => {
            const isActive = label === rating;
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.ratingBubble,
                  isActive && styles.ratingBubbleActive
                ]}
                onPress={() => setRating(label)}
              >
                {iconType === "circle" ? (
                  <View style={[
                    styles.ratingBubbleCircle,
                    isActive && styles.ratingBubbleCircleActive
                  ]} />
                ) : (
                  <Text style={[
                    styles.ratingBubbleStar,
                    isActive && styles.ratingBubbleStarActive
                  ]}>★</Text>
                )}
                <Text style={[
                  styles.ratingBubbleLabel,
                  isActive && styles.ratingBubbleLabelActive
                ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* -- COMMENTS SECTION -- */}
        <View style={styles.commentsWrapper}>
          <FlatList
            data={COMMENTS}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.commentItemRow}>
                  <Image source={item.avatar} style={styles.commentAvatar}/>
                  <View style={{flex: 1, marginLeft: scaleWidth(9)}}>
                    <View style={{flexDirection: "row", alignItems: "center", marginBottom: scaleHeight(1)}}>
                      <Text style={styles.commentOrder}>{item.order} </Text>
                      <Text style={styles.commentUser}>{item.name}</Text>
                    </View>
                    <Text style={styles.commentStars}>{'★'.repeat(item.stars)}</Text>
                    {item.highlight ? (
                      <Text style={styles.commentText}>
                        {item.text}
                      </Text>
                    ) : (
                      <Text style={styles.commentText}>{item.text}</Text>
                    )}
                  </View>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* ---- BOTTOM NAV ---- */}
      <View style={styles.bottomNav}>
        {TAB_ICONS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => handleTabPress(tab.key, tab.route)}
          >
            <Image source={tab.icon} style={styles.tabIconImg} />
            <Text style={styles.tabLabel}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <MenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        user={{
          name: "Pharm A.k",
          email: "madhu@gmail.com",
          photo: require("../../../assets/images/avatar.png"),
        }}
      />
      </SafeAreaView>
    </SwipeBackWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(246, 246, 246, 1)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(18),
    height: scaleHeight(60),
    backgroundColor: "rgba(246, 246, 246, 1)",
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
  headerTitle: {
    flex: 1,
    fontSize: scaleFont(20),
    fontWeight: "600",
    color: "rgba(55, 73, 87, 1)",
    textAlign: "center",
  },
  imageCardWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(8),
    marginBottom: scaleHeight(18),
  },
  imageCard: {
    width: scaleWidth(381),
    height: scaleHeight(391),
    backgroundColor: "rgba(246, 246, 246, 1)",
    borderRadius: scaleSize(20),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scaleHeight(8) },
    shadowOpacity: 0.07,
    shadowRadius: scaleSize(16),
    elevation: 7,
    position: "relative",
  },
  image: {
    width: scaleWidth(278),
    height: scaleHeight(270),
    borderRadius: scaleSize(135),
    marginTop: scaleHeight(14),
  },
  quantityControl: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(246, 246, 246, 1)",
    position: "absolute",
    bottom: scaleHeight(10),
    alignSelf: "center",
    borderRadius: scaleSize(10),
    width: scaleWidth(47),
    height: scaleHeight(114),
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: scaleSize(16),
    shadowOffset: { width: 0, height: scaleHeight(7) },
    elevation: 5,
  },
  plusMinus: {
    fontSize: scaleFont(21),
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    marginVertical: scaleHeight(1),
    alignSelf: "center",
    top: scaleHeight(3)
  },
  quantityDisplay: {
    marginVertical: scaleHeight(7),
    paddingVertical: scaleHeight(6),
    paddingHorizontal: scaleWidth(18),
    borderRadius: scaleSize(8),
    backgroundColor: "rgba(20, 32, 50, 1)",
    alignItems: "center",
    
    height: scaleHeight(35),
  },
  quantityText: {
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "700",
    fontSize: scaleFont(10),
    textAlign: "center",
    top: scaleHeight(4),
  },
  progressWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaleHeight(43),
    marginBottom: scaleHeight(10),
  },
  activeDot: {
    width: scaleWidth(44),
    height: scaleHeight(7),
    borderRadius: scaleSize(3.5),
    backgroundColor: "#ABDC3D",
    marginHorizontal: scaleWidth(3),
  },
  inactiveDot: {
    width: scaleWidth(14),
    height: scaleHeight(7),
    borderRadius: scaleSize(3.5),
    backgroundColor: "#E4E4E4",
    marginHorizontal: scaleWidth(3),
  },
  sectionPadding: {
    paddingHorizontal: scaleWidth(18),
    marginBottom: scaleHeight(8),
  },
  endTimeText: {
    fontSize: scaleFont(15),
    marginBottom: scaleHeight(2),
    color: "#444",
    fontWeight: "500",
  },
  foodTitle: {
    fontSize: scaleFont(20),
    fontWeight: "500",
    color: "#rgba(20, 32, 50, 1)",
    marginTop: scaleHeight(3),
    marginBottom: scaleHeight(3),
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: scaleHeight(2),
  },
  price: {
    fontSize: scaleFont(20),
    fontWeight: "600",
    color: "rgba(20, 32, 50, 1)",
    marginRight: scaleWidth(8),
  },
  oldPrice: {
    fontSize: scaleFont(20),
    color: "#rgba(20, 32, 50, 1)",
    textDecorationLine: "line-through",
    fontWeight: "500",
  },
  description: {
    marginTop: scaleHeight(3),
    marginBottom: scaleHeight(6),
    color: "rgba(20, 32, 50, 1)",
    fontSize: scaleFont(16),
    lineHeight: scaleFont(22),
  },
  ingredientList: {
    marginBottom: scaleHeight(11),
    marginLeft: scaleWidth(2),
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: scaleHeight(1.5),
  },
  ingredientCheckIcon: {
    width: scaleSize(18),
    height: scaleSize(18),
    marginRight: scaleWidth(10),
    tintColor: "#008069",
  },
  ingredientText: {
    fontSize: scaleFont(16),
    color: "#18181A",
    fontWeight: "400",
  },
  // ------------- SELLER CARD ---------------
  sellerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: scaleSize(22),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: scaleSize(12),
    shadowOffset: { width: 0, height: scaleHeight(2) },
    elevation: 2,
    marginTop: scaleHeight(18),
    marginHorizontal: scaleWidth(14),
    padding: scaleWidth(14),
    marginBottom: scaleHeight(10),
    height: scaleHeight(107),
  },
  sellerLogo: {
    width: scaleSize(69),
    height: scaleSize(69),
    borderRadius: scaleSize(17),
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(184, 254, 34, 1)",
  },
  sellerName: {
    fontWeight: "500",
    fontSize: scaleFont(20),
    color: "rgba(20, 32, 50, 1)",
    marginBottom: scaleHeight(1),
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaffd9",
    borderRadius: scaleSize(13),
    paddingHorizontal: scaleWidth(9),
    paddingVertical: scaleHeight(2.5),
    marginRight: scaleWidth(7),
  },
  statusBadgeText: {
    fontWeight: "700",
    color: "#62d754",
    fontSize: scaleFont(13),
    marginRight: scaleWidth(2),
  },
  directionsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ededed",
    borderRadius: scaleSize(11),
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(2),
    marginLeft: scaleWidth(1),
  },
  directionsText: {
    fontWeight: "500",
    color: "#646870",
    fontSize: scaleFont(13),
  },
  sellerCallBtn: {
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderWidth: 1,
    borderRadius: scaleSize(24),
    padding: scaleWidth(8),
    marginLeft: scaleWidth(13),
    width: scaleSize(48),
    height: scaleSize(48),
  },
  callBtnIcon: {
    width: scaleSize(23),
    height: scaleSize(23),
    left: scaleWidth(2),
    top: scaleHeight(2)
   
  },
  // -------- Rating bubbles -----------
  ratingStarsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(246, 246, 246, 1)",
    marginTop: scaleHeight(18),
    borderRadius: scaleSize(19),
    marginHorizontal: scaleWidth(12),
    paddingHorizontal: scaleWidth(6),
    paddingVertical: scaleHeight(6),
    marginBottom: scaleHeight(7),
  },
  ratingBubble: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: scaleWidth(3),
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: scaleSize(16),
    paddingVertical: scaleHeight(4),
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: "transparent",
    flexDirection: "row",
    minWidth: scaleWidth(45),
    maxWidth: scaleWidth(70),
    alignSelf: "stretch",
  },
  ratingBubbleActive: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    
  },
  ratingBubbleCircle: {
    width: scaleSize(21),
    height: scaleSize(21),
    borderRadius: scaleSize(10.5),
    borderWidth: scaleSize(2.5),
    borderColor: "#aaa",
    backgroundColor: "#fff",
    marginRight: scaleWidth(4),
  },
  ratingBubbleCircleActive: {
    borderColor: "#f7b538",
    backgroundColor: "#fff",
  },
  ratingBubbleStar: {
    fontSize: scaleFont(18),
    color: "#bcbcbc",
    fontWeight: "700",
    marginRight: scaleWidth(4),
  },
  ratingBubbleStarActive: {
    color: "#F7B538",
  },
  ratingBubbleLabel: {
    fontSize: scaleFont(17),
    color: "#19191a",
    fontWeight: "500",
    marginTop: 0,
  },
  ratingBubbleLabelActive: {
    color: "#DF8E17",
    fontWeight: "800",
  },
  commentsWrapper: {
    marginTop: scaleHeight(5),
    paddingHorizontal: scaleWidth(8),
    marginBottom: scaleHeight(70),
  },
  commentItemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: scaleHeight(10),
    borderBottomWidth: 1,
    borderColor: "#e2e2e7",
  },
  commentAvatar: {
    width: scaleSize(35),
    height: scaleSize(36),
    borderRadius: scaleSize(10),
    marginRight: scaleWidth(8),
    
  },
  commentOrder: {
    fontSize: scaleFont(9),
    color: "rgba(55, 73, 87, 0.75)",
    marginRight: scaleWidth(2),
    fontWeight: "500",
  },
  commentUser: {
    fontWeight: "500",
    fontSize: scaleFont(11),
    color: "rgba(55, 73, 87, 1)",
    marginRight: scaleWidth(5),
  },
  commentStars: {
    fontSize: scaleFont(15),
    color: "rgba(55, 73, 87, 1)",
    letterSpacing: 1.5,
    fontWeight: "600",
    marginBottom: 0,
  },
  commentText: {
    fontSize: scaleFont(12),
    color: "#rgba(55, 73, 87, 1)",
    marginTop: scaleHeight(1),
    lineHeight: scaleFont(21),
    fontWeight: "400"
  },
  commentTextLink: {
    fontSize: scaleFont(15),
    color: "#1976d2",
    marginTop: scaleHeight(1),
    textDecorationLine: "underline",
    lineHeight: scaleFont(21),
  },
  bottomNav: {
    width: "100%",
    height: scaleHeight(65),
    backgroundColor: "#fff",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#F2F3F7",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: scaleFont(11),
    color: "#949CA6",
  },
  tabIconImg: {
    width: scaleSize(25),
    height: scaleSize(25),
    marginBottom: scaleHeight(3),
    resizeMode: "contain",
  },
});

export default FoodDetailScreen;
