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
import React, { useEffect } from "react";
import { connect } from "react-redux";
import ComunicationCard from "../../components/ComponentCards/PayrollCard";
import { Colors } from "../../utils/colors";

const myArray = [
  {
    id: 1,
    amount: "$15,000 MXN",
    date: "31 Agosto 2020",
  },
  {
    id: 2,
    amount: "$15,000 MXN",
    date: "15 Agosto 2020",
  },
];

const months = [
  {
    label: "Enero",
    value: "enero",
  },
  {
    label: "Febrero",
    value: "febrero",
  },
  {
    label: "Marzo",
    value: "marzo",
  },
  {
    label: "Abril",
    value: "abril",
  },
  {
    label: "Mayo",
    value: "mayo",
  },
  {
    label: "Junio",
    value: "junio",
  },
  {
    label: "Julio",
    value: "julio",
  },
  {
    label: "Agosto",
    value: "agosto",
  },
  {
    label: "Septiembre",
    value: "septiembre",
  },
  {
    label: "Octubre",
    value: "octubre",
  },
  {
    label: "Noviembre",
    value: "noviembre",
  },
  {
    label: "Diciembre",
    value: "diciembre",
  },
];

const years = [
  {
    label: "2019",
    value: "2019",
  },
  {
    label: "2020",
    value: "2020",
  },
  {
    label: "2021",
    value: "2021",
  },
];

const PayrollScreen = (props) => {
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
        nameToolbar={"Mi Nómina"}
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
            alignItems: "center",
            borderRadius: 20,
            paddingHorizontal: 35,
            paddingTop: 30,
            paddingBottom: 30,
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
              onValueChange={(value) => console.log(value)}
              placeholder={{
                label: "Mes",
                value: "null",
                color: Colors.bluelinks,
              }}
              style={pickerSelectStyles}
              items={months}
              Icon={() => {
                return (
                  <AntDesign name="down" size={24} color={Colors.bluetitle} />
                );
              }}
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
              onValueChange={(value) => console.log(value)}
              placeholder={{
                label: "Año",
                value: "null",
                color: Colors.bluelinks,
              }}
              style={pickerSelectStyles}
              items={years}
              Icon={() => {
                return (
                  <AntDesign name="down" size={24} color={Colors.bluetitle} />
                );
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#47A8DE",
                height: 50,
                width: 160,
                borderRadius: 10,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Cabin-Regular",
                  color: Colors.white,
                  fontSize: 18,
                }}
              >
                Buscar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ComunicationCard cards={myArray} />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.bluetitle,
              height: 50,
              width: "48%",
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
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
      </ScrollView>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    color: Colors.bluetitle,
  },
  inputAndroid: {
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

export default PayrollScreen;
