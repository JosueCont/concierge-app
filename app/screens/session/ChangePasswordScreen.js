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
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import { Colors } from "../../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import Constants from "expo-constants";
import ModalCustom from "../../components/modal/ModalCustom";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const ChangePasswordScreen = (props) => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassTwo, setNewPassTwo] = useState("");
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");

  const actionReturn = () => {
    props.navigation.goBack(null);
  };

  const goHome = () => {
    props.navigation.navigate("Home");
  };

  const clickProfile = () => {
    props.navigation.navigate("ProfileScreen");
  };

  const changePasswordUser = (data) => {
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
        if (response.data.level == "error") {
          setMessageCustomModal("Ocurrio un error, intente de nuevo.");
          setIconSourceCustomModal(1);
          setModalCustom(true);
        } else if (response.data.level == "success") {
          setMessageCustomModal("Actualizado correctamente.");
          setIconSourceCustomModal(1);
          setModalCustom(true);
          actionReturn();
        }
      })
      .catch((error) => {
        console.log(error.response.data.level);
        if (error.response.data.level == "error") {
          setMessageCustomModal("Contraseña actual incorrecta.");
          setIconSourceCustomModal(2);
          setModalCustom(true);
        } else {
          setMessageCustomModal("Ocurrio un error, intente de nuevo.");
          setIconSourceCustomModal(2);
          setModalCustom(true);
        }
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
      changePasswordUser(data);
    } else {
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
            <ToolbarGeneric
              clickAction={actionReturn}
              nameToolbar={"Mi Cuenta"}
              type={1}
              clickProfile={clickProfile}
              goHome={goHome}
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
                source={require("../../../assets/img/changepass.png")}
              />
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
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña actual"
                  placeholderTextColor={Colors.bluetitle}
                  secureTextEntry={true}
                  password={true}
                  autoCapitalize="none"
                  underlineColorAndroid={"transparent"}
                  onChangeText={(text) => setOldPass(text)}
                  value={oldPass}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nueva contraseña"
                  placeholderTextColor={Colors.bluetitle}
                  secureTextEntry={true}
                  password={true}
                  autoCapitalize="none"
                  underlineColorAndroid={"transparent"}
                  onChangeText={(text) => setNewPass(text)}
                  value={newPass}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar contraseña"
                  placeholderTextColor={Colors.bluetitle}
                  secureTextEntry={true}
                  password={true}
                  autoCapitalize="none"
                  underlineColorAndroid={"transparent"}
                  onChangeText={(text) => setNewPassTwo(text)}
                  value={newPassTwo}
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
                      backgroundColor: Colors.bluetitle,
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

                  <TouchableOpacity
                    style={{
                      fontFamily: "Cabin-Regular",
                      backgroundColor: Colors.bluelinks,
                      height: 50,
                      width: "48%",
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
    paddingBottom: 30,
  },
  imgPrincipal: {
    maxWidth: 200,
    width: windowHeight * 0.4,
    height: "100%",
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

export default connect(mapState)(ChangePasswordScreen);
