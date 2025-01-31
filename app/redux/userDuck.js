import axios from "axios";
import Constants from "expo-constants";
import ApiApp from "../utils/ApiApp";
import jwt_decode from "jwt-decode";
import { registerForPushNotificationsAsync } from "../utils/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";

/***
 *CONSTANTS
 * ***/
const initialData = {
  loggedIn: false,
  fetching: false,
  error: "",
  userProfile: null,
  modalDenied: false,
};

const LOGIN = "LOGIN";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGIN_ERROR_SERVER = "LOGIN_ERROR_SERVER";

const LOG_OUT = "LOG_OUT";

const USER_PROFILE = "USER_PROFILE";
const USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
const TEMPORAL_LOGIN = "TEMPORAL_LOGIN";
const USER_PROFILE_DENIED = "USER_PROFILE_DENIED";

const {
  URL_KHONNECT, production,URL_KHONNECT_DEV
} = Constants.manifest.extra

/***
 *REDUCE
 * ***/
//reduce
export default userReducer = (state = initialData, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true, loggedIn: false, serverError: false };
    case LOGIN_ERROR:
      return {
        ...state,
        fetching: false,
        loggedIn: false,
        error: action.payload,
      };
    case LOGIN_ERROR_SERVER:
      return {
        ...state,
        fetching: false,
        serverError: true,
        loggedIn: false,
        error: action.payload,
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        fetching: false,
        loggedIn: true,
        userProfile: action.payload,
      };
    case USER_PROFILE_DENIED:
      return {
        ...state,
        fetching: false,
        modalDenied: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        modalDenied: false,
        ...action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        fetching: false,
        loggedIn: false,
        error: action.payload,
      };
    case TEMPORAL_LOGIN:
      return { ...state, fetching: false, ...action.payload };
    default:
      return state;
  }
};
//aux
/***
 *ACTION AUX
 * ***/
//Se guarda la información del usuario en el AsyncStorage
export let saveStore = async (storage) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(storage));
  } catch (error) {
    // Error saving data
  }
};

//Se borra el usuario del AsyncStorage
export let cleanUser = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (error) {
    // Error saving data
  }
};

/***
 *ACTIONS
 * ***/

//funcion action para recuperar  al usuarion del AsyncStorage
export let saveSessionAction = () => async (dispatch) => {
  try {
    let storage = await AsyncStorage.getItem("user");

    storage = JSON.parse(storage);
    if (storage) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: storage,
      });
      dispatch(getProfile(storage));
    }
  } catch (error) {
    // Error saving data
  }
};

//función action para iniciar sesión
export let doLoginAction = (credential) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOGIN });
    try {
      let clientId = await AsyncStorage.getItem('clientId');
      const response = await axios.post(
        production ? URL_KHONNECT + "/login/": URL_KHONNECT_DEV + "/login/" ,
        credential,
        {
          headers: {
            "client-id": clientId ,
            "Content-Type": "application/json",
          },
        }
      );

      let convertResponse = jwt_decode(response.data.token);
      convertResponse = { ...convertResponse, jwt: response.data.token };

      if (convertResponse.password_changed) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: convertResponse,
        });
        dispatch(getProfile(convertResponse));
        saveStore(convertResponse);
      } else {
        dispatch({ type: TEMPORAL_LOGIN, payload: convertResponse });
      }
      return convertResponse;
    } catch (err) {
      dispatch({ type: LOGIN_ERROR_SERVER, payload: err.response });
      return {error:err.response.data};
    }
  };
};

//función action para cerrar sesión
export let logOutAction = () => {
  return async (dispatch, getState) => {
    try {
      const device_id = await registerForPushNotificationsAsync();
      await ApiApp.deleteUserDevice({
        device_id: device_id,
      });
      dispatch({ type: LOG_OUT, payload: {} });
      cleanUser();
    } catch (err) {
      cleanUser();
      dispatch({ type: LOGIN_ERROR, payload: err });
    }
  };
};

//función para  obtener el perfil de usuario.
export let getProfile = (user) => {
  return async (dispatch, getState) => {
    try {
      let response = await ApiApp.getUserProfile({
        khonnect_id: user.user_id,
        jwt: user.jwt,
      });
      console.log(
        "🚀 ~ file: userDuck.js:194 ~ return ~ response profile",
        response
      );

      // if (response.data.department.node.active && response.data.is_active)
      if (response.data.is_active)
        dispatch({
          type: USER_PROFILE_SUCCESS,
          payload: response.data,
        });
      else
        dispatch({
          type: USER_PROFILE_DENIED,
        });
      return response.data;
    } catch (err) {
      console.log('err',err)
      return "Error";
    }
  };
};

export let updateProfile = (dataProfile) => {
  return async (dispatch, getState) => {
    try {
      let response = await ApiApp.updateProfile(dataProfile);
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e) {
      return "Error";
    }
  };
};
