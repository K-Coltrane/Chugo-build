import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  FlatList, 
  Dimensions, 
  SafeAreaView, 
  ScrollView,
  StatusBar
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import MenuModal from '../../components/MenuModal'; // Make sure this path matches your directory.
import { scaleWidth, scaleHeight, scaleFont, scaleSize, widthPercentage } from '../../utils/responsive';

type RootStackParamList = {
  Home: undefined;
  Notifications: undefined;
  Checkout: undefined;
  Orders: undefined;
  Menu: undefined;
  FilterScreen: undefined;
  FoodDetail: { meal: any }; // <-- Add params for FoodDetail
};

const categories = ["Fried Rice", "Shawarma pie", "Fried Chicken"];
const meals = [
  { id: "1", name: "Sausage Rolls", location: "Accra", distance: "3km", price: "₵57.00", oldPrice: "₵67.00", image: require("../../../assets/images/sausage.png") },
  { id: "2", name: "Chicken 6 Piece", location: "Tema", distance: "9km", price: "₵57.00", oldPrice: "₵67.00", image: require("../../../assets/images/chicken.png") },
  { id: "3", name: "Fries", location: "Tema", distance: "7km", price: "₵57.00", oldPrice: "₵67.00", image: require("../../../assets/images/fries.png") },
  { id: "4", name: "Goat Sauce", location: "Accra", distance: "6km", price: "₵57.00", oldPrice: "₵67.00", image: require("../../../assets/images/goat.png") },
  { id: "5", name: "Beef Sauce", location: "Tema", distance: "10km", price: "₵57.00", oldPrice: "₵67.00", image: require("../../../assets/images/beef.png") },
  { id: "6", name: "Fries", location: "Tema", distance: "20km", price: "₵57.00", oldPrice: "₵67.00", image: require("../../../assets/images/fries.png") },
  { id: "7", name: "Goat Sauce", location: "Accra", distance: "6km", price: "₵57.00", oldPrice: "₵67.00", image: require("../../../assets/images/goat.png") },
  { id: "8", name: "Beef Sauce", location: "Tema", distance: "10km", price: "₵57.00", oldPrice: "₵67.00", image: require("../../../assets/images/beef.png") },
  { id: "9", name: "Fries", location: "Tema", distance: "20km", price: "₵57.00", oldPrice: "₵67.00", image: require("../../../assets/images/fries.png") },
];

const TAB_ICONS: { key: string; label: string; route: keyof RootStackParamList; icon: any }[] = [
  { key: "home", label: "Home", route: "Home", icon: require("../../../assets/icons/home.png") },
  { key: "notifications", label: "Notification", route: "Notifications", icon: require("../../../assets/icons/notification.png") },
  { key: "checkout", label: "Checkout", route: "Checkout", icon: require("../../../assets/icons/checkout.png") },
  { key: "orders", label: "Orders", route: "Orders", icon: require("../../../assets/icons/orders.png") },
  { key: "menu", label: "Menu", route: "Menu", icon: require("../../../assets/icons/menu.png") },
];

const screenWidth = Dimensions.get("window").width;
const itemMargin = scaleWidth(10);
const numColumns = 3;
const cardWidth = (screenWidth - itemMargin * (numColumns + 2)) / numColumns;

