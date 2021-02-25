import React from "react";
import {createAppContainer} from "react-navigation";
import {HomeStack,AppNavigatorLoggedIn} from '../containers/LayoutApp'
import {useFonts} from 'expo-font';
import {Text} from "react-native";
import {connect} from "react-redux";
const AppContainer = createAppContainer(HomeStack);
const AppNavigatorLoggedInA = createAppContainer(AppNavigatorLoggedIn);


const Layout = (props) => {
    console.log('Render layout')

    let [fontsLoaded] = useFonts({
        'Linotte_Light': require('../../assets/fonts/Linotte-Light.ttf'),
        'Linotte_Regular': require('../../assets/fonts/Linotte-Regular.ttf'),
        'Linotte_Semibold': require('../../assets/fonts/Linotte-Semi-Bold.ttf'),
        'Linotte_Bold': require('../../assets/fonts/Linotte-Bold.ttf'),
    });


    if (fontsLoaded) {
        return (
            props.user.loggedIn ?
            <AppNavigatorLoggedInA/>
                :
            <AppContainer/>
        );
    } else {
        return (
            <Text>Cargando..</Text>
        )
    }
};

const mapState = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapState)(Layout)
