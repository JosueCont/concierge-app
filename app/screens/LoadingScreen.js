import React, { useEffect, useState } from "react";
import { StyleSheet, Image, ImageBackground } from "react-native";
import { Colors } from "../utils/colors";
import styled from "styled-components/native";
import ModalLoadingLogin from "../components/modal/LoadingGlobal";

const LoadingScreen = (props) => {
  return (
    <>
      <ImageBackground
        source={require("../../assets/img/fondo_logon_noicon.png")}
        style={{ resizeMode: "cover" }}
      >
        <Image
          source={require("../../assets/img/fondo-banner.png")}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            resizeMode: "cover",
            bottom: 0,
            right: 0,
          }}
        />
      </ImageBackground>
      {/* <ModalLoadingLogin visible={true} /> */}
    </>
  );
};

export const Wrapper = styled.View`
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  flex-direction: column;
`;

const styles = StyleSheet.create({
  input: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 15,
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 15,
    width: "90%",
    height: 44,
    color: "black",
    borderColor: Colors.bluelinks,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 8,
  },
});

export default LoadingScreen;
