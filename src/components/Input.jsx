import React, { useState } from "react";
import { Text, StyleSheet, TextInput, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export function Input({ iconName, ...rest }) {
    // const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <AntDesign
                    name={iconName}
                    size={25}
                    color='purple'
                />
            </View>
            <TextInput 
            style={styles.input}  
            {...rest} 
            // onFocus={(state)=>setIsFocus(!state)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        marginBottom: 10,
        width:'100%',
        height: 55,
    },
    iconContainer:{
        // height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems:"center",
        marginRight:2,
        backgroundColor: "#ffffff",
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5
    },
    input: {
        flex:1, //usa o restante do espaço que sobra
        backgroundColor: "#ffffff",
        padding: 15,
        alignItems: 'center',
        borderTopRightRadius:5,
        borderBottomRightRadius:5
    },
    label: {
        paddingLeft: 5,
        color: "#343434",
        fontWeight: '600',
        fontSize: 15
    }
})