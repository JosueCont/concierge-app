import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import ToolbarGeneric from "../components/ToolbarComponent/ToolbarGeneric";
import { Colors } from "../utils/colors";
import HTML from "react-native-render-html";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const NewScreen = (props) => {
  const [item, setItem] = useState();
  const clickAction = () => {
    props.navigation.goBack(null);
  };

  const goHome = () => {
    props.navigation.navigate("Home");
  };

  const clickProfile = () => {
    props.navigation.navigate("ProfileScreen");
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

      <ToolbarGeneric
        clickAction={clickAction}
        nameToolbar={"Noticias"}
        type={1}
        clickProfile={clickProfile}
        goHome={goHome}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          zIndex: 0,
          backgroundColor: Colors.bluebg,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ marginTop: 50 }}>
          <View
            style={{
              width: "100%",
              position: "absolute",
              top: -5,
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#47A8DE",
                width: 70,
                height: 5,
              }}
            ></View>
          </View>
          <View style={styles.container}>
            <Image
              source={{ uri: props.navigation.getParam("image") }}
              style={{
                width: "100%",
                height: windowWidth / 2.2,
                resizeMode: "cover",
                borderRadius: 20,
                marginBottom: 30,
              }}
            ></Image>
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={styles.titleNew}> Noticia </Text>

              <HTML source={{ html: props.navigation.getParam("text") }} />

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.bluetitle,
                    height: 50,
                    width: "52%",
                    borderRadius: 20,
                    marginTop: 40,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => clickAction()}
                >
                  <Text
                    style={{
                      fontFamily: "Cabin-Regular",
                      color: Colors.white,
                      fontSize: 16,
                    }}
                  >
                    Regresar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default NewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    borderRadius: 20,
  },
  titleNew: {
    fontFamily: "Cabin-Bold",
    fontSize: 22,
    color: Colors.bluetitle,
    marginBottom: 20,
  },
  descNew: {
    fontFamily: "Cabin-Regular",
    fontSize: 18,
    color: Colors.bluetitle,
  },
});
