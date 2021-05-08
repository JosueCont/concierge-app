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
import RNPickerSelect from "react-native-picker-select";
import ModalCalendar from "../../components/modal/Calendar";
import ApiApp from "../../utils/ApiApp";
import moment from "moment";
import LoadingGlobal from "../../components/modal/LoadingGlobal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const VacationRequestScreen = (props) => {
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [days, setDays] = useState([]);
  const [daysRequest, setDaysRequest] = useState(0);
  const [calendar, setCalendar] = useState(false);
  const [textSelected, setTextSelected] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

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
      generateDays();
    } else {
      props.navigation.goBack(null);
    }
  }, [props.user]);

  const generateDays = () => {
    let numberDay = 0;
    let arrayDays = [];
    while (numberDay < props.user.userProfile.Available_days_vacation) {
      numberDay++;
      arrayDays.push({ label: `${numberDay}`, value: numberDay });
    }
    setDays(arrayDays);
  };

  useEffect(() => {
    if (
      departureDate != "" &&
      departureDate != undefined &&
      returnDate != "" &&
      returnDate != undefined
    ) {
      const out = moment(departureDate);
      const ret = moment(returnDate);
      if (
        ret.diff(out, "days") <= props.user.userProfile.Available_days_vacation
      ) {
        setDaysRequest(ret.diff(out, "days"));
      } else {
        setMessageCustomModal(
          "Los dias solicitados no pueden ser mayor a los dias disponibles."
        );
        setIconSourceCustomModal(2);
        setModalCustom(true);
        setReturnDate("");
        setDaysRequest(0);
      }
    }
  }, [returnDate, departureDate]);

  const validateRequest = () => {
    if (
      departureDate != "" &&
      departureDate != undefined &&
      returnDate != "" &&
      returnDate != undefined
    ) {
      const data = {
        days_requested: daysRequest,
        departure_date: departureDate,
        return_date: returnDate,
        person: props.user.userProfile.id,
      };
      const out = moment(departureDate);
      const ret = moment(returnDate);
      if (daysRequest <= props.user.userProfile.Available_days_vacation) {
        setModalLoading(true);
        sendRequest(data);
      } else {
        setMessageCustomModal(
          "Los dias solicitados no pueden ser mayor a los dias disponibles."
        );
        setIconSourceCustomModal(2);
        setModalCustom(true);
      }
    } else {
      setMessageCustomModal("Seleccione una fecha de salida y retorno");
      setIconSourceCustomModal(2);
      setModalCustom(true);
    }
  };

  const sendRequest = async (data) => {
    try {
      const response = await ApiApp.vacationRequest(data);
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
          nameToolbar={"Vacaciones"}
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
          <View style={{ backgroundColor: Colors.bluebg }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ alignItems: "center", padding: 10 }}>
                <View
                  style={{
                    backgroundColor: Colors.white,
                    width: 80,
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
                      fontSize: 40,
                    }}
                  >
                    {props.user.userProfile.Available_days_vacation}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontFamily: "Cabin-Regular",
                  fontSize: 20,
                  color: Colors.bluetitle,
                  marginLeft: 20,
                }}
              >
                Días disponibles
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: Colors.bluetitle,
                borderRadius: 8,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <View
                  style={{
                    // backgroundColor: Colors.white,
                    width: 80,
                    height: 50,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Cabin-Bold",
                      color: "#FFFFFF",
                      fontSize: 30,
                    }}
                  >
                    {daysRequest}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontFamily: "Cabin-Regular",
                  fontSize: 20,
                  color: Colors.white,
                  marginLeft: 20,
                }}
              >
                Días solicitados
              </Text>
            </View>
          </View>
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
                source={require("../../../assets/img/hollidays.png")}
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
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 80,
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 17,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: Colors.bluetitle,
  },
  inputAndroid: {
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 17,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
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

export default connect(mapState)(VacationRequestScreen);
