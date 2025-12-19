import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SwipeBackWrapper from '../../components/SwipeBackWrapper';
import MenuModal from '../../components/MenuModal';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import { scaleWidth, scaleHeight, scaleFont, scaleSize } from '../../utils/responsive';

type RootStackParamList = {
  Home: undefined;
  Notifications: undefined;
  Checkout: undefined;
  Orders: undefined;
  Menu: undefined;
};

const TAB_ICONS = [
  { key: "home", label: "Home", route: "Home", icon: require("../../../assets/icons/home.png") },
  { key: "notifications", label: "Notification", route: "Notifications", icon: require("../../../assets/icons/notification.png") },
  { key: "checkout", label: "checkout", route: "Checkout", icon: require("../../../assets/icons/checkout.png") },
  { key: "orders", label: "Orders", route: "Orders", icon: require("../../../assets/icons/orders.png") },
  { key: "menu", label: "Menu", route: "Menu", icon: require("../../../assets/icons/menu.png") },
];

const RatingScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const stars = [1, 2, 3, 4, 5];

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.8 as const,
      includeBase64: false,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets[0]) {
        setSelectedImage(response.assets[0].uri || null);
      }
    });
  };

  const handleTabPress = (key: string, route: string) => {
    if (key === "menu") {
      setMenuVisible(true);
    } else {
      // @ts-ignore
      navigation.navigate(route);
    }
  };

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
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>How's your order?</Text>
          </View>
          {/* Rating */}
          <View style={styles.ratingSection}>
            <Text style={styles.caption}>Your overall rating</Text>
            <View style={styles.starRow}>
              {stars.map(s => (
                <TouchableOpacity 
                  key={s} 
                  onPress={() => setRating(s)}
                  activeOpacity={0.7}
                  style={styles.starButton}
                >
                  <Text style={[
                    styles.star,
                    s <= rating ? styles.starFilled : styles.starEmpty
                  ]}>★</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Comment box */}
          <View style={styles.reviewSection}>
            <Text style={styles.sectionLabel}>Add detailed review</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Comment"
              placeholderTextColor="#9CA3AF"
              multiline
              value={comment}
              onChangeText={setComment}
            />
          </View>

      

        
        

          {/* Submit button */}
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
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
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    alignItems: "flex-end",
    paddingTop: scaleHeight(10),
    paddingBottom: scaleHeight(6),
    paddingHorizontal: scaleWidth(20),
    marginTop: scaleHeight(40),
  },
  closeIcon: {
    fontSize: scaleFont(20),
    color: "#111827",
    fontWeight: "400",
    lineHeight: scaleFont(22),
  },
  scrollContent: {
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(10),
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: scaleHeight(50),
    marginBottom: scaleHeight(18),
  },
  title: {
    fontSize: scaleFont(32),
    lineHeight: scaleFont(32),
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#111827',
    textAlign: 'center',
  },
  ratingSection: {
    marginTop: scaleHeight(4),
    alignItems: 'center',
    paddingBottom: scaleHeight(22),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  caption: {
    fontSize: scaleFont(18),
    color: '#6B7280',
    marginBottom: scaleHeight(10),
    textAlign: 'center',
    marginTop: scaleHeight(60),
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scaleHeight(100),
  },
  starButton: {
    marginHorizontal: scaleWidth(6),
    paddingVertical: scaleHeight(4),
    paddingHorizontal: scaleWidth(2),
  },
  star: {
    fontSize: scaleFont(55),
    lineHeight: scaleFont(44),
  },
  starFilled: {
    color: '#081528',
  },
  starEmpty: {
    color: '#D9D9D9',
  },
  reviewSection: {
    paddingTop: scaleHeight(22),
  },
  sectionLabel: {
    fontSize: scaleFont(20),
    fontWeight: '400',
    color: '#142032',
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(10),
    lineHeight: scaleFont(18),
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(12),
    height: scaleHeight(176),
    width: scaleWidth(380),
    textAlignVertical: 'top',
    fontSize: scaleFont(14),
    color: '#111827',
    backgroundColor: '#fff',
  },
  
 
  
 
  
  primaryButton: {
    backgroundColor: '#081528',
    paddingVertical: scaleHeight(14),
    borderRadius: scaleSize(100),
    alignItems: 'center',
    marginTop: scaleHeight(26),
    marginBottom: scaleHeight(18),
    height: scaleHeight(68),
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: scaleFont(20),
    fontWeight: '500',
    marginTop: scaleHeight(5),
  },
  bottomNav: {
    width: "100%",
    height: scaleHeight(65),
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#EEF0F3",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
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

export default RatingScreen;
