import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { 
  URL_PEOPLE,
  URL_PEOPLE_DEV, 
  PROTOCOL, 
  production ,
  TENANT_DEFAULT,
} = Constants.manifest.extra

const getUrlBaseTenant = async () => {
  let tenant = TENANT_DEFAULT
  let tenantAysnc = await AsyncStorage.getItem("tenant");
  if(tenantAysnc) tenant = tenantAysnc;
  return `${PROTOCOL}${tenant}.${production ? URL_PEOPLE : URL_PEOPLE_DEV}`;
}


let config = {
  baseURL: getUrlBaseTenant(),
  headers: {
    Accept: "application/json",
  },
};

let APIKit = axios.create(config);

APIKit.interceptors.request.use(async function (conf) {
  conf.baseURL = await getUrlBaseTenant();
  try {
    let userData = await AsyncStorage.getItem("user");
    if (userData) {
      let token = (await JSON.parse(userData).user_id)
        ? JSON.parse(userData).user_id
        : "";

      if (token) conf.headers.Authorization = token;
    }
    console.log(conf)
  } catch (e) {
    console.log(e);
  }

  return conf;
});

APIKit.interceptors.response.use(function (response) {
  return response;
});

export default APIKit;
