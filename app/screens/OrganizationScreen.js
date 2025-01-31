import React, {useEffect, useRef, useState} from "react";
import {Dimensions, Image, Keyboard, Platform, ScrollView, StatusBar, TextInput, TouchableWithoutFeedback, View,} from "react-native";
import {Colors} from "../utils/colors";
import ToolbarGeneric from "../components/ToolbarComponent/ToolbarGeneric";
import {connect} from "react-redux";
import {styles} from "./organizationScreenStyleSheet";
import {Icon, Tab, Tabs, Text} from "native-base";
import APIKit from "../utils/axiosApi";

const windowWidth = Dimensions.get("window").width;

const OrganizationScreen = ({navigation, user}) => {
    const [changeView, setChangeView] = useState(1);
    const [node, setNode] = useState(user.userProfile.node);
    const [address, setAddress] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [aboutUs, setAboutUs] = useState(null);
    const [policies, setPolicies] = useState(null);
    const [businessRules, setBusinessRules] = useState(null);
    const policiesInput = useRef(null);
    const rulesInput = useRef(null);
    const [company] = useState(user.userProfile.node_user);

    useEffect(() => {
        getInformation();
    }, []);

    const getInformation = async() => {
        try {
            const dataInfo = await APIKit.get(`/business/node-information/?node=${node}`);
            setAddress(dataInfo.data.address);
            setEmail(dataInfo.data.contact_email);
            setPhone(dataInfo.data.contact_phone);
            setAboutUs(dataInfo.data.about_us);
            setPolicies(dataInfo.data.policies);
            setBusinessRules(dataInfo.data.business_rules);
        } catch (e) {
            console.log(e)
        }
    }

    const clickAction = () => {
        navigation.navigate("Main");
    };

    const goHome = () => {
        navigation.navigate("Home");
    };

    const clickProfile = () => {
        navigation.navigate("ProfileScreen");
    };

    function Mark() {
        return (
            <View
                style={{
                    width: "100%",
                    position: "absolute",
                    top: -29,
                    textAlign: "center",
                    alignItems: "center",
                    zIndex: 2,
                }}
            >
                <View
                    style={{
                        backgroundColor: Colors.secondary,
                        width: windowWidth * 0.2,
                        height: 5,
                    }}
                ></View>
            </View>
        );
    }

    return (
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
                nameToolbar={""}
                type={1}
                clickProfile={clickProfile}
                goHome={goHome}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                style={{
                    zIndex: 0,
                    paddingHorizontal: "5%",
                }}
            >
                <View
                    style={{
                        marginTop: "2%",
                        flexDirection: "row",
                        height: 80,
                    }}
                >
                    <View
                        style={{
                            flex: 0.7,
                            alignItems: "flex-end",
                        }}
                    >
                        <Image
                            resizeMode="contain"
                            style={{height: "100%", width: 80}}
                            source={{uri: company.image}}
                        />
                    </View>
                    <View style={{flex: 1, padding: 10}}>
                        <Text
                            style={{
                                fontFamily: "Cabin-Regular",
                                fontSize: 15,
                                color: Colors.secondary,
                                textAlign: "left",
                            }}
                        >
                            Empresa
                        </Text>
                        <Text
                            style={{
                                fontFamily: "Cabin-Regular",
                                fontSize: 24,
                                color: Colors.primary,
                                textAlign: "left",
                            }}
                            numberOfLines={2}
                            adjustsFontSizeToFit={true}
                        >
                            {company.name}
                        </Text>
                    </View>
                </View>

                <View style={{flex: 1, marginTop: 20}}>
                    <Tabs
                        tabBarUnderlineStyle={{backgroundColor: "transparent"}}
                        tabContainerStyle={{backgroundColor: "transparent"}}
                    >
                        <Tab
                            heading="Información"
                            activeTabStyle={{
                                backgroundColor: Colors.secondary,
                                borderTopStartRadius: 10,
                                borderTopEndRadius: 10,
                            }}
                            activeTextStyle={{
                                fontFamily: "Cabin-Regular",
                                fontSize: 13,
                                color: "white",
                            }}
                            tabStyle={{
                                backgroundColor: Colors.primary,
                                borderTopStartRadius: 10,
                                borderTopEndRadius: 10,
                            }}
                            textStyle={{
                                fontFamily: "Cabin-Regular",
                                fontSize: 13,
                                color: Colors.white,
                            }}
                        >
                            <View style={styles.container}>
                                <Text
                                    style={{
                                        marginBottom: 10,
                                        color: Colors.secondary,
                                        fontFamily: "Cabin-Bold",
                                    }}
                                >
                                    <Icon
                                        type={"Entypo"}
                                        name={"location-pin"}
                                        style={{fontSize: 18, color: Colors.primary}}
                                    />{" "}
                                    Dirección
                                </Text>
                                <Text style={styles.input}>{address}</Text>
                                <Text
                                    style={{
                                        marginBottom: 10,
                                        color: Colors.secondary,
                                        fontFamily: "Cabin-Bold",
                                    }}
                                >
                                    <Icon
                                        type={"Entypo"}
                                        name={"mail"}
                                        style={{fontSize: 18, color: Colors.primary}}
                                    />{" "}
                                    Email
                                </Text>
                                <Text style={styles.input}>{email}</Text>
                                <Text
                                    style={{
                                        marginBottom: 10,
                                        color: Colors.secondary,
                                        fontFamily: "Cabin-Bold",
                                    }}
                                >
                                    <Icon
                                        type={"Entypo"}
                                        name={"phone"}
                                        style={{fontSize: 18, color: Colors.primary}}
                                    />{" "}
                                    Teléfono
                                </Text>
                                <Text style={styles.input}>{phone}</Text>
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
                                                marginBottom: 10,
                                                color: Colors.secondary,
                                                fontFamily: "Cabin-Bold",
                                            }}
                                        >
                                            Descripción
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 20,
                                    }}
                                >
                                    <View
                                        style={{
                                            width: "100%",
                                            borderRadius: 10,
                                            padding: 10,
                                            backgroundColor: Colors.back,
                                        }}
                                    >
                                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
                                            <TextInput
                                                value={aboutUs}
                                                style={
                                                    Platform.OS === "ios"
                                                        ? {
                                                            height: 150,
                                                            fontFamily: "Cabin-Regular",
                                                            color: Colors.secondary,
                                                        }
                                                        : {
                                                            fontFamily: "Cabin-Regular",
                                                            color: Colors.secondary,
                                                        }
                                                }
                                                numberOfLines={7}
                                                keyboardType={"none"}
                                                scrollEnabled={true}
                                                multiline={true}
                                                selectTextOnFocus={false}
                                                showSoftInputOnFocus={false}
                                                editable={Platform.OS === "android" ? true : false}
                                            />
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>
                        </Tab>
                        <Tab
                            heading="Políticas"
                            activeTabStyle={{
                                backgroundColor: Colors.secondary,
                                borderTopStartRadius: 10,
                                borderTopEndRadius: 10,
                            }}
                            activeTextStyle={{
                                fontFamily: "Cabin-Regular",
                                fontSize: 13,
                                color: "white",
                            }}
                            tabStyle={{
                                backgroundColor: Colors.primary,
                                borderTopStartRadius: 10,
                                borderTopEndRadius: 10,
                            }}
                            textStyle={{
                                fontFamily: "Cabin-Regular",
                                fontSize: 13,
                                color: Colors.white,
                            }}
                        >
                            <ScrollView
                                nestedScrollEnabled={true}
                                style={{
                                    marginTop: 20,
                                    height: Dimensions.get("window").height,
                                    flex: 1,
                                }}
                                showsVerticalScrollIndicator
                                //contentContainerStyle={{flex:1}}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        padding: 10,
                                        color: Colors.secondary,
                                        fontFamily: "Cabin-Regular",
                                    }}
                                >
                                    {policies}
                                </Text>
                            </ScrollView>
                        </Tab>
                        <Tab
                            heading="Reglas de negocio"
                            activeTabStyle={{
                                backgroundColor: Colors.secondary,
                                borderTopStartRadius: 10,
                                borderTopEndRadius: 10,
                            }}
                            activeTextStyle={{
                                fontFamily: "Cabin-Regular",
                                fontSize: 11,
                                color: "white",
                            }}
                            tabStyle={{
                                backgroundColor: Colors.primary,
                                borderTopStartRadius: 10,
                                borderTopEndRadius: 10,
                            }}
                            textStyle={{
                                fontFamily: "Cabin-Regular",
                                fontSize: 11,
                                color: Colors.white,
                                textAlign: "center",
                            }}
                        >
                            <ScrollView
                                nestedScrollEnabled={true}
                                style={{
                                    marginTop: 20,
                                    height: Dimensions.get("window").height,
                                    flex: 1,
                                }}
                                showsVerticalScrollIndicator
                                //contentContainerStyle={{flex:1}}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        padding: 10,
                                        color: Colors.secondary,
                                        fontFamily: "Cabin-Regular",
                                    }}
                                >
                                    {businessRules}
                                </Text>
                            </ScrollView>
                        </Tab>
                    </Tabs>
                </View>
            </ScrollView>
        </View>
    );
};

const mapState = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapState)(OrganizationScreen);
