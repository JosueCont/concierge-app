import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import PayrollCard from "../../components/ComponentCards/PayrollCard";
import {Colors} from "../../utils/colors";
import ApiApp from "../../utils/ApiApp";
import ModalCustom from "../../components/modal/ModalCustom";
import LoadingGlobal from "../../components/modal/LoadingGlobal";
import PickerSelect from "../../components/pickerSelect";

const PayrollScreen = (props) => {
    const [modalCustom, setModalCustom] = useState(false);
    const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
    const [messageCustomModal, setMessageCustomModal] = useState("");
    const [modalLoading, setModalLoading] = useState(false);
    const [vouchers, setVouchers] = useState([]);
    const [monthVoucher, setMonthVoucher] = useState(0);
    const [yearVoucher, setYearVoucher] = useState(0);
    const months = [
        {
            label: "Enero",
            value: 1,
        },
        {
            label: "Febrero",
            value: 2,
        },
        {
            label: "Marzo",
            value: 3,
        },
        {
            label: "Abril",
            value: 4,
        },
        {
            label: "Mayo",
            value: 5,
        },
        {
            label: "Junio",
            value: 6,
        },
        {
            label: "Julio",
            value: 7,
        },
        {
            label: "Agosto",
            value: 8,
        },
        {
            label: "Septiembre",
            value: 9,
        },
        {
            label: "Octubre",
            value: 10,
        },
        {
            label: "Noviembre",
            value: 11,
        },
        {
            label: "Diciembre",
            value: 12,
        },
    ];
    const [years, setYears] = useState([]);
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    useEffect(() => {
        setYearVoucher(year);
        setMonthVoucher(month);
        if (props.user && props.user.userProfile) {
            generateYear();
            getPayrollVoucher();
        } else {
            props.navigation.goBack(null);
        }
    }, []);

    const clickAction = () => {
        setVouchers(0);
        setMonthVoucher(0);
        props.navigation.goBack(null);
    };

    const goHome = () => {
        props.navigation.navigate("Home");
    };

    const clickProfile = () => {
        props.navigation.navigate("ProfileScreen");
    };

    const generateYear = () => {
        let yearsArray = [];
        let currentYear = new Date().getFullYear();
        let startYear = 1980;
        while (startYear < currentYear) {
            startYear++;
            yearsArray.push({label: `${startYear}`, value: startYear});
        }
        setYears(yearsArray.reverse());
    };

    const viewModalCustom = () => {
        modalCustom ? setModalCustom(false) : setModalCustom(true);
    };

    const getPayrollVoucher = async () => {
        let filter = `node=${props?.user?.userProfile?.node}&person=${props?.user?.userProfile?.id}&`;
        try {
            setModalLoading(true);
            setVouchers([]);
            if (monthVoucher && monthVoucher > 0)
                filter = filter + `payment_date__month=${monthVoucher}&`;
            else filter = filter + `payment_date__month=${month}&`;
            if (yearVoucher && yearVoucher > 0)
                filter = filter + `year=${yearVoucher}`;
            else filter = filter + `year=${year}`;
            let response = await ApiApp.getPayrollVouchers(filter);

            if (response.status === 200) {
                if (
                    response.results.length > 0
                ) {
                    setVouchers(response.results);
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
            console.log(error.response, 143)
            setMessageCustomModal("Ocurrio un error, intente de nuevo.");
            setIconSourceCustomModal(2);
            setModalCustom(true);
            setTimeout(() => {
                setModalLoading(false);
            }, 1500);
        }
    };

    const setPicker = (type, value) => {
        if (type == 1) setMonthVoucher(value);
        if (type == 2) setYearVoucher(value);
    };

    const HeaderList = () => {
        return (
            <View
                style={{
                    zIndex: 0,
                    backgroundColor: Colors.bluebg,
                }}
            >
                <View
                    style={{
                        backgroundColor: Colors.dark,
                        marginTop: 40,
                        alignItems: "center",
                        borderRadius: 20,
                        paddingHorizontal: 35,
                        paddingTop: 30,
                        paddingBottom: 30,
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            borderRadius: 10,
                            overflow: "hidden",
                            marginBottom: 20,
                        }}
                    >
                        <PickerSelect
                            items={months}
                            title={"Mes"}
                            type={1}
                            setSelect={setPicker}
                            value={monthVoucher}
                        />
                    </View>
                    <View
                        style={{
                            width: "100%",
                            borderRadius: 10,
                            overflow: "hidden",
                            marginBottom: 20,
                        }}
                    >
                        <PickerSelect
                            items={years}
                            title={"Año"}
                            type={2}
                            setSelect={setPicker}
                            value={yearVoucher}
                        />
                    </View>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#47A8DE",
                                height: 50,
                                width: 160,
                                borderRadius: 10,
                                marginTop: 10,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => getPayrollVoucher()}
                        >
                            <Text
                                style={{
                                    fontFamily: "Cabin-Regular",
                                    color: Colors.white,
                                    fontSize: 18,
                                }}
                            >
                                Buscar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    const FooterList = () => {
        return (
            <View>
                <View style={{alignItems: "center"}}>
                    {vouchers.length > 0 && (
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.bluetitle,
                                height: 50,
                                width: "48%",
                                borderRadius: 10,
                                marginTop: 20,
                                marginBottom: 40,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => clickAction()}
                        >
                            <Text
                                style={{
                                    fontFamily: "Cabin-Regular",
                                    color: Colors.white,
                                    fontSize: 16,
                                }}
                            >
                                Regresar
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };
    return (
        <>
            <View
                style={{
                    height: "100%",
                    zIndex: 1,
                }}
            >
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="rgba(1,1,1,0)"
                    translucent={true}
                />

                <ToolbarGeneric
                    clickAction={clickAction}
                    nameToolbar={"Mi Nómina"}
                    type={1}
                    clickProfile={clickProfile}
                    goHome={goHome}
                />






                <View style={{ alignItems: "center" }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 20,
                        }}
                    >
                        <Image
                            source={require("../../../assets/img/icono_nomina.png")}
                            />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "Cabin-Regular",
                                color: Colors.bluetitle,
                                fontSize: 28,
                            }}
                        >
                            Próximamente
                        </Text>

                    </View>

                    {
                        vouchers.length>0 ? <HeaderList/> : <FooterList/>
                    }


                    <Text
                        style={{
                            fontFamily: "Cabin-Regular",
                            color: Colors.bluetitle,
                            fontSize: 30,
                            textAlign: "center",
                        }}
                    >

                    </Text>
                </View>

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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: "Cabin-Regular",
        backgroundColor: Colors.white,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
        color: Colors.bluetitle,
    },
    inputAndroid: {
        fontFamily: "Cabin-Regular",
        backgroundColor: Colors.white,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
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
    return {user: state.user};
};

export default connect(mapState)(PayrollScreen);
