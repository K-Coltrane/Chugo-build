import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'; // or any icon set

const RatingScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = React.useState(2);
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>How’s your order?</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="x" size={22} color="#111827" />
        </TouchableOpacity>
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

      {/* Your custom bottom nav here */}
      {/* <BottomNav /> */}
    </View>
  );
};

export default RatingScreen;
