import {
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  Image,
  StatusBar,
  ImageBackground,
  useColorScheme,
} from "react-native";
import React from "react";
import { Colors } from "../../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ComponentCards = (props) => {
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        {item.type === 1 ? (
          <TouchableOpacity onPress={()=> props.navigation.navigate("NewScreen")}>
            <View style={{ borderRadius: 10, overflow: "hidden" }}>
              <ImageBackground
                source={{ uri: item.image }}
                style={{
                  width: "100%",
                  height: windowWidth / 2.2,
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.bluetitle,
                    width: 170,
                    height: 48,
                    top: 15,
                    left: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    borderRadius: 8,
                  }}
                >
                  <Image
                    source={require("../../../assets/img/icono_noticia.png")}
                    style={{ width: 25, height: 25 }}
                  ></Image>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: "Cabin-Bold",
                      color: Colors.white,
                      fontSize: 18,
                    }}
                  >
                    Noticia
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
              <Text
                style={{
                  marginBottom: 5,
                  color: Colors.bluetitle,
                  fontSize: 20,
                  fontFamily: "Cabin-Bold",
                }}
              >
                {" "}
                {item.name}{" "}
              </Text>
              <Text
                style={{
                  marginBottom: 20,
                  color: Colors.bluetitle,
                  fontSize: 18,
                  fontFamily: "Cabin-Regular",
                }}
              >
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              item.open ? styles.reminderOpen : styles.reminderClose,
              styles.reminder,
            ]}
          >
            <View
              style={{
                backgroundColor: Colors.bluetitle,
                width: 170,
                height: 48,
                marginTop: 15,
                marginLeft: 10,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
                borderRadius: 8,
              }}
            >
              {item.open ? (
                <Image
                  source={require("../../../assets/img/icono_recordatorio_azul.png")}
                  style={{ width: 25, height: 25 }}
                ></Image>
              ) : (
                <Image
                  source={require("../../../assets/img/icono_recordatorio_rojo.png")}
                  style={{ width: 25, height: 25 }}
                ></Image>
              )}
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "Cabin-Bold",
                  color: Colors.white,
                  fontSize: 18,
                }}
              >
                Recordatorio
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                paddingHorizontal: 30,
                marginBottom: 20,
              }}
            >
              <Text
                style={[
                  item.open ? styles.textoOpen : styles.textoClose,
                  styles.textReminder,
                ]}
              >
                {item.description}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Cabin-Regular",
                  color: "#08B9FF",
                }}
                onPress={() => Linking.openURL("http://google.com")}
              >
                {item.url}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.cards}
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
    marginBottom: 15,
    padding: 12,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  reminderOpen: {
    backgroundColor: Colors.white,
  },
  reminderClose: {
    backgroundColor: "#006FCC",
  },
  reminder: {
    borderRadius: 10,
  },
  textoOpen: {
    color: Colors.bluetitle,
  },
  textoClose: {
    color: Colors.white,
  },
  textReminder: {
    fontSize: 18,
    fontFamily: "Cabin-Regular",
  },
});

export default ComponentCards;
