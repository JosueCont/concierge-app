import { Colors } from "../utils/colors";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

const PickerSelect = (props) => {
  return (
    <RNPickerSelect
      key={props.value}
      onValueChange={(value) => {
        props.setSelect(props.type, value);
      }}
      placeholder={{
        label: props.title,
        color: Colors.bluelinks,
      }}
      style={pickerSelectStyles}
      items={props.items}
      value={props.value}
    />
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 45,
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: Colors.bluetitle,
  },
  inputAndroid: {
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: Colors.bluetitle,
  },
  iconContainer: {
    top: "25%",
    right: 15,
  },
  placeholder: {
    fontFamily: "Cabin-Regular",
    color: Colors.bluetitle,
  },
});
export default PickerSelect;
