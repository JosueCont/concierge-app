import { Colors } from "../utils/colors";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View } from "native-base";

const PickerSelect = (props) => {
  return (
    <View style={{ backgroundColor: Colors.white, borderRadius: 10 }}>
      <RNPickerSelect
        key={props.value}
        onValueChange={(value) => {
          props.setSelect(props.type, value);
        }}
        placeholder={{
          label: props.title,
          value:'',
          color: Colors.secondary,
        }}
        style={pickerSelectStyles}
        items={props.items}
        value={props.value}
      />
    </View>
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
    color: Colors.secondary,
  },
  inputAndroid: {
    height: 45,
    width:250,
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: Colors.secondary,
  },
  iconContainer: {
    top: "25%",
    right: 15,
  },
  placeholder: {
    fontFamily: "Cabin-Regular",
    color: Colors.secondary,
  },
});
export default PickerSelect;
