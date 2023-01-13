import {
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import ToolbarNoLogin from "../../components/ToolbarComponent/ToolbarNoLogin";
import { Colors } from "../../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import Constants from "expo-constants";
import ModalCustom from "../../components/modal/ModalCustom";
import axios from "axios";
import { darkerHex, emailRegEx } from "../../utils/utils";
import ModalLoadingGlobal from "../../components/modal/LoadingGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const RecoverPasswordScreen = (props) => {
  const [email, setEmail] = useState("");
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [loading, setLoading] = useState(false);

  const { 
    URL_KHONNECT, production,URL_KHONNECT_DEV
  } = Constants.manifest.extra

  const actionReturn = () => {
    props.navigation.navigate("LoginScreen");
  };

  const sendMailRecoveryPassword = async(data) => {
    setLoading(true);
    let clientId = await AsyncStorage.getItem('clientId');
    axios
      .post(
        production ? URL_KHONNECT : URL_KHONNECT_DEV+ "/password/reset/token/",
        data,
        {
          headers: {
            "client-id": clientId,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        if (response.data.level == "error") {
          setMessageCustomModal("No se encontro el usuario.");
          setIconSourceCustomModal(2);
          setModalCustom(true);
        } else if (response.data.level == "success") {
          actionReturn();
        }
      })
      .catch((error) => {
        setLoading(false);
        setMessageCustomModal("Ocurrio un error, intente de nuevo.");
        setIconSourceCustomModal(2);
        setModalCustom(true);
      });
  };

  const recoveryPassword = () => {
    let data = {
      email: email,
      send_via_email: true,
    };
    if (email.trim() === "") {
      setMessageCustomModal("Ingrese su correo.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      return;
    }
    if (!emailRegEx.test(email)) {
      setMessageCustomModal("Ingrese un correo valido.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      return;
    }
    sendMailRecoveryPassword(data);
  };

  const viewModalCustom = () => {
    modalCustom ? setModalCustom(false) : setModalCustom(true);
  };

  return (
    <View
      style={{
        height: "100%",
        zIndex: 1,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="rgba(1,1,1,0)"
        translucent={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "transparent",
          zIndex: 20,
        }}
      >
        <KeyboardAwareScrollView>
          <View
            style={{
              position: "relative",
              height: windowHeight + statusHeight,
            }}
          >
            <ToolbarNoLogin
              clickAction={actionReturn}
              nameToolbar={"Mi Cuenta"}
              type={1}
            />
            <Image
              style={{
                width: "100%",
                height: windowHeight * 0.46,
                position: "absolute",
                bottom: 0,
                left: 0,
                resizeMode: "stretch",
                zIndex: -1,
              }}
              source={require("../../../assets/img/new/fondo_azul.png")}
            />
            <View style={styles.ctnPart1}>
              <Image
                style={styles.imgPrincipal}
                source={require("../../../assets/img/new/alerta_icon.png")}
              />
              <View
                style={{
                  width: "92%",
                  backgroundColor: Colors.secondary,
                  borderRadius: 40,
                  paddingHorizontal: 20,
                  paddingVertical: 50,
                  top: "-15%",
                  zIndex: -1,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Cabin-Bold",
                    color: Colors.white,
                    fontSize: 28,
                    textAlign: "center",
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Text>
              </View>
            </View>
            <View style={styles.ctnPart2}>
              <View
                style={{
                  width: "100%",
                  position: "absolute",
                  top: -4,
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.secondary,
                    width: 80,
                    height: 4,
                  }}
                ></View>
              </View>
              <View style={styles.ctnForm}>
                <Text style={styles.title}>
                  Ingresa tu correo electrónico para poder recuperar la
                  contraseña de tu cuenta
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={Colors.secondary}
                  autoCapitalize="none"
                  underlineColorAndroid={"transparent"}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      fontFamily: "Cabin-Regular",
                      backgroundColor: Colors.primary,
                      height: 50,
                      width: "48%",
                      borderRadius: 10,
                      marginTop: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => recoveryPassword()}
                  >
                    <Text style={{ color: Colors.white, fontSize: 16 }}>
                      Enviar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      fontFamily: "Cabin-Regular",
                      backgroundColor: Colors.primary,
                      height: 50,
                      width: "48%",
                      borderRadius: 10,
                      marginTop: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => actionReturn()}
                  >
                    <Text style={{ color: Colors.white, fontSize: 16 }}>
                      Regresar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <ModalCustom
        visible={modalCustom}
        text={messageCustomModal}
        iconSource={iconSourceCustomModal}
        setVisible={() => viewModalCustom(true)}
      />
      <ModalLoadingGlobal visible={loading} text="Enviando" />
    </View>
  );
};

const styles = StyleSheet.create({
  ctnPart1: {
    height: windowHeight * 0.36,
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  imgPrincipal: {
    maxWidth: 100,
    maxHeight: 100,
    width: windowHeight * 0.14,
    resizeMode: "contain",
  },
  ctnPart2: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  ctnForm: {
    width: "92%",
    backgroundColor: Colors.white,
    paddingHorizontal: 25,
    paddingTop: 50,
    paddingBottom: 30,
    borderRadius: 40,
  },
  title: {
    fontFamily: "Cabin-Regular",
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
    color: Colors.secondary,
    paddingHorizontal: 20,
  },
  input: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    color: Colors.secondary,
    width: "100%",
    borderColor: Colors.primary,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },
});

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(RecoverPasswordScreen);
