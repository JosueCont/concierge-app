import {StatusBar, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Colors} from "../../utils/colors";
import LoadingGlobal from "../../components/modal/LoadingGlobal";
import ModalCustom from "../../components/modal/ModalCustom";
import ApiApp from "../../utils/ApiApp";
import {currentMonthNumber, generateYear, getmonths,} from "../../utils/functions";
import LoanCard from "../../components/ComponentCards/LoanCard";
import PickerSelect from "../../components/pickerSelect";

const LoanScreen = (props) => {
    const [modalCustom, setModalCustom] = useState(false);
    const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [loans, SetLoans] = useState([]);
  const [modalDetail, setModalDetail] = useState(false);
  const months = getmonths();
  const [monthLoan, setMonthLoan] = useState(
    months[currentMonthNumber()].value
  );
  const [yearLoan, setYearLoan] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const currentMonth = currentMonthNumber();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (props.user && props.user.userProfile) {
      setYears(generateYear());
      getLoansRequest();
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

  const viewModalDetail = () => {
    modalDetail ? setModalDetail(false) : setModalDetail(true);
  };

  const getLoansRequest = async () => {
    let filter = `?person__id=${props.user.userProfile.id}&`;
    try {
      setModalLoading(true);
      SetLoans([]);
      if (monthLoan && monthLoan > 0)
        filter = filter + `timestamp__month=${monthLoan}&`;
      else filter = filter + `timestamp__month=${currentMonth}&`;
      if (yearLoan && yearLoan > 0)
        filter = filter + `timestamp__year=${yearLoan}`;
      else filter = filter + `timestamp__year=${currentYear}`;
      let response = await ApiApp.getLoanRequest(filter);
      if (response.status == 200) {
          if (
              response.data != undefined &&
              response.data.length > 0
          ) {
              SetLoans(response.data);
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
    if (type == 1) setMonthLoan(value);
    if (type == 2) setYearLoan(value);
  };

  const headerList = () => {
    return (
      <>
        <View
          style={{
            backgroundColor: Colors.primary,
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
              value={monthLoan}
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
              value={yearLoan}
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
              backgroundColor: Colors.primary,
              height: 50,
              width: "48%",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => getLoansRequest()}
          >
            <Text style={{ color: Colors.white, fontSize: 16 }}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              fontFamily: "Cabin-Regular",
              backgroundColor: Colors.primary,
              height: 50,
              width: "48%",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => props.navigation.navigate("LoanRequestScreen")}
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
        {loans.length > 0 && (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary,
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
          nameToolbar={"Préstamos"}
          type={1}
          clickProfile={clickProfile}
          goHome={goHome}
        />

        <LoanCard
          props={props}
          clickDetail={(item) => viewModalDetail(item)}
          cards={loans}
          headerList={headerList}
          footerList={footerList}
          type={"permission"}
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

export default connect(mapState)(LoanScreen);
