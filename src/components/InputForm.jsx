import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Input } from "./Input";
import { Control, Controller } from 'react-hook-form';

export function InputForm({ control, name, ...rest }) {
    return (
        <View style={styles.container}>
            {/* controller do react hook para que não fique modificando toda vez que o input mude 
            control: formulário que está controlando
            render: input que vai ser controlado e pode acessar os valores do input*/}
            <Controller
                control={control}
                render={({field: {onChange, value}}) =>{
                    <Input 
                    onChangeText={onChange}
                    value={value}
                    {...rest} />
                }}
                name={name}
            />
                
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%'
    }
})