import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {LogBox, StyleSheet, View} from "react-native";
import {Root, Spinner, StyleProvider} from "native-base";
import theme from "./app/customTheme/index";
import {Provider} from "react-redux";
import generateStore from "./app/redux/store";
import Layout from "./app/containers/Layout";
import {useFonts} from "expo-font";
import {Colors} from "./app/utils/colors";

LogBox.ignoreAllLogs(true);
const store = generateStore();

export default function App() {
    const [isReady, setIsReady] = useState(false);

    let [fontsLoaded] = useFonts({
        "Cabin-Bold": require("./assets/fonts/Cabin-Bold.ttf"),
        "Cabin-BoldItalic": require("./assets/fonts/Cabin-BoldItalic.ttf"),
        "Cabin-Italic": require("./assets/fonts/Cabin-Italic.ttf"),
        "Cabin-Medium": require("./assets/fonts/Cabin-Medium.ttf"),
        "Cabin-MediumItalic": require("./assets/fonts/Cabin-MediumItalic.ttf"),
        "Cabin-Regular": require("./assets/fonts/Cabin-Regular.ttf"),
        "Cabin-SemiBold": require("./assets/fonts/Cabin-SemiBold.ttf"),
        "Cabin-SemiBoldItalic": require("./assets/fonts/Cabin-SemiBoldItalic.ttf"),
    });


    return (
            <Provider store={store}>
                <StyleProvider style={theme()}>
                    <Root>
                        <StatusBar
                            barStyle="light-content"
                            backgroundColor="rgba(1,1,1,0)"
                            translucent={true}
                        />
                        {fontsLoaded  ?<Layout/> :<View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Colors.bluetitle
                        }}>
                            <Spinner color={'white'}/>
                        </View>}
                    </Root>
                </StyleProvider>
            </Provider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
