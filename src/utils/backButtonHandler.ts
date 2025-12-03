import { NavigationProp } from '@react-navigation/native';

/**
 * Handles back button navigation - checks navigation state to see if we can go back
 * Falls back to Home if no navigation history exists
 */
export const handleBackButton = (navigation: NavigationProp<any>) => {
  const state = navigation.getState();
  if (state && state.index > 0) {
    navigation.goBack();
  } else {
    navigation.navigate('Home' as never);
  }
};

