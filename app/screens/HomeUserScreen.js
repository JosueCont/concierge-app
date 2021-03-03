import { View } from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import ModalLoading from "../components/modal/loading";

const HomeUserScreen = (props) => {
  useEffect(() => {
    // alert(props.user.loggedIn);
  }, []);
  return (
    <>{!props.user.fetching && <ModalLoading visile={props.user.fetching} />}</>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapState)(HomeUserScreen);
