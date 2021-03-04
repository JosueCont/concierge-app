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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const RecoverPasswordScreen = (props) => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassTwo, setNewPassTwo] = useState("");
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");

  const actionReturn = () => {
    props.navigation.navigate("LoginScreen");
  };

  const changePasswordFirstLogin = (data) => {
    axios
      .post(
        Constants.manifest.extra.URL_KHONNECT + "/password/change/direct/",
        data,
        {
          headers: {
            "client-id": Constants.manifest.extra.ClientId,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response) {
          setMessageCustomModal("Las contraseñas no coinciden");
          setIconSourceCustomModal(1);
          setModalCustom(true);
        }
      })
      .catch((error) => {
        console.log(error.response);
        setMessageCustomModal("Ocurrio un error, intente de nuevo.");
        setIconSourceCustomModal(1);
        setModalCustom(true);
      });
  };

  const changePassword = () => {
    let data = {
      old_password: oldPass,
      new_password: newPass,
      user_id: props.user.user_id,
    };
    if (
      oldPass.trim() === "" ||
      newPass.trim() === "" ||
      newPassTwo.trim() === ""
    ) {
      setMessageCustomModal("Llene todos los campos");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      return;
    }
    if (newPass === newPassTwo) {
      changePasswordFirstLogin(data);
      console.log("DATA-->>> ", data);
    } else {
      console.log("DiFERENTES-->>> ", data);
      setMessageCustomModal("Las contraseñas no coinciden");
      setIconSourceCustomModal(2);
      setModalCustom(true);
    }
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
            {/* Toolbar componenet para mostar el datos del usuario*/}
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
              source={require("../../../assets/img/fondo_azul.png")}
            />
            <View style={styles.ctnPart1}>
              <Image
                style={styles.imgPrincipal}
                source={require("../../../assets/img/alerta_icon.png")}
              />
              <View
                style={{
                  width: "92%",
                  backgroundColor: Colors.dark,
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
                    backgroundColor: Colors.bluetitle,
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
                  placeholderTextColor={Colors.bluetitle}
                  autoCapitalize="none"
                  underlineColorAndroid={"transparent"}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.bluelinks,
                      height: 50,
                      width: '48%',
                      borderRadius: 10,
                      marginTop: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => changePassword()}
                  >
                    <Text style={{ color: Colors.white, fontSize: 16 }}>
                      Enviar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.bluetitle,
                      height: 50,
                      width: '48%',
                      borderRadius: 10,
                      marginTop: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => changePassword()}
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
    color: Colors.bluetitle,
    paddingHorizontal: 20,
  },
  input: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    color: Colors.bluetitle,
    width: "100%",
    borderColor: Colors.bluelinks,
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
