import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import ImageInput from "../components/ImageInput";
import mime from "mime";
import authStorage from "../auth/storage";
import { Image } from "react-native";
import AuthContext from "../auth/context";

const SignUp = () => {
  const authContext = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState();
  const [dataImg, setDataImg] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  var newImageUri = "";
  if (image) newImageUri = "file:///" + image.uri.split("file:/").join("");

  const img = {
    uri: newImageUri,
    type: mime.getType(newImageUri),
    name: name,
  };
  const handleSubmit = async () => {
    authStorage.storeLocal("name", name);
    authStorage.storeLocal("email", email);
    authStorage.storeLocal("date", date);
    authStorage.storeLocal("image", img);
    authStorage.storeLocal("image", img);
    // const data = await authStorage.getLocal("image");
    // setDataImg(JSON.parse(data).uri);
    authContext.setUser({
      name,
      email,
      date,
      image: img,
    });
    console.log(authContext);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>SignUp</Text>
      <View style={{ marginTop: 40 }}>
        <Text style={styles.label}>Photo</Text>

        <ImageInput
          imageUri={image?.uri}
          onChangeImage={(image) => setImage(image)}
        />
        {/* {dataImg && (
          <Image
            source={{ uri: dataImg }}
            style={{ height: 100, width: 100 }}
          />
        )} */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Enter name here"
        />
        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter email here"
        />
        <Text style={styles.label}>Date of birth</Text>

        <Pressable style={styles.input} onPress={() => setShow(true)}>
          <Text style={{ alignSelf: "center", fontFamily: "Poppins-Regular" }}>
            {date.toISOString().split("T")[0]}
          </Text>
        </Pressable>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={false}
            display="calendar"
            onChange={onChange}
          />
        )}
        <Pressable
          style={[styles.input, { backgroundColor: "purple", marginTop: 20 }]}
          onPress={() => handleSubmit()}
        >
          <Text
            style={{
              alignSelf: "center",
              fontFamily: "Poppins-Medium",
              color: "#fff",
            }}
          >
            Submit
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 30,
  },
  head: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Poppins-Bold",
    marginTop: 50,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    width: 300,
    borderRadius: 30,
    marginBottom: 25,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default SignUp;
