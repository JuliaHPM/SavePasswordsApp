import React from "react";
import { Text, StyleSheet, View } from "react-native";

export function Title({ title, ...rest }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title} {...rest}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        paddingLeft: 5,
        color: "#343434",
        fontWeight: '600',
        fontSize: 19
    }
})