import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import authStorage from "../auth/storage";

const Map = () => {
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
  });
  const [center, setCenter] = useState(null);
  const [image, setImage] = useState(null);

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      let location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 1,
        },
        (loc) => {
          console.log("e", loc);
          setRegion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getImage = async () => {
    const imgUri = await authStorage.getLocal("image");
    console.log(imgUri);
    setImage(JSON.parse(imgUri).uri);
  };

  useEffect(() => {
    getLocation();
    getImage();
  }, []);

  return (
    <View style={styles.container}>
      {/*Render our MapView*/}
      <MapView
        move
        style={styles.map}
        //specify our coordinates.
        initialRegion={region}
      >
        <Marker position={center} coordinate={region}>
          <Image
            source={{ uri: image }}
            style={{
              borderRadius: 100,
              borderWidth: 2,
              borderColor: "black",
              width: 30,
              height: 30,
            }}
          />
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
