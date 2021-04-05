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
import NewScreen from "../screens/NewScreen";
import PayrollScreen from "../screens/payroll/payrollScreen";
import PayrollDetailScreen from "../screens/payroll/payrollDetailScreen";
import CalendarScreen from "../screens/calendar/CalendarScreen";
import CalendarDetailScreen from "../screens/calendar/CalendarDetailScreen";
import HRScreen from "../screens/HRScreen";
import vacationScreen from "../screens/vacation/vacationScreen";
import VacationDetailScreen from "../screens/vacation/VacationDetailScreen";
import VacationRequestScreen from "../screens/vacation/VacationRequestScreen";
import PermissionsScreen from "../screens/permissions/PermissionsScreen";
import PermissionDetailScreen from "../screens/permissions/PermissionDetailScreen";
import PermissionRequestScreen from "../screens/permissions/PermissionRequestScreen";
import OrganizationScreen from "../screens/OrganizationScreen";
import LoanSreen from "../screens/loan/LoanSreen";
import LoanDetailScreen from "../screens/loan/LoanDetailScreen";

const LoginStack = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    RecoverPasswordScreen: RecoverPasswordScreen,
    EmailSentScreen: EmailSentScreen,
    ChangePasswordFirstTime: ChangePasswordFirstTime,
    ChangePasswordScreen: ChangePasswordScreen,
    RecoverPasswordScreen: RecoverPasswordScreen,
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
    NewScreen: NewScreen,
  },
  {
    headerMode: "none",
  }
);

const MyAccountStack = createStackNavigator(
  {
    Account: MyAccountScreen,
    ChangePasswordScreen: ChangePasswordScreen,
  },
  {
    headerMode: "none",
  }
);

const CalendarStack = createStackNavigator(
  {
    CalendarScreen: CalendarScreen,
    CalendarDetailScreen: CalendarDetailScreen,
  },
  {
    headerMode: "none",
  }
);

const PayrollStack = createStackNavigator(
  {
    PayrollScreen: PayrollScreen,
    PayrollDetailScreen: PayrollDetailScreen,
  },
  {
    headerMode: "none",
  }
);

const HrStack = createStackNavigator(
  {
    HRScreen: HRScreen,
    vacationScreen: vacationScreen,
    VacationDetailScreen: VacationDetailScreen,
    VacationRequestScreen: VacationRequestScreen,
    PermissionsScreen: PermissionsScreen,
    PermissionDetailScreen: PermissionDetailScreen,
    PermissionRequestScreen: PermissionRequestScreen,
    OrganizationScreen: OrganizationScreen,
    LoanScreen: LoanSreen,
    LoanDetailScreen: LoanDetailScreen,
  },
  {
    headerMode: "none",
  }
);

const DrawerStack = createDrawerNavigator(
  {
    Home: HomeHybridStore,
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
    CalendarScreen: {
      screen: CalendarStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    HRScreen: {
      screen: HrStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    PayrollScreen: {
      screen: PayrollStack,
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
