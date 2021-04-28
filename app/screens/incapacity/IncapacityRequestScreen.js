import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import ModalCustom from "../../components/modal/ModalCustom";
import { Colors } from "../../utils/colors";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import ModalCalendar from "../../components/modal/Calendar";
import ApiApp from "../../utils/ApiApp";
import LoadingGlobal from "../../components/modal/LoadingGlobal";
import * as DocumentPicker from "expo-document-picker";
import * as mime from "react-native-mime-types";
import { AntDesign } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const IncapacityRequestScreen = (props) => {
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [calendar, setCalendar] = useState(false);
  const [textSelected, setTextSelected] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [documentName, setDocumentName] = useState("false");
  const [png, setPng] = useState(false);
  const [document, setDocument] = useState(false);
  const [file, setFile] = useState({});

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

  const viewModalCalendar = (text) => {
    if (text && text != undefined) {
      setTextSelected(text);
    }
    calendar ? setCalendar(false) : setCalendar(true);
  };

  useEffect(() => {
    if (props.user && props.user.userProfile) {
    } else {
      clickAction();
    }
  }, [props.user]);

  const chargerDocumnet = async () => {
    setDocument(false);
    setPng(false);
    setFile({});
    const result = await DocumentPicker.getDocumentAsync();
    setDocumentName(result.name);
    if (
      result.name.search("png") != -1 ||
      result.name.search("jpg") != -1 ||
      result.name.search("jpeg") != -1
    ) {
      setPng(true);
    } else {
      setDocument(true);
    }
    result.type = mime.lookup(result.uri.split("/").pop());
    if (result.cancelled != "cancel") {
      setFile({
        uri: result.uri,
        name: result.uri.split("/").pop(),
        type: result.type,
      });
    }
  };

  const validateRequest = () => {
    if (
      departureDate != "" &&
      departureDate != undefined &&
      returnDate != "" &&
      returnDate != undefined
    ) {
      if (file.uri) {
        setModalLoading(true);
        let data = new FormData();
        data.append("departure_date", departureDate);
        data.append("return_date", returnDate);
        data.append("person", props.user.userProfile.id);
        data.append("document", file);
        sendRequest(data);
      } else {
        setMessageCustomModal("Debe cargar un documento.");
        setIconSourceCustomModal(2);
        setModalCustom(true);
      }
    } else {
      setMessageCustomModal("Seleccione una fecha de salida y retorno.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
    }
  };

  const sendRequest = async (data) => {
    try {
      const response = await ApiApp.incapacityRequest(data);
      if (response.data && response.data.id) {
        setMessageCustomModal(
          "Hemos enviado la solicitud, pronto recibiras una notificación con la respuesta a la solicitud realizada."
        );
        setIconSourceCustomModal(4);
        setModalCustom(true);
        setModalLoading(false);
        setTimeout(() => {
          props.navigation.goBack(null);
        }, 2000);
      } else {
        setMessageCustomModal("Ocurrio un error, intente de nuevo.");
        setIconSourceCustomModal(2);
        setModalCustom(true);
        setModalLoading(false);
      }

      setModalLoading(false);
    } catch (error) {
      setMessageCustomModal("Ocurrio un error, intente de nuevo.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      setTimeout(() => {
        setModalLoading(false);
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
            zIndex: 0,
            paddingHorizontal: 22,
          }}
        >
          <View style={styles.container}>
            <View
              style={{
                with: "100%",
                alignItems: "center",
                position: "absolute",
                top: -55,
                right: 0,
                left: 0,
              }}
            >
              <Image
                source={require("../../../assets/img/rh.png")}
                style={{ width: 110, height: 110, resizeMode: "cover" }}
              ></Image>
            </View>
            <View style={{ marginTop: 80 }}>
              <Text style={{ marginBottom: 10, color: Colors.bluetitle }}>
                Fecha de salida
              </Text>
              <Text
                style={styles.input}
                placeholderTextColor={Colors.bluetitle}
                underlineColorAndroid={"transparent"}
                onPress={() => viewModalCalendar("out")}
              >
                {departureDate}
              </Text>
              <Text style={{ marginBottom: 10, color: Colors.bluetitle }}>
                Fecha de retorno
              </Text>
              <Text
                style={styles.input}
                placeholderTextColor={Colors.bluetitle}
                underlineColorAndroid={"transparent"}
                onPress={() => viewModalCalendar("return")}
              >
                {returnDate}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
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
                      color: Colors.bluetitle,
                      paddingBottom: 10,
                    }}
                  >
                    Documento de incapacidad
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={styles.input}
                    placeholderTextColor={Colors.bluetitle}
                    underlineColorAndroid={"transparent"}
                    onPress={() => chargerDocumnet()}
                  >
                    <AntDesign
                      name="upload"
                      size={24}
                      color={Colors.bluelinks}
                    />
                  </Text>
                </View>
              </View>
              <View
                style={{
                  // flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {png ? (
                  <View style={styles.item}>
                    <Image
                      source={file}
                      style={{
                        height: 300,
                        width: 250,
                      }}
                    />
                  </View>
                ) : (
                  document && (
                    <>
                      <View style={styles.item}>
                        <Image
                          source={require("../../../assets/img/incapacidad.png")}
                          style={{
                            height: 100,
                            width: 100,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          fontFamily: "Cabin-Regular",
                          fontSize: 16,
                          color: Colors.bluetitle,
                        }}
                      >
                        {documentName}
                      </Text>
                    </>
                  )
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
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
                }}
                onPress={() => clickAction()}
              >
                <Text style={{ color: Colors.white, fontSize: 16 }}>
                  Regresar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  fontFamily: "Cabin-Regular",
                  backgroundColor: Colors.bluelinks,
                  height: 50,
                  width: "45%",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 5,
                }}
                onPress={() => validateRequest()}
              >
                <Text style={{ color: Colors.white, fontSize: 16 }}>
                  Enviar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
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
      <ModalCustom
        visible={modalCustom}
        text={messageCustomModal}
        iconSource={iconSourceCustomModal}
        setVisible={() => viewModalCustom(true)}
      />
      <ModalCalendar
        visible={calendar}
        departureDate={(date) => setDepartureDate(date)}
        returnDate={(date) => setReturnDate(date)}
        setVisible={() => viewModalCalendar()}
        textSelected={textSelected}
      />
      <LoadingGlobal visible={modalLoading} text={"Enviando"} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 350,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 80,
    marginBottom: 30,
  },
  input: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    color: Colors.bluetitle,
    width: "100%",
    borderColor: Colors.bluelinks,
    borderWidth: 1,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
  },
  inputComment: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    color: Colors.bluetitle,
    width: "100%",
    height: 100,
    borderColor: Colors.bluelinks,
    borderWidth: 1,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.bluebg,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.bluelinks,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 80,
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 17,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    color: Colors.bluetitle,
  },
  inputAndroid: {
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 17,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    color: Colors.bluetitle,
  },
  iconContainer: {
    top: "25%",
    right: 15,
  },
  placeholder: {
    fontFamily: "Cabin-Regular",
    color: Colors.bluetitle,
  },
});

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(IncapacityRequestScreen);
