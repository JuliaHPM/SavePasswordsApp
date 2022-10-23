import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import Constants from 'expo-constants';
import { useAuth } from '../hooks/auth';
import { Title } from '../components/Title';
import { InputPassword } from '../components/InputPassword';

export function SignIn({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useAuth();

    async function handleSignIn() {
        if (email && password) {
            try {
                await signIn(email, password);
            } catch (error) {
                console.log(error.message);
                Alert.alert("Erro", "Falha ao realizar login");
            }
        }else{
            Alert.alert("Atenção", "Preencha todos os campos de login!");
        }


    }

    return (
        <View style={styles.container}>
            <View style={styles.centerView}>
                <Text style={styles.title}>Save Passwords App</Text>
                {/* <Text style={styles.subtitle}>Faça login ou cadastre-se para continuar</Text> */}
            </View>
            <Title title="Login" />
            {/* <Button onPress={signInWithGoogle} title="Entrar com Google" /> */}

            {/* login com senha */}
            <Input
                iconName="mail"
                name="email"
                placeholder="Email"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize='none'
                value={email}
                onChangeText={(email) => setEmail(email)}

            />

            {/* <Input
                iconName='mail'
                name="email"
                placeholder="Email"
                value={email}
                onChangeText={(email) => setEmail(email)}
            /> */}

            <InputPassword
                iconName="lock"
                // label="Senha"
                name="password"
                placeholder="Senha"
                value={password}
                onChangeText={(password) => setPassword(password)} />


            <Button onPress={handleSignIn} title="Entrar" />

            <View style={styles.centerView}>
                <Text>Não possui cadastro?
                    <TouchableOpacity
                        style={styles.buttonCadastro}
                        onPress={() => navigation.navigate('RegisterUser')}
                    >
                        <Text style={styles.textCadastro}>Cadastrar-se</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        // flex: 1,
        paddingTop: Constants.statusBarHeight,
        marginTop: 20,
        backgroundColor: '#F0F2F5',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        padding: 20
    },
    centerView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        paddingVertical: 60,
        paddingHorizontal: 30,
        color: '#805cb9'
    },
    subtitle: {
        fontSize: 16,
        padding: 10
    },
    buttonCadastro: {
        // flexDirection:'row',
        alignItems: 'center',
        paddingLeft: 5,
        // padding:0,
        // margin: 0
    },
    textCadastro: {
        fontWeight: 'bold',

    }
});
