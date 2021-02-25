import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StyleProvider, Root} from "native-base";
import theme from "./app/customTheme/index";
import {Provider} from "react-redux";
import generateStore from "./app/redux/store"
import Layout from "./app/containers/Layout";
const store = generateStore()


export default function App() {
    return (
        <Provider store={store}>
        <StyleProvider style={theme()}>
            <Root>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="rgba(1,1,1,0)"
                    translucent={true}
                />
                    <Layout/>
                </Root>
        </StyleProvider>
        </Provider>
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