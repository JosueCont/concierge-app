import React, { useState } from "react";
import { NavigationActions } from "react-navigation";
import {
  Dimensions,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Text,
  Platform,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import { Colors } from "../utils/colors";
import { logOutAction } from "../redux/userDuck";

const SideMenu = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    props.navigation.dispatch(navigateAction);
  };

  const logoutS = () => {
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ zIndex: 5, backgroundColor: Colors.bluetitle, padding: 16 }}
      >
        <View
          style={{
            width: Dimensions.get("window").width * 0.2,
            height: Dimensions.get("window").width * 0.2,
            backgroundColor: "transparent",
            marginTop: Dimensions.get("window").height * 0.06,
          }}
        >
          <Image
            resizeMode="contain"
            style={{ height: "100%", width: "100%" }}
            source={require("../../assets/img/logo-staff.png")}
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ProfileScreen")}
          >
            <Text
              style={{
                fontFamily: "Cabin-Medium",
                fontSize: 22,
                color: Colors.white,
                marginTop: 9,
              }}
            >
              Nombre del perfil
            </Text>
            <Text
              style={{
                fontFamily: "Cabin-Regular",
                fontSize: 14,
                color: Colors.white,
                marginTop: 4,
                opacity: 0.7,
              }}
            >
              correo del perfil
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", bottom: -40, right: 15, zIndex: 5, }}
        >
          <Image
            source={require("../../assets/img/icono_regresar.png")}
            style={{ width: 25, height: 25, resizeMode: "contain" }}
          ></Image>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ zIndex: 3, flex: 1 }}>
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            style={styles.navSectionStyle}
            onPress={navigateToScreen("Home")}
          >
            <Image source={require("../../assets/img/icono_calendario.png")} style={{ width: 25, height: 25, resizeMode: 'contain' }}></Image>
            <Text style={styles.navItemStyle}>Calendario</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navSectionStyle}
            onPress={navigateToScreen("Home")}
          >
            <Image source={require("../../assets/img/icono_calendario.png")} style={{ width: 25, height: 25, resizeMode: 'contain' }}></Image>
            <Text style={styles.navItemStyle}>Recursos humanos</Text>
          </TouchableOpacity>

          {/* AVISO DE PRIVACIDAD*/}
          <TouchableOpacity
            style={styles.navSectionStyle}
            onPress={() => {
              Linking.openURL("https://www.musixmatch.com/es/letras/Paulo-Cuevas/Mi-Coraz%C3%B3n-Encantado-de-Dragon-Ball-GT");
            }}
          >
            <Image source={require("../../assets/img/icono_nomina.png")} style={{ width: 25, height: 25, resizeMode: 'contain' }}></Image>
            <Text style={styles.navItemStyle}>Aviso de privacidad</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navSectionStyle}
            onPress={() => {
              props.logOutAction();
            }}
          >
            <Image source={require("../../assets/img/icono_cerrar_sesion.png")} style={{ width: 25, height: 25, resizeMode: 'contain' }}></Image>
            <Text style={styles.navItemStyle}>Cerrar sesión</Text>
          </TouchableOpacity>
          <View style={{ alignItems: 'center', width: '100%', height: 200, marginTop: 50, }}>
            <Image source={require("../../assets/img/imagen_menu.png")} style={{ width: '80%', height: '100%', resizeMode: 'contain', }}></Image>
          </View>
          <Text style={{ marginTop: 30, fontFamily: 'Cabin-Regular', fontSize: 16, textAlign: 'center', color: Colors.bluetitle, }}>Versión: 1.0.2</Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  navSectionStyle: {
    backgroundColor: "transparent",
    borderBottomColor: Colors.bluelinks,
    borderBottomWidth: 1,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItemStyle: {
    fontFamily: "Cabin-Regular",
    color: Colors.bluetitle,
    fontSize: 18,
    marginLeft: 15,
  },
});

const mapState = (state) => {
  return { state };
};

export default connect(mapState, { logOutAction })(SideMenu);
