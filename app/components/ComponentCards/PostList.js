import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/colors";
import HTML from "react-native-render-html";
import { Ionicons, Entypo } from "@expo/vector-icons";
//import Video from 'react-native-video';
import { Video } from "expo-av";

import ModalGalery from "../modal/ModalGalery";
import ModalComments from "../modal/ModalComments";
import moment from "moment";


const PostList = ({postList, userId, onRefresh, refresh}) => {
    console.log('posts',postList)
    const [modalImages,setModalImages] = useState(false);
    const [media, setMedia] = useState([]);
    const [modalComment, setModalComment] = useState(false);
    const [comments, setComments] = useState([]);
    const [countReaction,setcountReactions] = useState(0);

    const changeInfoModal = (images) => {
        setModalImages(true)
        setMedia(images)
    }

    const renderTagPerson = (personas) => {
        if(personas.length > 0){
            return personas.map(persona => (
                <View style={styles.contentTag}>
                    <Text style={{color:Colors.bluelinks}}>{persona.first_name} {persona.flast_name} {persona.mlast_name}</Text>
                </View>
            ))
        }
    }

    const showComments = (comments, reactions) => {
        setModalComment(true);
        setComments(comments);
        setcountReactions(reactions)
    }

    const getReactions = (post) => {
        const myReaction = post.reactions.find(reaction => reaction.owner.khonnect_id === userId);
        const reactions =[];
        post.reactions.forEach(item => reactions.push(item));
        const nameUsers = [];

        if(myReaction) nameUsers.push('Tú')
        let counterNames = 0;
        reactions.forEach(reaction => {
            if(reaction.owner.khonnect_id !== userId && counterNames <2){
                nameUsers.push(`${reaction.owner.first_name} ${reaction.owner.flast_name}`)
                counterNames += 1;
            }
        });

        if(nameUsers.length ==1) nameUsers.push('');

        const totalReactions = reactions.length - nameUsers.length;
        const complement = totalReactions >=1 ? `y ${totalReactions} personas más` : '';
        const shownames = nameUsers.length >=1 ? `${nameUsers[0]}, ${nameUsers[1]}` : '';

        return <Text style={styles.lblCounter}>{shownames} {complement}</Text>

    }

    const PostItem = ({item,index}) => {
        return (
            <View style={styles.card}>
                <TouchableOpacity style={styles.iconFollow}>
                    <Ionicons 
                        name="person-add-outline"
                        size={14}
                        color={Colors.secondary}/>
                </TouchableOpacity>
                <View style={styles.headerCard}>
                    <View style={styles.contImg}>
                        {item.owner.intranet_photo_thumbnail_small != null ? (
                            <Image 
                                style={styles.img} 
                                source={{uri:item.owner.intranet_photo_thumbnail_small }}/>
                        ):(
                            <Image 
                                style={styles.img} 
                                source={require("../../../assets/img/profile-default.jpg")}/> 
                        )}
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.owner}>{item.owner.first_name} {item.owner.flast_name} {item.owner.mlast_name} ({item.owner.nickname})</Text>
                        <Text style={styles.fech}>{moment(new Date(item.timestamp)).format("DD MMMM YYYY hh:mm a")} </Text>
                    </View>
                </View>
                <View  style={styles.separator}/>
                <View style={styles.contentPost}>
                    <HTML
                        source={{ html: item.content }}
                    />
                    <View style={styles.row}>
                        {renderTagPerson(item.tag_person)}
                    </View>
                </View>
                
                <TouchableOpacity 
                    style={{alignItems: 'center', }} 
                    onPress={() => changeInfoModal(item.images)}>
                    {renderImages(item.images,item.video)}
                </TouchableOpacity>          
                
                <View  style={styles.separator}/>
                <View style={{marginLeft:25,marginVertical:20}}>
                    {getReactions(item)}
                </View>
                <View  style={styles.separator}/>
                <View style={styles.contActions}>
                   <TouchableOpacity style={styles.btnActions }>
                    <Ionicons 
                        name="thumbs-up-outline"
                        size={20}
                        color='black'/>
                        <Text style={styles.lblActions}>Me gusta</Text>
                   </TouchableOpacity>
                   <TouchableOpacity 
                    style={styles.btnActions}
                    onPress={() => showComments(item.comments, item.reactions.length)}>
                    <Ionicons 
                        name="chatbubble-ellipses-outline"
                        size={20}
                        color='black'/>
                        <Text style={styles.lblActions}>Ver comentarios</Text>
                   </TouchableOpacity>
                </View>

            </View>  
        )
    };

    const renderImages = (images,videos) => {
        //console.log('images',images,videos)
            return (
                images.length > 0 ? (
                 images.map(image => {
                    return(
                        <View>
                            <Image source={{uri: image.image}} style={{width:250,height:250, resizeMode:'contain'}}/>
                        </View>
                        
                    )
                })
            ):(
                videos.map(video => {
                    console.log(video)
                    return(
                        <View style={{marginBottom:10}}>
                           <Video 
                            source={require("../../../assets/video/LoginConcierge.mp4")}
                            rate={1.0}
                            volume={1.0}
                            isMuted={true}
                            resizeMode="cover"
                            shouldPlay={true}
                            isLooping={false}
                            style={{
                              width:300,height:250
                            }}/>
                        </View>
                    )
                })
            ))
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Publicaciones Khor connect </Text>
            <FlatList 
                data={postList.results}
                contentContainerStyle={{ paddingBottom:150, }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={PostItem}
                onRefresh={() => onRefresh()}
                refreshing={refresh}
            />
            <ModalGalery 
                visible={modalImages}
                setVisible={() => setModalImages(false)}
                galery={media}
            />
            <ModalComments
                visible={modalComment}
                setVisible={() => setModalComment(false)}
                comments={comments}
                reactions={countReaction}
            />

        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.texts,
        //flex:1
    },
    title:{
        fontSize:18,
        fontWeight:'400',
        marginLeft:20,
        marginVertical:15
    },
    card:{
        backgroundColor: Colors.white,
        marginBottom: 15,
        marginHorizontal:8,
        borderRadius: 8,
    },
    headerCard:{
        flexDirection:'row',
        paddingHorizontal:12,
        
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
    },
    column:{
        flexDirection:'column',
        marginBottom:10,
        paddingRight:5,
    },
    owner:{
        fontSize:12,
        fontWeight:'400',
    },
    fech:{
        fontSize:13,
        color:'gray'
    },
    iconFollow:{
        alignSelf:'flex-end', 
        marginRight:10, 
        marginTop:10, 
        borderWidth:1, 
        borderRadius:15, 
        padding:4, 
        borderColor:'gray'
    },
    lbl:{
        fontSize:12,
        fontWeight:'300'
    },
    contentPost:{
        padding:12
    },
    lblCounter:{
        fontSize:11,
        color:Colors.blue
    },
    separator:{
        borderBottomColor:'gray',
        borderBottomWidth:0.5
    },
    contActions:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        marginVertical:10
    },
    lblActions:{
        alignSelf:'center', marginLeft:5
    },
    btnActions:{
        flexDirection:'row'
    },
    row:{
        flexDirection:'row',
        marginTop:10,
        paddingRight:15
    },
    contentTag:{
        backgroundColor:Colors.bluebg, 
        paddingHorizontal:5, 
        paddingVertical:3, 
        borderColor:Colors.blue, 
        borderWidth:0.5
    }
});

export default PostList;