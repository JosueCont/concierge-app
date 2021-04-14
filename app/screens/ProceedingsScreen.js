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
  Linking,
} from "react-native";
import { Colors } from "../utils/colors";
import ToolbarGeneric from "../components/ToolbarComponent/ToolbarGeneric";
import { connect } from "react-redux";
import ApiApp from "../utils/ApiApp";
import ModalCustom from "../components/modal/ModalCustom";
import LoadingGlobal from "../components/modal/LoadingGlobal";
import ProceedingsCard from "../components/ComponentCards/ProceedingsCard";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const ProceedingsScreen = (props) => {
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [modalLoading, setModalLoading] = useState(true);
  const [documents, setDocuments] = useState([]);

  const clickAction = () => {
    props.navigation.navigate("Main");
  };

  const goHome = () => {
    props.navigation.navigate("Home");
  };

  const clickProfile = () => {
    props.navigation.navigate("ProfileScreen");
  };

  useEffect(() => {
    if (props.user && props.user.userProfile) {
      getDocuments();
    } else {
      props.navigation.goBack(null);
    }
  }, []);

  const getDocuments = async () => {
    try {
      setDocuments([]);
      let response = await ApiApp.getProceedings(props.user.userProfile.id);
      if (response.status == 200) {
        setDocuments(response.data);
        setTimeout(() => {
          setModalLoading(false);
        }, 1500);
      } else {
        setMessageCustomModal("No se encontraron resultados.");
        setIconSourceCustomModal(3);
        setModalCustom(true);
        setModalLoading(false);
      }
    } catch (error) {
      setMessageCustomModal("Ocurrio un error, intente de nuevo.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      setTimeout(() => {
        setModalLoading(false);
        props.navigation.goBack(null);
      }, 1500);
    }
  };

  const DocumentCard = () => {
    return (
      <>
        {documents.map((a) => {
          return <></>;
        })}
      </>
    );
  };

  const headerList = () => {
    return (
      <View
        style={{
          marginTop: 30,
          marginBottom: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/img/rh.png")}
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
              fontSize: 22,
              color: Colors.bluetitle,
              textAlign: "left",
            }}
          >
            Descarga tu{" "}
          </Text>
          <Text
            style={{
              fontFamily: "Cabin-Regular",
              fontSize: 22,
              color: Colors.bluetitle,
              textAlign: "left",
            }}
          >
            documentación para
          </Text>
          <Text
            style={{
              fontFamily: "Cabin-Regular",
              fontSize: 22,
              color: Colors.bluetitle,
              textAlign: "left",
            }}
          >
            cualquier trámite
          </Text>
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
          nameToolbar={"Expediente"}
          type={1}
          clickProfile={clickProfile}
          goHome={goHome}
        />

        {documents && (
          <ProceedingsCard headerList={headerList} cards={documents} />
        )}

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
          source={require("../../assets/img/fondo_azul.png")}
        />
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
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  item: {
    width: windowWidth * 0.37,
    height: windowWidth * 0.37,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Cabin-Regular",
    fontSize: 18,
    color: Colors.bluetitle,
    textAlign: "center",
    marginTop: 15,
  },
});

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(ProceedingsScreen);
