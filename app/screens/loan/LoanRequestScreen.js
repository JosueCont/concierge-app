import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Colors } from "../../utils/colors";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import LoanCardDetail from "../../components/ComponentCards/LoanCardDetail";
import ModalCustom from "../../components/modal/ModalCustom";
import LoadingGlobal from "../../components/modal/LoadingGlobal";
import ApiApp from "../../utils/ApiApp";
import RNPickerSelect from "react-native-picker-select";
import { connect } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const LoanRequestScreen = (props) => {
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [loanConfig, setLoanConfig] = useState({});
  const [deadLine, setDeadLine] = useState([]);
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState(0);
  const [period, setPeriod] = useState(0);
  const [reason, setReason] = useState("");
  const [amountPrefix, setAmountPrefix] = useState("");
  const [payment, setPayment] = useState(0);
  const [periodicit, setPeriodicit] = useState(0);
  const periodicity = [
    { label: "Semanal", value: 1 },
    { label: "Catorcenal", value: 2 },
    { label: "Quincenal", value: 3 },
    { label: "Mensual", value: 4 },
  ];

  useEffect(() => {
    getLoansConfig();
  }, []);

  useEffect(() => {
    if (loanConfig.max_deadline) createDeadLine();
  }, [loanConfig]);

  const clickAction = () => {
    props.navigation.goBack(null);
  };

  const goHome = () => {
    props.navigation.navigate("Home");
  };

  const clickProfile = () => {
    props.navigation.navigate("ProfileScreen");
  };

  const viewModalCustom = () => {
    modalCustom ? setModalCustom(false) : setModalCustom(true);
  };

  const getLoansConfig = async () => {
    try {
      let response = await ApiApp.getLoanConfig(props.user.userProfile.node);
      if (response.status == 200) {
        if (response.data != undefined) {
          setLoanConfig(response.data);
          setTimeout(() => {
            setModalLoading(false);
          }, 1500);
        } else {
          setMessageCustomModal("No se encontraron resultados.");
          setIconSourceCustomModal(3);
          setModalCustom(true);
          setModalLoading(false);
        }
      }
    } catch (error) {
      setMessageCustomModal("Ocurrio un error, intente de nuevo.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      setModalLoading(false);
    }
  };

  const createDeadLine = () => {
    let count = loanConfig.min_deadline - 1;
    let line = [];
    if (loanConfig.id && loanConfig.id != undefined)
      while (count < loanConfig.max_deadline) {
        count++;
        line.push({ label: `${count}`, value: count });
      }
    setDeadLine(line);
  };

  const validateRequest = () => {
    if (parseInt(amount) < loanConfig.min_amount) {
      setMessageCustomModal(
        `La cantidad a soliitar no puede ser menor a \n $ ${loanConfig.min_amount} MXN.`
      );
      setIconSourceCustomModal(2);
      setModalCustom(true);
      return;
    }
    if (parseInt(amount) > loanConfig.max_amount) {
      setMessageCustomModal(
        `La cantidad a soliitar no puede ser mayor a \n $ ${loanConfig.max_amount} MXN.`
      );
      setIconSourceCustomModal(2);
      setModalCustom(true);
      return;
    }
    if (amount == "") {
      setMessageCustomModal("Capture la cantidad a solicitar.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      return;
    }
    if (term == 0 || term == undefined || period == 0 || period == undefined) {
      setMessageCustomModal("Seleccione un plazo y periodo.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      return;
    }
    if (reason == 0 || reason == undefined) {
      setMessageCustomModal("Ingrese un motivo de la solicitud.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      return;
    }
    sendRequest();
  };

  const sendRequest = async () => {
    let data = {
      amount: amount,
      deadline: term,
      periodicity: period,
      periodicity_amount: parseFloat(payment.toFixed(2)),
      person: props.user.userProfile.id,
      type: "EMP",
      reason: reason,
    };
    try {
      let response = await ApiApp.loanRequest(data);
      if (response.data && response.data.id) {
        setMessageCustomModal(
          "Hemos enviado la solicitud, pronto recibiras una notificación con la respuesta a la solicitud realizada."
        );
        setIconSourceCustomModal(4);
        setModalCustom(true);
        setModalLoading(false);
        setTimeout(() => {
          props.navigation.goBack(null);
        }, 2000);
      } else {
        setMessageCustomModal("Ocurrio un error, intente de nuevo.");
        setIconSourceCustomModal(2);
        setModalCustom(true);
        setModalLoading(false);
      }

      setModalLoading(false);
    } catch (error) {
      setMessageCustomModal("Ocurrio un error, intente de nuevo.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      setTimeout(() => {
        setModalLoading(false);
      }, 1500);
    }
  };

  const changeAmount = (data) => {
    let money = 0;
    setAmount(data);
    if (amount != "" && data != 0) {
      money = amount / data;
      setPayment(money);
    }
  };

  const currencyFormat = (num) => {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const changeTerm = (data) => {
    let money = 0;
    setTerm(data);
    if (amount != "" && data != 0) {
      money = amount / data;
      setPayment(parseFloat(money));
    }
  };

  const changePeriod = (data) => {
    setPeriod(data);
    periodicity.map((a) => {
      if (a.value == data) setPeriodicit(a.label);
    });
  };

  return (
    <>
      <View
        style={{
          height: "100%",
          zIndex: 1,
          backgroundColor: Colors.texts,
        }}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor="rgba(1,1,1,0)"
          translucent={true}
        />

        <ToolbarGeneric
          clickAction={clickAction}
          nameToolbar={"RH"}
          type={1}
          clickProfile={clickProfile}
          goHome={goHome}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            zIndex: 0,
            paddingHorizontal: "10%",
          }}
        >
          <View
            style={{
              marginTop: "5%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/img/new/lending_payment.png")}
              style={{
                width: 80,
                height: 80,
                resizeMode: "cover",
                marginRight: 5,
              }}
            ></Image>
            <View>
              <Text
                style={{
                  fontFamily: "Cabin-Regular",
                  fontSize: 20,
                  color: Colors.secondary,
                  textAlign: "left",
                }}
              >
                Solicita un préstamo
              </Text>
            </View>
          </View>

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
                  alignItems: "center",
                  marginTop: 15,
                  width: "100%",
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
                    Cantidad solicitada
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      changeAmount(text.replace(/\$\s?|[-,.*]/g, ""))
                    }
                    style={styles.input}
                    placeholderTextColor={Colors.secondary}
                    autoCapitalize="none"
                    underlineColorAndroid={"transparent"}
                    value={amount}
                  />
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
                        Plazo
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
                        width: "100%",
                        borderRadius: 10,
                        padding: 2,
                        borderColor: Colors.primary,
                        borderWidth: 1,
                      }}
                    >
                      <RNPickerSelect
                        onValueChange={(value) => changeTerm(value)}
                        placeholder={{
                          label: "Plazo",
                          value: term,
                          color: Colors.secondary,
                        }}
                        style={pickerSelectStyles}
                        items={deadLine}
                      />
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
                        Periodicidad
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
                        width: "100%",
                        padding: 2,
                        borderRadius: 10,
                        borderColor: Colors.primary,
                        borderWidth: 1,
                      }}
                    >
                      <RNPickerSelect
                        onValueChange={(value) => changePeriod(value)}
                        placeholder={{
                          label: "Periodicidad",
                          value: period,
                          color: Colors.secondary,
                        }}
                        style={pickerSelectStyles}
                        items={periodicity}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: "100%",
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
                    Pago {periodicit}
                  </Text>
                </View>
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
                    $ {payment.toFixed(2)} MXN
                  </Text>
                </View>
              </View>

              <View
                style={{
                  alignItems: "center",
                  marginTop: 15,
                  width: "100%",
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
                    Motivo :
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    onChangeText={(text) => setReason(text)}
                    style={styles.inputComment}
                    placeholder="Motivo de la solicitud"
                    placeholderTextColor={Colors.secondary}
                    autoCapitalize="none"
                    multiline
                    maxLength={200}
                    value={reason}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    fontFamily: "Cabin-Regular",
                    backgroundColor: Colors.primary,
                    height: 50,
                    width: "80%",
                    borderRadius: 10,
                    marginTop: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => validateRequest()}
                >
                  <Text style={{ color: Colors.white, fontSize: 16 }}>
                    Enviar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <ModalCustom
        visible={modalCustom}
        text={messageCustomModal}
        iconSource={iconSourceCustomModal}
        setVisible={() => viewModalCustom(true)}
      />
      <LoadingGlobal visible={modalLoading} text={"Cargando"} />
    </>
  );
};

const styles = StyleSheet.create({
  ctnPart1: {
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
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
  inputComment: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    color: Colors.secondary,
    width: "100%",
    height: 100,
    borderColor: Colors.primary,
    borderWidth: 1,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
  },
  input: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    color: Colors.secondary,
    width: "100%",
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 16,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    // borderRadius: 20,
    color: Colors.secondary,
  },
  inputAndroid: {
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 16,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    // borderRadius: 20,
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

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(LoanRequestScreen);
