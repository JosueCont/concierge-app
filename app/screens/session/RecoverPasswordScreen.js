import {View, ScrollView, StatusBar } from "react-native";
import React from "react";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";

const RecoverPasswordScreen =(props)=>{

    const actionReturn=()=>{
       props.navigation.goBack()
    }
    return(
        <View style={{
            height: '100%',
            zIndex: 1
        }}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="rgba(1,1,1,0)"
                translucent={true}
            />

        <View style={{ height: '100%', width: '100%', zIndex: 2, position: 'absolute'}}>

            {/* Toolbar componenet para mostar el datos del usuario*/}
                <ToolbarGeneric clicAction={actionReturn} nameToolbar={"Menu"} type={1}/>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        zIndex: 0,
                    }}>

                </ScrollView>
          
            </View>
        </View>
    )
}
export default RecoverPasswordScreen;