import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SwipeBackWrapper from '../../components/SwipeBackWrapper';
import MenuModal from '../../components/MenuModal';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';

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
          <View style={{ width: 24 }} />
          <View style={{ flex: 1 }} />
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
            <Text style={styles.caption}>You'r overall rating</Text>
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

          {/* Add photo */}
          <TouchableOpacity style={styles.addPhotoRow} activeOpacity={0.7} onPress={handleImagePicker}>
            <Image source={require("../../../assets/icons/photo.png")} style={styles.photoIcon} />
            <Text style={styles.addPhotoText}>Add photo</Text>
          </TouchableOpacity>

          {/* Display selected image */}
          {selectedImage && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
              <TouchableOpacity 
                style={styles.removeImageButton}
                onPress={() => setSelectedImage(null)}
              >
                <Text style={styles.removeImageText}>×</Text>
              </TouchableOpacity>
            </View>
          )}

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
    backgroundColor: "rgba(246, 246, 246, 1)",
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  closeIcon: {
    fontSize: 20,
    color: "#111827",
    fontWeight: "300",
    lineHeight: 20,
    transform: [{ rotate: '45deg' }],
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginTop: 30,
  },
  ratingSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  caption: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: -5,
    marginTop: 50,
    textAlign: 'center',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starButton: {
    marginRight: 8,
    padding: 4,
  },
  star: {
    fontSize: 55,
  },
  starFilled: {
    color: '#081528',
  },
  starEmpty: {
    color: '#D9D9D9',
  },
  reviewSection: {
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: '#37495717',
    paddingTop: 30,
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: '400',
    color: '#142032',
    marginBottom: 12,
    lineHeight: 20,
    marginTop: 30,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 16,
    height: 176,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#fff',
  },
  addPhotoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 16,
  },
  photoIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  addPhotoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#142032',
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  imagePreviewContainer: {
    marginTop: 16,
    position: 'relative',
    alignItems: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#111827',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#081528',
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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

export default RatingScreen;
