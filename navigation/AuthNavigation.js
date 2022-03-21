import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        animationEnabled: false,
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
