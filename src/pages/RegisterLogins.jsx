import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Alert } from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { InputPassword } from '../components/InputPassword';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants';
import { Title } from '../components/Title';
import { useAuth } from '../hooks/auth';
import { useStorage } from '../contexts/storageContext';
import { storageKey } from '../utils/storageKey';
import { useConnection } from '../hooks/useConnection';
import uuid from 'react-native-uuid';
import { db } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";

export function Register({ navigation }) {

    const { user } = useAuth();
    const { storageData } = useStorage();

    const connected = useConnection();

    const [service, setService] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const asyncStorageKey = storageKey();

    async function handleRegister() {
        if (!service || !username || !password) {
            return
        } else {
            const newData = {
                // id: uuid.v4(),//o firestore já cria um id
                userId: user.id,
                service: service,
                username: username,
                password: password,
            }
            // console.log(newData);


            if (connected) { //salvar no firestore se conectado:
                saveOnFirestore(newData);
            } else {//quando não estiver conectado, salvar no storage e depois quando voltar a conexão, salvar no banco
                // pegar o que já tem no storage e adicionar mais
                // const response = await AsyncStorage.getItem(asyncStorageKey);
                // const parsedData = response ? JSON.parse(response) : []; //se não tiver nenhum registro, vem vazio

                //cria uma nova lista com os dados que já estavam no storage e os novos dados
                const newListData = [
                    ...storageData,
                    newData
                ]

                //salva a nova lista no storage
                await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(newListData));
            }
            //limpa campos
            setService('');
            setUsername('');
            setPassword('');

            navigation.navigate('Home');
        }
    }

    async function saveOnFirestore(data) {
        await addDoc(collection(db, "logins"), data)
            .then((response) => {
                console.log("dados salvos: ", response);
            }).catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        async function saveOfflineData() {
            if (storageData && connected) { //se tiver dados e se tiver conectado salvar na api
                storageData.forEach(data => {
                    saveOnFirestore(data)
                        .then(() => AsyncStorage.removeItem(asyncStorageKey)) //removeAll - remover os dados do storage
                });
            }
        }

        saveOfflineData();
    }, [connected]); //verificar sempre que mudar a conexão

    return (
        <View style={styles.container}>
            <Title title="Registro de logins" />

            <Input
                iconName="appstore-o"
                name="service"
                placeholder="Serviço"
                value={service}
                onChangeText={(service) => setService(service)}
            />

            <Input
                iconName="user"
                name="username"
                placeholder="Usuário"
                value={username}
                onChangeText={(username) => setUsername(username)}
            />

            <InputPassword
                iconName="lock"
                name="password"
                placeholder="Senha"
                value={password}
                onChangeText={(password) => setPassword(password)} />

            <Button onPress={handleRegister} title="Salvar" />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        // flex: 1,
        paddingTop: Constants.statusBarHeight,
        marginTop: 20,
        // backgroundColor: '#F0F2F5',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        padding: 25
    },
});
