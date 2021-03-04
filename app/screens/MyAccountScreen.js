import React from "react";
import { View, ScrollView, Text, StatusBar } from "react-native";
import ToolbarGeneric from "../components/ToolbarComponent/ToolbarGeneric";

const myArray = [
    {
        id: 1,
        name: 'Noticia 1',
        type: 1,
        description: 'Las relaciones de línea y staff son importantes como modo de vida organizacional, ya que las relaciones de autoridad entre los miembros de una organización afectan necesariamente a la operación de la empresa.',
        image: '',
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

const MyAccountScreen = (props) => {
  const clickAction = () => {
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
        <Text>HOLAA</Text>
      </ScrollView>
    </View>
  );
};
export default MyAccountScreen;
