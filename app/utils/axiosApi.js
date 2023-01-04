import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

let config = {
  baseURL:
    Constants.manifest.extra.production === true
      ? Constants.manifest.extra.URL_PEOPLE
      : Constants.manifest.extra.URL_PEOPLE_DEV,
  headers: {
    Accept: "application/json",
  },
};
let APIKit = axios.create(config);

const checkTenant = async () => {
  let tenant = await AsyncStorage.getItem("tenant");
  return tenant;
};

APIKit.interceptors.request.use(async function (conf) {
  const tenant = await checkTenant();
  if (tenant) conf.baseURL = conf.baseURL.replace("[tenant]", tenant);
  try {
    let userData = await AsyncStorage.getItem("user");
    if (userData) {
      let token = (await JSON.parse(userData).user_id)
        ? JSON.parse(userData).user_id
        : "";
      if (token) conf.headers.Authorization = token;
    }
  } catch (e) {
    console.log(e);
  }

  return conf;
});

APIKit.interceptors.response.use(function (response) {
  return response;
});

export default APIKit;
