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
            {props.type == 1 && (
              <>
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
              </>
            )}
            {props.type == 2 && (
              <>
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
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1}}
            onPress={() => props.goHome()}
          >
            <Image
              source={require("../../../assets/img/header.png")}
              resizeMode={"contain"}
              style={{ height: 80, width: 80 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
            onPress={() => props.clickProfile()}
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
    </View>
  );
};

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(ToolbarGeneric);
