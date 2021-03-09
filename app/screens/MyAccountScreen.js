import React from "react";
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
import ToolbarNoLogin from "../components/ToolbarComponent/ToolbarNoLogin";
import { Colors } from "../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { askAsync } from "expo-permissions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const MyAccountScreen = (props) => {
  const clickAction = () => {
    props.navigation.navigate("HomeUserScreen");
  };

  const changeAvatar = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionsCamera =
      resultPermissions.permissions.cameraRoll.status;

    if (resultPermissions === "denied") {
      console.log("permisos denegados");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      //console.log(result);
      if (result.cancelled) {
        console.log("Se cancelo la selección de imagenes");
      } else {
        uploadImage(result.uri);
      }
    }
  };

  const uploadImage = (uri) => {
    console.log(uri);
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
              clickAction={clickAction}
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
              source={require("../../assets/img/fondo_azul.png")}
            />
            <TouchableOpacity
              style={styles.ctnPart1}
              onPress={() => {
                changeAvatar();
              }}
            >
              <Image
                style={styles.imgPrincipal}
                source={require("../../assets/img/perfil.png")}
              />
              <Text
                style={{
                  fontFamily: "Cabin-Regular",
                  fontSize: 16,
                  color: Colors.bluelinks,
                }}
              >
                Actualizar foto
              </Text>
            </TouchableOpacity>
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
                  placeholder="Nombre(s)"
                  placeholderTextColor={Colors.bluetitle}
                  autoCapitalize="none"
                  keyboardType="default"
                  underlineColorAndroid={"transparent"}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Apellido(s)"
                  placeholderTextColor={Colors.bluetitle}
                  autoCapitalize="none"
                  keyboardType="default"
                  underlineColorAndroid={"transparent"}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Correo electrónico"
                  placeholderTextColor={Colors.bluetitle}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  underlineColorAndroid={"transparent"}
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
                      backgroundColor: Colors.bluelinks,
                      height: 45,
                      width: "48%",
                      borderRadius: 10,
                      marginTop: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: Colors.white, fontSize: 16 }}>
                      Guardar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      fontFamily: "Cabin-Regular",
                      backgroundColor: Colors.bluetitle,
                      height: 45,
                      width: "48%",
                      borderRadius: 10,
                      marginTop: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Cabin-Regular",
                        color: Colors.white,
                        fontSize: 16,
                      }}
                    >
                      Cerrar Sesión
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("ChangePasswordScreen");
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Cabin-Regular",
                      color: Colors.bluelinks,
                      fontSize: 16,
                      marginTop: 15,
                      marginBottom: 0,
                      textAlign: "center",
                      textDecorationLine: "underline",
                    }}
                  >
                    Actualizar contraseña
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
    paddingBottom: 30,
  },
  imgPrincipal: {
    maxWidth: 200,
    width: windowHeight * 0.25,
    height: windowHeight * 0.25,
    resizeMode: "cover",
    marginBottom: 10,
    borderColor: Colors.bluelinks,
    borderWidth: 8,
    borderRadius: 100,
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

export default MyAccountScreen;
