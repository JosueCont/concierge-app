import React, { useState } from "react";
import { Modal, View, Image, TouchableOpacity, Dimensions } from "react-native";

import { Button, Text } from "native-base";

// import iconError from "../../../assets/icon-error.png";
// import iconSuccess from "../../../assets/icon_success.png";
import { Colors } from "../../utils/colors";
const { width, height } = Dimensions.get("window");

const ModalCustom = ({
  visible,
  setVisible,
  title = "¡Error!",
  text,
  isError = true,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 80,
              }}
            >
              {isError ? (
                <Image
                  //   source={iconError}
                  style={{ position: "absolute", top: -100 }}
                />
              ) : (
                <Image
                  //   source={iconSuccess}
                  style={{
                    width: 171,
                    height: 128,
                    position: "absolute",
                    top: -100,
                  }}
                />
              )}
            </View>
            <Text style={styles.modalTitle}>{title}</Text>

            <Text
              style={[
                styles.modalText,
                { marginBottom: 30, fontFamily: "Cabin-Bold" },
              ]}
            >
              {text}
            </Text>

            <TouchableOpacity
              style={styles.fbBtn}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text style={styles.fbText}>Cerrar</Text>
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
  fbBtn: {
    backgroundColor: Colors.purple,
    width: height / 3,
    height: 40,
    borderRadius: 10,
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  fbText: {
    color: Colors.white,
    fontSize: 14,
  },
  modalView: {
    margin: 20,
    width: "80%",
    backgroundColor: Colors.orange,
    borderRadius: 20,
    padding: 35,
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 10,
    //padding: 10,
    //elevation: 2
  },
  textStyle: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Cabin-Regular",
    color: Colors.purple,
  },
  modalTitle: {
    marginBottom: 5,
    textAlign: "center",
    fontFamily: "Cabin-Bold",
    fontSize: 20,
    color: Colors.purple,
  },
};

export default ModalCustom;
