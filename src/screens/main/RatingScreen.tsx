import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SwipeBackWrapper from '../../components/SwipeBackWrapper';

const RatingScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = React.useState(2);
  const stars = [1, 2, 3, 4, 5];

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
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>How's your order?</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Rating */}
      <View style={{ marginTop: 24 }}>
        <Text style={styles.caption}>You’r overall rating</Text>
        <View style={styles.starRow}>
          {stars.map(s => (
            <TouchableOpacity key={s} onPress={() => setRating(s)}>
              <Icon
                name={s <= rating ? 'star' : 'star'}
                size={28}
                color={s <= rating ? '#111827' : '#E5E7EB'}
                style={{ marginRight: 8 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Comment box */}
      <View style={{ marginTop: 32 }}>
        <Text style={styles.sectionLabel}>Add detailed review</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Comment"
          placeholderTextColor="#9CA3AF"
          multiline
        />
      </View>

      {/* Add photo */}
      <TouchableOpacity style={styles.addPhotoRow}>
        <Icon name="image" size={18} color="#111827" />
        <Text style={styles.addPhotoText}>Add photo</Text>
      </TouchableOpacity>

      {/* Submit button */}
      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Submit</Text>
      </TouchableOpacity>
      </View>
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
    padding: 20,
    backgroundColor: '#fff',
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
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(55, 73, 87, 1)",
    textAlign: "center",
    marginLeft: -24,
  },
  caption: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#111827',
  },
  addPhotoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  addPhotoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#111827',
  },
  primaryButton: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RatingScreen;
