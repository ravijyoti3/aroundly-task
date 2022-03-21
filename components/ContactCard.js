import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const ContactCard = ({ name, phone, type }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.line} />

      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/avatar.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{name.slice(0, 25)}</Text>
            <Text style={styles.phone}>{phone}</Text>
          </View>
        </View>
        <View style={styles.invite}>
          <Pressable style={styles.button}>
            <Text
              style={{
                color: "#fff",
                fontFamily: "Poppins-Medium",
                fontSize: 12,
                alignSelf: "center",
              }}
            >
              {type == "follow" ? "+Follow" : "Invite"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginRight: 20,
  },
  image: {
    height: 55,
    width: 55,
  },
  infoContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  name: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  phone: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  invite: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#5d34ec",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: 83,
  },
  line: {
    borderBottomColor: "#383838",
    borderBottomWidth: 1,
    width: "100%",
  },
});

export default ContactCard;
