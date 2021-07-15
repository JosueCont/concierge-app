import React, { useEffect, useState } from "react";
import { createAppContainer } from "react-navigation";
import { HomeStack, AppNavigatorLoggedIn } from "../containers/LayoutApp";
import { useFonts } from "expo-font";
import { connect } from "react-redux";
const AppContainerLogin = createAppContainer(HomeStack);
const AppNavigatorHome = createAppContainer(AppNavigatorLoggedIn);

const Layout = (props) => {
  let [fontsLoaded] = useFonts({
    "Cabin-Bold": require("../../assets/fonts/Cabin-Bold.ttf"),
    "Cabin-BoldItalic": require("../../assets/fonts/Cabin-BoldItalic.ttf"),
    "Cabin-Italic": require("../../assets/fonts/Cabin-Italic.ttf"),
    "Cabin-Medium": require("../../assets/fonts/Cabin-Medium.ttf"),
    "Cabin-MediumItalic": require("../../assets/fonts/Cabin-MediumItalic.ttf"),
    "Cabin-Regular": require("../../assets/fonts/Cabin-Regular.ttf"),
    "Cabin-SemiBold": require("../../assets/fonts/Cabin-SemiBold.ttf"),
    "Cabin-SemiBoldItalic": require("../../assets/fonts/Cabin-SemiBoldItalic.ttf"),
  });

  if (fontsLoaded) {
    return props.user.loggedIn ? <AppNavigatorHome /> : <AppContainerLogin />;
  } else {
    return props.user.loggedIn && <AppContainerLogin />;
  }
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(Layout);
