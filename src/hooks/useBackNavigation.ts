import { useNavigation, useRoute } from '@react-navigation/native';

// Define tab screens that should always go back to Home
const TAB_SCREENS = ['Home', 'Checkout', 'Orders', 'Notifications'];

export const useBackNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentRouteName = route.name;

  const handleBack = () => {
    // Get navigation state
    const state = navigation.getState();
    const currentRouteIndex = state.index;
    
    // If we're on a tab screen, always go to Home (they act like tabs)
    if (TAB_SCREENS.includes(currentRouteName)) {
      (navigation as any).navigate('Home');
      return;
    }

    // For other screens, check if we can go back
    if (navigation.canGoBack() && currentRouteIndex > 0) {
      navigation.goBack();
    } else {
      // Fallback: navigate to Home
      (navigation as any).navigate('Home');
    }
  };

  return { handleBack };
};

