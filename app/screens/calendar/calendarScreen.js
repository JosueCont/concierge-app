import {
  View,
  ScrollView,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { AntDesign } from "@expo/vector-icons";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Colors } from "../../utils/colors";

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["D", "L", "M", "M", "J", "V", "S"],
  today: "Hoy",
};

LocaleConfig.defaultLocale = "es";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const general = [
  {
    label: "Por departamento",
    value: "departamento",
  },
  {
    label: "Sucursal",
    value: "sucursal",
  },
  {
    label: "Mis eventos",
    value: "eventos",
  },
];

const CalendarScreen = (props) => {
  const clickAction = () => {
    props.navigation.goBack(null);
  };

  const clickProfile = () => {
    props.navigation.navigate("ProfileScreen");
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
      {/* Toolbar componenet para mostar el datos del usuario*/}
      <ToolbarGeneric
        clickAction={clickAction}
        nameToolbar={"Calendario"}
        type={1}
        clickProfile={clickProfile}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          zIndex: 0,
          backgroundColor: Colors.bluebg,
          paddingHorizontal: 22,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.dark,
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
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              placeholder={{
                label: "Generales",
                value: "null",
                color: Colors.bluelinks,
              }}
              style={pickerSelectStyles}
              items={general}
              Icon={() => {
                return (
                  <AntDesign name="down" size={24} color={Colors.bluetitle} />
                );
              }}
            />
          </View>
        </View>

        <Calendar
          style={{
            marginTop: 30,
            borderRadius: 20,
            overflow: "hidden",
            fontFamily: "Cabin-Regular",
          }}
          markingType={"custom"}
          markedDates={{
            "2021-03-16": {
              customStyles: {
                container: {
                  backgroundColor: Colors.bluetitle,
                  elevation: 2,
                },
                text: {
                  color: Colors.white,
                },
              },
            },
          }}
          monthFormat={"MMMM, yyyy"}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{
            backgroundColor: "purple",
            calendarBackground: Colors.white,
            textSectionTitleColor: Colors.bluetitle,
            textSectionTitleDisabledColor: Colors.bluetitle,
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#ffffff",
            todayTextColor: Colors.bluelinks,
            dayTextColor: Colors.bluetitle,
            textDisabledColor: "#d9e1e8",
            dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            arrowColor: Colors.bluelinks,
            disabledArrowColor: Colors.bluelinks,
            monthTextColor: Colors.bluetitle,
            indicatorColor: "blue",
            textDayFontFamily: "Cabin-Regular",
            textMonthFontFamily: "Cabin-Regular",
            textDayHeaderFontFamily: "Cabin-Bold",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />

        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <Image
            source={require("../../../assets/img/imagen_calendario.png")}
            style={{
              width: windowWidth * 0.8,
              height: windowWidth * 0.7,
              resizeMode: "contain",
            }}
          ></Image>
        </View>
      </ScrollView>
    </View>
  );
};

const mapState = (state) => {
  return {
    user: state.user.userProfile,
  };
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 45,
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    color: Colors.bluetitle,
  },
  inputAndroid: {
    height: 45,
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 16,
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

export default CalendarScreen;
