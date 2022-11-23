import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import { Colors } from "../../utils/colors";
import LoadingGlobal from "../../components/modal/LoadingGlobal";
import ModalCustom from "../../components/modal/ModalCustom";
import ApiApp from "../../utils/ApiApp";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const LoanCardDetail = (props) => {
  let count = 0;
  const [total, setTotal] = useState(0);
  const renderItem = ({ item, index }) => {
    if (index == 0) count = 0;
    count++;
    setTotal(index + 1);
    let ticket = `${index + 1}`;
    if (ticket.length == 2) ticket = "0" + ticket;
    if (ticket.length == 1) ticket = "00" + ticket;
    if (item.is_paid) {
      return (
        <>
          <View style={styles.ctnForm}>
            <View style={styles.ctnPart1}>
              <View
                style={{
                  width: "100%",
                  position: "absolute",
                  top: -13,
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.secondary,
                    width: 80,
                    height: 4,
                  }}
                ></View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "25%",
                    marginRight: "5%",
                  }}
                >
                  <Image
                    source={require("../../../assets/img/new/lending.png")}
                    style={{
                      width: 80,
                      height: 80,
                      resizeMode: "cover",
                      marginRight: 5,
                    }}
                  ></Image>
                </View>
                <View
                  style={{
                    width: "55%",
                    marginLeft: "5%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-start",
                        width: "50%",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Cabin-Regular",
                          color: Colors.secondary,
                          fontSize: 12,
                          paddingBottom: 10,
                        }}
                      >
                        Comprobante
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: Colors.back,
                        width: "60%",
                        borderRadius: 10,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Cabin-Regular",
                          color: Colors.secondary,
                          fontSize: 17,
                          textAlign: "center",
                        }}
                      >
                        {ticket}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "45%",
                    marginRight: "5%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Cabin-Regular",
                          color: Colors.secondary,
                          fontSize: 12,
                          paddingBottom: 10,
                        }}
                      >
                        Fecha del pago
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.back,
                        width: "100%",
                        borderRadius: 10,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Cabin-Regular",
                          color: Colors.secondary,
                          fontSize: 17,
                          textAlign: "center",
                        }}
                      >
                        {item.payment_date}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: "45%",
                    marginLeft: "5%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Cabin-Regular",
                          color: Colors.secondary,
                          fontSize: 12,
                          paddingBottom: 10,
                        }}
                      >
                        Pagos
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.back,
                        width: "100%",
                        borderRadius: 10,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Cabin-Regular",
                          color: Colors.secondary,
                          fontSize: 17,
                          textAlign: "center",
                        }}
                      >
                        {count}/{total}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "45%",
                    marginRight: "5%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Cabin-Regular",
                          color: Colors.secondary,
                          fontSize: 12,
                          paddingBottom: 10,
                        }}
                      >
                        Total abonado
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.back,
                        width: "100%",
                        borderRadius: 10,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Cabin-Regular",
                          color: Colors.secondary,
                          fontSize: 17,
                          textAlign: "center",
                        }}
                      >
                        ${item.amount * count}.00
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: "45%",
                    marginLeft: "5%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Cabin-Regular",
                          color: Colors.secondary,
                          fontSize: 12,
                          paddingBottom: 10,
                        }}
                      >
                        Saldo
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.back,
                        width: "100%",
                        borderRadius: 10,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Cabin-Regular",
                          color: Colors.secondary,
                          fontSize: 17,
                          textAlign: "center",
                        }}
                      >
                        ${item.balance}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </>
      );
    }
  };
  return (
    <SafeAreaView style={styles.containerSafe}>
      <FlatList
        style={{
          zIndex: 0,
          backgroundColor: Colors.texts,
          paddingHorizontal: 22,
        }}
        data={props.cards}
        renderItem={renderItem}
        keyExtractor={(item) => {
          if (item.id != undefined) item.id.toString();
        }}
        ListHeaderComponent={props.headerList}
        ListFooterComponent={props.footerList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
    // marginTop: 20,
  },
  container: {
    width: "100%",
    minHeight: 400,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 80,
    marginBottom: 50,
    paddingBottom: 30,
  },
  ctnPart1: {
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  ctnForm: {
    width: "100%",
    backgroundColor: Colors.white,
    paddingHorizontal: 1,
    paddingTop: 10,
    borderRadius: 10,
    marginBottom: "5%",
    marginTop: "10%",
  },
  statusPendiente: {
    backgroundColor: Colors.red,
  },
  statusAprobado: {
    backgroundColor: Colors.blue,
  },
  statusRechazado: {
    backgroundColor: Colors.black,
  },
  status: {
    fontSize: 27,
    fontFamily: "Cabin-Bold",
    color: Colors.bluetitle,
  },
  ctnStatus: {
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: Colors.bluebg,
  },
});

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(LoanCardDetail);
