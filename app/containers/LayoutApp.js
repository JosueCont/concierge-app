import React from 'react'
import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator} from "react-navigation-drawer";
import LoginScreen from "../screens/session/LoginScreen";
import RecoverPasswordScreen from "../screens/session/RecoverPasswordScreen";
import HomeUserScreen from "../screens/HomeUserScreen";
import SideMenu from "../components/SideMenu";


const LoginStack = createStackNavigator({
    LoginScreen: LoginScreen,
    RecoverPasswordScreen: RecoverPasswordScreen,
}, {
    headerMode: 'none',
});

export const HomeStack = createStackNavigator({
        MyLogin: {
            screen: LoginStack,
            navigationOptions: {
                headerShown: false
            }
        },
    },
    {
        initialRouteName: 'MyLogin',
        unmountInactiveRoutes: true,
        navigationOptions: {
            headerMode: null
        }
    }
);

const HomeHybridStore = createStackNavigator(
    {
        Home: HomeUserScreen,
    },
    {
        headerMode: 'none',
    }
);

const DrawerStack = createDrawerNavigator({
        'Reservar': HomeHybridStore,
    },
    {
        contentComponent: props => <SideMenu {...props}/>,
        overlayColor: '#282f2f75'
    }
);

export const AppNavigatorLoggedIn = createStackNavigator(
    {
        Main: {
            screen: DrawerStack,
            navigationOptions: {
                headerShown: false
            }
        },

    },
    {
        initialRouteName: 'Main',
        headerMode: "screen",
        unmountInactiveRoutes: true,
    }
);
