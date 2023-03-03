import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
    View, Text, StyleSheet, Image, TouchableOpacity, 
    Dimensions, PanResponder, Animated } from "react-native";
import { Colors } from "../../utils/colors";
import HTML from "react-native-render-html";
import { Ionicons } from "@expo/vector-icons";
//import Video from 'react-native-video';
import { Video } from "expo-av";
import YoutubeIframe from "react-native-youtube-iframe";
import moment from "moment"; 
import ApiApp from "../../utils/ApiApp";
import { Button } from "native-base";

const reactions = [
    {
        name: "Me gusta",
        icon: require("../../../assets/svg/icons/reactions/like.gif"),
        color:'#1257A6'
    },
    {
        name: "Me enoja",
        icon: require("../../../assets/svg/icons/reactions/angry.gif"),
        color:'#ffb548'
    },
    {
        name: "Me asombra",
        icon: require("../../../assets/svg/icons/reactions/wow.gif"),
        color:'#27AD23'
    },
    {
        name: "Me encanta",
        icon: require("../../../assets/svg/icons/reactions/love.gif"),
        color:'#F71414'
    },
    {
        name: "Me divierte",
        icon: require("../../../assets/svg/icons/reactions/fun.gif"),
        color:'yellow'
    },
    {
        name: "Me entristece",
        icon: require("../../../assets/svg/icons/reactions/sad.gif"),
        color:'#0089E5'
    },
    {
        name: "Me interesa",
        icon: require("../../../assets/svg/icons/reactions/interestV2.gif"),
        color:'#60269e'
    }
];

const {width} = Dimensions.get('screen');


