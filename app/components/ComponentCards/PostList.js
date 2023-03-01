import React, { useState, useRef, useEffect } from "react";
import { 
    View, Text, StyleSheet, FlatList, Image, TouchableOpacity, 
    Dimensions, PanResponder, Animated } from "react-native";
import { Colors } from "../../utils/colors";
//import Video from 'react-native-video';
import { Video } from "expo-av";

import ModalGalery from "../modal/ModalGalery";
import ModalComments from "../modal/ModalComments";
import moment from "moment"; 
import PostItem from "./PostItem";
import axios from 'axios';

const {width} = Dimensions.get('screen');


const PostList = ({postList, userId, onRefresh, refresh, following, updateReaction}) => {
    const [modalImages,setModalImages] = useState(false);
    const [media, setMedia] = useState([]);
    const [modalComment, setModalComment] = useState(false);
    const [countReaction,setcountReactions] = useState(0);
    const [postId, setPostId] = useState(null);    

    const changeInfoModal = (images) => {
        setModalImages(true)
        setMedia(images)
    }

    
    const showComments = (reactions,postId) => {
        setModalComment(true);
        setcountReactions(reactions);
        setPostId(postId)
    } 
   
    return(
        <View style={styles.container}>
            <FlatList 
                data={postList.results}
                contentContainerStyle={{ paddingBottom:50, }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item,index})=>(
                    <PostItem 
                        item={item} 
                        index={index} 
                        userId={userId} 
                        changeInfoModal={(images)=> changeInfoModal(images)} 
                        showComments={(comments,postId) => showComments(comments,postId)}
                        following={following}
                        updateReaction={updateReaction}
                        />
                )}
                onRefresh={() => onRefresh()}
                refreshing={refresh}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Text style={styles.title}>Publicaciones Khor connect </Text>}
                //initialNumToRender={10}
            />
            <ModalGalery 
                visible={modalImages}
                setVisible={() => setModalImages(false)}
                galery={media}
            />
            <ModalComments
                visible={modalComment}
                setVisible={() => setModalComment(false)}
                reactions={countReaction}
                postId={postId}
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
});

export default PostList;