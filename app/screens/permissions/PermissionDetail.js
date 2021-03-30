import React, { useEffect } from "react";
import { Image, Modal, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { logOutAction } from "../../redux/userDuck";
import { Colors } from "../../utils/colors";

const PermissionDetail = (props) => {
  useEffect(() => {
    console.log("Props--<> ", props.detail);
  }, [props.detail]);

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: "100%",
                position: "absolute",
                top: 0,
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
            <Text style={styles.modalText}>
              Le informamos que su solicitud de permiso con fecha de salida
            </Text>
            <Text style={styles.modalDate}>
              {props.detail && props.detail.date}
            </Text>
            <Text style={styles.modalText}>fue</Text>

            <View
              style={[
                styles.ctnStatus,
                props.detail.status == 1
                  ? styles.statusPendiente
                  : props.detail.status == 2
                  ? styles.statusAprobado
                  : styles.statusRechazado,
                ,
              ]}
            >
              <Text style={styles.status}>
                {props.detail.status == 1
                  ? "Pendiente"
                  : props.detail.status == 2
                  ? "Aprobado"
                  : "Rechazado"}
              </Text>
            </View>

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
                  props.setVisible();
                }}
              >
                <Text style={styles.modalBtnText}>Regresar</Text>
              </TouchableOpacity>
            </View>
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
    margin: 20,
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 10,
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
  modalText: {
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
  modalBtn: {
    backgroundColor: Colors.bluetitle,
    width: "60%",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  modalBtnText: {
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