const Home = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleTabPress = (tab: typeof TAB_ICONS[0]) => {
    if (tab.key === "menu") {
      setMenuVisible(true);
    } else {
      navigation.navigate(tab.route as never);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Title/Address */}
          <View style={styles.header}>
            <Text style={styles.largeTitle}>  My Tasty Chugo meals</Text>
            <Text style={styles.subTitle}>  Order & Eat</Text>
            <Text style={styles.address}>      Nil ankrah road spintex</Text>
          </View>

          {/* Search Section */}
          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <TextInput
                placeholder="Search a meal"
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
                placeholderTextColor="#798295"
              />
              <Image
                source={require("../../../assets/icons/search.png")}
                style={styles.searchIconImg}
              />
            </View>
            <TouchableOpacity style={styles.filterBox} onPress={() => navigation.navigate("FilterScreen")}>
              <Image
                source={require("../../../assets/icons/filter.png")}
                style={styles.filterIconImg}
              />
            </TouchableOpacity>
          </View>

          {/* Categories Row */}
          <View style={styles.categoriesRow}>
            {categories.map((cat) => (
              <View key={cat} style={styles.categoryTag}>
                <Text style={styles.categoryText}>{cat}</Text>
                <Text style={styles.removeX}>×</Text>
              </View>
            ))}
          </View>

          {/* Meals Grid */}
          <FlatList
            data={meals}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.mealCard, { width: cardWidth }]}
                onPress={() => navigation.navigate("FoodDetail", { meal: item })}
                activeOpacity={0.85}
              >
                <Image source={item.image} style={styles.mealImg} />
                <Text style={styles.mealName}>
                  {item.name.length > 14 ? item.name.slice(0, 14) + "..." : item.name}
                </Text>
                <Text style={styles.mealDesc}>
                  {item.location} • {item.distance}
                </Text>
                <View style={styles.mealPriceRow}>
                  <Text style={styles.price}>{item.price}</Text>
                  <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                </View>
                <Text style={styles.fireIcon}>🔥</Text>
              </TouchableOpacity>
            )}
            style={styles.gridList}
            contentContainerStyle={{ paddingBottom: 90 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            scrollEnabled={false}
          />
        </ScrollView>

        {/* Tab Bar */}
        <View style={styles.bottomNav}>
          {TAB_ICONS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => handleTabPress(tab)}
            >
              <Image source={tab.icon} style={styles.tabIconImg} />
              <Text style={styles.tabLabel}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Modal */}
        <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingTop: scaleHeight(18),
    paddingHorizontal: scaleWidth(8),
  },
  header: { marginBottom: scaleHeight(10) },
  largeTitle: {
    fontSize: scaleFont(32),
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    marginBottom: scaleHeight(3),
    marginTop: scaleHeight(50),
  },
  subTitle: {
    fontSize: scaleFont(32),
    fontWeight: "500",
    color: "rgba(20, 32, 50, 1)",
    marginBottom: scaleHeight(3),
  },
  address: {
    fontSize: scaleFont(14),
    color: "rgba(20, 32, 50, 0.59)",
    marginBottom: scaleHeight(9),
    fontWeight: "400",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(8),
  },
  searchBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: scaleSize(10),
    flexDirection: "row",
    alignItems: "center",
    height: scaleHeight(52),
    paddingHorizontal: scaleWidth(11),
  },
  searchInput: {
    flex: 1,
    fontSize: scaleFont(20),
    color: "rgba(20, 32, 50, 1)",
  },
  searchIconImg: {
    width: scaleSize(22),
    height: scaleSize(22),
    marginLeft: scaleWidth(7),
    tintColor: "#34395A",
    resizeMode: "contain",
  },
  filterBox: {
    marginLeft: scaleWidth(7),
    backgroundColor: "#fff",
    borderRadius: scaleSize(12),
    width: scaleWidth(52),
    height: scaleHeight(52),
    alignItems: "center",
    justifyContent: "center",
  },
  filterIconImg: {
    width: scaleSize(24),
    height: scaleSize(24),
    tintColor: "#34395A",
    resizeMode: "contain",
  },
  categoriesRow: {
    flexDirection: "row",
    marginVertical: scaleHeight(10),
    flexWrap: "wrap",
  },
  categoryTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: scaleWidth(13),
    height: scaleHeight(30),
    marginRight: scaleWidth(9),
    borderRadius: scaleSize(16),
    marginBottom: scaleHeight(6),
  },
  categoryText: {
    fontSize: scaleFont(14),
    color: "rgba(20, 32, 50, 1)",
    marginRight: scaleWidth(3),
  },
  removeX: {
    fontSize: scaleFont(16),
    color: "rgba(20, 32, 50, 1)",
    fontWeight: "400",
    marginLeft: scaleWidth(1),
  },
  gridList: {
    flex: 1,
    marginTop: scaleHeight(2),
    marginLeft: scaleWidth(-8),
  },
  mealCard: {
    backgroundColor: "#fff",
    borderRadius: scaleSize(20),
    margin: scaleWidth(8),
    padding: scaleWidth(7),
    height: scaleHeight(177),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: scaleHeight(1) },
    shadowRadius: scaleSize(3),
    elevation: 2,
    alignItems: "center",
    position: "relative",
  },
  mealImg: {
    width: scaleWidth(82),
    height: scaleHeight(80),
    borderRadius: scaleSize(20),
    marginBottom: scaleHeight(5),
    backgroundColor: "#eee",
  },
  mealName: {
    color: "rgba(20, 32, 50, 1)",
    fontWeight: "400",
    fontSize: scaleFont(12),
    marginBottom: scaleHeight(2),
    textAlign: "center",
  },
  mealDesc: {
    fontSize: scaleFont(9),
    color: "rgba(20, 32, 50, 0.59)",
    marginBottom: scaleHeight(2),
  },
  mealPriceRow: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(2),
    marginBottom: scaleHeight(3),
  },
  price: {
    color: "rgba(55, 73, 87, 1)",
    fontWeight: "700",
    fontSize: scaleFont(12),
  },
  oldPrice: {
    color: "rgba(55, 73, 87, 1)",
    fontSize: scaleFont(10),
    textDecorationLine: "line-through",
    marginTop: scaleHeight(4),
  },
  fireIcon: {
    position: "absolute",
    top: scaleHeight(7),
    right: scaleWidth(8),
    fontSize: scaleFont(15),
    color: "#F95F18",
  },
  bottomNav: {
    width: "100%",
    height: scaleHeight(65),
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
