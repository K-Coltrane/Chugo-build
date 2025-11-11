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
    </Stack.Navigator>
  );
};

export default OnboardingStack;
