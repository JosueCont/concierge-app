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
import React from "react";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import ToolbarNoLogin from "../../components/ToolbarComponent/ToolbarNoLogin";
import { Colors } from "../../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const ChangePasswordFirstTime = (props) => {
  console.log("PROPS-->> ", props.user);

  const actionReturn = () => {
    props.navigation.navigate("LoginScreen");
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
                  secureTextEntry={false}
                  password={true}
                  autoCapitalize="none"
                  underlineColorAndroid={"transparent"}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar Contraseña"
                  placeholderTextColor={Colors.bluetitle}
                  secureTextEntry={false}
                  password={true}
                  autoCapitalize="none"
                  underlineColorAndroid={"transparent"}
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
