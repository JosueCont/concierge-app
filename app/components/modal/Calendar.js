import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import React, { useEffect, useState } from "react";
import { Colors } from "../../utils/colors";
import { Modal, Text, View, TouchableOpacity } from "react-native";
import moment from "moment";

const ModalCalendar = ({
  visible,
  departureDate,
  returnDate,
  setVisible,
  textSelected,
}) => {

  const [daySelectedOut, setDaySelectedOut] = useState(null);
  const [daySelectedReturn, setDaySelectedReturn] = useState(null);
  
  const dateCurrent = moment().format("YYYY-MM-DD");
  const toDay = {
    [daySelectedOut?.dateString]: {
      customStyles: {
        container: {
          backgroundColor: Colors.primary,
          elevation: 2,
        },
        text: {
          color: Colors.white,
        },
      },
    },
    [daySelectedReturn?.dateString]:{
      customStyles: {
        container: {
          backgroundColor: Colors.primary,
          elevation: 2,
        },
        text: {
          color: Colors.white,
        },
      },
    }
  };

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

  const clickDay = (day) => {
    if (textSelected == "out"){ 
      departureDate(day.dateString);
      setDaySelectedOut(day);
    }
    if (textSelected == "return") {
      returnDate(day.dateString)
      setDaySelectedReturn(day);
    }
    setVisible();
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Calendar
              markingType={"custom"}
              markedDates={toDay}
              monthFormat={"MMMM, yyyy"}
              theme={themeCalaendar}
              onDayPress={(day) => {
                clickDay(day);
              }}
            />
            <TouchableOpacity
              style={{
                fontFamily: "Cabin-Regular",
                backgroundColor: Colors.primary,
                height: 50,
                width: "45%",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
                margin: 10,
              }}
              onPress={() => setVisible()}
            >
              <Text style={{ color: Colors.white, fontSize: 16 }}>
                Regresar
              </Text>
            </TouchableOpacity>
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
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: 20,
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
};

const themeCalaendar = {
  backgroundColor: "purple",
  calendarBackground: Colors.white,
  textSectionTitleColor: Colors.secondary,
  textSectionTitleDisabledColor: Colors.secondary,
  selectedDayBackgroundColor: Colors.white,
  selectedDayTextColor: Colors.primary,
  todayTextColor: Colors.secondary,
  dayTextColor: Colors.secondary,
  textDisabledColor: "#d9e1e8",
  dotColor: Colors.primary,
  // selectedDotColor: Colors.primary,
  arrowColor: Colors.secondary,
  disabledArrowColor: Colors.secondary,
  monthTextColor: Colors.secondary,
  indicatorColor: Colors.secondary,
  textDayFontFamily: "Cabin-Regular",
  textMonthFontFamily: "Cabin-Regular",
  textDayHeaderFontFamily: "Cabin-Bold",
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16,
};

export default ModalCalendar;
