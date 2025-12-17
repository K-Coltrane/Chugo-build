import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import all your onboarding + auth screens
import Onboarding1 from "../screens/onboarding/Onboarding1.tsx";
import Onboarding2 from "../screens/onboarding/Onboarding2.tsx";
import Onboarding3 from "../screens/onboarding/Onboarding3.tsx";
import Signup from "../screens/onboarding/Signup.tsx";
import Login from "../screens/onboarding/Login.tsx";
import UseOTP from "../screens/onboarding/UseOTP.tsx";
import OTP from "../screens/onboarding/OTP.tsx";

// Import main app screens
import Home from "../screens/main/Home.tsx";
import Checkout from "../screens/main/Checkout.tsx";
import Orders from "../screens/main/Orders.tsx";
import Notifications from "../screens/main/Notifications.tsx";
import OrderDetail from "../screens/main/OrderDetail.tsx";
import ProfileScreen from "../screens/main/ProfileScreen.tsx";
import FAQS from "../screens/main/FAQS.tsx";
import PrivacyPolicyScreen from "../screens/main/Privacy.tsx";
import TermsScreen from "../screens/main/Terms.tsx";
import DeleteScreen from "../screens/main/DeleteScreen.tsx";
import FoodDetailScreen from "../screens/main/FoodDetailScreen.tsx";
import PaymentScreen from "../screens/main/PaymentScreen.tsx";
import RatingScreen from "../screens/main/RatingScreen.tsx";
import TrackingScreen from "../screens/main/Tracking.tsx";
import VerifyScreen from "../screens/main/VerifyScreen.tsx";
import FilterScreen from "../screens/main/FilterScreen.tsx";
import MenuScreen from "../screens/main/MenuScreen.tsx";

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
       <Stack.Screen name="Onboarding2" component={Onboarding2} />
       <Stack.Screen name="Onboarding3" component={Onboarding3} />
       <Stack.Screen name="Signup" component={Signup}/>
       <Stack.Screen name="Login" component={Login}/>
       <Stack.Screen name="UseOTP" component={UseOTP}/>
       <Stack.Screen name="OTP" component={OTP}/>
       {/* Main app screens */}
       <Stack.Screen name="Home" component={Home}/>
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
       <Stack.Screen name="RatingScreen" component={RatingScreen} />
       <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
       <Stack.Screen name="TrackingScreen" component={TrackingScreen} />
       <Stack.Screen name="FilterScreen" component={FilterScreen} />
       <Stack.Screen name="Menu" component={MenuScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
