import { NavigationProp } from '@react-navigation/native';

// Define tab screens that should always go back to Home
const TAB_SCREENS = ['Home', 'Checkout', 'Orders', 'Notifications'];

export const handleBackPress = (navigation: NavigationProp<any>, currentRouteName?: string) => {
  // Get navigation state
  const state = navigation.getState();
  const currentRouteIndex = state.index;
  
  // Get current route name from state if not provided
  const routeName = currentRouteName || state.routes[currentRouteIndex]?.name;

  // If we're on a tab screen, always go to Home (they act like tabs)
  if (routeName && TAB_SCREENS.includes(routeName)) {
    navigation.navigate('Home' as never);
    return;
  }

  // For other screens, check if we can go back
  if (navigation.canGoBack() && currentRouteIndex > 0) {
    navigation.goBack();
  } else {
    // Fallback: navigate to Home
    navigation.navigate('Home' as never);
  }
};

