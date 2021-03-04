import {
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  StatusBar,
  ImageBackground,
} from "react-native";
import React from "react";
import { FontAwesome } from '@expo/vector-icons'; 

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ComponentCards = (props) => {
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ backgroundColor: 'white', width: '100%',margin:10}}>
        {item.type === 1 ? (
          <View style={{ paddingBottom: 10 }}>
            <View>
              <ImageBackground source={{uri:item.image}} style={{ width: windowWidth/2, height: windowWidth / 2, borderRadius: 10, }}>
                <View>
                    <FontAwesome name="newspaper-o" size={24} color="white" />
                  <Text>Noticia</Text>
                </View>
              </ImageBackground>
            </View>
            <View></View>
          </View>
        ) : 
        (
            <View style={item.open ?  styles.itemOpen: styles.itemClose}>
              <View>
                  <View>
                      <FontAwesome name="newspaper-o" size={24} color="white" />
                    <Text>Noticia</Text>
                  </View>
              </View>
              <View></View>
            </View>
          )
        
        }
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style = {{ padding: 10,  }}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  itemOpen:{
      backgroundColor: 'red'
  },
  itemClose:{
    backgroundColor: 'green'
},
});

export default ComponentCards;
