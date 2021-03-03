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
import ToolbarNoLogin from "../../components/ToolbarComponent/ToolbarNoLogin";
import { Colors } from "../../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import Constants from "expo-constants";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const ChangePasswordFirstTime = (props) => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassTwo, setNewPassTwo] = useState("");

  const actionReturn = () => {
    props.navigation.navigate("LoginScreen");
  };

  const changePasswordFirstLogin = (password) => {
    return async () => {
      try {
        let response = await axios.post(
          Constants.manifest.extra.URL_KHONNECT + "/password/change/direct/",
          password,
          {
            headers: {
              "client-id": Constants.manifest.extra.ClientId,
              "Content-Type": "application/json",
            },
          }
        );
        return response;
      } catch (e) {
        console.log(e.response);
      }
    };
  };

  const changePassword = () => {
    let data = {
      old_password: oldPass,
      new_password: newPass,
      user_id: props.user.user_id,
    };
    if (newPass === newPassTwo)
      // changePasswordFirstLogin(data);
      console.log("DATA-->>> ", data);
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
              type={2}
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
                source={require("../../../assets/img/icon_contrasena.png")}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Cabin-Regular",
                    color: Colors.bluetitle,
                    fontSize: 30,
                  }}
                >
                  Hola
                </Text>
                <Text
                  style={{
                    fontFamily: "Cabin-Bold",
                    color: Colors.bluetitle,
                    fontSize: 30,
                    marginLeft: 5,
                  }}
                >
                  {props.user.first_name}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Cabin-Regular",
                  color: Colors.bluetitle,
                  fontSize: 18,
                  marginTop: 5,
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                Para ingresar debes cambiar tu contraseña
              </Text>
            </View>
            <View style={styles.ctnPart2}>
              <View style={styles.ctnForm}>
                <TextInput
                  style={styles.input}
                  placeholder="Nueva Contraseña"
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
                  placeholder="Nueva Contraseña"
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
                  placeholder="Confirmar Contraseña"
                  placeholderTextColor={Colors.bluetitle}
                  secureTextEntry={true}
                  password={true}
                  autoCapitalize="none"
                  underlineColorAndroid={"transparent"}
                  onChangeText={(text) => setNewPassTwo(text)}
                  value={newPassTwo}
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.bluelinks,
                    height: 50,
                    borderRadius: 10,
                    marginTop: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => changePassword()}
                >
                  <Text style={{ color: Colors.white, fontSize: 16 }}>
                    Cambiar Contraseña
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
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
    maxWidth: 150,
    maxHeight: 150,
    width: windowHeight * 0.18,
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

export default connect(mapState)(ChangePasswordFirstTime);
