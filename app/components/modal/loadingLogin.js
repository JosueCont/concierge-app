import React from "react";
import { Dimensions, Image, Modal, Text, View } from "react-native";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");

const ModalLoadingLogin = ({ visible }) => {
  return (
    <View>
      <Modal transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <Image
            style={{ width: 100, height: 100 }}
            fullScreen
            source={require("../../../assets/Load_Dark.gif")}
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
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
};

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(ModalLoadingLogin);
