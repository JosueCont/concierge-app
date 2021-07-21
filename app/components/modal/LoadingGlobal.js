import React from "react";
import { Modal, View, Image, Text } from "react-native";
import { connect } from "react-redux";
import gif from "../../../assets/Login_concierge.gif";

const ModalLoadingGlobal = (props) => {
  return (
    <View style={{ flex: 1, height: "100%", backgroundColor: "green" }}>
      <Modal transparent={true} visible={props.visible}>
        <View style={styles.centeredView}>
          <Image style={{ width: 100, height: 100 }} fullScreen source={gif} />
          <Text style={{ color: "#fff" }}>{props.text}...</Text>
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

export default connect(mapState)(ModalLoadingGlobal);
