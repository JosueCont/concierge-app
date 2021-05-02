import { View, ScrollView, Text, StatusBar } from "react-native";
import ToolbarGeneric from "../components/ToolbarComponent/ToolbarGeneric";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ComunicationCard from "../components/ComponentCards/ComunicationCard";
import { Colors } from "../utils/colors";
import ApiApp from "../utils/ApiApp";
import LoadingGlobal from "../components/modal/LoadingGlobal";
import { getProfile, logOutAction } from "../redux/userDuck";
import { registerForPushNotificationsAsync } from "../utils/functions";
import ModalNews from "../components/modal/ModalNews";

const HomeUserScreen = (props) => {
  const [comunications, setComunications] = useState([]);
  const [modalLoading, setModalLoading] = useState(true);
  const [modalNews, setModalNews] = useState(false);
  const [modalItem, setModalItem] = useState({});

  const clickAction = () => {
    props.navigation.toggleDrawer();
  };

  const goHome = () => {
    props.navigation.navigate("Home");
  };

  const clickProfile = () => {
    props.navigation.navigate("ProfileScreen");
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
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

  useEffect(() => {
    getComunication();
  }, [props.user.userProfile]);

  const getComunication = async () => {
    setModalLoading(true);
    try {
      let data = {
        company: props.user.userProfile.node,
        department: props.user.userProfile.department.id,
        gender: props.user.userProfile.gender,
        person_id: props.user.userProfile.id,
        job: props.user.userProfile.job[0].id,
        type_person: props.user.userProfile.person_type,
      };
      console.log(data);
      let response = await ApiApp.getComunication(data);
      setComunications(response.data);
      setTimeout(() => {
        setModalLoading(false);
      }, 1500);
    } catch (err) {
      setTimeout(() => {
        setModalLoading(false);
      }, 1500);
    }
  };

  const headerList = () => {
    return (
      <View
        style={{
          zIndex: 0,
          paddingHorizontal: 22,
          marginBottom: 20,
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
              {props.user.userProfile && props.user.userProfile.first_name}
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
      </View>
    );
  };

  const openModalNews = (value) => {
    modalNews ? setModalNews(false) : setModalNews(true);
    setModalItem(value);
  };
  const changeStatus = (value) => {
    comunications[value.index].is_red = true;
    setModalNews(false);
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
          nameToolbar={"Menú"}
          type={2}
          clickProfile={clickProfile}
          goHome={goHome}
        />

        <ComunicationCard
          cards={comunications}
          props={props}
          headerList={headerList}
          refresh={() => getComunication()}
          modalNews={(value) => openModalNews(value)}
        />
        <LoadingGlobal visible={modalLoading} text={"Cargando"} />
      </View>
      <ModalNews
        visible={modalNews}
        data={modalItem}
        setVisible={(value) => changeStatus(value)}
      />
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapState, { getProfile, logOutAction })(HomeUserScreen);
