import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function Button({ onPress, title }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={.7}
            style={styles.button}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#c29dfe",
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
    text:{
        color: '#FFF',
        fontWeight: '600',
        fontSize:16
    }
})