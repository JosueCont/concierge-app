import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  LayoutAnimation,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import { doLoginAction } from "../../redux/userDuck";
import { connect } from "react-redux";
import { Colors } from "../../utils/colors";
import styled from "styled-components/native";
import { Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import ModalLoadingLogin from "../../components/modal/loadingLogin";
import { wait } from "../../utils/functions";
import ModalCustom from "../../components/modal/ModalCustom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APIKit from "../../utils/axiosApi";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";
import ApiApp from "../../utils/ApiApp";
import LoadingGlobal from "../../components/modal/LoadingGlobal";

const LoginScreen = (props) => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [changeView, setChangeView] = useState(false);
  const [play, setPlay] = useState(true);
  const [visibleHeight, setVisibleHeight] = useState(
    Dimensions.get("window").height
  );
  const [comp_no_imp, setComp_no_imp] = useState(
    Dimensions.get("window").height
  );
  const [comp_aux, setComp_aux] = useState(0);
  const [justificante_login, setJustificante_login] = useState("flex-end");
  const [comp_aux_imagen, setComp_aux_imagen] = useState(
    Dimensions.get("window").width * 0.5
  );
  const [modalCustomVisible, setModalCustomVisible] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState("");
  const [loginCode, setLoginCode] = useState(false);
  const [loginQr, setLoginQr] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const resetStack = () => {
    props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "Home",
          }),
        ],
      })
    );
  };

  useEffect(() => {
    const focusListener = props.navigation.addListener("didFocus", async () => {
      checkTenant();
    });
    return () => {
      focusListener.remove();
    };
  }, []);

  useEffect(async () => {
    try {
      checkTenant();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (props.user.modalDenied) {
      setMessageCustomModal("Acceso denegado, contacte con su supervisor.");
      setIconSourceCustomModal(2);
      setModalCustomVisible(true);
    }
  }, [props.user.modalDenied]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", keyboardWillShow);
    Keyboard.addListener("keyboardDidHide", keyboardWillHide);
  }, []);

  const checkTenant = async () => {
    let tenant = await AsyncStorage.getItem("tenant");
    setCompany(tenant ? tenant : "");
    console.log("🚀 ~ file: LoginScreen.js:107 ~ checkTenant ~ tenant", tenant);
  };

  const keyboardWillShow = (e) => {
    LayoutAnimation.easeInEaseOut();
    setVisibleHeight(Dimensions.get("window").height);
    setComp_no_imp(Dimensions.get("window").height * 0);
    setJustificante_login("flex-start");
    setComp_aux(Dimensions.get("window").height);
    setComp_aux_imagen(Dimensions.get("window").width * 0.3);
    setChangeView(true);
    setPlay(false);
  };

  const keyboardWillHide = (e) => {
    LayoutAnimation.easeInEaseOut();
    setVisibleHeight(Dimensions.get("window").height);
    setComp_no_imp(Dimensions.get("window").height);
    setJustificante_login("flex-end");
    setComp_aux(0);
    setComp_aux_imagen(Dimensions.get("window").width * 0.5);
    setChangeView(false);
    setPlay(false);
  };

  const { 
    URL_TENANT_VALIDATE,
    URL_PEOPLE,
    URL_PEOPLE_DEV, 
    PROTOCOL, 
    production ,
    PRIVACY_NOTICE,
    URL_TENANT_VALIDATE_DEV
  } = Constants.manifest.extra

  const getUrlBaseTenant = async (tenant) => {
    return `${PROTOCOL}${tenant}.${production ? URL_PEOPLE : URL_PEOPLE_DEV}`;
  }

  const sendCode = async () => {
    console.log(code);
    try {
      setModalLoading(true);
      console.log("Validate tenant");
      let response = await ApiApp.validateTenantCode({
        code: code,
      });
      if (response?.data?.tenant_name) {
        await AsyncStorage.setItem("tenant", response?.data?.tenant_name);
        getClientId(response?.data?.tenant_name)
        setCompany(response?.data?.tenant_name);
        setCode("");
        setTimeout(() => {
          setModalLoading(false);
        }, 1500);
      }
      return;
    } catch (error) {
      console.log("Err: ", error);
      setTimeout(() => {
        setModalLoading(false);
        setMessageCustomModal("Código de empresa inválido. Intenta de nuevo.");
        setModalCustomVisible(true);
      }, 1500);
    }
  };

  const getClientId = async(tenant) => {
    try {
      const url = await getUrlBaseTenant(tenant);
      let clientId = await ApiApp.getCLientId({ url });
      if(clientId?.data.client_khonnect_id){
        await AsyncStorage.setItem("clientId", clientId?.data.client_khonnect_id);
        if(clientId?.data.concierge_logo != null)
        await AsyncStorage.setItem('conciergeLogo', clientId?.data.concierge_logo);
        if(clientId?.data.intranet_enabled != null) 
          await AsyncStorage.setItem('intranet',clientId?.data.intranet_enabled.toString());
      }
    } catch (e) {
      console.log('error cliente_id', e)
    }
  }

  const changeCompany = async () => {
    await AsyncStorage.removeItem("tenant");
    await AsyncStorage.removeItem("clientId");
    await AsyncStorage.removeItem("conciergeLogo");
    APIKit.defaults.baseURL = production ? URL_TENANT_VALIDATE : URL_TENANT_VALIDATE_DEV
    console.log("Actual url", APIKit.defaults.baseURL);
    setCompany("");
  };

  const _login = () => {
    setLoading(true);
    if (email.trim() === "" || pass.trim() === "") {
      setMessageCustomModal("Llene todos los campos");
      setIconSourceCustomModal(2);
      setModalCustomVisible(true);
      setLoading(false);
    } else {
      props
        .doLoginAction({
          email: email,
          password: pass,
        })
        .then((response) => {
          setLoading(false);
          wait(500).then(() => {
            if(typeof response?.error =='string'){
              setMessageCustomModal("Existe un problema con el servidor, intenta más tarde");
              setIconSourceCustomModal(2);
              setModalCustomVisible(true);
            }else if (response.error.message === "incorrect password") {
              setMessageCustomModal("El usuario y la contraseña no coinciden.");
              setIconSourceCustomModal(2);
              setModalCustomVisible(true);
            } else {
              console.log("entra HomeUsserScreen");
              props.navigation.navigate("Home");
              // if (!response.password_changed) {
              //   props.navigation.navigate("ChangePasswordFirstTime");
              // } else {
              //   console.log("entra HomeUsserScreen");
              //   props.navigation.navigate("Home");
              // }
              
            }
          });
        })
        .catch((error) => {
          console.log(error, 118);
          setMessageCustomModal("Existe un problema con el servidor, intenta más tarde");
          setIconSourceCustomModal(2);
          setModalCustomVisible(true);
        });
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/img/new/fondo_logon_noicon.png")}
      style={{ resizeMode: "cover" }}
    >
      {!changeView ? (
        <Video
          source={require("../../../assets/video/LoginConcierge.mp4")}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay={play}
          isLooping={false}
          style={{
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            alignItems: "stretch",
            bottom: 0,
            right: 0,
          }}
        />
      ) : (
        <Image
          source={require("../../../assets/img/new/fondo-banner.png")}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            resizeMode: "cover",
            bottom: 0,
            right: 0,
          }}
        />
      )}

      <Wrapper>
        <View style={{ height: Dimensions.get("window").height * 0.05 }} />
        <TouchableOpacity
          style={{
            minWidth: 20,
            width: 35,
            minHeight: 20,
            height: 35,
            marginLeft: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></TouchableOpacity>

        <View
          style={{
            top: comp_aux === 0 ? 100 : 0,
            backgroundColor: "transparent",
            height: comp_aux_imagen,
            width: comp_aux_imagen,
            alignItems: "center",
            alignSelf: "center",
            marginBottom: comp_aux === 0 ? 10 : 30,
          }}
        ></View>

        <View style={{ height: comp_aux * 0.05 }} />

        <Animatable.View
          animation="fadeInUp"
          iterationCount={1}
          delay={Platform.OS === "ios" ? 6000 : 5000}
          style={{
            height: Dimensions.get("window").height * 0.7,
            marginHorizontal: Dimensions.get("window").width * 0.02,
            alignItems: "center",
            marginTop: -50,
            justifyContent: justificante_login,
            paddingHorizontal: 10,
          }}
        >
          {company != "" ? (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 40,
                padding: 30,
                width: Dimensions.get("window").height * 0.44,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Cabin-Bold",
                  fontSize: 30,
                  marginTop: 20,
                  marginBottom: 20,
                  textAlign: "center",
                  color: Colors.secondary,
                }}
              >
                Iniciar sesión
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor={Colors.secondary}
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
                underlineColorAndroid={"transparent"}
                autoCorrect={false}
              />

              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={Colors.secondary}
                secureTextEntry={true}
                onChangeText={(text) => setPass(text)}
                value={pass}
                password={true}
                autoCapitalize="none"
                underlineColorAndroid={"transparent"}
              />

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("RecoverPasswordScreen");
                }}
              >
                <Text
                  style={{
                    fontFamily: "Cabin-Regular",
                    color: Colors.secondary,
                    fontSize: 14,
                    marginTop: 10,
                    marginBottom: 0,
                  }}
                >
                  Recuperar contraseña
                </Text>
              </TouchableOpacity>

              {/* <View style={{ flexDirection: "row", width: "100%" }}> */}
              <View style={{ alignItems: "center", width: "90%" }}>
                {!loading ? (
                  <View style={{ width: "100%" }}>
                    <TouchableOpacity
                      style={{
                        fontFamily: "Cabin-Regular",
                        backgroundColor: Colors.primary,
                        height: 40,
                        width: "100%",
                        borderRadius: 10,
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => _login()}
                    >
                      <Text style={{ color: Colors.white, fontSize: 16 }}>
                        Entrar
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        fontFamily: "Cabin-Regular",
                        backgroundColor: Colors.primary,
                        height: 40,
                        width: "100%",
                        borderRadius: 10,
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => changeCompany()}
                    >
                      <Text style={{ color: Colors.white, fontSize: 16 }}>
                        Cambiar compañía
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <ActivityIndicator size="small" color="white" />
                )}
                {/* </View> */}
              </View>
              <View style={{ flexDirection: "row", width: "90%" }}>
                <View style={{ alignItems: "center", flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Cabin-Bold",
                      marginTop: 20,
                      textAlign: "center",
                      color: Colors.secondary,
                      textDecorationLine: "underline",
                    }}
                    onPress={() =>
                      Linking.openURL(
                        PRIVACY_NOTICE
                      )
                    }
                  >
                    Aviso de privacidad
                  </Text>
                </View>
              </View>
            </View>
          ) : loginCode ? (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 40,
                padding: 30,
                width: Dimensions.get("window").height * 0.44,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Cabin-Bold",
                  fontSize: 30,
                  marginTop: 20,
                  marginBottom: 20,
                  textAlign: "center",
                  color: Colors.secondary,
                }}
              >
                Ingresar por código
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Código"
                placeholderTextColor={Colors.secondary}
                autoCapitalize="none"
                onChangeText={(text) => setCode(text)}
                value={code}
                keyboardType="email-address"
                underlineColorAndroid={"transparent"}
                autoCorrect={false}
              />

              {/* <View style={{ flexDirection: "row", width: "100%" }}> */}
              <View style={{ alignItems: "center", width: "90%" }}>
                {!loading ? (
                  <View style={{ width: "100%" }}>
                    <TouchableOpacity
                      style={{
                        fontFamily: "Cabin-Regular",
                        backgroundColor: Colors.primary,
                        height: 40,
                        width: "100%",
                        borderRadius: 10,
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => sendCode()}
                    >
                      <Text style={{ color: Colors.white, fontSize: 16 }}>
                        Ingresar
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        fontFamily: "Cabin-Regular",
                        backgroundColor: Colors.primary,
                        height: 40,
                        width: "100%",
                        borderRadius: 10,
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        setLoginCode(false);
                        setCode("");
                      }}
                    >
                      <Text style={{ color: Colors.white, fontSize: 16 }}>
                        Regresar
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <ActivityIndicator size="small" color="white" />
                )}
                {/* </View> */}
              </View>
              <View style={{ flexDirection: "row", width: "90%" }}>
                <View style={{ alignItems: "center", flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Cabin-Bold",
                      marginTop: 20,
                      textAlign: "center",
                      color: Colors.secondary,
                      textDecorationLine: "underline",
                    }}
                    onPress={() =>
                      Linking.openURL(
                        PRIVACY_NOTICE
                      )
                    }
                  >
                    Aviso de privacidad
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 40,
                padding: 30,
                width: Dimensions.get("window").height * 0.44,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Cabin-Bold",
                  fontSize: 30,
                  marginTop: 20,
                  marginBottom: 20,
                  textAlign: "center",
                  color: Colors.secondary,
                }}
              >
                Ingresar
              </Text>

              {/* <View style={{ flexDirection: "row", width: "100%" }}> */}
              <View style={{ alignItems: "center", width: "90%" }}>
                {!loading ? (
                  <View style={{ width: "100%" }}>
                    <TouchableOpacity
                      style={{
                        fontFamily: "Cabin-Regular",
                        backgroundColor: Colors.primary,
                        height: 40,
                        width: "100%",
                        borderRadius: 10,
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => setLoginCode(true)}
                    >
                      <Text style={{ color: Colors.white, fontSize: 16 }}>
                        Ingresar por código
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        fontFamily: "Cabin-Regular",
                        backgroundColor: Colors.primary,
                        height: 40,
                        width: "100%",
                        borderRadius: 10,
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => props.navigation.navigate("QrReader")}
                    >
                      <Text style={{ color: Colors.white, fontSize: 16 }}>
                        Escanear QR
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <ActivityIndicator size="small" color="white" />
                )}
                {/* </View> */}
              </View>
              <View style={{ flexDirection: "row", width: "90%" }}>
                <View style={{ alignItems: "center", flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Cabin-Bold",
                      marginTop: 20,
                      textAlign: "center",
                      color: Colors.secondary,
                      textDecorationLine: "underline",
                    }}
                    onPress={() =>
                      Linking.openURL(
                        PRIVACY_NOTICE
                      )
                    }
                  >
                    Aviso de privacidad
                  </Text>
                </View>
              </View>
            </View>
          )}
        </Animatable.View>
      </Wrapper>
      {loading && <ModalLoadingLogin visible={loading} />}
      {modalCustomVisible && (
        <ModalCustom
          visible={modalCustomVisible}
          text={messageCustomModal}
          iconSource={iconSourceCustomModal}
          setVisible={(v) => {
            console.log("acetar", "login");
            setModalCustomVisible(false);
          }}
        ></ModalCustom>
      )}
      {modalLoading && (
        <LoadingGlobal visible={modalLoading} text={"Cargando"} />
      )}
    </ImageBackground>
  );
};

export const Wrapper = styled.View`
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  flex-direction: column;
`;

const styles = StyleSheet.create({
  input: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 15,
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 15,
    width: "90%",
    height: 44,
    color: "black",
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 8,
  },
});
const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState, { doLoginAction })(LoginScreen);
