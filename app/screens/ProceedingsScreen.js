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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const ProceedingsScreen = (props) => {
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
        nameToolbar={"Expediente"}
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
                fontSize: 22,
                color: Colors.bluetitle,
                textAlign: "left",
              }}
            >
              Descarga tu{" "}
            </Text>
            <Text
              style={{
                fontFamily: "Cabin-Regular",
                fontSize: 22,
                color: Colors.bluetitle,
                textAlign: "left",
              }}
            >
              documentación para
            </Text>
            <Text
              style={{
                fontFamily: "Cabin-Regular",
                fontSize: 22,
                color: Colors.bluetitle,
                textAlign: "left",
              }}
            >
              cualquier trámite
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
                source={require("../../assets/img/rh_icon_menu.png")}
                style={styles.image}
              ></Image>
              <Text style={styles.title}>INE/IFE</Text>
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

export default ProceedingsScreen;
