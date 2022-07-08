import {
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  Image,
  Linking,
  TouchableOpacity,
    Alert
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../utils/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProceedingsCard = (props) => {

  const goLink=async(doc)=>{
      const supported = await Linking.canOpenURL(doc.document);
      if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          Linking.openURL(doc.document)
      } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
      }

  }

  const renderItem = ({ item, index }) => {
    if (item.document_type.is_visible)
      return (
        <View style={{ margin: "5%" }}>
          <View>
            <TouchableOpacity
              style={styles.item}
              onPress={() => goLink(item)}
            >
              <Mark />
              <Image
                source={require("../../../assets/img/rh_icon_menu.png")}
                style={styles.image}
              ></Image>
              <Text style={styles.title}>{item.document_type.name}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  };

  const Mark = () => {
    return (
      <View
        style={{
          width: "100%",
          position: "absolute",
          top: 0,
          textAlign: "center",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.bluetitle,
            width: windowWidth * 0.14,
            height: 5,
          }}
        ></View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{
          paddingHorizontal: 10,
        }}
        data={props.cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={props.headerList}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    width: windowWidth * 0.37,
    height: windowWidth * 0.37,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Cabin-Regular",
    fontSize: 18,
    color: Colors.bluetitle,
    textAlign: "center",
    marginTop: 15,
  },
});

export default ProceedingsCard;
