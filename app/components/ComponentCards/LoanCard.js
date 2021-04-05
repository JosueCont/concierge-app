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

const LoanCard = (props) => {
  const clickDetail = (item) => {
    props.props.navigation.navigate("LoanDetailScreen", {
      id: item.id,
    });
  };

  const renderItem = ({ item, index }) => {
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
                  backgroundColor: Colors.bluetitle,
                  width: 80,
                  height: 4,
                }}
              ></View>
            </View>

            <View
              style={{
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "Cabin-Regular",
                  color: Colors.bluetitle,
                  fontSize: 18,
                }}
              >
                Fecha de solicitud
              </Text>
              <Text
                style={{
                  fontFamily: "Cabin-Regular",
                  color: Colors.bluetitle,
                  fontSize: 15,
                  marginBottom: "5%",
                }}
              >
                {item.timestamp.substring(0, 10)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
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
                    color: Colors.bluetitle,
                    fontSize: 12,
                    paddingBottom: 10,
                  }}
                >
                  Estatus
                </Text>
              </View>
            </View>

            <View style={[styles.ctnStatus]}>
              <Text style={styles.status}>
                {item.status == 1
                  ? "Pendiente"
                  : item.status == 2
                  ? "Aprobado"
                  : item.status == 3
                  ? "Rechazado"
                  : "Pagado"}
              </Text>
            </View>

            <View>
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
                      color: Colors.bluetitle,
                      fontSize: 12,
                      paddingBottom: 10,
                    }}
                  >
                    Cantidad solcitada{" "}
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
                    backgroundColor: Colors.bluebg,
                    width: "100%",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Cabin-Regular",
                      color: "#006FCC",
                      fontSize: 17,
                      textAlign: "justify",
                    }}
                  >
                    ${item.amount} MXN
                  </Text>
                </View>
              </View>
            </View>

            <View>
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
                      color: Colors.bluetitle,
                      fontSize: 12,
                      paddingBottom: 10,
                    }}
                  >
                    Periocidad
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
                    backgroundColor: Colors.bluebg,
                    width: "100%",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Cabin-Regular",
                      color: "#006FCC",
                      fontSize: 17,
                      textAlign: "justify",
                    }}
                  >
                    {item.periodicity == 1
                      ? "Semanal"
                      : item.periodicity == 2
                      ? "Catorcenal"
                      : item.periodicity == 3
                      ? "Quincenal"
                      : "Mensual"}
                  </Text>
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
                        color: Colors.bluetitle,
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
                      backgroundColor: Colors.bluebg,
                      width: "100%",
                      borderRadius: 10,
                      padding: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Cabin-Regular",
                        color: "#006FCC",
                        fontSize: 17,
                        textAlign: "justify",
                      }}
                    ></Text>
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
                        color: Colors.bluetitle,
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
                      backgroundColor: Colors.bluebg,
                      width: "100%",
                      borderRadius: 10,
                      padding: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Cabin-Regular",
                        color: "#006FCC",
                        fontSize: 17,
                        textAlign: "justify",
                      }}
                    ></Text>
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
                        color: Colors.bluetitle,
                        fontSize: 12,
                        paddingBottom: 10,
                      }}
                    >
                      Último pago
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
                      backgroundColor: Colors.bluebg,
                      width: "100%",
                      borderRadius: 10,
                      padding: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Cabin-Regular",
                        color: "#006FCC",
                        fontSize: 17,
                        textAlign: "justify",
                      }}
                    ></Text>
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
                        color: Colors.bluetitle,
                        fontSize: 12,
                        paddingBottom: 10,
                      }}
                    >
                      Próximo pago
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
                      backgroundColor: Colors.bluebg,
                      width: "100%",
                      borderRadius: 10,
                      padding: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Cabin-Regular",
                        color: "#006FCC",
                        fontSize: 17,
                        textAlign: "justify",
                      }}
                    ></Text>
                  </View>
                </View>
              </View>
            </View>

            {(item.status == 2 || item.status == 4) && (
              <TouchableOpacity
                style={{
                  fontFamily: "Cabin-Regular",
                  backgroundColor: Colors.bluelinks,
                  height: 50,
                  borderRadius: 10,
                  marginTop: "10%",
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => clickDetail(item)}
              >
                <Text style={{ color: Colors.white, fontSize: 16 }}>
                  Ver comprobantes
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={styles.containerSafe}>
      <FlatList
        style={{
          zIndex: 0,
          backgroundColor: Colors.bluebg,
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
    borderRadius: 40,
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

export default connect(mapState)(LoanCard);
