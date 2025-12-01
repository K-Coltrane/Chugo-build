import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your main/home app screens
import Home from "../screens/main/Home.tsx";
import Checkout from "../screens/main/Checkout.tsx";
import Orders from "../screens/main/Orders.tsx";
import Notifications from "../screens/main/Notifications.tsx";

import OrderDetail from "../screens/main/OrderDetail.tsx";
import ProfileScreen from "../screens/main/ProfileScreen.tsx";
import FAQS from "../screens/main/FAQS.tsx"
import PrivacyPolicyScreen from "../screens/main/Privacy.tsx";
import TermsScreen from "../screens/main/Terms.tsx";
import DeleteScreen from "../screens/main/DeleteScreen.tsx";
import FoodDetailScreen from "../screens/main/FoodDetailScreen.tsx";
import PaymentScreen from "../screens/main/PaymentScreen.tsx"
import RatingScreen from "../screens/main/RatingScreen.tsx"
import TrackingScreen from "../screens/main/Tracking.tsx"
import VerifyScreen from "../screens/main/VerifyScreen.tsx"
// ... import other main app screens as needed

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Notifications" component={Notifications} />
     
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="FAQS" component={FAQS} />
      <Stack.Screen name="Privacy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteScreen} />
      <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="RatingScreen" component ={RatingScreen} />
     <Stack.Screen name="VerifyScreen" component ={VerifyScreen} />
     <Stack.Screen name="TrackingScreen" component ={TrackingScreen} />
      {/* Add any other screens in your main user app */}
    </Stack.Navigator>
  );
};

export default MainStack;
