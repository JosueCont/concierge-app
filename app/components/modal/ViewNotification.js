import {
  Dimensions,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Colors } from "../../utils/colors";
import HTML from "react-native-render-html";

const windowWidth = Dimensions.get("window").width;

const ViewNotification = ({
  visible,
  departureDate,
  returnDate,
  setVisible,
  textSelected,
}) => {
  const witHtml = useWindowDimensions().width;

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: Colors.bluetitle,
                width: 170,
                height: 48,
                marginTop: 15,
                marginLeft: 10,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
                borderRadius: 8,
              }}
            >
              <Image
                source={require("../../../assets/img/icono_recordatorio_rojo.png")}
                style={{ width: 25, height: 25 }}
              ></Image>
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "Cabin-Bold",
                  color: Colors.white,
                  fontSize: 18,
                }}
              >
                Aviso
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                paddingHorizontal: 30,
                marginBottom: 20,
              }}
            >
              <Text style={[styles.textoClose, styles.textReminder]}>Hola</Text>
              <HTML source={{ html: "hola" }} contentWidth={witHtml} />

              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Cabin-Regular",
                  color: "#08B9FF",
                }}
              >
                TEXTO PARA CONTENIDO DE PERSONAS
              </Text>
            </View>

            <TouchableOpacity
              style={{
                fontFamily: "Cabin-Regular",
                backgroundColor: Colors.bluetitle,
                height: 50,
                width: "45%",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
                margin: 10,
              }}
              onPress={() => setVisible()}
            >
              <Text style={{ color: Colors.white, fontSize: 16 }}>
                Regresar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(ViewNotification);
