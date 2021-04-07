import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import { Colors } from "../../utils/colors";
import LoadingGlobal from "../../components/modal/LoadingGlobal";
import ModalCustom from "../../components/modal/ModalCustom";
import ApiApp from "../../utils/ApiApp";

const windowHeight = Dimensions.get("window").height;

const IncapacityDetailScreen = (props) => {
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [modalLoading, setModalLoading] = useState(true);
  const [incapacity, setIncapacity] = useState({});

  const clickAction = () => {
    props.navigation.goBack(null);
  };

  const goHome = () => {
    props.navigation.navigate("Home");
  };

  const clickProfile = () => {
    props.navigation.navigate("ProfileScreen");
  };

  useEffect(() => {
    if (props.user && props.user.userProfile) {
      getDetail();
    } else {
      props.navigation.goBack(null);
    }
  }, [props.navigation.getParam("id")]);

  const viewModalCustom = () => {
    modalCustom ? setModalCustom(false) : setModalCustom(true);
  };

  const getDetail = async () => {
    try {
      let response = await ApiApp.getIncapacityDetail(
        props.navigation.getParam("id")
      );
      if (response.status == 200) {
        setIncapacity(response.data);
        setTimeout(() => {
          setModalLoading(false);
        }, 1500);
      } else {
        setTimeout(() => {
          setModalLoading(false);
          props.props.navigation.goBack(null);
        }, 1500);
      }
    } catch (error) {
      setMessageCustomModal("Ocurrio un error, intente de nuevo.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      setTimeout(() => {
        setModalLoading(false);
        props.navigation.goBack(null);
      }, 1500);
    }
  };
  return (
    <>
      <View
        style={{
          height: "100%",
          zIndex: 1,
          backgroundColor: Colors.bluebg,
        }}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor="rgba(1,1,1,0)"
          translucent={true}
        />
        <ToolbarGeneric
          clickAction={clickAction}
          nameToolbar={"Incapacidades"}
          type={1}
          clickProfile={clickProfile}
          goHome={goHome}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: "transparent",
            zIndex: 0,
            paddingHorizontal: 22,
          }}
        >
          <View style={styles.ctnForm}>
            <View style={styles.ctnPart1}>
              <View
                style={{
                  width: "100%",
                  position: "absolute",
                  top: -13,
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Cabin-Regular",
                    color: Colors.bluetitle,
                    fontSize: 30,
                    marginBottom: "5%",
                  }}
                >
                  Solicitud
                </Text>
              </View>
              <View
                style={[
                  styles.ctnStatus,
                  ,
                  incapacity.status == 1
                    ? styles.statusPendiente
                    : incapacity.status == 2
                    ? styles.statusAprobado
                    : styles.statusRechazado,
                ]}
              >
                <Text style={styles.status}>
                  {incapacity.status == 1
                    ? "Pendiente"
                    : incapacity.status == 2
                    ? "Aprobado"
                    : "Rechazado"}
                </Text>
              </View>

              <View style={{ width: "100%", marginTop: "5%" }}>
                <Text
                  style={{
                    fontFamily: "Cabin-Regular",
                    color: Colors.bluetitle,
                    fontSize: 12,
                  }}
                >
                  Fecha de salida
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: Colors.bluebg,
                  width: "100%",
                  height: 50,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Cabin-Bold",
                    color: "#006FCC",
                    fontSize: 20,
                  }}
                >
                  {incapacity.departure_date ? incapacity.departure_date : ""}
                </Text>
              </View>

              <View style={{ width: "100%", marginTop: "5%" }}>
                <Text
                  style={{
                    fontFamily: "Cabin-Regular",
                    color: Colors.bluetitle,
                    fontSize: 12,
                  }}
                >
                  Fecha de retorno
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: Colors.bluebg,
                  width: "100%",
                  height: 50,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Cabin-Bold",
                    color: "#006FCC",
                    fontSize: 20,
                  }}
                >
                  {incapacity.return_date ? incapacity.return_date : ""}
                </Text>
              </View>
              <View style={{ width: "100%", marginTop: "5%" }}>
                <Text
                  style={{
                    fontFamily: "Cabin-Regular",
                    color: Colors.bluetitle,
                    fontSize: 12,
                  }}
                >
                  Documento de Incapacidad
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  marginTop: "5%",
                }}
                onPress={() => {}}
              >
                <Image
                  source={{
                    uri: incapacity.document,
                  }}
                  style={{
                    height: 300,
                    width: 250,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  fontFamily: "Cabin-Regular",
                  backgroundColor: Colors.bluelinks,
                  height: 50,
                  borderRadius: 10,
                  marginTop: "10%",
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => clickAction()}
              >
                <Text style={{ color: Colors.white, fontSize: 16 }}>
                  Regresar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Image
          style={{
            width: "100%",
            height: windowHeight * 0.46,
            position: "absolute",
            bottom: 0,
            left: 0,
            resizeMode: "stretch",
            zIndex: -1,
          }}
          source={require("../../../assets/img/fondo_azul.png")}
        />
      </View>
      <ModalCustom
        visible={modalCustom}
        text={messageCustomModal}
        iconSource={iconSourceCustomModal}
        setVisible={() => viewModalCustom(true)}
      />
      <LoadingGlobal visible={modalLoading} text={"Cargando"} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 400,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 80,
    marginBottom: 50,
    paddingBottom: 30,
  },
  ctnPart1: {
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  ctnForm: {
    width: "100%",
    backgroundColor: Colors.white,
    paddingHorizontal: 1,
    paddingTop: 10,
    borderRadius: 40,
    marginBottom: "10%",
    marginTop: "10%",
  },
  statusPendiente: {
    backgroundColor: Colors.red,
  },
  statusAprobado: {
    backgroundColor: Colors.blue,
  },
  statusRechazado: {
    backgroundColor: Colors.black,
  },
  status: {
    fontSize: 27,
    fontFamily: "Cabin-Bold",
    color: Colors.white,
  },
  ctnStatus: {
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(IncapacityDetailScreen);
