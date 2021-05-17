import React from "react";
import { createAppContainer } from "react-navigation";
import { HomeStack, AppNavigatorLoggedIn } from "../containers/LayoutApp";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import { connect } from "react-redux";
import LoadingScreen from "../components/modal/LoadingGlobal";
const AppContainerLogin = createAppContainer(HomeStack);
const AppNavigatorHome = createAppContainer(AppNavigatorLoggedIn);

const Layout = (props) => {
  let [fontsLoaded] = useFonts({
    "Cabin-Regular": require("../../assets/fonts/Cabin-Regular.ttf"),
    "Cabin-Medium": require("../../assets/fonts/Cabin-Medium.ttf"),
    "Cabin-SemiBold": require("../../assets/fonts/Cabin-SemiBold.ttf"),
    "Cabin-Bold": require("../../assets/fonts/Cabin-Bold.ttf"),
  });

  if (fontsLoaded) {
    return props.user.loggedIn ? <AppNavigatorHome /> : <AppContainerLogin />;
  } else {
    return props.user.loggedIn && <AppContainerLogin />;

    //return <LoadingScreen text={"Cargando"} />;
  }
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(Layout);
