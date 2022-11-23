import {Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, View,} from "react-native";
import {Calendar, LocaleConfig} from "react-native-calendars";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Colors} from "../../utils/colors";
import {dayNames, dayNamesShort, monthNames, monthNamesShort,} from "../../utils/functions";
import moment from "moment";
import ApiApp from "../../utils/ApiApp";
import ModalCustom from "../../components/modal/ModalCustom";
import LoadingGlobal from "../../components/modal/LoadingGlobal";
import PickerSelect from "../../components/pickerSelect";

LocaleConfig.locales["es"] = {
  monthNames: monthNames(),
  monthNamesShort: monthNamesShort(),
  dayNames: dayNames(),
  dayNamesShort: dayNamesShort(),
  today: "Hoy",
};

LocaleConfig.defaultLocale = "es";
const windowWidth = Dimensions.get("window").width;

const CalendarScreen = (props) => {
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const dateCurrent = moment().format("YYYY-MM-DD");
  const [evento, setEvento] = useState("node__id");
  let filter = "";

  const [toDay, setToday] = useState({
    [dateCurrent]: {
      customStyles: {
        // container: {
        //   backgroundColor: Colors.bluetitle,
        //   elevation: 2,
        // },
        text: {
          color: Colors.black,
        },
      },
    },
  });

  const selectTypeEvent = [
    {
      label: "Empresa",
      value: "node__id",
    },
    {
      label: "Mis eventos",
      value: "guests",
    },
  ];

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

  const changeEvents = (type, value) => {
    setEvento(value);
    let typeFilter = "";
    let id = "";
    if (value == "guests") {
      typeFilter = value;
      id = props.user.userProfile.id;
    }
    if (value == "node__id") {
      typeFilter = value;
      id = props.user.userProfile.node;
    }
    filter = `?${typeFilter}=${id}&date_year=${dateCurrent.substring(0, 4)}`;
    getAllEvents(filter);
  };

  useEffect(() => {
    if (evento != "") {
      setModalLoading(true);
      getAllEvents(`?node__id=${props.user.userProfile.node}&date_year=${moment().format('YYYY')}`);
    }
  }, []);

  const getAllEvents = async (filter) => {
    try {
      setModalLoading(true);
      let response = await ApiApp.getEvents(filter);
      if (response.status === 200) {
        if (
          response.data.results !== undefined &&
          response.data.results.length > 0
        ) {
          const daysEvent = response.data.results;
          createMarkedsDays(daysEvent);
        } else {
          setToday({
            [dateCurrent]: {
              customStyles: {
                // container: {
                //   backgroundColor: Colors.bluetitle,
                //   elevation: 2,
                // },
                text: {
                  color: Colors.black,
                },
              },
            },
          });
          setTimeout(() => {
            setModalLoading(false);
            setMessageCustomModal("No se encontraron resultados.");
            setIconSourceCustomModal(3);
            setModalCustom(true);
          }, 1500);
        }
      }
    } catch (error) {
      setMessageCustomModal("Ocurrio un error, intente de nuevo.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      setModalLoading(false);
    }
  };

  const createMarkedsDays = (days) => {
    let cont = 0;
    let markedsDays = {};
    days.map((a) => {
      if (dateCurrent === a.date && cont === 0) {
        cont = 1;
        markedsDays[a.date] = {
          marked: true,
          dotColor: "green",
          customStyles: {
            container: {
              backgroundColor: '#75F967',
              elevation: 2,
            },
            text: {
              color: Colors.black,
            },
          },
        };
      } else if (dateCurrent != a.date) {
        markedsDays[a.date] = {
          // marked: true,
          // dotColor: "blue",
          customStyles: {
            container: {
              backgroundColor: '#75F967',
              elevation: 2,
            },
            text: {
              color: Colors.black,
            },
          },
        };
      }
    });
    if (cont === 0)
      markedsDays[dateCurrent] = {
        marked: true,
        dotColor: "blue",
        text:{
          color:Colors.red
        }
        // customStyles: {
        //   container: {
        //     backgroundColor: Colors.bluetitle,
        //     elevation: 2,
        //   },
        //   text: {
        //     color: Colors.white,
        //   },
        // },
      };
    setToday(markedsDays);
    setTimeout(() => {
      setModalLoading(false);
    }, 1000);
  };

  const openDetailDay = (date) => {
    props.navigation.navigate("CalendarDetailScreen", {
      dates: date.dateString,
    });
  };

  return (
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
        nameToolbar={"Calendario"}
        type={1}
        clickProfile={clickProfile}
        goHome={goHome}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          zIndex: 0,
          backgroundColor: Colors.texts,
          paddingHorizontal: 22,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.primary,
            marginTop: 40,
            borderRadius: 20,
            paddingHorizontal: 35,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              marginBottom: 15,
            }}
          >
            <Image
              source={require("../../../assets/img/icono_blanco_eventos.png")}
              style={{ width: 25, height: 25, resizeMode: "cover" }}
            ></Image>
            <Text
              style={{
                fontFamily: "Cabin-Bold",
                fontSize: 18,
                color: Colors.white,
                marginLeft: 10,
              }}
            >
              Eventos
            </Text>
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
              items={selectTypeEvent}
              title={"Selecciona"}
              type={1}
              setSelect={changeEvents}
              value={evento}
            />
          </View>
        </View>

        <View>
          <Calendar
            style={{
              marginTop: 30,
              borderRadius: 20,
              color: Colors.secondary
            }}
            markingType={"custom"}
            markedDates={toDay}
            monthFormat={"MMMM, yyyy"}
            theme={themeConfig}
            hideExtraDays={false}
            onDayPress={(value) => openDetailDay(value)}
          />
        </View>

        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <Image
            source={require("../../../assets/img/new/imagen_search.png")}
            style={{
              width: windowWidth * 0.3,
              height: windowWidth * 0.3,
              resizeMode: "contain",
            }}
          ></Image>
        </View>
      </ScrollView>
      <ModalCustom
        visible={modalCustom}
        text={messageCustomModal}
        iconSource={iconSourceCustomModal}
        setVisible={() => viewModalCustom(true)}
      />
      <LoadingGlobal visible={modalLoading} text={"Cargando"} />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 45,
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: Colors.bluetitle,
  },
  inputAndroid: {
    height: 45,
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

const themeConfig = {
  backgroundColor: "purple",
  calendarBackground: Colors.white,
  textSectionTitleColor: Colors.secondary,
  textSectionTitleDisabledColor: Colors.secondary,
  selectedDayBackgroundColor: "#00adf5",
  selectedDayTextColor: "#ffffff",
  todayTextColor: Colors.secondary,
  dayTextColor: Colors.secondary,
  textDisabledColor: "#d9e1e8",
  dotColor: "#00adf5",
  selectedDotColor: "#ffffff",
  arrowColor: Colors.secondary,
  disabledArrowColor: Colors.secondary,
  monthTextColor: Colors.secondary,
  indicatorColor: "blue",
  textDayFontFamily: "Cabin-Regular",
  textMonthFontFamily: "Cabin-Regular",
  textDayHeaderFontFamily: "Cabin-Bold",
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16,
};

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(CalendarScreen);
