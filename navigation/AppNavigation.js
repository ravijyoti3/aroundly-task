import React, { useEffect, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AuthContext from "../auth/context";
import Map from "../screens/Map";
import Contact from "../screens/Contact";

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const authContext = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home";
          } else if (route.name === "Contact") {
            iconName = focused ? "ios-book" : "ios-book";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#ffffff",
        inactiveTintColor: "gray",
        tabStyle: {
          backgroundColor: "#121212",
          marginTop: -1,
          borderTopWidth: 1,
          borderTopColor: "#282828",
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Contact" component={ContactStack} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      options={{ headerShown: false }}
      component={Map}
    />
  </Stack.Navigator>
);

const ContactStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search Saloon"
      options={{ headerShown: false }}
      component={Contact}
    />
  </Stack.Navigator>
);

const titleStyle = {
  animationEnabled: false,
  headerTitleStyle: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#fff",
  },
  headerStyle: {
    backgroundColor: "#484848",
  },
};

export default AppNavigation;
