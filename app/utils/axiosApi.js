import axios from 'axios'
import {AsyncStorage} from "react-native";
import Constants from 'expo-constants';

let config =
    {
        baseURL: Constants.manifest.extra.url_base,
        headers: {
            'Accept': 'application/json',
        }
    };

let APIKit = axios.create(config);

    APIKit.interceptors.request.use(async function(config) {
        try {
            let userData =  await  AsyncStorage.getItem("user") ;
            let token = await JSON.parse(userData).token ? JSON.parse(userData).token :"";
            if (token)
            config.headers.Authorization = `JWT ${token}`;
        } catch(e) {
            console.log("Error->",e.error)
        }
        return config;
    });

    APIKit.interceptors.response.use(function(config) {
        //console.log("response",config)
        return config;
    });





export default APIKit;