import {
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const EventCard = (props) => {
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ marginTop: 10 }}>
        <View
          style={{
            width: "100%",
            position: "absolute",
            top: -5,
            textAlign: "center",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <View
            style={{
              backgroundColor: "#47A8DE",
              width: 70,
              height: 5,
            }}
          ></View>
        </View>
        <View style={styles.item}>
          <View
            style={{
              width: "35%",
              justifyContent: "flex-start",
            }}
          >
            <Image
              source={require("../../../assets/img/icono_calendario.png")}
              style={{
                width: 45,
                height: 30,
                resizeMode: "contain",
              }}
            ></Image>
            <Text
              style={{
                marginTop: 15,
                fontFamily: "Cabin-Bold",
                fontSize: 16,
                color: Colors.bluetitle,
              }}
            >
              {item.start_time}
            </Text>
          </View>
          <View style={{ width: "65%", marginRight: 20 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{
          paddingHorizontal: 22,
        }}
        data={props.cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={props.headerList}
        ListFooterComponent={props.footerList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: Colors.white,
    width: "100%",
    marginBottom: 15,
    paddingHorizontal: 30,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontFamily: "Cabin-Bold",
    color: Colors.bluetitle,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    fontFamily: "Cabin-Regular",
    color: Colors.bluetitle,
    marginBottom: 5,
  },
});

export default EventCard;
