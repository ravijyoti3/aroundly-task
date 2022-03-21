import * as SecureStore from "expo-secure-store";

const storeLocal = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (error) {
    console.log("Error secure store", error);
  }
};

const getLocal = async (key) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const removeLocal = (key) => {
  try {
    SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("error in deleting auth token", error);
  }
};

export default { getLocal, storeLocal, removeLocal };
