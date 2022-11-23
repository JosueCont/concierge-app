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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const VacationDetailScreen = (props) => {
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [modalLoading, setModalLoading] = useState(true);
  const [vacation, setVacation] = useState({});

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
      let response = await ApiApp.getVacationDetail(
        props.navigation.getParam("id")
      );
      if (response.status == 200) {
        setVacation(response.data);
        setTimeout(() => {
          setModalLoading(false);
        }, 1500);
      } else {
        props.props.navigation.goBack(null);
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
          nameToolbar={"Vacaciones"}
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
                    backgroundColor: Colors.secondary,
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
                    color: Colors.secondary,
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
                  vacation.status == 1
                    ? styles.statusPendiente
                    : vacation.status == 2
                    ? styles.statusAprobado
                    : styles.statusRechazado,
                ]}
              >
                <Text style={styles.status}>
                  {vacation.status == 1
                    ? "Pendiente"
                    : vacation.status == 2
                    ? "Aprobado"
                    : "Rechazado"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                  marginRight: "2%",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: Colors.back,
                      width: 35,
                      height: 35,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Cabin-Bold",
                        color: Colors.primary,
                        fontSize: 17,
                      }}
                    >
                      {vacation.collaborator
                        ? vacation.collaborator.Available_days_vacation
                        : 0}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontFamily: "Cabin-Regular",
                    fontSize: 12,
                    color: Colors.secondary,
                    marginLeft: 15,
                  }}
                >
                  Días disponibles
                </Text>

                <View style={{ alignItems: "center", marginLeft: "12%" }}>
                  <View
                    style={{
                      backgroundColor: Colors.back,
                      width: 35,
                      height: 35,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Cabin-Bold",
                        color: Colors.primary,
                        fontSize: 17,
                      }}
                    >
                      {vacation.days_requested ? vacation.days_requested : 0}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontFamily: "Cabin-Regular",
                    fontSize: 12,
                    color: Colors.secondary,
                    marginLeft: 10,
                  }}
                >
                  Días solicitados
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <View style={{ alignItems: "center", width: "30%" }}>
                  <Text
                    style={{
                      fontFamily: "Cabin-Regular",
                      color: Colors.secondary,
                      fontSize: 12,
                    }}
                  >
                    Fecha de salida
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: Colors.back,
                    width: "70%",
                    height: 35,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Cabin-Bold",
                      color: Colors.secondary,
                      fontSize: 17,
                    }}
                  >
                    {vacation.departure_date ? vacation.departure_date : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <View style={{ alignItems: "center", width: "30%" }}>
                  <Text
                    style={{
                      fontFamily: "Cabin-Regular",
                      color: Colors.secondary,
                      fontSize: 12,
                    }}
                  >
                    Fecha de retorno
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: Colors.back,
                    width: "70%",
                    height: 35,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Cabin-Bold",
                      color: Colors.secondary,
                      fontSize: 17,
                    }}
                  >
                    {vacation.return_date ? vacation.return_date : ""}
                  </Text>
                </View>
              </View>
              {vacation.comment != null && vacation.comment != "" && (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Cabin-Regular",
                          color: Colors.secondary,
                          fontSize: 12,
                          paddingBottom: 10,
                        }}
                      >
                        Motivo :
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.bluebg,
                        width: "100%",
                        borderRadius: 10,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Cabin-Regular",
                          color: "#006FCC",
                          fontSize: 17,
                          textAlign: "justify",
                        }}
                      >
                        {vacation.comment && vacation.comment}
                      </Text>
                    </View>
                  </View>
                </>
              )}

              <TouchableOpacity
                style={{
                  fontFamily: "Cabin-Regular",
                  backgroundColor: Colors.primary,
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
          source={require("../../../assets/img/new/fondo_azul.png")}
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

export default connect(mapState)(VacationDetailScreen);
