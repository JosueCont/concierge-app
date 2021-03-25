import {
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  Image,
} from "react-native";
import React from "react";
import { Colors } from "../../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PayrollCard = (props) => {
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
              marginRight: 20,
            }}
          >
            <Image
              source={require("../../../assets/img/icono_nomina.png")}
              style={{
                width: 45,
                height: 30,
                resizeMode: "contain",
              }}
            ></Image>
          </View>
          <View style={{ marginRight: 20 }}>
            <Text style={styles.title}>Nomina</Text>
            <Text style={styles.amount}>{item.amount}</Text>
            <Text style={styles.date}>{item.payment_date}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: Colors.bluebg,
                height: 40,
                width: "100%",
                maxWidth: 180,
                borderRadius: 10,
                marginTop: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                props.props.navigation.navigate("PayrollDetailScreen", {
                  id: item.id,
                })
              }
            >
              <Text
                style={{
                  fontFamily: "Cabin-Regular",
                  color: Colors.bluetitle,
                  fontSize: 16,
                }}
              >
                {" "}
                Ver detalle{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.vouchers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: Colors.white,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 20,
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
  amount: {
    fontSize: 18,
    fontFamily: "Cabin-Bold",
    color: Colors.bluetitle,
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    fontFamily: "Cabin-Regular",
    color: Colors.bluetitle,
  },
});

export default PayrollCard;
