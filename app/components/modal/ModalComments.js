import React,{useState,useRef, useEffect} from "react";
import {View,Text, Image, Modal, FlatList, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/colors";
import HTML from "react-native-render-html";
import moment from "moment";

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen')

const ModalComments = ({visible,setVisible, comments, reactions}) => {
    return(
        <Modal 
            animationType={'slide'}
            transparent
            visible={visible}
            onRequestClose={() => {}}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={setVisible} style={styles.btnClose}>
                        <Ionicons 
                            name="close-outline"
                            size={30}
                            color="white"
                        />
                    </TouchableOpacity>
                    <View style={styles.card}>
                        <View style={styles.lineModal}/>
                        <Text style={styles.title}>Comentarios</Text>
                        <View  style={styles.separator}/>
                        {reactions > 0 ? (
                            <Text style={styles.lblCounter}>Le gustó a {reactions} personas </Text>

                        ):(
                            <Text style={styles.lblCounter}>Nadie ha reaccionado aun</Text>
                        )}
                        <View  style={styles.separator}/>
                        {comments.length > 0 ? (
                            <FlatList 
                                data={comments.reverse()}
                                contentContainerStyle={{ paddingBottom:50,}}
                                keyExtractor={(item) => item.comment.id.toString()}
                                renderItem={({item}) => (
                                    <View style={styles.row}>
                                        <View style={styles.contImg}>
                                            {item.comment.owner.intranet_photo_thumbnail_small != null ? (
                                                <Image 
                                                    style={styles.img} 
                                                    source={{uri:item.comment.owner.intranet_photo_thumbnail_small }}/>
                                            ):(
                                                <Image 
                                                    style={styles.img} 
                                                    source={require("../../../assets/img/profile-default.jpg")}/> 
                                            )}
                                        </View>
                                        <View style={{flexDirection:'column'}}>
                                           <Text>{item.comment.owner.first_name} {item.comment.owner.flast_name} {item.comment.owner.mlast_name}</Text>
                                           <View style={styles.conten}>
                                              <HTML source={{ html: item.comment.content }}/>  
                                           </View>
                                           <Text style={styles.time}>{moment(new Date(item.comment.timestamp)).format("DD MMMM YYYY hh:mm a")}</Text>
                                        </View>
                                    </View>
                                )}
                            />

                        ): <Text style={styles.banner}>No hay comentarios por mostrar</Text>}
                    </View>
                </View>
        </Modal>
    )
}

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
    card:{
        width: width,
        height:height,
        flex:1,
        backgroundColor:Colors.white,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
    },
    lineModal:{
        backgroundColor: Colors.secondary,
        width: 150,
        height: 4,
        position:'absolute',
        top:0,
        alignSelf:'center'
    },
    lblCounter:{
        fontSize:13,
        //color:Colors.blue,
        marginLeft:20,
        marginVertical:10
    },
    separator:{
        borderBottomColor:'gray',
        borderBottomWidth:0.5
    },
    title:{
        fontSize:20,
        fontWeight:'300',
        marginVertical:8,
        alignSelf:'center'
    },
    img:{
        flex:1,
        width:null,
        height:null,
        resizeMode:'contain',
    },
    contImg:{
        width: 30,
        height:30,
        borderRadius:15,
        marginRight:10,
        marginTop:3
    },
    row:{
        flexDirection:'row',
        marginTop:15,
        paddingHorizontal:15,
        alignItems:'flex-start'
    },
    conten:{
        padding:12,
        marginRight:30,
        marginTop:5,
        backgroundColor:Colors.bluebg,
        borderRadius:8
    },
    time:{
        marginLeft:10,
        color:'gray',
        marginTop:3
    },
    banner:{
        alignSelf:'center',
        marginTop:15,
        color:'gray'
    }
})

export default ModalComments;