import React, {useState} from 'react'
import {NavigationActions} from 'react-navigation';
import {Dimensions} from "react-native";
import {ScrollView, View, StyleSheet, TouchableOpacity, Image, Linking, Text, Platform} from 'react-native';
import {connect} from "react-redux";
import {elevation2} from "../utils/utils";
import {FontAwesome,AntDesign} from '@expo/vector-icons';

const SideMenu = (props) => {

    const [modalVisible, setModalVisible] = useState(false);

    const navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        props.navigation.dispatch(navigateAction);
    };

    const logoutS = ()=> {
        setModalVisible(true)
    }

    return (
        <View style={{flex: 1}}>


            <View style={{zIndex: 5, backgroundColor: "#0985c0"}}>
                <View style={{padding: 16}}>
                    <View style={{minHeight: 25, height: Dimensions.get('window').height * .06}}></View>
                    <View style={{
                        width: Dimensions.get('window').width * .16,
                        height: Dimensions.get('window').width * .16,
                        backgroundColor: 'transparent',
                        borderRadius: 10,
                    }}>


                        <Image
                            resizeMode='contain'
                            style={{borderRadius: 10, height: '100%', width: '100%'}}
                            source={{uri: ""}}
                        />
                    </View>


                            <View>
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('Profile')}
                                >
                                    <Text style={{fontSize: 22, color: 'white', marginTop: 9}}>
                                        Nombre del perfil
                                    </Text>
                                    <Text style={{fontSize: 14, color: 'white', marginTop: 4, opacity: .7}}>
                                        correo del perfil
                                    </Text>
                                </TouchableOpacity>
                            </View>
                </View>
            </View>

            <ScrollView style={{zIndex: 3, flex: 1}}>


                <View style={{padding: 16}}>

                    <TouchableOpacity
                        style={styles.navSectionStyle}
                    >
                        <Text style={styles.navItemStyle}>
                            Home
                        </Text>
                        <View style={{height: Dimensions.get('window').height * .05}}/>
                    </TouchableOpacity>



                    <TouchableOpacity
                        style={styles.navSectionStyle}
                        onPress={navigateToScreen("Home")}
                    >
                        <Text style={styles.navItemStyle}>
                            Mis Notificaciones
                        </Text>
                        <View style={{height: Dimensions.get('window').height * .05}}/>
                    </TouchableOpacity>

                    {[
                        <TouchableOpacity
                            style={styles.navSectionStyle}
                            onPress={navigateToScreen("Home")}
                        >
                            <Text style={styles.navItemStyle}>
                                Mis Cupones
                            </Text>
                            <View style={{height: Dimensions.get('window').height * .05}}/>
                        </TouchableOpacity>,

                        <TouchableOpacity
                            style={styles.navSectionStyle}
                            onPress={navigateToScreen("Reservar")
                            }
                        >
                            <Text style={styles.navItemStyle}>
                                Mis Favoritos
                            </Text>
                            <View style={{height: Dimensions.get('window').height * .05}}/>
                        </TouchableOpacity>,

                        <TouchableOpacity
                            style={styles.navSectionStyle}
                            onPress={navigateToScreen("Reservar")}
                        >
                            <Text style={styles.navItemStyle}>
                                Sucursales
                            </Text>
                            <View style={{height: Dimensions.get('window').height * .05}}/>
                        </TouchableOpacity>,

                    ]}
                </View>

                <View style={{height: Dimensions.get('window').height * .05}}/>
                <Text style={{fontSize: 14, color: "lightgray", paddingHorizontal: 16}}>v1.0.7</Text>
                <View style={{height: Dimensions.get('window').height * .05}}/>

                <View style={{paddingHorizontal: 16}}>
                    <TouchableOpacity
                        style={styles.navSectionStyle}
                        onPress={() => {
                            Linking.openURL("");
                        }}
                    >
                        <Text style={{fontSize: 15, color: 'black', opacity: .7}}>Acerca de</Text>
                    </TouchableOpacity>

                    {/* AVISO DE PRIVACIDAD*/}

                    <TouchableOpacity
                        style={styles.navSectionStyle}
                        onPress={() => {
                            Linking.openURL("");
                        }}
                    >
                        <Text
                            style={{fontSize: 15, color: 'black', marginTop: 20, opacity: .7}}>Aviso de
                            Privacidad</Text>
                    </TouchableOpacity>


                    {/* LOGOUT*/}


                    <TouchableOpacity
                        onPress={
                            () => {}
                        }
                    >
                        <Text style={{fontSize: 15, color: 'black', marginTop: 20, opacity: .7}}>Cerrar sesión</Text>
                    </TouchableOpacity>

                    <View style={{height: Dimensions.get('window').height * .05}}/>
                </View>



            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navItemStyle: {
        color: 'black',
        opacity: .9,
        fontSize: 16,
    },
    navSectionStyle: {
        backgroundColor: 'transparent',
    },
});

export default SideMenu

