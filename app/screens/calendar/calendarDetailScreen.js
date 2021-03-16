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
import EventCard from "../../components/ComponentCards/EventCard";
import { Colors } from "../../utils/colors";

const myArray = [
  {
    id: 1,
    title: "Evento 1",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh, euismod tincidunt",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Evento 2",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh, euismod tincidunt",
    time: "10:00 AM",
  },
];

const CalendarDetailScreen = (props) => {
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
            marginTop: 30,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: "10%",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity style={{ flex: 1, alignItems: "flex-start" }}>
            <AntDesign name="left" size={24} color="#47A8DE" />
          </TouchableOpacity>

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
                16
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
                Febrero
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
                2021
              </Text>
            </View>
          </View>

          <TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }}>
            <AntDesign name="right" size={24} color="#47A8DE" />
          </TouchableOpacity>
        </View>
        <EventCard cards={myArray} />
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
          >
            <Text
              style={{
                fontFamily: "Cabin-Regular",
                color: Colors.white,
                fontSize: 16,
              }}
            >
              Aceptar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CalendarDetailScreen;