const PostItem = ({item,index, userId, changeInfoModal, showComments,following,updateReaction}) => {
    const [currentReaction, setCurrentReaction] = useState(null)
    const [open, setOpen] = useState(false);
    const scaleAnimation = new Animated.Value(0);
    const titleAnimation = new Animated.Value(0);
    const zoomIconAnim = new Animated.Value(0);
    const [isFollow, setFollow] = useState(false);
    const [myReaction, setMyReaction] = useState(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        getFollowers();
        //setReactions();
    },[])

    useEffect(() =>{
        setReactions();
    },[])

    const playerRef = useRef();
    
    const setReactions = () => {
        let val = item.reactions.filter(reaction =>reaction.owner.khonnect_id === userId);
        setMyReaction(val);
        if(val[0]?.id) {
            setCurrentReaction(val[0]?.reaction_type-1);
        }
    }

    const getFollowers = () => {
       const follow = following.filter(follow => follow.khonnect_id === item.owner.khonnect_id);
       if(follow.length > 0) setFollow(true);
    }


    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: (evt, gestureState) => {
            /*const currentMovement = Math.floor(gestureState.dx/30);
            if(currentMovement >= 0 && currentMovement < reactions.length){
                console.log('current',currentMovement)
               setCurrentReaction(currentMovement)
                if(currentMovement != currentReaction) getAnimations(reactions[currentMovement]);
            }else{
                setCurrentReaction(null)
            }
            console.log('evento',currentMovement)*/
          },
          onPanResponderGrant: openDrawer,
          onPanResponderRelease: (e, gestureState) => {
            const currentMovement = Math.floor(gestureState.dx/30);
            if(currentMovement >= 0 && currentMovement < reactions.length){
               setCurrentReaction(currentMovement)
                if(currentMovement != currentReaction) getAnimations(reactions[currentMovement]);
            }else{
                setCurrentReaction(null)
            }
            if(currentMovement >= 0 && currentMovement > reactions.length) setCurrentReaction(6)
            closeDrawer();
            sendReaction(currentMovement);
          },
        }),
    ).current;

    const closeDrawer = () => {
        Animated.spring(scaleAnimation,{
            duration:500,
            toValue:0,
            useNativeDriver: false,
        }).start(() => setOpen(false))
        
    }

    const sendReaction = async(currentMovement) => {
        try {
            if(currentMovement != null){
                let dataSend = {
                    khonnect_id: userId,
                    reaction_type: currentMovement+1,
                    post_id: item.id
                };
               updateReaction(dataSend);
            }else{
                updateReaction(myReaction[0]?.id)
            }
            
        } catch (e) {
            console.log(e)
        }
    }
    

    const openDrawer = () => {
        Animated.timing(scaleAnimation,{
            duration: 100,
            toValue: 1,
            useNativeDriver: true,
        }).start(() => setOpen(true))
    }

    const getAnimations = (movement) => {
        if(movement){
            Animated.parallel([
                Animated.timing(titleAnimation,{
                    duration: 100,
                    toValue:1,
                    useNativeDriver: true,
                }),
                Animated.timing(zoomIconAnim, {
                    duration: 200,
                    toValue: 10,
                    useNativeDriver: true,
                }),
            ]).start();

        }
    }

    const renderTagPerson = (personas) => {
        if(personas.length > 0){
            return personas.map((persona,index) => (
                <View key={index} style={styles.contentTag}>
                    <Text style={{color:Colors.bluelinks}}>{persona.first_name} {persona.flast_name} {persona.mlast_name}</Text>
                </View>
            ))
        }
    }

    const renderImages = (images,videos) => {
            return (
                images.length > 0 ? (
                 images.map((image,index) => {
                    return(
                        <View key={index}>
                            <Image source={{uri: image.image}} style={{width:250,height:250, resizeMode:'contain'}}/>
                        </View>
                        
                    )
                })
            ):(
                videos.map((video,index) => {
                   return video.video != null ? (
                        
                        <View style={{marginBottom:10}} key={index}>
                           <Video 
                            source={{uri:video.video}}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="contain"
                            shouldPlay={false}
                            isLooping={true}
                            useNativeControls
                            style={{
                              width:width/1.1,height:250
                            }}/>
                        </View>

                    ):(
                        <View key={index}>
                            <YoutubeIframe 
                                ref={playerRef}
                                height={250}
                                width={width/1.1}
                                videoId={getVideoUrl(video.video_url)}
                                play={playing}
                                onChangeState={onchangedState}
                                volume={70}
                                allowWebViewZoom={true}
                            />
                        </View>
            
                    )
                })
            ))
    };

    const getVideoUrl = (video) => {
        let getId;
        if(video.includes('shorts')){
            getId = video.split('/').reverse();
        }else{
            getId = video.split('=').reverse();
        }
        return getId[0];
    }

    const onchangedState = useCallback(state => {
        if(state === 'ended') setPlaying(false)
        if(state === 'playing') setPlaying(true)
        if(state === 'paused') setPlaying(false)
    },[])

    const getReactions = (post) => {
        let myReaction = post.reactions.filter(reaction =>reaction.owner.khonnect_id === userId);
        const reactions =[];
        post.reactions.forEach(item => reactions.push(item));
        const nameUsers = [];

        if(myReaction[0]?.id) {
            nameUsers.push('Tú');
        }
        
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

        const findReactionTypes = post.reactions.map(reaction => reaction.reaction_type).sort();
        /*const test = findReactionTypes.reduce((acc, value) => ({
            ...acc,
            [value]: (acc[value] || 0) + 1
         }), {})
        
        */
        const emojis = findReactionTypes.filter((element, index) => {
            return findReactionTypes.indexOf(element) === index;
        }).slice(0,2)

        return (
            <View style={{flexDirection:'row', flex:1, paddingRight:20}}>
                <View style={{marginRight:5, flexDirection:'row'}}>
                    {getTypes(emojis)}
                </View>
                <Text style={styles.lblCounter}>{shownames} {complement}</Text>
            </View>
        );

    }

    const getTypes = (emojis) => {
        return emojis.map((emoji,index) => (
            <Image key={index} source={reactions[emoji-1]?.icon} style={styles.imgEmoji}/>
        ))
    }

    const getIcons = () => {
        let tiltle = titleAnimation.interpolate({
            inputRange: [0, 0.2, 0.8, 1],
            outputRange: ['0deg', '20deg', '-15deg', '0deg'],
          });
          let zoomIconAnimate = zoomIconAnim.interpolate({
            inputRange: [0, 0.2, 0.8, 1],
            outputRange: [1, 2, 1.5, 1],
          });

        return reactions.map((reaction,index) => (
            <Animated.View key={index} style={[styles.reaction,{

            }]}>
                <Text style={styles.txtReaction}>{reaction.name}</Text>
                <Animated.Image source={reaction.icon} style={[styles.imgReaction,{
                    transform:[{scale: zoomIconAnimate}]
                }]}/>
            </Animated.View>
        ))
    }

    const setlike = (reaction) => {
        setCurrentReaction(reaction)
        setTimeout(() => {
            sendReaction(reaction)
        },1000);
    }

    const changeFollow = async(action) => {
        try {
            let dataSend = {
                khonnect_id: userId,
                user_id: item.owner.khonnect_id,
                action
            };
            const update_follow = await ApiApp.followAction(dataSend);
            setFollow(!isFollow)
            
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <View style={styles.card}>
            <TouchableOpacity style={[styles.iconFollow,{
                backgroundColor:isFollow ? Colors.bluelinks : 'white',
                borderColor: isFollow ? Colors.bluebg : 'gray'
                }]}
                onPress={() => isFollow ? changeFollow('unfollow') : changeFollow('follow')}>
                {isFollow ? (
                    <Text style={{fontSize:12, color:'white'}}>Siguiendo</Text>
                ):(
                    <Ionicons 
                        name="person-add-outline"
                        size={14}
                        color={Colors.secondary}/>

                )}
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
                onPress={() => item.images.length > 0 ?changeInfoModal(item.images) : console.log('pressed')}>
                {renderImages(item.images,item.video)}
            </TouchableOpacity>          
            
            <View  style={styles.separator}/>
            <View style={{marginLeft:17,marginVertical:20, paddingRight:10, }}>
                {getReactions(item)}
            </View>
            <View  style={styles.separator}/>
            <View style={styles.contActions}  >
                {open ? (
                    <>
                    <View style={styles.contReactions} {...panResponder.panHandlers} >
                        <Animated.View style={[styles.emojiCont,{transform: [{ translateY: scaleAnimation }]}]}>
                            {getIcons()}
                        </Animated.View>
                    </View>
                    <Text>Desliza el dedo por las reacciones</Text>
                    </>
                ): (
                    <>
               <TouchableOpacity 
                style={styles.btnActions } 
                onPress={()=> currentReaction !=null ? setlike(null) :  setlike(0)} 
                onLongPress={() => openDrawer()}>
                {currentReaction != null  ?(
                    <Image 
                        source={reactions[currentReaction].icon } 
                        style={{width:25,height:25,resizeMode:'contain'}}/>
                ):(
                    <Ionicons 
                        name="thumbs-up-outline"
                        size={20}
                        color='black'/>
                )}
                    <Text style={[
                        styles.lblActions, 
                        {color: currentReaction != null ?  reactions[currentReaction].color :  'black'}]}>
                        {currentReaction != null ? reactions[currentReaction].name : reactions[0].name}
                    </Text>
               </TouchableOpacity>
               <TouchableOpacity 
                style={styles.btnActions}
                onPress={() => showComments(item.reactions.length,item.id)}>
                <Ionicons 
                    name="chatbubble-ellipses-outline"
                    size={20}
                    color='black'/>
                    <Text style={styles.lblActions}>Ver {item.num_comments} comentarios</Text>
               </TouchableOpacity>
                    </>
                )}
            </View>

        </View> 
    )
}

