import React, { useEffect } from "react";
import { View, ScrollView, Text, StatusBar } from "react-native";
import ToolbarGeneric from "../components/ToolbarComponent/ToolbarGeneric";
import { connect } from "react-redux";

const MyAccountScreen = (props) => {
  const clickAction = () => {
    props.navigation.navigate("HomeUserScreen");
  };

  useEffect(() => {}, [props.user]);

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
        nameToolbar={"Mi Cuenta"}
        type={2}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          zIndex: 0,
        }}
      >
        <Text>{props.user.email}</Text>
      </ScrollView>
    </View>
  );
};

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(MyAccountScreen);
