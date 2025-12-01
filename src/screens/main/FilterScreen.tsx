// FoodMapScreen.js
// React Native screen with a map background placeholder and a bottom sheet restaurant UI
// No Expo-specific APIs used.

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

type OfferItem = {
  id: string;
  title: string;
  location: string;
  price: string;
  oldPrice: string;
  image: { uri: string };
};

const OFFERS: OfferItem[] = [
  {
    id: '1',
    title: 'Chicken 6piece',
    location: 'Tema',
    price: '₵57.00',
    oldPrice: '₵667.00',
    image: { uri: 'https://via.placeholder.com/150x100.png?text=Chicken' },
  },
  {
    id: '2',
    title: 'Fried friece',
    location: 'Tema',
    price: '₵57.00',
    oldPrice: '₵667.00',
    image: { uri: 'https://via.placeholder.com/150x100.png?text=Fries' },
  },
];

const FilterScreen = () => {
  const navigation = useNavigation();

  const renderOffer = ({ item }: { item: OfferItem }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.cardImageWrapper}>
        <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.badgeHot}>
          <Icon name="flame" size={14} color="#ff6b00" />
        </View>
      </View>
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.cardLocation}>• {item.location}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.oldPrice}>{item.oldPrice}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Back button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={require("../../../assets/icons/back.png")} 
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>

      {/* Map background placeholder.
         Replace this View later with your real map (e.g. <MapView ... />). */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>MAP GOES HERE</Text>
      </View>

      {/* Bottom sheet */}
      <View style={styles.bottomSheet}>
        {/* Header - Dark Blue Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Image
                source={{
                  uri: 'https://via.placeholder.com/80x80.png?text=Logo',
                }}
                style={styles.logo}
              />
              <View style={{ flexShrink: 1, marginLeft: 10 }}>
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

        {/* Body - Light Gray Section */}
        <View style={styles.bodySection}>
          {/* Offers title */}
          <Text style={styles.sectionTitle}>Chugo's offers</Text>

          {/* Offers list */}
          <FlatList
            horizontal
            data={OFFERS}
            keyExtractor={(item) => item.id}
            renderItem={renderOffer}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offersList}
          />

          {/* Pagination dots */}
          <View style={styles.paginationDots}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 10,
  },
  backButton: {
    width: 20,
    height: 20,
    tintColor: '#000000',
    resizeMode: 'contain',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  headerSection: {
    backgroundColor: '#101C2A',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadge: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingStar: {
    color: '#fff',
    fontSize: 12,
    marginRight: 2,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  headerRight: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  directionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
  },
  directionText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  closingText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '400',
  },
  bodySection: {
    backgroundColor: '#F7F8FA',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222B45',
    textAlign: 'center',
    marginBottom: 16,
  },
  offersList: {
    paddingVertical: 8,
  },
  card: {
    width: 150,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImageWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
  },
  badgeHot: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222B45',
    marginBottom: 4,
  },
  cardLocation: {
    fontSize: 12,
    color: '#949CA6',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222B45',
    marginBottom: 2,
  },
  oldPrice: {
    fontSize: 12,
    color: '#949CA6',
    textDecorationLine: 'line-through',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: '#10b981',
    width: 24,
  },
});

export default FilterScreen;
