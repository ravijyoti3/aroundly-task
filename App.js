import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Map from "./screens/Map";
import SignUp from "./screens/SignUp";
import * as Font from "expo-font";
import Contact from "./screens/Contact";
import DefaultNavigation from "./navigation/DefaultNavigation";

export default function App() {
  const [fontsLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
      "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);
  if (!fontsLoaded) return null;

  return <DefaultNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
