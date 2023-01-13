import React, {useEffect, useState} from "react";
import {Dimensions, Image, Modal, TouchableOpacity, View, StyleSheet} from "react-native";

import {Text} from "native-base";
import {Colors} from "../../utils/colors";

const ModalDeleteDataRequest = ({visible, setVisible, description, doRequest}) => {
    return(
        <Modal 
            animationType={'slide'}
            transparent={true}
            visible={visible}>
            <View style={styles.centeredView}>
                <View style={styles.card}>
                <View style={styles.lineModal}/>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.contBtns}>
                        <TouchableOpacity 
                            style={[styles.btn,{backgroundColor:Colors.green}]}
                            onPress={ doRequest}>
                            <Text style={styles.lbl}>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.btn,{backgroundColor:Colors.red}]}
                            onPress={() => setVisible()}>
                            <Text style={styles.lbl}>Cerrar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
      margin: 20,
      width: "80%",
      backgroundColor: Colors.white,
      borderRadius: 20,
      paddingVertical:30,
      paddingHorizontal: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lineModal:{
      backgroundColor: Colors.secondary,
      width: 80,
      height: 4,
      position:'absolute',
      top:0
    },
    contBtns:{
      width:200,
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:10,
    },
    description:{
      color: Colors.black,
      fontSize: 16
    },
    lbl:{
        color:'white'
    },
    btn:{
        width:90,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:4, 
        borderRadius:4,
    }
});

export default ModalDeleteDataRequest;