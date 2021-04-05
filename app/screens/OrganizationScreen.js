import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../utils/colors";
import ToolbarGeneric from "../components/ToolbarComponent/ToolbarGeneric";
import { connect } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const OrganizationScreen = (props) => {
  const clickAction = () => {
    props.navigation.navigate("Main");
  };

  const goHome = () => {
    props.navigation.navigate("Home");
  };

  const clickProfile = () => {
    props.navigation.navigate("ProfileScreen");
  };

  function Mark() {
    return (
      <View
        style={{
          width: "100%",
          position: "absolute",
          top: -29,
          textAlign: "center",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.bluetitle,
            width: windowWidth * 0.2,
            height: 5,
          }}
        ></View>
      </View>
    );
  }

  return (
    <View
      style={{
        height: "100%",
        zIndex: 1,
        backgroundColor: Colors.bluebg,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="rgba(1,1,1,0)"
        translucent={true}
      />

      <ToolbarGeneric
        clickAction={clickAction}
        nameToolbar={"Organización"}
        type={1}
        clickProfile={clickProfile}
        goHome={goHome}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          zIndex: 0,
          paddingHorizontal: "5%",
        }}
      >
        <View
          style={{
            marginTop: "2%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: Dimensions.get("window").width * 0.2,
              height: Dimensions.get("window").width * 0.2,
              backgroundColor: "transparent",
              // marginTop: Dimensions.get("window").height * 0.06,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: "100%", width: "100%" }}
              source={require("../../assets/img/logo-staff.png")}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: "Cabin-Regular",
                fontSize: 15,
                color: Colors.bluetitle,
                textAlign: "left",
              }}
            >
              Empresa
            </Text>
            <Text
              style={{
                fontFamily: "Cabin-Regular",
                fontSize: 24,
                color: Colors.bluetitle,
                textAlign: "left",
              }}
            >
              Staff Evolution
            </Text>
          </View>
        </View>

        <View style={{ marginVertical: "5%" }}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.item}
              // onPress={() => props.navigation.navigate("vacationScreen")}
            >
              <Text style={styles.title}>Información</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              // onPress={() => props.navigation.navigate("PermissionsScreen")}
            >
              <Text style={styles.title}>Políticas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              // onPress={() => props.navigation.navigate("PermissionsScreen")}
            >
              <Text style={styles.title}>Reglas de negocio</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <View style={{ marginTop: "10%" }}>
            <Mark />
            <Text style={{ marginBottom: 10, color: Colors.bluetitle }}>
              Dirección
            </Text>
            <Text style={styles.inputJustify}>
              Calle 15 No. 122 entre 24 y 26, Col. México, 97125 Mérida, Yuc.
            </Text>
            <Text style={{ marginBottom: 10, color: Colors.bluetitle }}>
              Email
            </Text>
            <Text style={styles.input}>contacto@staffevolution.com</Text>
            <Text style={{ marginBottom: 10, color: Colors.bluetitle }}>
              Teléfono
            </Text>
            <Text style={styles.input}>(999) 666 0350</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <View
                style={{
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    marginBottom: 10,
                    color: Colors.bluetitle,
                  }}
                >
                  Información
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  width: "100%",
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: Colors.bluebg,
                }}
              >
                <Text style={styles.inputJustify}>
                  Somos la primera fábrica de software en Capital Humano en
                  Latinoamérica. Contamos con un equipo de profesionales que
                  crea confianza en sus clientes, ya que tenemos una metodología
                  para entender las necesidades de los clientes, y así ofrecer
                  una solución en un tiempo óptimo utilizando tecnología de
                  vanguardia.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5%",
  },
  item: {
    height: 50,
    width: "33%",
    backgroundColor: Colors.bluetitle,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    // paddingHorizontal: "2%",
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Cabin-Regular",
    fontSize: 12,
    color: Colors.white,
    textAlign: "center",
  },
  container: {
    width: "100%",
    minHeight: 350,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 30,
  },
  input: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    color: Colors.bluetitle,
    width: "100%",
    // borderColor: Colors.bluelinks,
    // borderWidth: 1,
    backgroundColor: Colors.bluebg,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
  },
  inputJustify: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    color: Colors.bluetitle,
    width: "100%",
    // borderColor: Colors.bluelinks,
    // borderWidth: 1,
    backgroundColor: Colors.bluebg,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    textAlign: "justify",
  },
  inputComment: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    color: Colors.bluetitle,
    width: "100%",
    height: 100,
    borderColor: Colors.bluelinks,
    borderWidth: 1,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.bluebg,
  },
});

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(OrganizationScreen);
