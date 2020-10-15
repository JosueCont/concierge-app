import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StyleProvider, Button} from "native-base";
import theme from "./app/customTheme/index";


export default function App() {
    return (
        <StyleProvider style={theme()}>
            <View style={styles.container}>
                <View>
                    <Button medium><Text>Hola humano</Text></Button>
                </View>
                <StatusBar style="auto"/>
            </View>
        </StyleProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});