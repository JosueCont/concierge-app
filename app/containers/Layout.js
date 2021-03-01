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
        'Cabin-Regular': require('../../assets/fonts/Cabin-Regular.ttf'),
        'Cabin-Medium': require('../../assets/fonts/Cabin-Medium.ttf'),
        'Cabin-SemiBold': require('../../assets/fonts/Cabin-SemiBold.ttf'),
        'Cabin-Bold': require('../../assets/fonts/Cabin-Bold.ttf'),
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
