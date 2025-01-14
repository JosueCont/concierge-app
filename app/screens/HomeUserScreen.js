import { View, ScrollView, Text, StatusBar, Platform } from "react-native";
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
import PostList from "../components/ComponentCards/PostList";
import {Tab, Tabs} from 'native-base'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationEvents,withNavigationFocus } from 'react-navigation';

const HomeUserScreen = (props) => {
  const [comunications, setComunications] = useState([]);
  const [modalLoading, setModalLoading] = useState(true);
  const [modalNews, setModalNews] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [updateReaction, setUpdateReaction] = useState(false);
  const [intranet, setIntranet] = useState(null);

  const clickAction = () => {
    props.navigation.toggleDrawer();
  };

  const goHome = () => {
    props.navigation.navigate("Home");
  };

  const clickProfile = () => {
    props.navigation.navigate("ProfileScreen",{ returnToRoute: props.navigation.state });
  };

  useEffect(() => {
    getProfileFunction()
  }, []);

  useEffect(() => {
    getComunication();
    setModalLoading(true);
  }, [props.user.userProfile]);

  useEffect(() => {
    getPosts();
    getFollowers();
  }, [props.user.userProfile, updateReaction]);

  const getProfileFunction = async() =>{
    let response = await props.getProfile(props.user)
    try{
      console.log('profile',response)
      getPermisionIntranet()
      const device_id = await registerForPushNotificationsAsync();
      if (response.id) {
        let data = {
          person: response.id,
          mobile_os: Platform.OS == "android" ? 1 : Platform.OS == "ios" && 2,
          device_id: device_id,
        };
        if (device_id && device_id != "") ApiApp.userDevice(data);
        getComunication();
      } else if (response == "Error") {
        setTimeout(() => {
          setModalLoading(false);
          props.logOutAction();
        }, 1000);
      }
    }catch(e){
      console.log(e)
      setTimeout(() => {
        setModalLoading(false);
        props.logOutAction();
      }, 1000);
    }
  }

  const getPermisionIntranet = async() => {
    const permissionIntranet = await AsyncStorage.getItem('intranet');
    setIntranet(Boolean(permissionIntranet));
  }

  const getFollowers = async() => {
    try {
      const followers = await ApiApp.getFolling(props.user?.userProfile?.khonnect_id);
      setFollowing(followers?.data?.following)
    } catch (e) {
      console.log(e)
    }
  }
  

  const getPosts = async() => {
    try {
      const postList = await ApiApp.getPosts(props.user?.userProfile?.node);
      setPosts(postList.data)
    } catch (e) {
      console.log(e)
    }
  }

  const changeReaction = async(data) => {
    try {
      setUpdateReaction(() =>!updateReaction);
      if(data?.post_id){
         const reactionTy = await ApiApp.updateReaction(data);
      }else{
        const deleteReaction = await ApiApp.deleteReaction(data);
      }
      
    } catch (e) {
      console.log(e)
    }
  }

  const getComunication = async (value) => {
    setRefresh(true);
    try {
      let response = await ApiApp.getComunication(props.user.userProfile.id);
      setComunications(response.data.data);

      setTimeout(() => {
        setRefresh(false);
      }, 300);
    } catch (err) {
      setTimeout(() => {
        setRefresh(false);
      }, 300);
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
                color: Colors.secondary,
                fontSize: 28,
              }}
            >
              Hola
            </Text>
            <Text
              style={{
                fontFamily: "Cabin-Bold",
                color: Colors.primary,
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
              color: Colors.secondary,
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
    comunications[value.index].is_read = true;
    setModalNews(false);
  };

  return (
    <View style={{flex:1}}>
      {modalNews && (
        <ModalNews
          visible={modalNews}
          data={modalItem}
          setVisible={(value) => changeStatus(value)}
        />
      )}

        <NavigationEvents
          onWillFocus={payload => console.log('will focus',payload)}
          onDidFocus={payload => console.log(payload,'<- this has your new params')} 
          onWillBlur={payload => console.log('will blur',payload)}
          onDidBlur={payload => console.log('did blur',payload)}
        />
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

        {intranet ? (
          <Tabs locked>
            <Tab 
              heading='Noticias' 
              tabStyle={{ backgroundColor: Colors.secondary, color:'white' }} 
              activeTabStyle={{backgroundColor: Colors.secondary}}>
              <ComunicationCard
                cards={comunications}
                props={props}
                headerList={headerList}
                refresh={(value) => {
                  getComunication(value), setRefresh(true);
                }}
                modalNews={(value) => openModalNews(value)}
                refreshing={refresh}
              />

            </Tab>
            <Tab 
              heading='Khor connect' 
              tabStyle={{ backgroundColor: Colors.secondary }} 
              activeTabStyle={{backgroundColor: Colors.secondary}}>
              <PostList 
                postList={posts} 
                userId={props.user?.userProfile?.khonnect_id}
                onRefresh={(value) => getPosts(value)}
                refresh={refresh}
                following={following}
                updateReaction={(data) => changeReaction(data)}/>
            </Tab>
          </Tabs>
        ):(
          <ComunicationCard
            cards={comunications}
            props={props}
            headerList={headerList}
            refresh={(value) => {
              getComunication(value), setRefresh(true);
            }}
            modalNews={(value) => openModalNews(value)}
            refreshing={refresh}
          />
        )}


      </View>
    </View>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapState, { getProfile, logOutAction })(HomeUserScreen);
