import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import RequestCard from "../../components/ComponentCards/RequestCard";
import { Colors } from "../../utils/colors";
import LoadingGlobal from "../../components/modal/LoadingGlobal";
import ModalCustom from "../../components/modal/ModalCustom";
import ApiApp from "../../utils/ApiApp";
import {
  currentMonthNumber,
  generateYear,
  getmonths,
} from "../../utils/functions";
import PickerSelect from "../../components/pickerSelect";

const vacationScreen = (props) => {
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [vacations, setVacations] = useState([]);
  const months = getmonths();
  const [monthVacation, setMonthVacation] = useState(
    months[currentMonthNumber()].value
  );
  const [yearVacation, setYearVacation] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const currentMonth = currentMonthNumber();
  const currentYear = new Date().getFullYear();
  const [fake, setFake] = useState(null);
  useEffect(() => {
    if (props.user && props.user.userProfile) {
      setYears(generateYear());
      getVacationsRequest();
    } else {
      props.navigation.goBack(null);
    }
  }, [props.user]);

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

  const getVacationsRequest = async () => {
    let filter = `?person__id=${props.user.userProfile.id}&`;
    try {
      setModalLoading(true);
      setVacations([]);
      if (monthVacation && monthVacation > 0)
        filter = filter + `departure_date__month=${monthVacation}&`;
      else filter = filter + `departure_date__month=${currentMonth}&`;
      if (yearVacation && yearVacation > 0)
        filter = filter + `departure_date__year=${yearVacation}`;
      else filter = filter + `departure_date__year=${currentYear}`;
      let response = await ApiApp.getVacationRequest(filter);
      if (response.status == 200) {
        if (
          response.data.results != undefined &&
          response.data.results.length > 0
        ) {
          setVacations(response.data.results);
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
      setTimeout(() => {
        setModalLoading(false);
      }, 1500);
    }
  };

  const setPicker = async (type, value) => {
    if (type == 1) setMonthVacation(value);
    if (type == 2) setYearVacation(value);
  };

  const headerList = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: Colors.white,
                width: 70,
                height: 70,
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
            <PickerSelect
              items={months}
              title={"Mes"}
              type={1}
              setSelect={setPicker}
              value={monthVacation}
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
            <PickerSelect
              items={years}
              title={"Año"}
              type={2}
              setSelect={setPicker}
              value={yearVacation}
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
            onPress={() => getVacationsRequest()}
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
            onPress={() => props.navigation.navigate("VacationRequestScreen")}
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
        {vacations.length > 0 && (
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
          nameToolbar={"Vacaciones"}
          type={1}
          clickProfile={clickProfile}
          goHome={goHome}
        />
        <RequestCard
          props={props}
          cards={vacations}
          headerList={headerList}
          footerList={footerList}
          type={"vacation"}
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

export default connect(mapState)(vacationScreen);
