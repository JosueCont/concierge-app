import React, { useEffect } from "react";
import { Image, Modal, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { logOutAction } from "../../redux/userDuck";
import { Colors } from "../../utils/colors";

const CloseSession = (props) => {
  useEffect(() => {}, []);

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
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
              source={require("../../../assets/img/icon_contrasena.png")}
              style={styles.modalImg}
            />
            <Text style={styles.modalText}>
              {"¿ Esta seguro de querer cerrar sesión ?"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  fontFamily: "Cabin-Regular",
                  backgroundColor: Colors.bluetitle,
                  height: 50,
                  width: "60%",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 5,
                }}
                onPress={() => {
                  props.setVisible(false);
                }}
              >
                <Text style={styles.modalBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  fontFamily: "Cabin-Regular",
                  backgroundColor: Colors.bluelinks,
                  height: 50,
                  width: "60%",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 5,
                }}
                onPress={props.logOutAction}
              >
                <Text style={styles.modalBtnText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
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
    fontSize: 20,
  },
  modalBtn: {
    backgroundColor: Colors.bluetitle,
    width: "60%",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  modalBtnText: {
    color: Colors.white,
    fontSize: 16,
  },
};

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState, { logOutAction })(CloseSession);
