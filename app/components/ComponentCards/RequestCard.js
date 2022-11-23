import {FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";
import {Colors} from "../../utils/colors";
//import {TouchableOpacity} from "react-native-gesture-handler";
import {getNumberDays} from "../../utils/functions";

const RequestCard = (props) => {
    const openViewDetail = (item) => {
        console.log(item.id);
        if (props.type == "vacation"){
            console.log('OPEN VAC DETAIL');
            props.props.navigation.navigate("VacationDetailScreen", {
                id: item.id,
            });
        }
            
        if (props.type == "permission")
            props.props.navigation.navigate("PermissionDetailScreen", {
                id: item.id,
            });
        if (props.type == "incapacity")
            props.props.navigation.navigate("IncapacityDetailScreen", {
                id: item.id,
            });
    };

    const renderItem = ({item, index}) => {
        let numberDay = 0;
        if (item.departure_date && item.return_date) {
            numberDay = getNumberDays(item.departure_date, item.return_date);
        }
        return (
                
            <TouchableOpacity
                onPress={() => openViewDetail(item)}
            >
                <View style={{marginTop: 10}}>
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
                            backgroundColor: Colors.secondary,
                            width: 70,
                            height: 5,
                        }}
                    ></View>
                </View>
                <View style={styles.item}>
                    <View style={{marginRight: 20, width: "60%"}}>
                        <Text style={styles.titleDate}>Fecha de solicitud</Text>
                        <Text style={styles.date}>
                            {item.timestamp ? item.timestamp.substring(0, 10) : ""}
                        </Text>
                        <Text style={styles.titleStatus}>Estatus</Text>
                        <View
                            style={[
                                styles.ctnStatus,
                                item.status == 2
                                    ? styles.statusAprobado
                                    : item.status == 1
                                        ? styles.statusPendiente
                                        : styles.statusRechazado,
                            ]}
                        >
                            <Text style={styles.status}>
                                {item.status == 1
                                    ? "Pendiente"
                                    : item.status == 2
                                        ? "Aprobado"
                                        : "Rechazado"}
                            </Text>
                        </View>

                        {item.status == "Aprobada" ||
                            (item.status == "Rechazada" && (
                                <View>
                                    <Text style={styles.titlePerson}>Autorizó</Text>
                                    <Text style={styles.person}>{item.person}</Text>
                                </View>
                            ))}
                    </View>
                    <View
                        style={{
                            flex: 1,
                            width: "40%",
                            justifyContent: "flex-end",
                        }}
                    >
                        <View style={{position: "absolute", top: 0}}>
                            <Text style={styles.titleDays}>Días solicitados</Text>
                            <View style={styles.ctnDays}>
                                <Text style={styles.days}>
                                    {item.days_requested
                                        ? item.days_requested
                                        : item.requested_days
                                            ? item.requested_days
                                            : numberDay}
                                </Text>
                            </View>
                        </View>

                        {/*<TouchableOpacity*/}
                        {/*    style={styles.ctnBtn}*/}
                        {/*    onPress={() => openViewDetail(item)}*/}
                        {/*>*/}
                        {/*    <Text style={styles.btn}>Ver detalle</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={{
                    zIndex: 0,
                    backgroundColor: Colors.texts,
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
    container: {
        flex: 1,
        // marginTop: 20,
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
    titleDate: {
        fontSize: 14,
        fontFamily: "Cabin-Regular",
        color: Colors.secondary,
    },
    date: {
        fontSize: 18,
        fontFamily: "Cabin-Bold",
        color: Colors.secondary,
        marginTop: 5,
    },
    titleStatus: {
        fontSize: 14,
        fontFamily: "Cabin-Regular",
        color: Colors.secondary,
        marginTop: 10,
    },
    ctnStatus: {
        height: 30,
        width: 120,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginTop: 5,
    },
    status: {
        fontSize: 17,
        fontFamily: "Cabin-Bold",
        color: Colors.white,
    },
    statusPendiente: {
        backgroundColor: Colors.secondary,
    },
    statusAprobado: {
        backgroundColor: Colors.secondary,
    },
    statusRechazado: {
        backgroundColor: Colors.secondary,
    },
    titlePerson: {
        fontSize: 14,
        fontFamily: "Cabin-Regular",
        color: Colors.secondary,
        marginTop: 10,
    },
    person: {
        fontSize: 17,
        fontFamily: "Cabin-Bold",
        color: Colors.secondary,
        marginTop: 5,
    },
    titleDays: {
        fontFamily: "Cabin-Regular",
        fontSize: 14,
        color: Colors.secondary,
    },
    ctnDays: {
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.back,
        borderRadius: 10,
        marginTop: 5,
    },
    days: {
        fontFamily: "Cabin-Bold",
        fontSize: 16,
        color: Colors.secondary,
    },
    ctnBtn: {
        backgroundColor: Colors.primary,
        height: 40,
        width: "100%",
        maxWidth: 180,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 70,
    },
    btn: {
        fontFamily: "Cabin-Regular",
        color: Colors.primary,
        fontSize: 14,
    },
});

export default RequestCard;
