import React, {useEffect, useState} from "react";
import {
    View,
    Dimensions,
    Keyboard,
    Text,
    StyleSheet,
    ScrollView,
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
    const [justificante_login, setJustificante_login] = useState("flex-end");
    const [comp_aux_imagen, setComp_aux_imagen] = useState(Dimensions.get('window').width * .50);


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
        setJustificante_login("flex-end")
        setComp_aux(0)
        setComp_aux_imagen(Dimensions.get('window').width * .50)
    };


    const _login=()=> {
        let msgs = [];
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
            alert(msgs)
        }else {
            props.doLoginAction({
                email: email,
                password: pass
            }).then(response=>{
                if (!response.password_changed){
                    alert("cambiar contraseña")
                }else {
                    alert("HomeScreen")
                }})
        }
    }

    return (
        <ImageBackground
            style={{flex: 1}}
            source={require('../../../assets/img/fondo-banner.png')}>
        <ScrollView style={{
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
                            backgroundColor: 'transparent',
                            height: comp_aux_imagen,
                            width: comp_aux_imagen,
                            alignItems: "center",
                            alignSelf: "center",
                            marginBottom: comp_aux === 0 ? 10 : 30,
                        }}
                        source= {require('../../../assets/img/logo-staff.png')}
                    />
                </View>

                <View style={{height: comp_aux * .05}}/>

                    <View
                        style={{
                            height: Dimensions.get('window').height * .7,
                            marginHorizontal: Dimensions.get('window').width * .02,
                            alignItems: "center",
                            marginTop: -50,
                            justifyContent: justificante_login,
                            paddingHorizontal: 10,
                        }}
                    >

                        <View style={{
                            backgroundColor:'white',borderRadius:40,
                            padding:30,
                            width:Dimensions.get('window').height * .44,alignItems:'center'}}>
                        <Text style={{
                            fontFamily: 'Cabin-Bold',
                            fontSize: 30,
                            marginTop: 20,
                            marginBottom: 20,
                            textAlign: 'center',
                            color: Colors.bluetitle,
                        }}>
                            Iniciar sesión
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Correo electrónico"
                            placeholderTextColor= {Colors.bluetitle}
                            autoCapitalize="none"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            keyboardType="email-address"
                            underlineColorAndroid={'transparent'}
                        />


                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor= {Colors.bluetitle}
                            secureTextEntry={true}
                            onChangeText={(text) => setPass(text)}
                            value={pass}
                            password={true}
                            autoCapitalize="none"
                            underlineColorAndroid={'transparent'}
                        />
                        
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('RecoverPasswordScreen')
                            }}
                        >
                            <Text style={{ color: Colors.bluelinks, fontSize: 14, marginTop: 10, marginBottom: 0, }}>
                                Recuperar contraseña
                            </Text>
                        </TouchableOpacity>

                        <View style={{flexDirection: 'row', width:'90%',}}>
                            <View style={{flex: 1, marginTop: 5,}}>
                                {
                                    !props.user.fetching ?
                                        <Button
                                            mensaje="Entrar"
                                            onPress={() => _login()}
                                            colorBackground = {Colors.bluelinks}
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
                        
                </View>
            </View>

        </ScrollView>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
        input: {
            fontFamily: 'Cabin-Regular',
            fontSize: 16,
            marginTop: 10,
            marginBottom: 15,
            alignItems: 'center',
            textAlign: 'center',
            paddingHorizontal: 15,
            width: "90%",
            height: 44,
            color: "black",
            borderColor: Colors.bluelinks,
            borderWidth: 1,
            backgroundColor: "white",
            borderRadius: 8,
        },
    }
);
const mapState = (state) => {
    return {
        user: state.user,
    }
}


export default connect(mapState, {doLoginAction})(LoginScreen)