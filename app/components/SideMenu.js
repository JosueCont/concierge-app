import React, { useEffect, useState } from "react";
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
import CloseSession from "../components/modal/CloseSession";

const SideMenu = (props) => {
  const [closeSession, setCloseSession] = useState(false);

  const navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    props.navigation.dispatch(navigateAction);
  };

  const modalCloseSession = () => {
    closeSession ? setCloseSession(false) : setCloseSession(true);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View
          style={{
            zIndex: 5,
            backgroundColor: Colors.bluetitle,
            padding: 16,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ position: "absolute", bottom: 140, right: 15, zIndex: 5 }}
          >
            <Image
              source={require("../../assets/img/icono_noticia.png")}
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            ></Image>
          </TouchableOpacity>

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
              onPress={() => {
                props.navigation.navigate("ProfileScreen"),
                  props.navigation.toggleDrawer();
              }}
            >
              <Text
                style={{
                  fontFamily: "Cabin-Medium",
                  fontSize: 22,
                  color: Colors.white,
                  marginTop: 9,
                }}
              >
                {props.user.userProfile && props.user.userProfile.first_name}
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
                {props.user && props.user.email}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={{ zIndex: 3, flex: 1 }}>
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              style={styles.navSectionStyle}
              onPress={() => {
                props.navigation.navigate("CalendarScreen"),
                  props.navigation.toggleDrawer();
              }}
            >
              <Image
                source={require("../../assets/img/calendar_icon_menu.png")}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              ></Image>
              <Text style={styles.navItemStyle}>Calendario</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navSectionStyle}
              onPress={() => {
                props.navigation.navigate("PayrollScreen"),
                  props.navigation.toggleDrawer();
              }}
            >
              <Image
                source={require("../../assets/img/icono_nomina.png")}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              ></Image>
              <Text style={styles.navItemStyle}>Nómina</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navSectionStyle}
              onPress={() => {
                props.navigation.navigate("HrScreen");
                props.navigation.toggleDrawer();
              }}
            >
              <Image
                source={require("../../assets/img/rh_icon_menu.png")}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              ></Image>
              <Text style={styles.navItemStyle}>Recursos humanos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navSectionStyle}
              onPress={navigateToScreen("Home")}
            >
              <Image
                source={require("../../assets/img/node_tree_icon_menu.png")}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              ></Image>
              <Text style={styles.navItemStyle}>Organización</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navSectionStyle}
              onPress={navigateToScreen("Home")}
            >
              <Image
                source={require("../../assets/img/campaign_icon_menu.png")}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              ></Image>
              <Text style={styles.navItemStyle}>Notificaciones</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navSectionStyle}
              onPress={() => modalCloseSession()}
            >
              <Image
                source={require("../../assets/img/icono_cerrar_sesion.png")}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              ></Image>
              <Text style={styles.navItemStyle}>Cerrar sesión</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: "center",
                width: "100%",
                height: 200,
                marginTop: "5%",
              }}
            >
              <Image
                source={require("../../assets/img/imagen_menu.png")}
                style={{ width: "80%", height: "100%", resizeMode: "contain" }}
              ></Image>
            </View>
            <Text
              style={{
                marginTop: "5%",
                fontFamily: "Cabin-Regular",
                fontSize: 16,
                textAlign: "center",
                color: Colors.bluetitle,
              }}
            >
              Versión: 1.0.0
            </Text>
          </View>
          <CloseSession
            visible={closeSession}
            setVisible={() => modalCloseSession()}
          />
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  navSectionStyle: {
    backgroundColor: "transparent",
    borderBottomColor: Colors.bluelinks,
    borderBottomWidth: 1,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  navItemStyle: {
    fontFamily: "Cabin-Regular",
    color: Colors.bluetitle,
    fontSize: 18,
    marginLeft: 15,
  },
});

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState, { logOutAction })(SideMenu);
