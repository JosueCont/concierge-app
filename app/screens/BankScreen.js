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
import { Colors } from "../utils/colors";
import ToolbarGeneric from "../components/ToolbarComponent/ToolbarGeneric";
import LoanCardDetail from "../components/ComponentCards/LoanCardDetail";
import ModalCustom from "../components/modal/ModalCustom";
import LoadingGlobal from "../components/modal/LoadingGlobal";
import ApiApp from "../utils/ApiApp";
import RNPickerSelect from "react-native-picker-select";
import { connect } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const BankScreen = (props) => {
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [modalLoading, setModalLoading] = useState(true);
  const [years, setYears] = useState([]);
  const [banks, setBanks] = useState([]);
  const months = [
    {
      label: "01",
      value: "1",
    },
    {
      label: "02",
      value: "2",
    },
    {
      label: "03",
      value: "3",
    },
    {
      label: "04",
      value: "4",
    },
    {
      label: "05",
      value: "5",
    },
    {
      label: "06",
      value: "6",
    },
    {
      label: "07",
      value: "7",
    },
    {
      label: "08",
      value: "8",
    },
    {
      label: "09",
      value: "9",
    },
    {
      label: "10",
      value: "10",
    },
    {
      label: "11",
      value: "11",
    },
    {
      label: "12",
      value: "12",
    },
  ];
  const [idAccount, setIdAccount] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [interbankKey, setInterbankKey] = useState("");
  const [bank, setBank] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");

  useEffect(() => {
    if (props.user.userProfile.id) {
      generateYear();
      getBankAccount();
      getBanks();
    }
  }, [props.user.userProfile.id]);
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

  const generateYear = () => {
    let yearsArray = [];
    let currentYear = new Date().getFullYear();
    let startYear = currentYear + 10;
    while (currentYear < startYear) {
      startYear--;
      yearsArray.push({
        label: `${startYear}`.substring(2, 4),
        value: `${startYear}`.substring(2, 4),
      });
    }
    setYears(yearsArray.reverse());
  };

  const getBanks = async () => {
    try {
      let response = await ApiApp.getBanks();
      if (response.data && response.data.results.length > 0) {
        let banksArray = response.data.results.map((a) => {
          return { label: a.name, value: a.id };
        });
        setBanks(banksArray);
        setModalLoading(false);
      } else {
        setMessageCustomModal("Ocurrio un error, intente de nuevo.");
        setIconSourceCustomModal(2);
        setModalCustom(true);
        setModalLoading(false);
        clickAction();
      }
    } catch (error) {
      setMessageCustomModal("Ocurrio un error, intente de nuevo.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      setModalLoading(false);
      clickAction();
    }
  };

  const getBankAccount = async () => {
    try {
      let response = await ApiApp.getBankAccount(props.user.userProfile.id);
      if (response.data && response.data.length > 0) {
        setIdAccount(response.data[0].id);
        setAccountNumber(response.data[0].account_number);
        setInterbankKey(response.data[0].interbank_key);
        setBank(response.data[0].bank.id);
        setCardNumber(response.data[0].card_number);
        setExpirationMonth(response.data[0].expiration_month);
        setExpirationYear(response.data[0].expiration_year);
      } else {
        setMessageCustomModal("Ocurrio un error, intente de nuevo.");
        setIconSourceCustomModal(2);
        setModalCustom(true);
        setModalLoading(false);
        clickAction();
      }
    } catch (error) {
      setMessageCustomModal("Ocurrio un error, intente de nuevo.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      setModalLoading(false);
      clickAction();
    }
  };

  return (
    <>
      <View
        style={{
          height: "100%",
          zIndex: 1,
          backgroundColor: Colors.bluebg,
        }}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor="rgba(1,1,1,0)"
          translucent={true}
        />

        <ToolbarGeneric
          clickAction={clickAction}
          nameToolbar={"Banco"}
          type={1}
          clickProfile={clickProfile}
          goHome={goHome}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            zIndex: 0,
            paddingHorizontal: "5%",
          }}
        >
          <View
            style={{
              marginLeft: "10%",
              marginTop: "5%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/img/bank_data.png")}
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
                  color: Colors.bluetitle,
                  textAlign: "left",
                }}
              >
                Mis datos bancarios
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
                    backgroundColor: Colors.bluetitle,
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
                      color: Colors.bluetitle,
                      fontSize: 12,
                      paddingBottom: 10,
                    }}
                  >
                    Número de cuenta
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    onChangeText={(text) => setAccountNumber}
                    style={styles.input}
                    placeholderTextColor={Colors.bluetitle}
                    autoCapitalize="none"
                    underlineColorAndroid={"transparent"}
                    value={accountNumber}
                  />
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
                      color: Colors.bluetitle,
                      fontSize: 12,
                      paddingBottom: 10,
                    }}
                  >
                    Clabe interbancaria
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    onChangeText={(text) => setInterbankKey}
                    style={styles.input}
                    placeholderTextColor={Colors.bluetitle}
                    autoCapitalize="none"
                    underlineColorAndroid={"transparent"}
                    value={interbankKey}
                  />
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
                      color: Colors.bluetitle,
                      fontSize: 12,
                      paddingBottom: 10,
                    }}
                  >
                    Banco
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      padding: 3,
                      borderColor: Colors.bluelinks,
                      borderWidth: 1,
                    }}
                  >
                    <RNPickerSelect
                      onValueChange={(value) => setBank(value)}
                      placeholder={{
                        label: "Banco",
                        value: bank,
                        color: Colors.bluelinks,
                      }}
                      style={pickerSelectStyles}
                      items={banks}
                      value={bank}
                    />
                  </View>
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
                      color: Colors.bluetitle,
                      fontSize: 12,
                      paddingBottom: 10,
                    }}
                  >
                    Número de tarjeta
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    onChangeText={(text) => setCardNumber(text)}
                    style={styles.input}
                    placeholderTextColor={Colors.bluetitle}
                    autoCapitalize="none"
                    underlineColorAndroid={"transparent"}
                    value={cardNumber}
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
                          color: Colors.bluetitle,
                          fontSize: 12,
                          paddingBottom: 10,
                        }}
                      >
                        Mes de vencimiento
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
                        borderColor: Colors.bluelinks,
                        borderWidth: 1,
                      }}
                    >
                      <RNPickerSelect
                        onValueChange={(value) => setExpirationMonth(value)}
                        placeholder={{
                          label: "Mes",
                          value: expirationMonth,
                          color: Colors.bluelinks,
                        }}
                        style={pickerSelectStyles}
                        items={months}
                        value={expirationMonth}
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
                          color: Colors.bluetitle,
                          fontSize: 12,
                          paddingBottom: 10,
                        }}
                      >
                        Año de vencimiento
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
                        borderColor: Colors.bluelinks,
                        borderWidth: 1,
                      }}
                    >
                      <RNPickerSelect
                        onValueChange={(value) => setExpirationYear(value)}
                        placeholder={{
                          label: "Año",
                          value: expirationYear,
                          color: Colors.bluelinks,
                        }}
                        style={pickerSelectStyles}
                        items={years}
                        value={expirationMonth}
                      />
                    </View>
                  </View>
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
                    backgroundColor: Colors.bluelinks,
                    height: 50,
                    width: "80%",
                    borderRadius: 10,
                    marginTop: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {}}
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
    paddingTop: 10,
    borderRadius: 10,
    marginBottom: "5%",
    marginTop: "10%",
  },
  inputComment: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    color: Colors.bluetitle,
    width: "100%",
    height: 100,
    borderColor: Colors.bluelinks,
    borderWidth: 1,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
  },
  input: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    color: Colors.bluetitle,
    width: "100%",
    borderColor: Colors.bluelinks,
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
    color: Colors.bluetitle,
  },
  inputAndroid: {
    fontFamily: "Cabin-Regular",
    backgroundColor: Colors.white,
    fontSize: 16,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    // borderRadius: 20,
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

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(BankScreen);
