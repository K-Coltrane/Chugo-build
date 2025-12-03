import { NavigationProp } from '@react-navigation/native';

export const handleBackNavigation = (navigation: NavigationProp<any>) => {
  const state = navigation.getState();
  
  // Check navigation state index - if we have previous routes, go back
  if (state && state.index > 0) {
    navigation.goBack();
  } else {
    // No navigation history, navigate to Home
    navigation.navigate('Home' as never);
  }
};

