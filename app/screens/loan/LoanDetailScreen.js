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
} from "react-native";
import { Colors } from "../../utils/colors";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import LoanCardDetail from "../../components/ComponentCards/LoanCardDetail";
import ModalCustom from "../../components/modal/ModalCustom";
import LoadingGlobal from "../../components/modal/LoadingGlobal";
import ApiApp from "../../utils/ApiApp";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const LoanDetailScreen = (props) => {
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [loansDetail, setLoansDetail] = useState([]);

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

  useEffect(() => {
    if (props.navigation.getParam("id")) getLoanDetail();
  }, [props]);

  const getLoanDetail = async () => {
    try {
      setModalLoading(true);
      setLoansDetail([]);
      let response = await ApiApp.getLoanDetail(
        props.navigation.getParam("id")
      );
      if (response.status == 200) {
        if (
          response.data.results != undefined &&
          response.data.results.length > 0
        ) {
          setLoansDetail(response.data.results);
          setTimeout(() => {
            setModalLoading(false);
          }, 1000);
        } else {
          setMessageCustomModal("No se encontraron resultados.");
          setIconSourceCustomModal(3);
          setModalCustom(true);
          setModalLoading(false);
          setTimeout(() => {
            clickAction();
          }, 1000);
        }
      }
    } catch (error) {
      setMessageCustomModal("Ocurrio un error, intente de nuevo.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      setModalLoading(false);
      setTimeout(() => {
        clickAction();
      }, 1000);
    }
  };

  const headerList = () => {
    return (
      <View
        style={{
          marginTop: 30,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/img/lending_payment.png")}
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
              fontSize: 24,
              color: Colors.bluetitle,
              textAlign: "left",
            }}
          >
            Historial de pagos
          </Text>
        </View>
      </View>
    );
  };

  const footerList = () => {
    return (
      <>
        {loansDetail.length > 0 && (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.bluelinks,
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
          </View>
        )}
      </>
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
          nameToolbar={"Prestamos"}
          type={1}
          clickProfile={clickProfile}
          goHome={goHome}
        />
        <LoanCardDetail
          props={props}
          clickDetail={(item) => viewModalDetail(item)}
          cards={loansDetail}
          headerList={headerList}
          footerList={footerList}
          type={"permission"}
          extraData={loansDetail}
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

export default LoanDetailScreen;
