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

const ModalLoadingGlobal = (props) => {
  return (
    <View>
      <Modal transparent={true} visible={props.user.fetching ? true : false}>
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
};

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(ModalLoadingGlobal);
