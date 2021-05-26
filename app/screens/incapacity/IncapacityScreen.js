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
import RequestCard from "../../components/ComponentCards/RequestCard";
import { Colors } from "../../utils/colors";
import LoadingGlobal from "../../components/modal/LoadingGlobal";
import ModalCustom from "../../components/modal/ModalCustom";
import ApiApp from "../../utils/ApiApp";
import { currentMonthNumber } from "../../utils/functions";

const IncapacityScreen = (props) => {
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [incapacitys, setIncapacitys] = useState([]);
  const [monthIncapacity, setMonthIncapacity] = useState(
    new Date().toLocaleDateString().substring(0, 2)
  );
  const [yearIncapacity, setYearIncapacity] = useState(
    new Date().getFullYear()
  );
  const months = getmonths();
  const [years, setYears] = useState([]);

  useEffect(() => {
    if (props.user && props.user.userProfile) {
      const currentMonth = currentMonthNumber();
      let data = months[currentMonth];
      setMonthIncapacity(parseInt(data.value));
      generateYear();
      getIncapacityRequest();
    } else {
      props.navigation.goBack(null);
    }
  }, [props.user]);

  const generateYear = () => {
    let yearsArray = [];
    let currentYear = new Date().getFullYear();
    let startYear = currentYear - 10;
    while (startYear < currentYear) {
      startYear++;
      yearsArray.push({ label: `${startYear}`, value: startYear });
    }
    setYears(yearsArray.reverse());
  };

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

  const getIncapacityRequest = async () => {
    let filter = `?person__id=${props.user.userProfile.id}&`;
    try {
      setModalLoading(true);
      setIncapacitys([]);
      if (monthIncapacity && monthIncapacity > 0)
        filter = filter + `timestamp__month=${monthIncapacity}&`;
      else filter = filter + `timestamp__month=${month}&`;
      if (yearIncapacity && yearIncapacity > 0)
        filter = filter + `timestamp__year=${yearIncapacity}`;
      else filter = filter + `timestamp__year=${year}`;
      let response = await ApiApp.getIncapacityRequest(filter);
      if (response.status == 200) {
        if (
          response.data.results != undefined &&
          response.data.results.length > 0
        ) {
          setIncapacitys(response.data.results);
          setTimeout(() => {
            setModalLoading(false);
          }, 1500);
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
      <>
        <View
          style={{
            backgroundColor: "#006FCC",
            marginTop: 15,
            alignItems: "center",
            borderRadius: 20,
            paddingHorizontal: 35,
            paddingTop: 30,
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              borderRadius: 10,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <RNPickerSelect
              onValueChange={(value) => setMonthIncapacity(value)}
              placeholder={{
                label: "Mes",
                value: monthIncapacity,
                color: Colors.bluelinks,
              }}
              style={pickerSelectStyles}
              items={months}
            />
          </View>
          <View
            style={{
              width: "100%",
              borderRadius: 10,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <RNPickerSelect
              onValueChange={(value) => setYearIncapacity(value)}
              placeholder={{
                label: "Año",
                value: yearIncapacity,
                color: Colors.bluelinks,
              }}
              style={pickerSelectStyles}
              items={years}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{
              fontFamily: "Cabin-Regular",
              backgroundColor: Colors.bluelinks,
              height: 50,
              width: "48%",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => getIncapacityRequest()}
          >
            <Text style={{ color: Colors.white, fontSize: 16 }}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              fontFamily: "Cabin-Regular",
              backgroundColor: Colors.bluetitle,
              height: 50,
              width: "48%",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => props.navigation.navigate("IncapacityRequestScreen")}
          >
            <Text style={{ color: Colors.white, fontSize: 16 }}>Nueva</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const footerList = () => {
    return (
      <>
        {incapacitys.length > 0 && (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.bluelinks,
                height: 50,
                width: "48%",
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => props.navigation.goBack(null)}
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
        )}
      </>
    );
  };

  return (
    <>
      <View
        style={{
          height: "100%",
          zIndex: 1,
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
        <RequestCard
          props={props}
          cards={incapacitys}
          headerList={headerList}
          footerList={footerList}
          type={"incapacity"}
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: Colors.bluetitle,
  },
  inputAndroid: {
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 16,
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

export default connect(mapState)(IncapacityScreen);
