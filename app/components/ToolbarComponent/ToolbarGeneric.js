import React from "react";
import {Alert, Image, Platform, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../utils/colors";
import { Ionicons,Entypo} from '@expo/vector-icons';
const ToolbarGeneric = (props) => {

    const typeToolbar=(type)=>{
        switch(type){
           
                case 1:
                    return(
                        <View style={{alignItems:'center',width: '100%'}}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center', 
                                width: '90%',
                                top:20, 
                            }}>
                                <View style={{backgroundColor:'red'}}>
                                    <TouchableOpacity onPress={()=>{
                                    props.clicAction()
                                    }}>
                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                            <Ionicons name="ios-arrow-back" size={30} color={Colors.bluetitle}/>
                                            
                                            <Text style={{marginLeft:20,color: Colors.bluelinks, fontSize: 14}}>{props.nameToolbar}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex: 1,alignItems:'center', position: 'absolute', left: 0, right: 0,  margin: 'auto', zIndex: 2, }}>
                                    <TouchableOpacity>
                                        <Image source={require('../../../assets/img/staff_evolution.png')} resizeMode={'contain'} style={{height: 60, width: 60}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{}}>
                                    <TouchableOpacity style={{ borderColor: Colors.bluelinks, borderWidth: 4, borderRadius: 50, overflow: 'hidden', }}> 
                                        <Image source={require('../../../assets/img/perfil.png')} resizeMode={'contain'} style={{height: 60, width: 60,}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> 
                    )
                break;  

                case 2:
                    return(
                        <View style={{alignItems:'center',width: '100%'}}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center', 
                                width: '90%',
                                top:20, 
                            }}>
                                <View style={{}}>
                                    <TouchableOpacity onPress={()=>{
                                        alert("dwdwwdw")
                                    }}>
                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                            <Entypo name="menu" size={30} color={Colors.bluetitle}/>
                                            <Text style={{marginLeft:10,color: Colors.bluelinks, fontSize: 14}}>{props.nameToolbar}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex: 1,alignItems:'center', position: 'absolute', left: 0, right: 0,  margin: 'auto', zIndex: 2, }}>
                                    <TouchableOpacity>
                                        <Image source={require('../../../assets/img/staff_evolution.png')} resizeMode={'contain'} style={{height: 60, width: 60}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{}}>
                                    <TouchableOpacity style={{ borderColor: Colors.bluelinks, borderWidth: 4, borderRadius: 50, overflow: 'hidden', }}> 
                                        <Image source={require('../../../assets/img/perfil.png')} resizeMode={'contain'} style={{height: 60, width: 60,}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> 
                    )
                break;  

                case 3:
                    return(
                        <View style={{alignItems:'center',width: '100%'}}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center', 
                                width: '90%',
                                top:20, 
                            }}>
                                <View style={{}}>
                                    <TouchableOpacity onPress={()=>{
                                        props.navigation.goBack()
                                    }}>
                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                            <Ionicons name="ios-arrow-back" size={30} color={Colors.bluetitle}/>
                                            <Text style={{marginLeft:20,color: Colors.bluelinks, fontSize: 14}}>{props.nameToolbar}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex: 1,alignItems:'center', position: 'absolute', left: 0, right: 0,  margin: 'auto', zIndex: 2, }}>
                                    <TouchableOpacity>
                                        <Image source={require('../../../assets/img/staff_evolution.png')} resizeMode={'contain'} style={{height: 60, width: 60}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{}}>
                                    <TouchableOpacity style={{ borderColor: Colors.bluelinks, borderWidth: 4, borderRadius: 50, overflow: 'hidden', }}> 
                                        <Image source={require('../../../assets/img/perfil.png')} resizeMode={'contain'} style={{height: 60, width: 60,}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> 
                    )
                    break;  

                break;
                default:
                    <View style={{
                        top: Platform.OS === 'ios' ? -10 : 0,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    </View>
                break;
        }

    }
    return (
        <View style={{
            height: '18%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.white,
        }}>
            {typeToolbar(props.type)}
        </View>
    )
}
export default ToolbarGeneric;