import React, { useEffect, useState } from "react";
import { createAppContainer } from "react-navigation";
import { HomeStack, AppNavigatorLoggedIn } from "../containers/LayoutApp";
import { useFonts } from "expo-font";
import { connect } from "react-redux";
import {useSelector} from "react-redux";
const AppContainerLogin = createAppContainer(HomeStack);
const AppNavigatorHome = createAppContainer(AppNavigatorLoggedIn);

const Layout = (props) => {
    //const [loggedIn, setLoggedIn] = useState(false)
    const loggedIn = useSelector(state => state.user.loggedIn);

    useEffect(()=>{
        console.log('cambia :S ',loggedIn )
    },[loggedIn])

    return loggedIn ? <AppNavigatorHome/> : <AppContainerLogin/>;
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(Layout);
