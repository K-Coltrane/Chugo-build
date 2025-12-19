import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MenuModal from '../../components/MenuModal';
import SwipeBackWrapper from '../../components/SwipeBackWrapper';
import { scaleWidth, scaleHeight, scaleFont, scaleSize } from '../../utils/responsive';

type RootStackParamList = {
  Home: undefined;
  Notifications: undefined;
  Checkout: undefined;
  Orders: undefined;
  Menu: undefined;
  FilterScreen: undefined;
};

type OfferItem = {
  id: string;
  title: string;
  location: string;
  price: string;
  oldPrice: string;
  image: any;
};

const OFFERS: OfferItem[] = [
  {
    id: '1',
    title: 'Chicken 6piece',
    location: 'Tema',
    price: '₵57.00',
    oldPrice: '₵667.00',
    image: require("../../../assets/images/chicken.png"),
  },
  {
    id: '2',
    title: 'Fries',
    location: 'Tema',
    price: '₵57.00',
    oldPrice: '₵667.00',
    image: require("../../../assets/images/fries.png"),
  },
];

const TAB_ICONS = [
  { key: "home", label: "Home", route: "Home", icon: require("../../../assets/icons/home.png") },
  { key: "notifications", label: "Notification", route: "Notifications", icon: require("../../../assets/icons/notification.png") },
  { key: "checkout", label: "Checkout", route: "Checkout", icon: require("../../../assets/icons/checkout.png") },
  { key: "orders", label: "Orders", route: "Orders", icon: require("../../../assets/icons/orders.png") },
  { key: "menu", label: "Menu", route: "Menu", icon: require("../../../assets/icons/menu.png") },
];

const FilterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleTabPress = (tab: typeof TAB_ICONS[0]) => {
    if (tab.key === "menu") {
      setMenuVisible(true);
    } else {
      navigation.navigate(tab.route as never);
    }
  };

  const renderOffer = ({ item }: { item: OfferItem }) => (
    <TouchableOpacity style={styles.offerWrapper} activeOpacity={0.9}>
      <View style={styles.offerCard}>
        <Image source={item.image} style={styles.offerImage} />

        <Text style={styles.fireIcon}>🔥</Text>

        <Text style={styles.offerTitle}>{item.title}</Text>
        <Text style={styles.offerLocation}>• {item.location}</Text>

        <View style={styles.offerPriceRow}>
          <Text style={styles.offerPrice}>{item.price}</Text>
          <Text style={styles.offerOldPrice}>{item.oldPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SwipeBackWrapper>
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        
        {/* Map placeholder - covers entire screen */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>MAP GOES HERE</Text>
        </View>

        {/* Header - positioned absolutely on top */}
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
          <View style={{ width: scaleWidth(24) }} />
      </View>

      {/* Bottom sheet */}
      <View style={styles.bottomSheet}>
        {/* Header */}
        <View style={styles.headerSection}>
          <View style={styles.bottomSheetHeaderRow}>
            <View style={styles.headerLeft}>
              <Image
                source={require("../../../assets/images/Chickenman.jpg")}
                style={styles.logo}
              />
              <View style={{ flexShrink: 1, marginLeft: scaleWidth(10) }}>
                <Text style={styles.restaurantName} numberOfLines={1}>
                  Chickenman pizzaman
                </Text>

                <View style={styles.ratingRow}>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingStar}>★</Text>
                    <Text style={styles.ratingText}>4</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.directionBtn} activeOpacity={0.8}>
                <Icon name="arrow-forward" size={14} color="#fff" />
                <Text style={styles.directionText}>Direction</Text>
              </TouchableOpacity>

              <Text style={styles.closingText}>Closing 12:30 AM</Text>
            </View>
          </View>
        </View>

        {/* Body */}
        <View style={styles.bodySection}>
          <Text style={styles.sectionTitle}>Chugo's offers</Text>

          <FlatList
            horizontal
            data={OFFERS}
            keyExtractor={(item) => item.id}
            renderItem={renderOffer}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offersList}
          />

          {/* Pagination */}
          <View style={styles.paginationDots}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>

      {/* Bottom Navigation */}
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
      <MenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
      </SafeAreaView>
    </SwipeBackWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // Header - positioned absolutely on top of map
  headerRow: {
    position: 'absolute',
    top: scaleHeight(20),
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(18),
    height: scaleHeight(60),
    zIndex: 10,
    backgroundColor: 'transparent',
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
  
  // Bottom sheet header row (separate from top header)
  bottomSheetHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  mapPlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#6b7280',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },

  bottomSheet: {
    position: 'absolute',
    left: '5%',
    right: '5%',
    bottom: scaleHeight(100),
    borderTopLeftRadius: scaleSize(32),
    borderTopRightRadius: scaleSize(32),
    borderBottomLeftRadius: scaleSize(32),
    borderBottomRightRadius: scaleSize(32),
    backgroundColor: '#081528',
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scaleHeight(-3) },
    shadowOpacity: 0.15,
    shadowRadius: scaleSize(8),
    maxHeight: '50%',
    alignSelf: 'center',
    zIndex: 10,
  },

  headerSection: {
    backgroundColor: '#081528',
    paddingTop: scaleHeight(20),
    paddingHorizontal: scaleWidth(16),
    paddingBottom: scaleHeight(16),
    height: scaleHeight(120),
    alignItems: 'center',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: scaleSize(50),
    height: scaleSize(50),
    borderRadius: scaleSize(25),
  },
  restaurantName: {
    fontSize: scaleFont(20),
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: scaleHeight(8),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadge: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleSize(6),
  },
  ratingStar: {
    color: '#fff',
    fontSize: scaleFont(12),
    marginRight: scaleWidth(2),
  },
  ratingText: {
    color: '#fff',
    fontSize: scaleFont(12),
    fontWeight: '600',
  },

  headerRight: {
    alignItems: 'flex-end',
    marginLeft: scaleWidth(12),
  },
  directionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(6),
    borderRadius: scaleSize(12),
    marginBottom: scaleHeight(8),
  },
  directionText: {
    color: '#fff',
    marginLeft: scaleWidth(4),
    fontSize: scaleFont(12),
  },
  closingText: {
    fontSize: scaleFont(12),
    color: '#fff',
  },

  bodySection: {
    backgroundColor: '#F7F8FA',
    paddingTop: scaleHeight(20),
    paddingHorizontal: scaleWidth(16),
    paddingBottom: scaleHeight(16),
    marginTop: scaleHeight(-20),
    borderTopLeftRadius: scaleSize(20),
    borderTopRightRadius: scaleSize(20),
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: '#222B45',
    textAlign: 'center',
    marginBottom: scaleHeight(16),
  },

  offersList: {
    paddingVertical: scaleHeight(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleHeight(-20),
  },

  // --- EXACT OFFER CARD UI ---
  offerWrapper: {
    width: scaleWidth(150),
    alignItems: "center",
    justifyContent: "center",
    marginRight: scaleWidth(15),
  },
  offerCard: {
    width: scaleWidth(140),
    backgroundColor: "#ffffff",
    borderRadius: scaleSize(22),
    padding: scaleWidth(10),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scaleHeight(4) },
    shadowOpacity: 0.12,
    shadowRadius: scaleSize(8),
    elevation: 6,
    position: "relative",
    
  },
  offerImage: {
    width: "100%",
    height: scaleHeight(100),
    borderRadius: scaleSize(16),
  },
  fireIcon: {
    position: "absolute",
    top: scaleHeight(7),
    right: scaleWidth(8),
    fontSize: scaleFont(15),
    color: "#F95F18",
  },
  offerTitle: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: "#1A1D26",
    marginTop: scaleHeight(12),
  },
  offerLocation: {
    fontSize: scaleFont(12),
    color: "#A0A4AC",
    marginTop: scaleHeight(3),
  },
  offerPriceRow: {
    width: "100%",
    marginTop: scaleHeight(10),
    alignItems: "center",
  },
  offerPrice: {
    fontSize: scaleFont(17),
    fontWeight: "800",
    color: "#1A1D26",
  },
  offerOldPrice: {
    fontSize: scaleFont(12),
    color: "#A0A4AC",
    textDecorationLine: "line-through",
    marginTop: scaleHeight(4),
  },

  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleHeight(16),
    gap: scaleWidth(8),
  },
  dot: {
    width: scaleSize(8),
    height: scaleSize(8),
    borderRadius: scaleSize(4),
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: '#10b981',
    width: scaleWidth(24),
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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

export default FilterScreen;
