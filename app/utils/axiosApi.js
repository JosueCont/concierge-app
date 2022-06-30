import axios from "axios";
import {AsyncStorage} from "react-native";
import Constants from "expo-constants";

let config = {
  baseURL: Constants.manifest.extra.production === true ? Constants.manifest.extra.URL_PEOPLE : Constants.manifest.extra.URL_PEOPLE_DEV,
  headers: {
    Accept: "application/json",
  },
};

let APIKit = axios.create(config);

APIKit.interceptors.request.use(async function (config) {
  console.log(config)
  try {
    let userData = await AsyncStorage.getItem("user");
    let token = (await JSON.parse(userData).user_id)
      ? JSON.parse(userData).user_id
      : "";
    if (token) config.headers.Authorization = token;
  } catch (e) {}

  return config;
});

APIKit.interceptors.response.use(function (config) {
  console.log(config)
  return config;
});

export default APIKit;
