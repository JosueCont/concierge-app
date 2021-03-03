import React from "react";
import { ImageBackground, Image, Modal, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

const ModalLoading = (props) => {
  return (
    <View
      style={{
        // backgroundColor: "green",
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal
        visible={props.visible}
        style={{
          backgroundColor: "green",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={{ backgroundColor: "red", width: 100, height: 100 }}
            fullScreen
            source={require("../../../assets/Login_concierge.gif")}
          />
        </View>
      </Modal>
    </View>
  );
};

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(ModalLoading);
