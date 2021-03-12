import React from "react";
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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const NewScreen = (props) => {
  const clickAction = () => {
    props.navigation.navigate("Main");
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
      {/* Toolbar componenet para mostar el datos del usuario*/}
      <ToolbarGeneric
        clickAction={clickAction}
        nameToolbar={"Noticias"}
        type={1}
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
              source={require("../../assets/img/imagen_noticia.png")}
              style={{
                width: "100%",
                height: windowWidth / 2.2,
                resizeMode: "cover",
                borderRadius: 20,
                marginBottom: 30,
              }}
            ></Image>
            <View style={{ paddingHorizontal: 10, }}>
              <Text style={styles.titleNew}> Noticia </Text>
              <Text style={styles.descNew}>
                Las relaciones de línea y staff son importantes como modo de
                vida organizacional, ya que las relaciones de autoridad entre
                los miembros de una organización afectan necesariamente a la
                operación de la empresa.  {"\n"} {"\n"}
                Las funciones de línea son las que
                tienen un impacto directo en el cumplimiento de los objetivos de
                la empresa.  {"\n"} {"\n"}
                Las funciones de staff son aquellas que contribuyen
                a que el personal de línea trabaje con mayor eficacia a favor
                del cumplimiento de tales objetivos.
              </Text>
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
                >
                  <Text style={{ fontFamily: 'Cabin-Regular', color: Colors.white, fontSize: 16 }}>
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
