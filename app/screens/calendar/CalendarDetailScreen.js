import {
  View,
  ScrollView,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import EventCard from "../../components/ComponentCards/EventCard";
import { Colors } from "../../utils/colors";
import ModalCustom from "../../components/modal/ModalCustom";
import LoadingGlobal from "../../components/modal/LoadingGlobal";
import ApiApp from "../../utils/ApiApp";
import { nameMonthSelected } from "../../utils/functions";

const CalendarDetailScreen = (props) => {
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [modalLoading, setModalLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [month, setMonth] = useState([]);

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

  useEffect(() => {
    let monthName = nameMonthSelected(
      parseInt(props.navigation.getParam("dates").substring(5, 7))
    );
    getAllEvents(props.navigation.getParam("dates"));
    setMonth(monthName);
  }, [props.navigation.getParam("dates")]);

  const getAllEvents = async (filter) => {
    try {
      let response = await ApiApp.getEvents(`?date=${filter}`);
      if (response.status == 200) {
        if (
          response.data.results != undefined &&
          response.data.results.length > 0
        ) {
          setEvents(response.data.results);
          setTimeout(() => {
            setModalLoading(false);
          }, 1000);
        } else {
          setMessageCustomModal("No se encontraron resultados.");
          setIconSourceCustomModal(3);
          setModalCustom(true);
          setModalLoading(false);
        }
      }
    } catch (error) {
      setMessageCustomModal("Ocurrio un error, intente de nuevo.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      setModalLoading(false);
    }
  };

  const headerList = () => {
    return (
      <View
        style={{
          marginTop: "2%",
          // flexDirection: "row",
          alignItems: "center",
          // paddingHorizontal: "10%",
          marginBottom: 10,
        }}
      >
        {/* <TouchableOpacity style={{ flex: 1, alignItems: "flex-start" }}>
          <AntDesign name="left" size={24} color="#47A8DE" />
        </TouchableOpacity> */}

        <View style={{ alignItems: "center" }}>
          <View
            style={{
              backgroundColor: Colors.black,
              width: 80,
              height: 80,
              borderColor: Colors.white,
              borderWidth: 6,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Cabin-Bold",
                color: Colors.white,
                fontSize: 50,
              }}
            >
              {props.navigation.getParam("dates").substring(8, 10)}
            </Text>
          </View>
          <View style={{ marginTop: 8, flexDirection: "row" }}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Cabin-Medium",
                fontSize: 16,
                color: Colors.bluetitle,
              }}
            >
              {month}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Cabin-Medium",
                fontSize: 16,
                color: Colors.bluetitle,
                marginLeft: 5,
              }}
            >
              {props.navigation.getParam("dates").substring(0, 4)}
            </Text>
          </View>
        </View>

        {/* <TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }}>
          <AntDesign name="right" size={24} color="#47A8DE" />
        </TouchableOpacity> */}
      </View>
    );
  };

  const footerList = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.bluetitle,
            height: 50,
            width: "48%",
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => clickAction()}
        >
          <Text
            style={{
              fontFamily: "Cabin-Regular",
              color: Colors.white,
              fontSize: 16,
            }}
          >
            Regresar
          </Text>
        </TouchableOpacity>
      </View>
    );
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
          nameToolbar={""}
          type={1}
          clickProfile={clickProfile}
          goHome={goHome}
        />

        <EventCard
          headerList={headerList}
          footerList={footerList}
          cards={events}
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

export default CalendarDetailScreen;
