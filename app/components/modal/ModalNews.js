import {
  Dimensions,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Colors } from "../../utils/colors";
import HTML from "react-native-render-html";
import ApiApp from "../../utils/ApiApp";

const windowWidth = Dimensions.get("window").width;

const ModalNews = ({ visible, setVisible, data, user }) => {
  const witHtml = useWindowDimensions().width;

  useEffect(() => {
    if (data.item && !data.item.is_red && user.userProfile) {
      let value = {
        person: user.userProfile.id,
        notification: data.item.id,
      };
      changeStatus(value);
    }
  }, [data.item]);

  const changeStatus = async (data) => {
    try {
      let response = await ApiApp.changeStatusComunication(data);
    } catch (error) {}
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: Colors.bluetitle,
                width: 170,
                height: 48,
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
              }}
            >
              {data.item && data.item.is_read ? (
                <Image
                  source={require("../../../assets/img/icono_recordatorio_azul.png")}
                  style={{ width: 25, height: 25 }}
                ></Image>
              ) : (
                <Image
                  source={require("../../../assets/img/icono_recordatorio_rojo.png")}
                  style={{ width: 25, height: 25 }}
                ></Image>
              )}
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "Cabin-Bold",
                  color: Colors.white,
                  fontSize: 18,
                }}
              >
                Aviso
              </Text>
            </View>
            <Text style={[styles.textoOpen, styles.textReminder]}>
              {data.item && data.item.title}
            </Text>
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                paddingHorizontal: 30,
                marginBottom: 20,
              }}
            >
              {data.item && (
                <HTML
                  source={{ html: data.item.message }}
                  contentWidth={witHtml}
                />
              )}
            </View>

            <TouchableOpacity
              style={{
                fontFamily: "Cabin-Regular",
                backgroundColor: Colors.bluetitle,
                height: 50,
                width: "45%",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
                margin: 10,
              }}
              onPress={() => setVisible({ index: data.index })}
            >
              <Text style={{ color: Colors.white, fontSize: 16 }}>
                Regresar
              </Text>
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
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: 20,
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
  textoOpen: {
    padding: "2%",
    color: Colors.bluetitle,
  },
  textReminder: {
    fontSize: 18,
    fontFamily: "Cabin-Regular",
  },
};

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(ModalNews);
