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
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import HTML from "react-native-render-html";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ComunicationCard = (props) => {
  const witHtml = useWindowDimensions().width;


  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        {item.notification.category === 1 ? (
          <TouchableOpacity
            style={[
              item.is_read ? styles.reminderOpen : styles.reminderClose,
              styles.reminder,
            ]}
            onPress={() => props.modalNews({ item: item, index: index })}
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
              {item.is_read ? (
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
                Aviso
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                paddingHorizontal: 30,
                marginBottom: 20,
              }}
            >
              <Text
                style={[
                  item.is_read ? styles.textoOpen : styles.textoClose,
                  styles.textReminder,
                ]}
              >
                {item.notification.title}Hola
              </Text>
              <HTML
                source={{ html: item.notification.message }}
                contentWidth={witHtml}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={() =>
                props.props.navigation.navigate("NewScreen", {
                  image:
                    item.notification.files[0] != undefined &&
                    item.notification.files[0] != null &&
                    item.notification.files[0] != ""
                      ? item.notification.files[0].file
                      : "",
                  text: item.notification.message,
                  title: item.notification.title,
                })
              }
            >
              <View style={{ borderRadius: 10, overflow: "hidden" }}>
                <ImageBackground
                  source={{
                    uri:
                      item.notification.files[0] != undefined &&
                      item.notification.files[0] != null &&
                      item.notification.files[0] != ""
                        ? item.notification.files[0].file
                        : "",
                  }}
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
              <View
                style={{ marginTop: 20, paddingHorizontal: 10, height: 200 }}
              >
                <Text
                  style={{
                    marginBottom: 5,
                    color: Colors.bluetitle,
                    fontSize: 20,
                    fontFamily: "Cabin-Bold",
                  }}
                >
                  {item.notification.title}
                </Text>
                <HTML source={{ html: item.notification.message }} />
              </View>
            </TouchableOpacity>
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  marginBottom: 5,
                  color: Colors.bluelinks,
                  fontSize: 15,
                  fontFamily: "Cabin-Bold",
                }}
                onPress={() =>
                  props.props.navigation.navigate("NewScreen", {
                    image:
                      item.notification.files[0] != undefined &&
                      item.notification.files[0] != null &&
                      item.notification.files[0] != ""
                        ? item.notification.files[0].file
                        : "",
                    text: item.notification.message,
                    title: item.notification.title,
                  })
                }
              >
                Leer más...
              </Text>
            </View>
          </>
        )}
      </View>
    );
  };
  return (
      <FlatList
        style={{ paddingHorizontal: 22, backgroundColor: Colors.bluebg }}
        data={props.cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={() => props.refresh()}
        refreshing={props.refreshing}

        ListHeaderComponent={props.headerList}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    backgroundColor:'white'
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

export default ComunicationCard;
