import { View, ScrollView, Text, StatusBar } from "react-native";
import ToolbarGeneric from "../components/ToolbarComponent/ToolbarGeneric";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import ComponentCards from "../components/ComponentCards/ComponentCard";


const myArray = [
{
  id: 1,
  name: 'Noticia 1',
  type: 1,
  description: 'Las relaciones de línea y staff son importantes como modo de vida organizacional, ya que las relaciones de autoridad entre los miembros de una organización afectan necesariamente a la operación de la empresa.',
  image: 'https://us.123rf.com/450wm/alhovik/alhovik1709/alhovik170900031/86481591-antecedentes-de-las-noticias-de-%C3%BAltima-hora-world-global-tv-news-banner-design.jpg?ver=6',
},
  {
      id: 2,
      name: 'Recordatorio',
      type: 2,
      open: false,
      description: 'texto',
      image: '',
  },
  {
      id: 3,
      name: 'Recordatorio',
      type: 2,
      open: true,
      description: 'texto',
      image: '',
  }
]

const HomeUserScreen = (props) => {
  const clickAction = () => {
    alert("hola");
    props.navigation.navigate("Main");
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
      <ToolbarGeneric
        clickAction={clickAction}
        nameToolbar={"Mi Cuenta"}
        type={2}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          zIndex: 0,
        }}
      >
       <ComponentCards cards={myArray}/>
      </ScrollView>
    </View>
  );
};

const mapState = (state) => {
  return {
    user: state.user.userProfile,
  };
};
export default connect(mapState)(HomeUserScreen);
