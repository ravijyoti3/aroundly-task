import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import ContactCard from "../components/ContactCard";
// import Contacts from "react-native-contacts";
import { PermissionsAndroid } from "react-native";
import * as Contacts from "expo-contacts";
import axios from "axios";
import consts from "../Const";

const Contact = () => {
  const [contact, setContact] = useState(null);
  const [dataAroundly, setdataAroundly] = useState(null);

  const getServerData = () => {
    axios
      .get(`http://192.168.1.36:8000/api/allContacts`)
      .then((res) => {
        let arr = [];
        res.data.forEach((e) => {
          let obj = { name: e.name, phone: e.phone };
          arr.push(e.phone);
        });
        setdataAroundly(arr);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const syncContact = async () => {
    getServerData();
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const contact = data;
        let contactList = [];
        contact.forEach((item) => {
          if (item.phoneNumbers?.length > 0) {
            let type = "";
            if (dataAroundly.includes(item.phoneNumbers[0].number)) {
              type = "follow";
            } else {
              type = "invite";
            }

            let obj = {
              name: item.name,
              phone: item.phoneNumbers[0]?.number,
              type: type,
            };
            contactList.push(obj);
          }
        });
        setContact(contactList);
        console.log(contactList);
      }
    }
  };

  const showContactCards = () => {
    if (contact) {
      return contact.map((item, index) => {
        return (
          <ContactCard
            key={index}
            name={item.name}
            phone={item.phone}
            type={item.type}
          />
        );
      });
    }
  };

  useEffect(() => {
    getServerData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Find People</Text>
      <Text style={styles.label}>
        Aroundly is fun with Friends & Folks in the same City
      </Text>
      <Text style={styles.helper}>
        Follow or invite them to share experiences
      </Text>
      <View style={{ flex: 1, marginBottom: -30 }}>
        {/* Draw horizontal line */}
        <ScrollView>{showContactCards()}</ScrollView>
        {!contact && (
          <Pressable
            style={[
              styles.input,
              {
                backgroundColor: "#5d34ec",
                marginTop: 20,
                position: "absolute",
                bottom: 20,
              },
            ]}
            onPress={() => syncContact()}
          >
            <Text
              style={{
                alignSelf: "center",
                fontFamily: "Poppins-Medium",
                color: "#fff",
              }}
            >
              Sync Contacts
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17191c",
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  head: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Poppins-Bold",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    width: 300,
    borderRadius: 30,
    marginBottom: 25,
    alignSelf: "center",
  },
  label: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    marginBottom: 5,
    marginTop: 10,
  },
  helper: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginBottom: 10,
  },
});

export default Contact;
