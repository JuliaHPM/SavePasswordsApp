import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import Constants from 'expo-constants';
import { useAuth } from '../hooks/auth';
import { Title } from '../components/Title';
import { InputPassword } from '../components/InputPassword';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export function RegisterUser({navigation: { goBack }}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {register} = useAuth();

    async function handleRegister() {
        try {
            await register(email, password);
        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => goBack()}>
                <View style={styles.iconEye}>
                    <Ionicons 
                        name="arrow-back"
                        size={25}
                        color='purple'
                    />
                </View>
            </TouchableOpacity>
            <Title title="Cadastro"/>

            <Input
                iconName='mail'
                name="email"
                placeholder="Email"
                value={email}
                onChangeText={(email) => setEmail(email)}
            />
            <InputPassword
                iconName='lock'
                name="password"
                placeholder="Senha"
                value={password}
                onChangeText={(password) => setPassword(password)} />

            {/* <Input /> */}


            <Button onPress={handleRegister} title="Cadastrar" />
        </View>
    );
}

const styles = StyleSheet.create({
   
container: {
    // flex: 1,
    paddingTop: Constants.statusBarHeight,
    marginTop:20,
    backgroundColor: '#F0F2F5',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    padding: 25,
  },
});
