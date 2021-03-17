import {
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  Image,
} from "react-native";
import React from "react";
import { Colors } from "../../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RequestCard = (props) => {
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ marginTop: 10 }}>
        <View
          style={{
            width: "100%",
            position: "absolute",
            top: -5,
            textAlign: "center",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <View
            style={{
              backgroundColor: "#47A8DE",
              width: 70,
              height: 5,
            }}
          ></View>
        </View>
        <View style={styles.item}>
          <View style={{ marginRight: 20, width: "60%" }}>
            <Text style={styles.titleDate}>Fecha de solicitud</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.titleStatus}>Estatus</Text>
            <View
              style={[
                styles.ctnStatus,
                item.status == "Aprobada"
                  ? styles.statusAprobado
                  : item.status == "Pendiente"
                  ? styles.statusPendiente
                  : styles.statusRechazado,
              ]}
            >
              <Text style={styles.status}>{item.status}</Text>
            </View>

            {item.status == "Aprobada" ||
              (item.status == "Rechazada" && (
                <View>
                  <Text style={styles.titlePerson}>Autorizó</Text>
                  <Text style={styles.person}>{item.person}</Text>
                </View>
              ))}
          </View>
          <View
            style={{
              flex: 1,
              width: "40%",
              justifyContent: "flex-end",
            }}
          >
            <View style={{ position: "absolute", top: 0 }}>
              <Text style={styles.titleDays}>Días solicitados</Text>
              <View style={styles.ctnDays}>
                <Text style={styles.days}>{item.days}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.ctnBtn}>
              <Text style={styles.btn}>Ver detalle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: Colors.white,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: "row",
  },
  titleDate: {
    fontSize: 14,
    fontFamily: "Cabin-Regular",
    color: Colors.bluetitle,
  },
  date: {
    fontSize: 18,
    fontFamily: "Cabin-Bold",
    color: Colors.bluetitle,
    marginTop: 5,
  },
  titleStatus: {
    fontSize: 14,
    fontFamily: "Cabin-Regular",
    color: Colors.bluetitle,
    marginTop: 10,
  },
  ctnStatus: {
    height: 30,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 5,
  },
  status: {
    fontSize: 17,
    fontFamily: "Cabin-Bold",
    color: Colors.white,
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
  titlePerson: {
    fontSize: 14,
    fontFamily: "Cabin-Regular",
    color: Colors.bluetitle,
    marginTop: 10,
  },
  person: {
    fontSize: 17,
    fontFamily: "Cabin-Bold",
    color: Colors.bluetitle,
    marginTop: 5,
  },
  titleDays: {
    fontFamily: "Cabin-Regular",
    fontSize: 14,
    color: Colors.bluetitle,
  },
  ctnDays: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bluebg,
    borderRadius: 10,
    marginTop: 5,
  },
  days: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    color: Colors.bluetitle,
  },
  ctnBtn: {
    backgroundColor: Colors.bluebg,
    height: 40,
    width: "100%",
    maxWidth: 180,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  btn: {
    fontFamily: "Cabin-Regular",
    color: Colors.bluetitle,
    fontSize: 14,
  },
});

export default RequestCard;
