import React, { useEffect } from "react";
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
import { Colors } from "../../utils/colors";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const payrollDetailScreen = (props) => {
  const clickAction = () => {
    props.navigation.pop();
  };

  const clickProfile = () => {
    props.navigation.navigate("ProfileScreen");
  };

  useEffect(() => {
    console.log("ITEM-->> ", props.navigation.getParam("item"));
  }, []);

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
      {/* Toolbar componenet para mostar el datos del usuario*/}
      <ToolbarGeneric
        clickAction={clickAction}
        nameToolbar={"Mi Nomina"}
        type={1}
        clickProfile={clickProfile}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          zIndex: 0,
          paddingHorizontal: "8%",
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              with: "100%",
              alignItems: "center",
              position: "absolute",
              top: -55,
              right: 0,
              left: 0,
            }}
          >
            <Image
              source={require("../../../assets/img/icono_nomina_negro.png")}
              style={{ width: 110, height: 110, resizeMode: "cover" }}
            ></Image>
          </View>
          <View style={{ marginTop: 80 }}>
            <Text style={styles.monto}>$15,000 MXN</Text>
            <Text style={styles.fecha}>31 Agosto 2020</Text>

            <View>
              <Text style={styles.title}>Percepciones</Text>
              <View style={styles.item}>
                <Text style={styles.concepto}>Concepto 1</Text>
                <Text style={styles.cantidad}>$1,000 MX</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.concepto}>Concepto 2</Text>
                <Text style={styles.cantidad}>$1,000 MX</Text>
              </View>
            </View>

            <View>
              <Text style={styles.title}>Deducciones</Text>
              <View style={styles.item}>
                <Text style={styles.concepto}>Concepto 1</Text>
                <Text style={styles.cantidad}>$1,000 MX</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.concepto}>Concepto 2</Text>
                <Text style={styles.cantidad}>$1,000 MX</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  fontFamily: "Cabin-Regular",
                  backgroundColor: Colors.white,
                  borderColor: Colors.bluetitle,
                  borderWidth: 1,
                  height: 45,
                  width: "48%",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: Colors.bluetitle, fontSize: 14 }}>
                  Descarga PDF
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  fontFamily: "Cabin-Regular",
                  backgroundColor: Colors.white,
                  borderColor: Colors.bluetitle,
                  borderWidth: 1,
                  height: 45,
                  width: "48%",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: Colors.bluetitle, fontSize: 14 }}>
                  Descarga CFDI
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  fontFamily: "Cabin-Regular",
                  backgroundColor: Colors.bluetitle,
                  height: 45,
                  width: "48%",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: Colors.white, fontSize: 14 }}>
                  Regresar
                </Text>
              </TouchableOpacity>
            </View>
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
        source={require("../../../assets/img/fondo_azul.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 400,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 80,
    marginBottom: 50,
    paddingBottom: 30,
  },
  monto: {
    fontFamily: "Cabin-Bold",
    fontSize: 22,
    marginBottom: 8,
    textAlign: "center",
    color: Colors.bluetitle,
  },
  fecha: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    color: Colors.bluetitle,
  },
  title: {
    fontFamily: "Cabin-Bold",
    fontSize: 18,
    color: Colors.bluetitle,
    borderBottomColor: Colors.bluelinks,
    borderBottomWidth: 2,
    paddingBottom: 15,
    marginTop: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: 'pink',
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomColor: "#CED8DD",
    borderBottomWidth: 1,
  },
  concepto: {
    flex: 1,
    alignItems: "flex-start",
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    color: Colors.bluetitle,
  },
  cantidad: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    textAlign: "right",
    fontFamily: "Cabin-Bold",
    fontSize: 16,
    color: Colors.bluetitle,
  },
});

export default payrollDetailScreen;
