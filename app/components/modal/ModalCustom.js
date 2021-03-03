import React, { useState } from "react";
import { Modal, View, Image, TouchableOpacity, Dimensions } from "react-native";

import { Button, Text } from "native-base";

// import iconError from "../../../assets/icon-error.png";
// import iconSuccess from "../../../assets/icon_success.png";
import { Colors } from "../../utils/colors";
const { width, height } = Dimensions.get("window");

const ModalCustom = ({ visible, setVisible, iconSource, text }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View
                style={{
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.bluetitle,
                    width: 80,
                    height: 4,
                  }}
                ></View>
              </View>
            <Image
              source={require("../../../assets/img/icono_ok.png")} style={styles.modalImg}
            />
            <Text
              style={
                styles.modalText }
            >
              {text}
            </Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text style={styles.modalBtnText}>Cerrar</Text>
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
    backgroundColor: "rgba(0,0,0,0.53)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    width: "80%",
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 50,
    paddingHorizontal: 50,
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
  modalImg: {
    width: 171,
    height: 128,
    resizeMode: "contain",
    marginBottom: 20,
  },
  modalText: {
    fontFamily: "Cabin-Regular",
    textAlign: "center",
    color: Colors.bluetitle,
    marginBottom: 20,
  },
  modalBtn: {
    backgroundColor: Colors.bluetitle,
    width: '100%',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  modalBtnText: {
    color: Colors.white,
    fontSize: 14,
  },
};

export default ModalCustom;