const styles = StyleSheet.create({
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
        color:Colors.blue,
        marginRight:5
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
        flex:1,
        flexDirection:'row',
        marginTop:10,
        paddingRight:20,
        marginRight:15,
        flexWrap:'wrap'
    },
    contentTag:{
        backgroundColor:Colors.bluebg, 
        paddingHorizontal:5, 
        paddingVertical:3, 
        borderColor:Colors.blue, 
        borderWidth:0.5,
        marginRight:5,
        marginBottom:10
    },
    contReactions:{
        position:'absolute',
        bottom:20,
        left:0,
        height:90,
        width: width/1.2,
        marginHorizontal:15,
        justifyContent:'center',
        //backgroundColor:'red',
        zIndex:10
    },
    emojiCont:{
        flexDirection:'row',
        justifyContent:'center',
        paddingRight:10, 
        paddingVertical:5,
        marginHorizontal:10,
        backgroundColor:'white', 
        borderRadius:15,
        shadowColor: "#000",
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 1,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    reaction:{
        flex:1,
        flexDirection:'column', 
        marginLeft:10, 
        alignItems:'center', 
        //justifyContent:'space-between',
        //borderColor:'black',
        //borderWidth:1
    },
    txtReaction:{
        position:'absolute', 
        top:-30, 
        fontSize:8, 
        width:40,
        textAlign:'center'
    },
    imgReaction:{
        width:40,
        height:40, 
        resizeMode:'contain'
    },
    imgEmoji:{
        width:15, 
        height:15, 
        resizeMode:'contain',
    }
});

export default PostItem;