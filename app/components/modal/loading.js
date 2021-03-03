import React, { useState } from "react";
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import { Colors } from "../../utils/colors";
const { width, height } = Dimensions.get("window");
import { connect } from "react-redux";

const ModalLoading = (props) => {
  return (
    <View style={{ backgroundColor: "green" }}>
      <Modal animationType="slide" transparent={true} visible={props.visible}>
        <View style={styles.centeredView}>
          <Image
            style={{ width: 100, height: 100 }}
            fullScreen
            source={require("../../../assets/Login_concierge.gif")}
          />
          <Text style={{ color: "#fff" }}>Cargando...</Text>
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

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(ModalLoading);
