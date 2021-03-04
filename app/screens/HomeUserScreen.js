import { View } from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import ModalLoadingLogin from "../components/modal/loadingLogin";

const HomeUserScreen = (props) => {
  useEffect(() => {
    // alert(props.user.loggedIn);
  }, []);
  return <></>;
};

const mapState = (state) => {
  return {
    user: state.user.userProfile,
  };
};
export default connect(mapState)(HomeUserScreen);
