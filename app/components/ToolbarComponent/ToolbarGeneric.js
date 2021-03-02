import React from "react";
import {Image, Platform, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../utils/colors";
import { Ionicons,Entypo} from '@expo/vector-icons';
const ToolbarGeneric = (props) => {

    const typeToolbar=(type)=>{
        switch(type){
           
                case 1:
                return(
                    <View style={{alignItems:'center',width: '100%'}}>
            <View style={{
                        top: Platform.OS === 'ios' ? -10 :0,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{flex: 1,alignItems:'center'}}>
    
                            <TouchableOpacity onPress={()=>{
                            props.clicAction()
                            }}>
                                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Entypo name="menu" size={30} color="blue"/>
                                    <Text style={{marginLeft:20,color: Colors.orange, fontSize: 14}}>{props.nameToolbar}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1,alignItems:'center'}}>
                            <TouchableOpacity>
                                <Image source={require('../../../assets/img/logo-staff.png')} resizeMode={'contain'} style={{height: 60, width: 60}}/>
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