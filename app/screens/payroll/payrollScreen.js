import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, SafeAreaView,FlatList, ScrollView, Linking, Platform,} from "react-native";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import PayrollCard from "../../components/ComponentCards/PayrollCard";
import {Colors} from "../../utils/colors";
import ApiApp from "../../utils/ApiApp";
import ModalCustom from "../../components/modal/ModalCustom";
import LoadingGlobal from "../../components/modal/LoadingGlobal";
import PickerSelect from "../../components/pickerSelect";
import axios from 'axios'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";


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
    const [periods, setPeriod] = useState([]);
    const [periodSelected, setPeriodSelected] = useState('');

    const { 
        URL_PEOPLE,
        URL_PEOPLE_DEV, 
        PROTOCOL, 
        production ,
        TENANT_DEFAULT,
    } = Constants.manifest.extra

    useEffect(() => {
        setYearVoucher(year);
        setMonthVoucher(month);
        if (props.user && props.user.userProfile) {
            generateYear();
            setVouchers([]);
            //getPeriods(year);
            //getPayrollVoucher();
        } else {
            props.navigation.goBack(null);
        }
    }, []);

    useEffect(()=>{
    }, [vouchers])

    const clickAction = () => {
        setVouchers([]);
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


    const downLoadFileBlob = async (
        url,
        name = "Example.xlsx",
        type = "POST",
        params = null,
        Textmessage = null
    ) => {
        let headers = {
            method: type,
            responseType: "blob",
        };
        if (params) headers.data = params;
        axios(
            url.toLowerCase().includes("http") ? url : `${typeHttp}://` + url,
            headers
        )
            .then((response) => {
                const blob = new Blob([response.data]);
                const fr = new FileReader();
                fr.readAsDataURL(blob);
                fr.onload = async () => {
                    const fileUri = `${FileSystem.documentDirectory}/${name}`;
                    await FileSystem.writeAsStringAsync(fileUri, fr.result.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });
                    await Sharing.shareAsync(fileUri);
                };
                fr.readAsDataURL(response.data);

                // const link = document.createElement("a");
                // link.href = window.URL.createObjectURL(blob);
                // link.download = name;
                // link.click();
            })
            .catch((e) => {
                let errorMessage = e.response?.data?.message || ""
                if (errorMessage !== ""){
                    message.error(errorMessage)
                } else if(Textmessage){
                    message.error(Textmessage)
                }else if(e?.response?.status===404){
                    message.error('No se encontraron datos de la nómina de las personas seleccionadas.')
                }
            });
    };

    const downLoadFile = (item, file=2) => {
        let data = {
            type_request: 3,
            type_file: file,
            id_facturama: item.id_facturama,
        };
        let url = getUrl();

        downLoadFileBlob(
            url,
            `file${Math.random()}.${file == 1 ? "xml" : "pdf"}`,
            "POST",
            data
        );
    };

    const getUrl = async() => {
        let tenant = TENANT_DEFAULT;
        let tenantAysnc = await AsyncStorage.getItem('tenant');
        if(tenantAysnc) tenant = tenantAysnc;

        return `${PROTOCOL}${tenant}.${production ? URL_PEOPLE : URL_PEOPLE_DEV}/payroll/cfdi_multi_emitter_facturama/cfdi_multi_emitter/`;
    }

    const getPayrollVoucher = async () => {
        //props?.user?.userProfile?.node
        //props?.user?.userProfile?.id
        //Use node and person hardcoded to test
        let filter = `?node=${props?.user?.userProfile?.node}&person=${props?.user?.userProfile?.id}&page=1${periodSelected != '' ? '&period='+periodSelected : ''}`;
        try {
            setModalLoading(true);
            setVouchers([]);
            // if (monthVoucher && monthVoucher > 0)
            //     filter = filter + `payment_date__month=${monthVoucher}&`;
            // else filter = filter + `payment_date__month=${month}&`;
            if (yearVoucher && yearVoucher > 0)
                filter = filter + `&year=${yearVoucher}`;
            else filter = filter + `&year=${year}`;
            let response = await ApiApp.getPayrollVouchers(filter);
            if (response.status === 200) {
                if (
                    response?.data?.results.length > 0
                ) {
                    setVouchers(response?.data?.results);
                    setTimeout(() => {
                        setModalLoading(false);
                    }, 500);
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
            setTimeout(() => {
                setModalLoading(false);
            }, 1500);
        }
    };

    const setPicker = (type, value) => {
        if (type == 1) setMonthVoucher(value);
        if (type == 2) {
            setYearVoucher(value);
            getPeriods(value)
        }
        if(type == 3) setPeriodSelected(value)
    };

    const getPeriods = async(year) => {
        try { 
            setPeriodSelected('');
            setPeriod([]);
            setModalLoading(true)
            let filters = `?person_id=${props?.user?.userProfile?.id}&node_id=${props?.user?.userProfile?.node}&period=${year}`
            let calendar =[];
            const periods = await ApiApp.getPeriodsCalendar(filters);
            if(periods.data.length >0){
                periods?.data.forEach(period => {
                    calendar.push({label: `${period.start_date} - ${period.end_date}`, value: period.id});
                });
                setPeriod(calendar);
                setModalLoading(false)
            }
        } catch (e) {
            setModalLoading(false)
        }
    }

    const HeaderList = () => {
        return (
            <View
                style={{
                    zIndex: 0,
                }}
            >
                <View
                    style={{
                        backgroundColor: Colors.primary,
                        marginTop: 40,
                        alignItems: "center",
                        borderRadius: 20,
                        paddingHorizontal: 35,
                        paddingTop: 30,
                        paddingBottom: 30,
                    }}
                >
                    {/*<View*/}
                    {/*    style={{*/}
                    {/*        width: "100%",*/}
                    {/*        borderRadius: 10,*/}
                    {/*        overflow: "hidden",*/}
                    {/*        marginBottom: 20,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <PickerSelect*/}
                    {/*        items={months}*/}
                    {/*        title={"Mes"}*/}
                    {/*        type={1}*/}
                    {/*        setSelect={setPicker}*/}
                    {/*        value={monthVoucher}*/}
                    {/*    />*/}
                    {/*</View>*/}
                    <View style={styles.contPicker}>
                        <PickerSelect
                            items={years}
                            title={"Año"}
                            type={2}
                            setSelect={setPicker}
                            value={yearVoucher}
                        />
                    </View>
                    <View style={styles.contPicker}>
                        <PickerSelect
                            title='Selecciona periodo'
                            items={periods}
                            type={3}
                            setSelect={setPicker}
                            value={periodSelected}
                        />

                    </View>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.secondary,
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

    const CardPayroll = ({voucher})=>{
        return(
            <View
                style={{
                    zIndex: 0,
                    width: '100%',
                    height: 100
                }}
            >
                <View
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        alignContent: 'space-between',
                        flexDirection: 'row',
                        backgroundColor: Colors.dark,
                        marginTop: 2,
                        borderRadius: 20,
                        paddingTop: 2,
                        paddingBottom: 2,
                    }}
                >   
                    <View style={{flexDirection: 'column', alignItems: "flex-start", display: 'flex', marginLeft: 20, marginRight: 20}}>
                        <Text style={{color: Colors.white}}>
                            {voucher?.payroll_person.person?.first_name} {voucher?.payroll_person.person?.flast_name} 
                        </Text>
                        <Text style={{color: Colors.white}}>
                            {voucher?.emission_date}
                        </Text>
                    </View>
                        
                    <View style={{alignItems: "center", display: 'flex', marginLeft: 10}}>
                        {
                            (voucher.id_facturama) &&
                            <TouchableOpacity
                                style={{
                                    backgroundColor: Colors.primary,
                                    height: 40,
                                    width: 40,
                                    borderRadius: 5,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onPress={() => downLoadFile(voucher, 2)}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Cabin-Regular",
                                        color: Colors.white,
                                        fontSize: 18,
                                    }}
                                >
                                    Pdf
                                </Text>
                            </TouchableOpacity>
                        }
                        
                    </View>
                    
                    <View style={{alignItems: "center", display: 'flex', marginLeft: 10}}>
                        {
                            (voucher?.xml_file && !voucher.id_facturama) &&
                            <TouchableOpacity
                                style={{
                                    backgroundColor: Colors.primary,
                                    height: 40,
                                    width: 40,
                                    borderRadius: 5,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onPress={() => Linking.openURL(voucher?.xml_file)}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Cabin-Regular",
                                        color: Colors.white,
                                        fontSize: 18,
                                    }}
                                >
                                    Xml
                                </Text>
                            </TouchableOpacity>
                        }


                        {
                            (!voucher?.xml_file && voucher.id_facturama) &&
                            <TouchableOpacity
                                style={{
                                    backgroundColor: Colors.primary,
                                    height: 40,
                                    width: 40,
                                    borderRadius: 5,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onPress={() => downLoadFile(voucher, 1)}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Cabin-Regular",
                                        color: Colors.white,
                                        fontSize: 18,
                                    }}
                                >
                                    Xml
                                </Text>
                            </TouchableOpacity>
                        }

                    </View>
                </View>
            </View>
        )
    }

    const FooterList = () => {
        return (
            <View>
                <View style={{alignItems: "center"}}>
                    {vouchers?.length > 0 && (
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.bluetitle,
                                height: 50,
                                width: "100%",
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
                    nameToolbar={""}
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
                            source={require("../../../assets/img/new/icono_nomina.png")}
                        />
                        <Text style={styles.title}>Comprobantes Nómina</Text>
                    </View>

                    {vouchers.length > 0 ? <Text style={styles.subtitle}>Encontrados: {vouchers.length}</Text> : null}

                    {vouchers.length<=0 && <HeaderList/>}
                    <ScrollView style={{marginTop: 20, height: 500, width: '80%'}}>
                        {vouchers.map((voucher, index)=>{
                            return(
                                <CardPayroll voucher={voucher} />
                            )
                        })}
                    </ScrollView>
                    
                </View>

            </View>
            
            
            <ModalCustom
                visible={modalCustom}
                text={messageCustomModal}
                iconSource={iconSourceCustomModal}
                setVisible={() => viewModalCustom(true)}
            />
            <LoadingGlobal visible={modalLoading} text={"Obteniendo nóminas"}/>
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
    contPicker:{
        width:'100%',
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 20,
    },
    title:{
        fontSize:18, 
        marginLeft:15, 
        fontWeight:'300'
    },
    subtitle:{
        marginTop:10,
        color:'gray'
    }
  });

const mapState = (state) => {
    return {user: state.user};
};

export default connect(mapState)(PayrollScreen);
