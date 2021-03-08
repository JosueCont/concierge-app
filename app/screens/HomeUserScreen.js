import { View, ScrollView, Text, StatusBar } from "react-native";
import ToolbarGeneric from "../components/ToolbarComponent/ToolbarGeneric";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import ComponentCards from "../components/ComponentCards/ComponentCard";
import { Colors } from "../utils/colors";

const myArray = [
  {
    id: 1,
    type: 2,
    open: false,
    description: "Reunión administrtiva, vía meet en la siguiente liga: staffevolution.com/juntaadmin34",
    image: "",
  },
  {
    id: 2,
    name: "Noticia 1",
    type: 1,
    description:
      "Las relaciones de línea y staff son importantes como modo de vida organizacional, ya que las relaciones de autoridad entre los miembros de una organización afectan necesariamente a la operación de la empresa.",
    image:
      "https://images.pexels.com/photos/3944463/pexels-photo-3944463.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: 3,
    type: 2,
    open: true,
    description: "Reunión administrtiva, vía meet en la siguiente liga: staffevolution.com/juntaadmin34",
    image: "",
  },
  {
    id: 4,
    name: "Noticia 2",
    type: 1,
    description:
      "Las relaciones de línea y staff son importantes como modo de vida organizacional, ya que las relaciones de autoridad entre los miembros de una organización afectan necesariamente a la operación de la empresa.",
    image:
      "https://images.pexels.com/photos/3933958/pexels-photo-3933958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

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
      <ToolbarGeneric clickAction={clickAction} nameToolbar={"Menú"} type={2} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          zIndex: 0,
          backgroundColor: Colors.bluebg,
          paddingHorizontal: 22,
        }}
      >
        <View style={{ alignItems: "center", }}>
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
              Gabriel
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
