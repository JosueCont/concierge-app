import React from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../utils/colors";
import { Ionicons, Entypo } from "@expo/vector-icons";
const ToolbarGeneric = (props) => {
  const typeToolbar = (type) => {
    switch (type) {
      case 1:
        return (
          <View style={{ alignItems: "center", width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
                top: 20,
              }}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    props.clickAction();
                  }}
                >
                  <Image
                    source={require("../../../assets/img/staff_concierge.png")}
                    resizeMode={"contain"}
                    style={{ height: 80, width: 80 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
        break;

      case 2:
        return (
          <View style={{ alignItems: "center", width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "90%",
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                onPress={() => {
                  props.clickAction();
                }}
              >
                <Ionicons
                  name="ios-arrow-back"
                  size={30}
                  color={Colors.bluetitle}
                />
                <Text
                  style={{
                    fontFamily: "Cabin-Medium",
                    marginLeft: 10,
                    color: Colors.bluelinks,
                    fontSize: 14,
                  }}
                >
                  {props.nameToolbar}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1, alignItems: "center" }}
                onPress={() => {
                  props.clickAction();
                }}
              >
                <Image
                  source={require("../../../assets/img/staff_concierge.png")}
                  resizeMode={"contain"}
                  style={{ height: 80, width: 80 }}
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                }}
              ></View>
            </View>
          </View>
        );
        break;

      default:
        <View
          style={{
            top: Platform.OS === "ios" ? -10 : 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>;
        break;
    }
  };
  return (
    <View
      style={{
        height: "16%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
      }}
    >
      {typeToolbar(props.type)}
    </View>
  );
};
export default ToolbarGeneric;
