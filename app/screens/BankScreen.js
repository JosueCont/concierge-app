import React, {useEffect, useState} from "react";
import {Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {Colors} from "../utils/colors";
import ToolbarGeneric from "../components/ToolbarComponent/ToolbarGeneric";
import ModalCustom from "../components/modal/ModalCustom";
import LoadingGlobal from "../components/modal/LoadingGlobal";
import ApiApp from "../utils/ApiApp";
import {connect} from "react-redux";
import PickerSelect from "../components/pickerSelect";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

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
            value: "01",
        },
        {
            label: "02",
            value: "02",
        },
        {
            label: "03",
            value: "03",
        },
        {
            label: "04",
            value: "04",
        },
        {
            label: "05",
            value: "05",
        },
        {
            label: "06",
            value: "06",
        },
        {
            label: "07",
            value: "07",
        },
        {
            label: "08",
            value: "08",
        },
        {
            label: "09",
            value: "09",
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
    const [account, setAccount] = useState({});
    const [idAccount, setIdAccount] = useState(null);
    const [accountNumber, setAccountNumber] = useState("");
    const [interbankKey, setInterbankKey] = useState("");
    const [bank, setBank] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationMonth, setExpirationMonth] = useState("");
    const [expirationYear, setExpirationYear] = useState("");
    const [newAccount, setNewAccount] = useState(false);

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

    const setPicker = (type, value) => {
        if (type == 1) setBank(value);
        if (type == 2) setExpirationMonth(value);
        if (type == 3) setExpirationYear(value);
    };

    const getBanks = async () => {
        try {
            let response = await ApiApp.getBanks();
            if (response.data && response.data.results.length > 0) {
                let banksArray = response.data.results.map((a) => {
                    return {label: a.name, value: a.id};
                });
                setBanks(banksArray);
                setTimeout(() => {
                    setModalLoading(false);
                }, 1500);
            } else {
                setMessageCustomModal("No se encontraron datos.");
                setIconSourceCustomModal(3);
                setModalCustom(true);
                setTimeout(() => {
                    setModalLoading(false);
                }, 1500);
            }
        } catch (error) {
            setMessageCustomModal("Ocurrio un error, intente de nuevo.");
            setIconSourceCustomModal(2);
            setModalCustom(true);
            setTimeout(() => {
                setModalLoading(false);
                clickAction();
            }, 1500);
        }
    };

    const getBankAccount = async () => {
        try {
            setModalLoading(true);
            let response = await ApiApp.getBankAccount(props.user.userProfile.id);
            console.log(response)
            if (response.data && response.data.id) {
                setAccount(response.data);
                setNewAccount(false);
                setIdAccount(response.data.id);
                setAccountNumber(response.data.account_number);
                setInterbankKey(response.data.interbank_key);
                setBank(response.data.bank.id);
                setCardNumber(response.data.card_number);
                setExpirationMonth(response.data.expiration_month);
                setExpirationYear(response.data.expiration_year);
            }
            setModalLoading(false);
        } catch (error) {
            setMessageCustomModal("Ocurrio un error, intente de nuevo.");
            setIconSourceCustomModal(2);
            setModalCustom(true);
            setTimeout(() => {
                setModalLoading(false);
                clickAction();
            }, 1500);
        }
    };

    const validateSend = () => {
        if (accountNumber.trim() === "") {
            setMessageCustomModal("Capture su número de cuenta");
            setIconSourceCustomModal(2);
            setModalCustom(true);
            return;
        }
        if (bank.trim() === "") {
            setMessageCustomModal("Seleccione un banco.");
            setIconSourceCustomModal(2);
            setModalCustom(true);
            return;
        }
        if (interbankKey.trim() === "") {
            setMessageCustomModal("Capture su clabe interbancaria.");
            setIconSourceCustomModal(2);
            setModalCustom(true);
            return;
        }
        if (cardNumber.trim() === "") {
            setMessageCustomModal("Capture su número de tarjeta.");
            setIconSourceCustomModal(2);
            setModalCustom(true);
            return;
        }
        if (expirationMonth.trim() === "" || expirationYear.trim() === "") {
            setMessageCustomModal("Capture el mes y año de vencimiento.");
            setIconSourceCustomModal(2);
            setModalCustom(true);
            return;
        }
        let data = {
            new_account_number: accountNumber,
            new_interbank_key: interbankKey,
            new_card_number: cardNumber,
            new_expiration_month: expirationMonth,
            new_expiration_year: expirationYear,
            new_bank: bank,
            person: props.user.userProfile.id,
        };
        if (idAccount != null) {
            data.previous_account_number = account.account_number;
            data.previous_bank_account = idAccount;
            data.previous_interbank_key = account.interbank_key;
            data.previous_card_number = account.card_number;
            data.previous_expiration_month = account.expiration_month;
            data.previous_expiration_year = account.expiration_year;
            data.type = 2;
        }
        RequestBankAccount(data);
    };

    const resetData = () => {
        setNewAccount(true);
        setIdAccount(null);
        setAccountNumber("");
        setInterbankKey("");
        setBank("");
        setCardNumber("");
        setExpirationMonth("");
        setExpirationYear("");
    };

    const RequestBankAccount = async (data) => {
        try {
            setModalLoading(true);
            let response = await ApiApp.requestBankAccount(data);
            if (response.data && response.data.id) {
                setIdAccount(null);
                setAccountNumber("");
                setInterbankKey("");
                setBank("");
                setCardNumber("");
                setExpirationMonth("");
                setExpirationYear("");
                getBankAccount();
                setMessageCustomModal("Tus datos se guardaron correctamente.");
                setIconSourceCustomModal(1);
                setModalCustom(true);
                setModalLoading(false);
            }
        } catch (error) {
            setMessageCustomModal("Ocurrio un error, intente de nuevo.");
            setIconSourceCustomModal(2);
            setModalCustom(true);
            setModalLoading(false);
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

                <KeyboardAwareScrollView bounces={false}>
                    <ScrollView
                        bounces={false}
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
                                            keyboardType="numeric"
                                            onChangeText={(text) =>
                                                setAccountNumber(text.replace(/\$\s?|[-,.*]/g, ""))
                                            }
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
                                            keyboardType="numeric"
                                            onChangeText={(text) =>
                                                setInterbankKey(text.replace(/\$\s?|[-,.*]/g, ""))
                                            }
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
                                            <PickerSelect
                                                items={banks}
                                                title={"Banco"}
                                                type={1}
                                                setSelect={setPicker}
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
                                            keyboardType="numeric"
                                            onChangeText={(text) =>
                                                setCardNumber(text.replace(/\$\s?|[-,.*]/g, ""))
                                            }
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
                                                {/* <RNPickerSelect
                        onValueChange={(value) => setExpirationMonth(value)}
                        placeholder={{
                          label: "Mes",
                          value: expirationMonth,
                          color: Colors.bluelinks,
                        }}
                        style={pickerSelectStyles}
                        items={months}
                        value={expirationMonth}
                      /> */}
                                                <PickerSelect
                                                    items={months}
                                                    title={"Mes"}
                                                    type={2}
                                                    setSelect={setPicker}
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
                                                {/* <RNPickerSelect
                        onValueChange={(value) => setExpirationYear(value)}
                        placeholder={{
                          label: "Año",
                          value: expirationYear,
                          color: Colors.bluelinks,
                        }}
                        style={pickerSelectStyles}
                        items={years}
                        value={expirationYear}
                      /> */}
                                                <PickerSelect
                                                    items={years}
                                                    title={"Año"}
                                                    type={3}
                                                    setSelect={setPicker}
                                                    value={expirationYear}
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
                                            width: "100%",
                                            borderRadius: 10,
                                            marginTop: 20,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        onPress={() => validateSend()}
                                    >
                                        {idAccount != null ? (
                                            <Text style={{color: Colors.white, fontSize: 16}}>
                                                Actualizar
                                            </Text>
                                        ) : (
                                            <Text style={{color: Colors.white, fontSize: 16}}>
                                                Enviar
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
            <ModalCustom
                visible={modalCustom}
                text={messageCustomModal}
                iconSource={iconSourceCustomModal}
                setVisible={() => viewModalCustom(true)}
            />
            <LoadingGlobal visible={modalLoading} text={"Cargando"}/>
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
        padding: 12,
        borderRadius: 10,
        textAlign: "center",
    },
});

const mapState = (state) => {
    return {user: state.user};
};

export default connect(mapState)(BankScreen);
