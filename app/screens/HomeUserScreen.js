import { View, ScrollView, Text, StatusBar } from "react-native";
import ToolbarGeneric from "../components/ToolbarComponent/ToolbarGeneric";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ComponentCards from "../components/ComponentCards/ComponentCard";
import { Colors } from "../utils/colors";
import ApiApp from "../utils/ApiApp";
import LoadingGlobal from "../components/modal/loadingGlobal";
import { getProfile, logOutAction } from "../redux/userDuck";

const HomeUserScreen = (props) => {
  const [comunications, setComunications] = useState([]);
  const [modalLoading, setModalLoading] = useState(true);

  const clickAction = () => {
    props.navigation.toggleDrawer();
  };

  useEffect(() => {
    props.getProfile(props.user).then((response) => {
      if (response.id) {
        getComunication();
      } else if (response == "Error") {
        setTimeout(() => {
          setModalLoading(false);
          props.logOutAction();
        }, 1000);
      }
    });
  }, []);

  const getComunication = async () => {
    try {
      let response = await ApiApp.getComunication();
      setComunications(response.data.results);
      setModalLoading(false);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
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
      {/* Toolbar componenet para mostar el datos del usuario*/}
      <ToolbarGeneric clickAction={clickAction} nameToolbar={"Menú"} type={2} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          zIndex: 0,
          backgroundColor: Colors.bluebg,
          paddingHorizontal: 22,
        }}
      >
        <View style={{ alignItems: "center" }}>
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
              Hola
            </Text>
            <Text
              style={{
                fontFamily: "Cabin-Bold",
                color: Colors.bluetitle,
                fontSize: 28,
                marginLeft: 5,
              }}
            >
              {props.user && props.user.first_name}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Cabin-Regular",
              color: Colors.bluetitle,
              fontSize: 30,
              textAlign: "center",
            }}
          >
            Te mantenemos informado
          </Text>
        </View>
        <ComponentCards cards={comunications} />
      </ScrollView>
      <LoadingGlobal visible={modalLoading} text={"Cargando"} />
    </View>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapState, { getProfile, logOutAction })(HomeUserScreen);
