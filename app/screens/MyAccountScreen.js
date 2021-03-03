import React from "react";
import {View, ScrollView, StatusBar } from "react-native";
import ToolbarGeneric from "../components/ToolbarComponent/ToolbarGeneric";
const MyAccountScreen =(props)=>{
     console.log(props.navigation)
    const clickAction=()=>{
        props.navigation.navigate('Main')
    }
     const clickProfile=()=>{

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
                <ToolbarGeneric clickAction={clickAction} nameToolbar={"Mi Cuenta"} type={2}/>

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
export default MyAccountScreen