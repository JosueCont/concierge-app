import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

let config = {
  baseURL: Constants.manifest.extra.production === true ? Constants.manifest.extra.URL_PEOPLE : Constants.manifest.extra.URL_PEOPLE_DEV,
  headers: {
    Accept: "application/json",
  },
};
console.log(config)
let APIKit = axios.create(config);

APIKit.interceptors.request.use(async function (conf) {
  console.log(conf.method, ': :', config.url)
  console.log(conf.data)
  try {
    let userData = await AsyncStorage.getItem("user");
    //console.log(config.data)
    let token = (await JSON.parse(userData).user_id) ? JSON.parse(userData).user_id : "";
    if (token) conf.headers.Authorization = token;
  } catch (e) {
    console.log(e)
  }

  return conf;
});

APIKit.interceptors.response.use(function (response) {
  //console.log(response.data)
  return response;
});

export default APIKit;
