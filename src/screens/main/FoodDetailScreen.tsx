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
        <View style={{ width: 24 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 180 }}>
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
            <Text style={{fontSize: 15}}>🕒</Text> Ends: <Text style={{color: "#F66", fontWeight: "700"}}>12:00 PM</Text>
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
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.sellerName}>Chieckenman pizzaman</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
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
                  <View style={{flex: 1, marginLeft: 9}}>
                    <View style={{flexDirection: "row", alignItems: "center", marginBottom: 1}}>
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
    paddingVertical: 12,
    paddingHorizontal: 18,
    height: 60,
    backgroundColor: "rgba(246, 246, 246, 1)",
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
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(55, 73, 87, 1)",
    textAlign: "center",
  },
  imageCardWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 18,
  },
  imageCard: {
    width: 381,
    height: 391,
    backgroundColor: "rgba(246, 246, 246, 1)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 7,
    position: "relative",
  },
  image: {
    width: 278,
    height: 270,
    borderRadius: 135,
    marginTop: 14,
  },
  quantityControl: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(246, 246, 246, 1)",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    borderRadius: 10,
    width: 47,
    height: 114,
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 7 },
    elevation: 5,
  },
  plusMinus: {
    fontSize: 21,
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    marginVertical: 1,
    alignSelf: "center",
    top: 3
  },
  quantityDisplay: {
    marginVertical: 7,
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "rgba(20, 32, 50, 1)",
    alignItems: "center",
    
    height: 35,
  },
  quantityText: {
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "700",
    fontSize: 10,
    textAlign: "center",
    top: 4,
  },
  progressWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    marginBottom: 10,
  },
  activeDot: {
    width: 44,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#ABDC3D",
    marginHorizontal: 3,
  },
  inactiveDot: {
    width: 14,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#E4E4E4",
    marginHorizontal: 3,
  },
  sectionPadding: {
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  endTimeText: {
    fontSize: 15,
    marginBottom: 2,
    color: "#444",
    fontWeight: "500",
  },
  foodTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#rgba(20, 32, 50, 1)",
    marginTop: 3,
    marginBottom: 3,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(20, 32, 50, 1)",
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 20,
    color: "#rgba(20, 32, 50, 1)",
    textDecorationLine: "line-through",
    fontWeight: "500",
  },
  description: {
    marginTop: 3,
    marginBottom: 6,
    color: "rgba(20, 32, 50, 1)",
    fontSize: 16,
    lineHeight: 22,
  },
  ingredientList: {
    marginBottom: 11,
    marginLeft: 2,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 1.5,
  },
  ingredientCheckIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    tintColor: "#008069",
  },
  ingredientText: {
    fontSize: 16,
    color: "#18181A",
    fontWeight: "400",
  },
  // ------------- SELLER CARD ---------------
  sellerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 22,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginTop: 18,
    marginHorizontal: 14,
    padding: 14,
    marginBottom: 10,
    height: 107,
  },
  sellerLogo: {
    width: 69,
    height: 69,
    borderRadius: 17,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(184, 254, 34, 1)",
  },
  sellerName: {
    fontWeight: "500",
    fontSize: 20,
    color: "rgba(20, 32, 50, 1)",
    marginBottom: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaffd9",
    borderRadius: 13,
    paddingHorizontal: 9,
    paddingVertical: 2.5,
    marginRight: 7,
  },
  statusBadgeText: {
    fontWeight: "700",
    color: "#62d754",
    fontSize: 13,
    marginRight: 2,
  },
  directionsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ededed",
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: 1,
  },
  directionsText: {
    fontWeight: "500",
    color: "#646870",
    fontSize: 13,
  },
  sellerCallBtn: {
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderWidth: 1,
    borderRadius: 24,
    padding: 8,
    marginLeft: 13,
    width: 48,
    height: 48,
  },
  callBtnIcon: {
    width: 23,
    height: 23,
    left: 2,
    top: 2
   
  },
  // -------- Rating bubbles -----------
  ratingStarsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(246, 246, 246, 1)",
    marginTop: 18,
    borderRadius: 19,
    marginHorizontal: 12,
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginBottom: 7,
  },
  ratingBubble: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: "transparent",
    flexDirection: "row",
    minWidth: 45,
    maxWidth: 70,
    alignSelf: "stretch",
  },
  ratingBubbleActive: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    
  },
  ratingBubbleCircle: {
    width: 21,
    height: 21,
    borderRadius: 10.5,
    borderWidth: 2.5,
    borderColor: "#aaa",
    backgroundColor: "#fff",
    marginRight: 4,
  },
  ratingBubbleCircleActive: {
    borderColor: "#f7b538",
    backgroundColor: "#fff",
  },
  ratingBubbleStar: {
    fontSize: 18,
    color: "#bcbcbc",
    fontWeight: "700",
    marginRight: 4,
  },
  ratingBubbleStarActive: {
    color: "#F7B538",
  },
  ratingBubbleLabel: {
    fontSize: 17,
    color: "#19191a",
    fontWeight: "500",
    marginTop: 0,
  },
  ratingBubbleLabelActive: {
    color: "#DF8E17",
    fontWeight: "800",
  },
  commentsWrapper: {
    marginTop: 5,
    paddingHorizontal: 8,
    marginBottom: 70,
  },
  commentItemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e2e2e7",
  },
  commentAvatar: {
    width: 35,
    height: 36,
    borderRadius: 10,
    marginRight: 8,
    
  },
  commentOrder: {
    fontSize: 9,
    color: "rgba(55, 73, 87, 0.75)",
    marginRight: 2,
    fontWeight: "500",
  },
  commentUser: {
    fontWeight: "500",
    fontSize: 11,
    color: "rgba(55, 73, 87, 1)",
    marginRight: 5,
  },
  commentStars: {
    fontSize: 15,
    color: "rgba(55, 73, 87, 1)",
    letterSpacing: 1.5,
    fontWeight: "600",
    marginBottom: 0,
  },
  commentText: {
    fontSize: 12,
    color: "#rgba(55, 73, 87, 1)",
    marginTop: 1,
    lineHeight: 21,
    fontWeight: "400"
  },
  commentTextLink: {
    fontSize: 15,
    color: "#1976d2",
    marginTop: 1,
    textDecorationLine: "underline",
    lineHeight: 21,
  },
  bottomNav: {
    width: "100%",
    height: 65,
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

export default FoodDetailScreen;
