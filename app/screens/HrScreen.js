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
import ToolbarGeneric from "..//components/ToolbarComponent/ToolbarGeneric";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const HrScreen = (props) => {
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
          top: -5,
          textAlign: "center",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.bluetitle,
            width: windowWidth * 0.14,
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
        nameToolbar={"RH"}
        type={1}
        clickProfile={clickProfile}
        goHome={goHome}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          zIndex: 0,
          paddingHorizontal: "10%",
        }}
      >
        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/img/rh.png")}
            style={{
              width: 80,
              height: 80,
              resizeMode: "cover",
              marginRight: 5,
            }}
          ></Image>
          <View>
            <Text
              style={{
                fontFamily: "Cabin-Regular",
                fontSize: 24,
                color: Colors.bluetitle,
                textAlign: "left",
              }}
            >
              Solicita tus trámites
            </Text>
            <Text
              style={{
                fontFamily: "Cabin-Regular",
                fontSize: 24,
                color: Colors.bluetitle,
                textAlign: "left",
              }}
            >
              {" "}
              de manera fácil
            </Text>
          </View>
        </View>

        <View style={{ marginVertical: 40 }}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => props.navigation.navigate("vacationScreen")}
            >
              <Mark />
              <Image
                source={require("../../assets/img/vacaciones.png")}
                style={styles.image}
              ></Image>
              <Text style={styles.title}>Vacaciones</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => props.navigation.navigate("permissionsScreen")}
            >
              <Mark />
              <Image
                source={require("../../assets/img/permisos.png")}
                style={styles.image}
              ></Image>
              <Text style={styles.title}>Permisos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.item}>
              <Mark />
              <Image
                source={require("../../assets/img/prestamo.png")}
                style={styles.image}
              ></Image>
              <Text style={styles.title}>Préstamo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Mark />
              <Image
                source={require("../../assets/img/incapacidad.png")}
                style={styles.image}
              ></Image>
              <Text style={styles.title}>Incapacidad</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.item}>
              <Mark />
              <Image
                source={require("../../assets/img/expediente.png")}
                style={styles.image}
              ></Image>
              <Text style={styles.title}>Expediente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  item: {
    width: windowWidth * 0.37,
    height: windowWidth * 0.37,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Cabin-Regular",
    fontSize: 18,
    color: Colors.bluetitle,
    textAlign: "center",
    marginTop: 15,
  },
});

export default HrScreen;
