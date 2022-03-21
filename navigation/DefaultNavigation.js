import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigation";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import AppNavigation from "./AppNavigation";
import * as Font from "expo-font";

const DefaultNavigation = () => {
  const [user, setUser] = React.useState(null);
  const [fontsLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
      "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });
    setFontLoaded(true);
  };

  const restoreToken = async () => {
    const user = await authStorage.getLocal("name");
    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    loadFonts();
    restoreToken();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ user, setUser }}>
        {user ? <AppNavigation /> : <AuthNavigator />}
      </AuthContext.Provider>
    </NavigationContainer>
  );
};
export default DefaultNavigation;
