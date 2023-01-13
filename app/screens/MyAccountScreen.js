import React, {useEffect, useState, useRef} from "react";
import {
    View,
    ScrollView,
    StatusBar,
    Dimensions,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet, Platform,
    Animated
} from "react-native";
import ToolbarNoLogin from "../components/ToolbarComponent/ToolbarNoLogin";
import {Colors} from "../utils/colors";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Camera} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import {connect} from "react-redux";
import {logOutAction, updateProfile, getProfile} from "../redux/userDuck";
import ModalCustom from "../components/modal/ModalCustom";
import * as mime from "react-native-mime-types";
import LoadingGlobal from "../components/modal/LoadingGlobal";
import ApiApp from "../utils/ApiApp";
import CloseSession from "../components/modal/CloseSession";
import {Thumbnail} from "native-base";
import ModalDeleteDataRequest from "../components/modal/DeleteDataRequest";

const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const MyAccountScreen = (props) => {
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState("");
    const [mLastName, setMLastName] = useState("");
    const [fLastName, setFLastName] = useState("");
    const [person, setPerson] = useState({});
    const [modalCustom, setModalCustom] = useState(false);
    const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
    const [messageCustomModal, setMessageCustomModal] = useState("");
    const [modalLoading, setModalLoading] = useState(false);
    const [closeSession, setCloseSession] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [deletedPerson, setDelete] = useState('');

    useEffect(() => {
        if (props.user && props.user.userProfile) {
            props.user.userProfile.photo
                ? setPhoto({
                    uri: props.user.userProfile.photo,
                })
                : setPhoto(require("../../assets/img/profile-default.png"));
            setName(props.user.userProfile.first_name);
            setFLastName(props.user.userProfile.flast_name);
            setMLastName(props.user.userProfile.mlast_name);
            setPerson(props.user.userProfile);
        } else {
            props.navigation.goBack(null);
        }
    }, []);

    const viewModalCustom = () => {
        modalCustom ? setModalCustom(false) : setModalCustom(true);
    };

    const ViewModalDeleteData = () => {
        setModalDelete(!modalDelete) 
    }

    const clickAction = () => {
        props.navigation.goBack(null);
    };

    const changeAvatar = async () => {
        const resultPermissions = await Camera.requestCameraPermissionsAsync();
        if (resultPermissions.status != "denied") {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Image,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });
            result.type = mime.lookup(result.uri.split("/").pop());
            if (!result.cancelled) {
                setPhoto({
                    uri: result.uri,
                    name: result.uri.split("/").pop(),
                    type: result.type,
                });
                setModalLoading(true);
                uploadImage({
                    uri: result.uri,
                    name: result.uri.split("/").pop(),
                    type: result.type,
                });
            }
        }
    };

    const modalError = () => {
        setMessageCustomModal("Ocurrio un error, intente de nuevo.");
        setIconSourceCustomModal(2);
        setModalCustom(true);
        setModalLoading(false);
    };

    const modalSuccess = () => {
        setMessageCustomModal("Tus datos se actualizaron correctamente.");
        setIconSourceCustomModal(1);
        setModalCustom(true);
        setModalLoading(false);
    };

    const uploadImage = async (image) => {
        try {
            let data = new FormData();
            data.append("id", props.user.userProfile.id);
            data.append("photo", image);
            let response = await ApiApp.updatePhoto(data);
            setTimeout(() => {
                setModalLoading(false);
            }, 1500);
            props.getProfile(props.user).then((res) => {
                if (res != "Error") {
                    modalSuccess();
                } else {
                    modalError();
                }
            });
        } catch (err) {
            modalError();
            setPhoto({
                uri: props.user.userProfile.photo,
            });
        }
    };

    const updateName = () => {
        if (name.trim() === "" || fLastName.trim() === "") {
            setMessageCustomModal("Capture su nombre y primer apellido");
            setIconSourceCustomModal(2);
            setModalCustom(true);
            return;
        }
        person.first_name = name;
        person.flast_name = fLastName;
        person.mlast_name = mLastName;
        if (person != undefined) {
            if (person.node) delete person["node"];
            if (person.department) delete person["department"];
            delete person["jwt_data"];
            delete person["perms"];
            delete person["photo"];
            delete person["job"];
            updatePerson(person);
        }
    };

    const updatePerson = (data) => {
        props.updateProfile(data).then((response) => {
            if (response == "Error" || (response.status && response.status != 200)) {
                setMessageCustomModal("Ocurrio un error, intente de nuevo.");
                modalError();
            } else {
                modalSuccess();
                setName(props.user.userProfile.first_name);
                setFLastName(props.user.userProfile.flast_name);
                setMLastName(props.user.userProfile.mlast_name);
                setPerson(props.user.userProfile);
            }
        });
    };

    const modalCloseSession = () => {
        closeSession ? setCloseSession(false) : setCloseSession(true);
    };

    const deleteData = async() => {
        try {
            ViewModalDeleteData();
            setModalLoading(true);
            const deleted = await ApiApp.deleteUserData({person_id:props.user.userProfile.id});
            if(deleted?.data?.message == 'success') {
                setModalLoading(false)
                setMessageCustomModal("Hemos recibido tu solicitud para la eliminación de tus datos, en las próximas horas tu cuenta de usuario será eliminada")
                setIconSourceCustomModal(1);
                viewModalCustom();
                setDelete(deleted?.data.message);
            }else{
                setModalLoading(false)
                setMessageCustomModal("Ocurrio un error, intente de nuevo.")
                setIconSourceCustomModal(2);
                viewModalCustom();
            }
            
        } catch (e) {
            console.log(e)
        }
    }

    const confirmDeleted = () => {
        viewModalCustom(true);
        deletedPerson != '' ?  props.logOutAction() : null;
    }

    return (
        <View
            style={{
                //flex:1,
                height:windowHeight,
                zIndex: 1,
            }}
        >
            <StatusBar
                barStyle="dark-content"
                backgroundColor="rgba(1,1,1,0)"
                translucent={true}
            />
            <ToolbarNoLogin
                clickAction={clickAction}
                nameToolbar={"Mi Cuenta"}
                type={2}
            />
            <KeyboardAwareScrollView bounces={false}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    style={{
                        backgroundColor: "transparent",
                        zIndex: 20,
                    }}
                >
                    <View>
                        <Image
                            style={{
                                width: "100%",
                                height: windowHeight * 0.46,
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                resizeMode: "stretch",
                                zIndex: -1,
                            }}
                            source={require("../../assets/img/new/fondo_azul.png")}
                        />
                        <View style={styles.ctnPart1}>
                            <TouchableOpacity onPress={() => changeAvatar()}>
                                <Thumbnail  style={styles.imgPrincipal} source={photo}/>
                            </TouchableOpacity>
                            <Text
                                style={{
                                    fontFamily: "Cabin-Regular",
                                    fontSize: 16,
                                    color: Colors.secondary,
                                }}
                                onPress={() => {
                                    changeAvatar();
                                }}
                            >
                                Actualizar foto
                            </Text>
                        </View>
                        <View style={styles.ctnPart2}>
                            <View
                                style={{
                                    width: "100%",
                                    position: "absolute",
                                    top: -4,
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
                            <View style={styles.ctnForm}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nombre(s)"
                                    placeholderTextColor={Colors.secondary}
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    underlineColorAndroid={"transparent"}
                                    onChangeText={(text) => setName(text)}
                                    value={name}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Apellido paterno"
                                    placeholderTextColor={Colors.secondary}
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    underlineColorAndroid={"transparent"}
                                    onChangeText={(text) => setFLastName(text)}
                                    value={fLastName}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Apellido materno"
                                    placeholderTextColor={Colors.bluetitle}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    underlineColorAndroid={"transparent"}
                                    onChangeText={(text) => setMLastName(text)}
                                    value={mLastName}
                                />

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
                                            height: 45,
                                            width: "48%",
                                            borderRadius: 10,
                                            marginTop: 10,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        onPress={() => modalCloseSession()}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: "Cabin-Regular",
                                                color: Colors.white,
                                                fontSize: 16,
                                            }}
                                        >
                                            Cerrar sesión
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            fontFamily: "Cabin-Regular",
                                            backgroundColor: Colors.primary,
                                            height: 45,
                                            width: "48%",
                                            borderRadius: 10,
                                            marginTop: 10,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        onPress={() => updateName()}
                                    >
                                        <Text style={{color: Colors.white, fontSize: 16}}>
                                            Guardar
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity 
                                    style={styles.btnDelete}
                                    onPress={() => ViewModalDeleteData()}>
                                    <Text style={styles.lblDetele}>Solicitar eliminación de mis datos</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate("ChangePasswordScreen");
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Cabin-Regular",
                                            color: Colors.primary,
                                            fontSize: 16,
                                            marginTop: 15,
                                            marginBottom: 0,
                                            textAlign: "center",
                                            textDecorationLine: "underline",
                                        }}
                                    >
                                        Actualizar contraseña
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>

            <ModalCustom
                visible={modalCustom}
                text={messageCustomModal}
                iconSource={iconSourceCustomModal}
                setVisible={() => confirmDeleted()}
            />
            <LoadingGlobal visible={modalLoading} text={"Cargando"}/>
            <CloseSession
                visible={closeSession}
                setVisible={() => modalCloseSession()}
            />
            <ModalDeleteDataRequest 
                visible={modalDelete}
                setVisible={() => ViewModalDeleteData(true)}
                description="¿Desea solicitar la eliminación de sus datos?"
                doRequest={() => deleteData()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    ctnPart1: {
        //height: Platform.OS ==='android'? '33%': '30%',
        textAlign: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    imgPrincipal: {
        width: 180,
        height: 180,
        resizeMode: "cover",
        marginBottom: 10,
        borderColor: Colors.primary,
        borderWidth: 5,
        borderRadius: 90,
    },
    ctnPart2: {
        paddingHorizontal: 20,
        alignItems: "center",
    },
    ctnForm: {
        width: "92%",
        backgroundColor: Colors.white,
        paddingHorizontal: 25,
        paddingTop: 50,
        paddingBottom: 30,
        borderRadius: 40,
    },
    input: {
        fontFamily: "Cabin-Regular",
        fontSize: 16,
        color: Colors.secondary,
        width: "100%",
        borderColor: Colors.primary,
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
    },
    btnDelete:{
        alignSelf:'center', 
        paddingHorizontal:15,
        paddingVertical:10,
        //backgroundColor:Colors.primary,
        borderWidth:1,
        borderColor: Colors.red,
        borderRadius:5,
        marginTop:15
    },
    lblDetele:{
        color:Colors.red, 
        fontFamily: "Cabin-Regular", 
        fontSize:16
    }
});

const mapState = (state) => {
    return {user: state.user};
};

export default connect(mapState, {logOutAction, updateProfile, getProfile})(
    MyAccountScreen
);
