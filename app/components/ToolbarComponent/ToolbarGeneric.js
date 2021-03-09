import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../utils/colors";
import { Ionicons, Entypo } from "@expo/vector-icons";
import connect from "react-redux/lib/connect/connect";
import { State } from "react-native-gesture-handler";

const ToolbarGeneric = (props) => {
  const [photo, setPhoto] = useState(
    require("../../../assets/img/profile-default.png")
  );
  useEffect(() => {
    if (props.user && props.user.userProfile)
      props.user.userProfile.photo
        ? setPhoto({
            uri: props.user.userProfile.photo,
          })
        : setPhoto(require("../../../assets/img/profile-default.png"));
  }, [props.user]);
  const typeToolbar = (type) => {
    switch (type) {
      case 1:
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
              <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
                <Image
                  source={require("../../../assets/img/staff_evolution.png")}
                  resizeMode={"contain"}
                  style={{ height: 60, width: 60 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.clickAction();
                }}
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                }}
              >
                <Image
                  source={require("../../../assets/img/perfil.png")}
                  style={{
                    height: 60,
                    width: 60,
                    borderColor: Colors.bluelinks,
                    borderWidth: 4,
                    borderRadius: 50,
                    overflow: "hidden",
                  }}
                />
              </TouchableOpacity>
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
                <Entypo name="menu" size={30} color={Colors.bluetitle} />
                <Text
                  style={{
                    fontFamily: "Cabin-Medium",
                    marginLeft: 5,
                    color: Colors.bluelinks,
                    fontSize: 14,
                  }}
                >
                  {props.nameToolbar}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
                <Image
                  source={require("../../../assets/img/staff_evolution.png")}
                  resizeMode={"contain"}
                  style={{ height: 60, width: 60 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.clickAction();
                }}
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                }}
              >
                <Image
                  source={photo}
                  style={{
                    height: 60,
                    width: 60,
                    borderColor: Colors.bluelinks,
                    borderWidth: 4,
                    borderRadius: 50,
                    overflow: "hidden",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
        break;

      default:
        return (
          <View
            style={{
              top: Platform.OS === "ios" ? -10 : 0,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
        );
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

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(ToolbarGeneric);
