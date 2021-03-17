import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Keyboard,
  Text,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationActions, StackActions } from "react-navigation";
import { doLoginAction } from "../../redux/userDuck";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { darkerHex, emailRegEx } from "../../utils/utils";
import Button from "../../components/Buttons/Button";
import { Colors } from "../../utils/colors";
import styled from "styled-components/native";
import { Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import ModalLoadingLogin from "../../components/modal/loadingLogin";
import ModalCustom from "../../components/modal/ModalCustom";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("jasson.acea@hiumanlab.com");
  const [pass, setPass] = useState("123456");
  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  const [changeView, setChangeView] = useState(false);
  const [play, setPlay] = useState(true);

  const resetStack = () => {
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "Main",
          }),
        ],
      })
    );
  };
  /***
   *Modal para cuando responde un servicio
   ***/

  const [visibleHeight, setVisibleHeight] = useState(
    Dimensions.get("window").height
  );
  const [comp_no_imp, setComp_no_imp] = useState(
    Dimensions.get("window").height
  );
  const [comp_aux, setComp_aux] = useState(0);
  const [justificante_login, setJustificante_login] = useState("flex-end");
  const [comp_aux_imagen, setComp_aux_imagen] = useState(
    Dimensions.get("window").width * 0.5
  );
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [loading, setLoading] = useState(false);

  const viewModalCustom = () => {
    modalCustom ? setModalCustom(false) : setModalCustom(true);
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", keyboardWillShow);
    Keyboard.addListener("keyboardDidHide", keyboardWillHide);
  }, [props.user.fetching]);

  const keyboardWillShow = (e) => {
    LayoutAnimation.easeInEaseOut();
    setVisibleHeight(Dimensions.get("window").height);
    setComp_no_imp(Dimensions.get("window").height * 0);
    setJustificante_login("flex-start");
    setComp_aux(Dimensions.get("window").height);
    setComp_aux_imagen(Dimensions.get("window").width * 0.3);
    setChangeView(true);
    setPlay(false);
  };

  const keyboardWillHide = (e) => {
    LayoutAnimation.easeInEaseOut();
    setVisibleHeight(Dimensions.get("window").height);
    setComp_no_imp(Dimensions.get("window").height);
    setJustificante_login("flex-end");
    setComp_aux(0);
    setComp_aux_imagen(Dimensions.get("window").width * 0.5);
    setChangeView(false);
    setPlay(false);
  };

  const _login = () => {
    if (email.trim() === "" || pass.trim() === "") {
      setMessageCustomModal("Llene todos los campos");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      return;
    }
    props
      .doLoginAction({
        email: email,
        password: pass,
      })
      .then((response) => {
        if (response.status && response.status != 200) {
          setMessageCustomModal("El usuario y la contraseña no coinciden.");
          setIconSourceCustomModal(2);
          setModalCustom(true);
        } else {
          if (!response.password_changed) {
            props.navigation.navigate("ChangePasswordFirstTime");
          } else {
            setLoading(false);
          }
        }
      });
  };

  useEffect(() => {
    if (props.user.fetching) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [props.user.fetching]);
  return (
    <>
      <ImageBackground
        source={require("../../../assets/img/fondo_logon_noicon.png")}
        style={{ resizeMode: "cover" }}
      >
        {!changeView ? (
          <Video
            source={require("../../../assets/video/LoginConcierge.mp4")}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay={play}
            isLooping={false}
            style={{
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              alignItems: "stretch",
              bottom: 0,
              right: 0,
            }}
          />
        ) : (
          <Image
            source={require("../../../assets/img/fondo-banner.png")}
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
        )}

        <Wrapper>
          <View style={{ height: Dimensions.get("window").height * 0.05 }} />
          <TouchableOpacity
            style={{
              minWidth: 20,
              width: 35,
              minHeight: 20,
              height: 35,
              marginLeft: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></TouchableOpacity>

          <View
            style={{
              top: comp_aux === 0 ? 100 : 0,
              backgroundColor: "transparent",
              height: comp_aux_imagen,
              width: comp_aux_imagen,
              alignItems: "center",
              alignSelf: "center",
              marginBottom: comp_aux === 0 ? 10 : 30,
            }}
          >
            {!play && (
              <Image
                resizeMode="contain"
                style={{
                  top: comp_aux === 0 ? 10 : 0,
                  backgroundColor: "transparent",
                  height: comp_aux_imagen,
                  width: comp_aux_imagen,
                  alignItems: "center",
                  alignSelf: "center",
                  marginBottom: comp_aux === 0 ? 10 : 30,
                }}
                source={require("../../../assets/img/logo-staff.png")}
              />
            )}
          </View>

          <View style={{ height: comp_aux * 0.05 }} />

          <Animatable.View
            animation="fadeInUp"
            iterationCount={1}
            delay={Platform.OS === "ios" ? 6000 : 5000}
            style={{
              height: Dimensions.get("window").height * 0.7,
              marginHorizontal: Dimensions.get("window").width * 0.02,
              alignItems: "center",
              marginTop: -50,
              justifyContent: justificante_login,
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 40,
                padding: 30,
                width: Dimensions.get("window").height * 0.44,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Cabin-Bold",
                  fontSize: 30,
                  marginTop: 20,
                  marginBottom: 20,
                  textAlign: "center",
                  color: Colors.bluetitle,
                }}
              >
                Iniciar sesión
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor={Colors.bluetitle}
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
                underlineColorAndroid={"transparent"}
              />

              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={Colors.bluetitle}
                secureTextEntry={true}
                onChangeText={(text) => setPass(text)}
                value={pass}
                password={true}
                autoCapitalize="none"
                underlineColorAndroid={"transparent"}
              />

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("RecoverPasswordScreen");
                }}
              >
                <Text
                  style={{
                    fontFamily: "Cabin-Regular",
                    color: Colors.bluelinks,
                    fontSize: 14,
                    marginTop: 10,
                    marginBottom: 0,
                  }}
                >
                  Recuperar contraseña
                </Text>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", width: "90%" }}>
                <View style={{ flex: 1, marginTop: 5 }}>
                  {!props.user.fetching ? (
                    <Button
                      mensaje="Entrar"
                      style={{ color: "white" }}
                      onPress={() => _login()}
                      colorBackground={Colors.bluelinks}
                    />
                  ) : (
                    <ActivityIndicator size="small" color="white" />
                  )}
                </View>
              </View>
            </View>
          </Animatable.View>
        </Wrapper>
      </ImageBackground>
      <ModalLoadingLogin visible={loading} />
      <ModalCustom
        visible={modalCustom}
        text={messageCustomModal}
        iconSource={iconSourceCustomModal}
        setVisible={() => viewModalCustom(true)}
      />
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
const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState, { doLoginAction })(LoginScreen);
