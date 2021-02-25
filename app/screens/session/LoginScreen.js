import React, {useEffect, useState} from "react";
import {
    View,
    Dimensions,
    Keyboard,
    Text,
    StyleSheet,
    LayoutAnimation,
    TextInput,
    ActivityIndicator,
    TouchableOpacity, Image, ImageBackground
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {NavigationActions, StackActions} from 'react-navigation'
import {doLoginAction} from "../../redux/userDuck";
import {connect} from "react-redux";
import {AntDesign} from '@expo/vector-icons';
import {darkerHex, emailRegEx} from '../../utils/utils'
import Button from "../../components/Buttons/Button";
import {Colors} from "../../utils/colors";


const LoginScreen = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [alertContent, setAlertContent] = useState("");


    const resetStack = () => {
        navigation
            .dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Main',
                    }),
                ],
            }))
    }
    /***
     *Modal para cuando responde un servicio
     ***/
    const [modalUser, setModalUser] = useState(false);
    const [titleM, setTitleM] = useState("");
    const [descM, setDescM] = useState("");

    const [visibleHeight, setVisibleHeight] = useState(Dimensions.get('window').height);
    const [comp_no_imp, setComp_no_imp] = useState(Dimensions.get('window').height);
    const [comp_aux, setComp_aux] = useState(0);
    const [justificante_login, setJustificante_login] = useState("center");
    const [comp_aux_imagen, setComp_aux_imagen] = useState(Dimensions.get('window').width * .45);


    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardWillShow);
        Keyboard.addListener('keyboardDidHide', keyboardWillHide);
        if (props.user.loggedIn) {
            resetStack()
        }
    }, [props.user.fetching]);

    const keyboardWillShow = (e) => {
        LayoutAnimation.easeInEaseOut();
        setVisibleHeight(Dimensions.get('window').height);
        setComp_no_imp(Dimensions.get('window').height * 0);
        setJustificante_login("flex-start")
        setComp_aux(Dimensions.get('window').height)
        setComp_aux_imagen(Dimensions.get('window').width * .3)
    };

    const keyboardWillHide = (e) => {
        LayoutAnimation.easeInEaseOut();
        setVisibleHeight(Dimensions.get('window').height);
        setComp_no_imp(Dimensions.get('window').height);
        setJustificante_login("center")
        setComp_aux(0)
        setComp_aux_imagen(Dimensions.get('window').width * .45)
    };


    const _login=()=> {
        /*let msgs = [];
        let error = false;

        if (email.trim() === "") {
            error = true;
            msgs.push("· Falta tu correo");
        } else {
            if (!emailRegEx.test(email)) {
                error = true;
                msgs.push("· Correo inválido");
            }
        }
        if (pass.trim() === "") {
            error = true;
            msgs.push("· Falta tu contraseña");
        }

        if (error) {
            alert(msgs)*/
       /// }else {
            props.doLoginAction({
                email: 'administrador@demo.com',
                password: '1234567a'
            }).then(response=>{
                if (!response.password_changed){
                    alert("cambiar contraseña")
                }else {
                    alert("HomeScreen")
                }})
       /// }
    }

    return (
        <ImageBackground
            style={{flex: 1}}
            source={{
                uri: 'http://cdn.lowgif.com/full/35f7a89893c0e862-http-giphy-com-gifs-l41yprydt65qqgkcg-fullscreen.gif',
            }}>
            <View style={{
                width: "100%",
                height: "100%",
                zIndex: 20
            }}>

                <View style={{height: Dimensions.get('window').height * .05}}/>
                <TouchableOpacity
                    style={{
                        minWidth: 20,
                        width: 35,
                        minHeight: 20,
                        height: 35,
                        marginLeft: 12,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                </TouchableOpacity>


                <View style={{}}>
                    <Image
                        resizeMode='contain'
                        style={{
                            top: comp_aux === 0 ? 100 : 0,
                            backgroundColor: 'red',
                            height: comp_aux_imagen,
                            width: comp_aux_imagen,
                            alignItems: 'center',
                            alignSelf: "center",
                            borderRadius: 10,
                        }}
                        source={{
                            uri: "https://s3-eu-west-1.amazonaws.com/xavitristancho/react-native.png"
                        }}
                    />
                </View>

                <View style={{height: comp_aux * .05}}/>

                <View
                    style={{
                        height: Dimensions.get('window').height * .7,
                        marginHorizontal: Dimensions.get('window').width * .02,
                        alignItems: "center",
                        justifyContent: justificante_login,
                        paddingHorizontal: 10,
                    }}
                >

                    <View style={{
                        backgroundColor:'white',borderRadius:10,
                        padding:20,
                        width:Dimensions.get('window').height * .40,alignItems:'center'}}>


                    <TextInput
                        style={styles.input}
                        placeholder="Correo electrónico"
                        placeholderTextColor="lightgray"
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        keyboardType="email-address"
                        underlineColorAndroid={'transparent'}
                    />


                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="lightgray"
                        secureTextEntry={true}
                        onChangeText={(text) => setPass(text)}
                        value={pass}
                        password={true}
                        autoCapitalize="none"
                        underlineColorAndroid={'transparent'}
                    />


                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1, marginTop: 5}}>
                            {
                                !props.user.fetching ?
                                    <Button
                                        mensaje="INICIAR SESIÓN"
                                        onPress={() => _login()}
                                    />
                                    :
                                    <ActivityIndicator size="small" color="white"/>

                            }

                        </View>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        {/*<View style={{flex: 1,marginTop:5}}>

                        <Button
                            onPress={()=>{alert("xdss")}}
                            mensaje="REGISTRARME"
                        />
                    </View>*/}
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            alert("Construcción")
                            // props.navigation.navigate('recoverPasswordScreen')
                        }}
                    >
                        <Text style={{color: "black", marginTop: 16, marginBottom: 16,}}>
                            OLVIDÉ MI CONTRASEÑA
                        </Text>
                    </TouchableOpacity>

                    </View>
                </View>

            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
        input: {
            marginTop: 8,
            marginBottom: 8,
            alignItems: 'center',
            paddingHorizontal: 15,
            width: "100%",
            height: 44,
            color: "black",
            borderColor: "rgba(0,0,0,.5)",
            borderWidth: 1,
            backgroundColor: "white",
            borderRadius: 7
        },
    }
);
const mapState = (state) => {
    return {
        user: state.user,
    }
}


export default connect(mapState, {doLoginAction})(LoginScreen)