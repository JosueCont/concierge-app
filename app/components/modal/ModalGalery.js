import React,{useState,useRef, useEffect} from "react";
import {View,Text, Image, Modal, FlatList, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Colors } from "../../utils/colors";

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen')

const ModalGalery = ({visible, setVisible, galery}) => {
    const [currentIndex,setCurrentIndex]=useState(0);

    useEffect(() => {
        
    },[])

    const getIndicators = (item) => {
        if(!item || typeof item !=='number') return null;
    
        let indicators = [];
        for( let i=0; i<item; i++){
          indicators.push(i);
        }
        return indicators.map((indicator,index) => (
          <View key={indicator} style={[styles.indicator, index === currentIndex ? styles.selected: styles.unSelected]}></View>
        ))
    }

    const change = useRef(item => {
        setCurrentIndex(item.viewableItems[0].index);
    })

    return(
        <Modal 
            animationType={'slide'}
            transparent
            visible={visible}
            onRequestClose={() => {}}
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={setVisible} style={styles.btnClose}>
                    <Ionicons 
                        name="close-outline"
                        size={30}
                        color="white"
                    />
                </TouchableOpacity>
                <FlatList 
                    horizontal
                    pagingEnabled
                    data={galery} 
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={{flex:1}}>
                            <Image source={{uri: item.image}} style={styles.img}/>
                        </View>
                    )}
                    viewabilityConfig={{viewAreaCoveragePercentThreshold: 50,}}
                    onViewableItemsChanged={ change.current }
                    showsHorizontalScrollIndicator={false}
                />
                <View style={styles.indicatorCont}>
                    {getIndicators(galery.length)}
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    btnClose:{
        alignSelf:'flex-end',
        margin:20
    },
    indicatorCont:{
        position:'absolute',
        width,
        bottom:20,
        flexDirection:'row',
        justifyContent:'center',
    },
    indicator:{
        width:10,
        height:10,
        backgroundColor:'white',
        borderRadius:5,
        borderBottomWidth:0.3,
        marginHorizontal:5
    },
    selected:{
      backgroundColor:Colors.white
    },
    unSelected:{
      backgroundColor:'#D9CBBD',
    },
    img:{
        width: width, 
        height:height/1.5, 
        resizeMode:'contain'
    }
});

export default ModalGalery;