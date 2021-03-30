import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import LoadingGlobal from "../../components/modal/LoadingGlobal";
import ModalCustom from "../../components/modal/ModalCustom";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import { logOutAction } from "../../redux/userDuck";
import ApiApp from "../../utils/ApiApp";
import { Colors } from "../../utils/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const PermissionDetail = (props) => {
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [modalLoading, setModalLoading] = useState(true);
  const [permissionDetail, setPermissionDetail] = useState({});

  useEffect(() => {
    getPermissionsDetail(props.navigation.getParam("id"));
  }, [props]);

  const clickAction = () => {
    props.navigation.goBack(null);
  };

  const goHome = () => {
    props.navigation.navigate("Home");
  };

  const clickProfile = () => {
    props.navigation.navigate("ProfileScreen");
  };

  const viewModalCustom = () => {
    modalCustom ? setModalCustom(false) : setModalCustom(true);
  };

  const getPermissionsDetail = async (data) => {
    try {
      setPermissionDetail([]);
      let response = await ApiApp.getPermissionDetail(data);
      if (response.status == 200) {
        console.log("Response-> ", response.data);
        setPermissionDetail(response.data);
        setModalLoading(false);
      } else {
        props.props.navigation.goBack(null);
      }
    } catch (error) {
      setMessageCustomModal("Ocurrio un error, intente de nuevo.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      setModalLoading(false);
      setTimeout(() => {
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
          nameToolbar={"Permisos"}
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
              <Text
                style={{
                  fontFamily: "Cabin-Regular",
                  color: Colors.bluetitle,
                  fontSize: 30,
                  marginBottom: "10%",
                }}
              >
                Solicitud de permisos
              </Text>
              <Text style={styles.titleText}>
                Le informamos que su solicitud de permiso con fecha de salida
              </Text>
              <Text style={styles.modalDate}>
                {permissionDetail.departure_date}
              </Text>
              <Text style={styles.titleText}>fue</Text>

              <View
                style={[
                  styles.ctnStatus,
                  permissionDetail.status == 1
                    ? styles.statusPendiente
                    : permissionDetail.status == 2
                    ? styles.statusAprobado
                    : styles.statusRechazado,
                  ,
                ]}
              >
                <Text style={styles.status}>
                  {permissionDetail.status == 1
                    ? "Pendiente"
                    : permissionDetail.status == 2
                    ? "Aprobado"
                    : "Rechazado"}
                </Text>
              </View>

              {permissionDetail.comment != null &&
                permissionDetail.comment != "" && (
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
                            color: Colors.bluetitle,
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
                          {permissionDetail.comment}
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    fontFamily: "Cabin-Regular",
                    backgroundColor: Colors.bluetitle,
                    height: 50,
                    width: "60%",
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 30,
                  }}
                  onPress={() => {
                    props.navigation.goBack(null);
                  }}
                >
                  <Text style={styles.btnText}>Regresar</Text>
                </TouchableOpacity>
              </View>
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

const styles = {
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
  titleText: {
    fontFamily: "Cabin-Regular",
    textAlign: "center",
    color: Colors.bluetitle,
    marginBottom: 10,
    fontSize: 17,
  },
  modalDate: {
    fontFamily: "Cabin-Regular",
    textAlign: "center",
    color: Colors.bluetitle,
    marginBottom: 10,
    fontSize: 30,
  },
  btn: {
    backgroundColor: Colors.bluetitle,
    width: "60%",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
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
};

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState, { logOutAction })(PermissionDetail);
