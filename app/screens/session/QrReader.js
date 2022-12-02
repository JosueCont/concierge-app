import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Camera} from 'expo-camera';
import {doLoginAction} from "../../redux/userDuck";
import {connect} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APIKit from "../../utils/axiosApi";
import ModalCustom from "../../components/modal/ModalCustom";
import ApiApp from "../../utils/ApiApp";

const QrReader = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [logged, setLogin] = useState(false);
    const [text, setText] = useState('Escaneando...');
    const [modalCustomVisible, setModalCustomVisible] = useState(false);
    const [messageCustomModal, setMessageCustomModal] = useState("");

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            console.log(status);
        })();
    }, []);

    const askForCameraPermission = async ()=>{
        const {status} = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        console.log(status);
    }
    
    const handleBarCodeScanned = async ({type, data}) => {
        if(scanned){
            console.log("Scanned!!! ")
            return;
        }
        setScanned(true);
        try {
            const url = `${data}`;
            const dataParsed = JSON.parse(data);
            if(dataParsed.tenant){
                console.log(dataParsed.tenant);
                let response = await ApiApp.validateTenantCode({
                    code: dataParsed.tenant
                })
                if(response?.data?.tenant_name){
                    await AsyncStorage.setItem("tenant", response?.data?.tenant_name);
                    APIKit.defaults.baseURL = APIKit.defaults.baseURL.replace("[tenant]", response?.data?.tenant_name);
                    setScanned(false);
                    props.navigation.navigate("LoginScreen");
                }else{
                    setMessageCustomModal("Código Qr inválido. Intenta de nuevo.");
                    setModalCustomVisible(true);
                    setScanned(false);
                }
            }else{
                setMessageCustomModal("Código Qr inválido. Intenta de nuevo.");
                setModalCustomVisible(true);
                setScanned(false);
            }
        } catch (error) {
            setMessageCustomModal("Código Qr inválido. Intenta de nuevo.");
            setModalCustomVisible(true);
            setScanned(false);
        }
    };
    
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Solicitando permiso de la cámara</Text>
            </View>)
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{margin: 10}}>No access to camera</Text>
                <Button title={'Permitir Cámara'} onPress={() => askForCameraPermission()}/>
            </View>)
    }
    return (
        <View style={{flex: 1, alignItems: 'center', justifyItems: 'center'}}>
            <Camera
                onBarCodeScanned={handleBarCodeScanned}
                ratio='16:9'
                style={[StyleSheet.absoluteFillObject]}
            />
            <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                <Text style={{color: 'white'}}>{text}</Text>
            </View>
            {
                modalCustomVisible &&
                <ModalCustom
                    visible={modalCustomVisible}
                    text={messageCustomModal}
                    iconSource={2}
                    setVisible={(v) => {
                        setModalCustomVisible(false);
                        setScanned(false);
                        props.navigation.goBack(null);
                    }}
                ></ModalCustom>
            }
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maintext: {
      fontSize: 16,      
      overflow: 'scroll'
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: 'tomato'
    }
});

const mapState = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapState, {doLoginAction})(QrReader);