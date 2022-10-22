import React, { useState } from "react";
import { Text, StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons  } from '@expo/vector-icons';
import { AntDesign  } from '@expo/vector-icons';

export function InputPassword({ iconName, ...rest }) {
    // const [isFocus, setIsFocus] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

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
                secureTextEntry={isPasswordVisible}
                {...rest}
            // onFocus={setIsFocus(state=>!state)}
            />
            <TouchableOpacity onPress={()=>setIsPasswordVisible(prevState=>!prevState)}>
                <View style={styles.iconEye}>
                    <Ionicons 
                        name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                        size={25}
                        color='purple'
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 10,
        width: '100%',
        height: 55,
    },
    iconContainer: {
        height: '100%',
        width: 55,
        justifyContent: 'center',
        alignItems: "center",
        marginRight: 2,
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    iconEye:{
        height: '100%',
        width: 55,
        justifyContent: 'center',
        alignItems: "center",
        marginRight: 2,
        backgroundColor: "#ffffff",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    input: {
        flex: 1, //usa o restante do espaço que sobra
        backgroundColor: "#ffffff",
        padding: 15,
        alignItems: 'center',
    },
    label: {
        paddingLeft: 5,
        color: "#343434",
        fontWeight: '600',
        fontSize: 15
    }
})