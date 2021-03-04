import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import LoginScreen from "../screens/session/LoginScreen";
import RecoverPasswordScreen from "../screens/session/RecoverPasswordScreen";
import HomeUserScreen from "../screens/HomeUserScreen";
import SideMenu from "../components/SideMenu";
import MyAccountScreen from "../screens/MyAccountScreen";
import ChangePasswordFirstTime from "../screens/session/ChangePasswordFirstTime";
import ChangePasswordScreen from "../screens/session/ChangePasswordScreen";
import EmailSentScreen from "../screens/session/EmailSentScreen";

const LoginStack = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    RecoverPasswordScreen: RecoverPasswordScreen,
    EmailSentScreen: EmailSentScreen,
    ChangePasswordScreen: ChangePasswordScreen,
    ChangePasswordFirstTime: ChangePasswordFirstTime,
  },
  {
    headerMode: "none",
  }
);

export const HomeStack = createStackNavigator(
  {
    MyLogin: {
      screen: LoginStack,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "MyLogin",
    unmountInactiveRoutes: true,
    navigationOptions: {
      headerMode: null,
    },
  }
);

const HomeHybridStore = createStackNavigator(
  {
    Home: HomeUserScreen,
  },
  {
    headerMode: "none",
  }
);

const MyAccountStack = createStackNavigator(
  {
    Account: MyAccountScreen,
    //changePassword:PasswordScreen,
  },
  {
    headerMode: "none",
  }
);

const DrawerStack = createDrawerNavigator(
  {
    Reservar: HomeHybridStore,
  },
  {
    contentComponent: (props) => <SideMenu {...props} />,
    overlayColor: "#282f2f75",
  }
);

export const AppNavigatorLoggedIn = createStackNavigator(
  {
    Main: {
      screen: DrawerStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    ProfileScreen: {
      screen: MyAccountStack,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "Main",
    headerMode: "screen",
    unmountInactiveRoutes: true,
  }
);
