import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { InputPassword } from '../components/InputPassword';
import Constants from 'expo-constants';
import { Title } from '../components/Title';
import { useAuth } from '../hooks/auth';
import { useStorage } from '../contexts/storageContext';
import { useConnection } from '../hooks/useConnection';
import uuid from 'react-native-uuid';
// import { db, loginsDatabase, saveOnFirestore } from '../config/firebase';
// import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import CryptoES from "crypto-es";

export function Register({ navigation }) {
    const { user } = useAuth();

    const { storageData, storageKeyData, saveStorage } = useStorage();

    const [service, setService] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    async function handleRegister() {
        if (!service || !username || !password) {
            return Alert.alert("Aviso", "Preencha todos os campos!");
        } else {
            const encrypted = CryptoES.AES.encrypt(password, toString(user.password)).toString();
            // const decrypted = CryptoES.AES.decrypt(encrypted, toString(user.password));

            // console.log("encripted: ", encrypted);
            // console.log("decrypted: ", decrypted.toString(CryptoES.enc.Utf8));

            const newData = {
                id: uuid.v4(),
                userId: user.id,
                service: service,
                username: username,
                password: encrypted,
            }
            // console.log(newData);

            const newListData = [
                ...storageData,
                newData
            ]

            //salvar no storage
            saveStorage(storageKeyData, newListData);

            //limpa campos
            setService('');
            setUsername('');
            setPassword('');

            navigation.navigate('Home');
        }
    }



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



    // //dados que vão ser salvos quando voltar a internet
    // const connected = useConnection();

    // const dadosDoBanco = loginsDatabase();
    // console.log("dados do banco", dadosDoBanco);
    // console.log("dados do storage", storageData);

    // if (connected) { //salvar no firestore se conectado:
            //     // saveOnFirestore(newData);
            // } else {//quando não estiver conectado, salvar no storage e depois quando voltar a conexão, salvar no banco
            //     // pegar o que já tem no storage e adicionar mais
            //     // const storageNewDataOffline = loadStorageData(storageKeyNewDataOffline);
            //     // const response = await AsyncStorage.getItem(asyncStorageKey);
            //     // const parsedData = response ? JSON.parse(response) : []; //se não tiver nenhum registro, vem vazio

            //     //cria uma nova lista com os dados que já estavam no storage e os novos dados
            //     const newListData = [
            //         ...storageNewDataOffline,
            //         newData
            //     ]

            //     //salva a nova lista no storage
            //     saveStorage(storageKeyNewDataOffline, newListData);
            // }