import React, {useEffect, useState} from "react";
import {TouchableOpacity, StyleSheet, Text} from "react-native";
import {darkerHex} from "../../utils/utils";
import {Colors} from "../../utils/colors";

const Button = (props) => {

    const [colorBackground, setColorBackground] = useState(darkerHex(Colors.purple, 1.5))
    const [colorTexto, setColorTexto] = useState(Colors.white)
    const [mensaje, setMensaje] = useState(props.mensaje)
    const [tam_texto, setTam_texto] = useState(15)

    useEffect(() => {
        if (props.colorBackground) setColorBackground(props.colorBackground);
        if (props.colorTexto) setColorTexto(props.colorTexto);
        if (props.mensaje) setMensaje(props.mensaje);
        if (props.tam_texto) setTam_texto(props.tam_texto);

        if (!!props.app && !props.colorBackground) setColorBackground(darkerHex(Colors.purple, 1.5))


    }, [])

    const repirtcolor=()=>{
        if (props.colorBackground) setColorBackground(props.colorBackground)
        if (props.colorTexto) setColorTexto(props.colorTexto)
        if (props.mensaje) setMensaje(props.mensaje)
        if (props.tam_texto) setTam_texto(props.tam_texto)
    }



    return (

        <TouchableOpacity
            style={[styles.button, {
                backgroundColor: props.disabled ? "gray" : colorBackground,
                borderWidth: 0,
                borderColor: "white"
            }]}
            onPress={props.onPress}
            disabled={props.disabled}
        >
            <Text
                style={{
                    fontSize: tam_texto,
                    color: props.disabled ? "lightgray" : colorTexto,
                    textShadowColor: 'rgba(100, 100, 100, .5)',
                    textShadowOffset: {width: 1, height: 1},
                    textShadowRadius: 1
                }}>
                {mensaje}
            </Text>
        </TouchableOpacity>
    )
};
const styles = StyleSheet.create({

    button: {
        height: 40,
        marginTop: 10,
        width: "100%",
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        shadowColor: "rgba(100,100,100,.75)",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        textAlign: 'center',
        justifyContent:'center',
    }
})



export default Button;

