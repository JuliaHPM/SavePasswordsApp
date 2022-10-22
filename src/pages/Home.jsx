import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CardLogins } from '../components/CardLogins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useAuth } from '../hooks/auth';
import { useConnection } from '../hooks/useConnection';
import { MaterialIcons } from '@expo/vector-icons';
import { Title } from '../components/Title';
import { useFocusEffect } from '@react-navigation/native';
import { storageKey } from '../utils/storageKey';
import { useStorage } from '../contexts/storageContext';
import { dataLogins, db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';


export default function Home() {
    const { user, logout } = useAuth();
    const { storageData } = useStorage();

    const [dadosBanco, setDadosBanco] = useState();

    async function dataLogins() {
        
        await getDocs(collection(db, "logins"))
            .then(res => {
                const logins = res.docs.map(doc => ({
                    id: doc.id,
                    service: doc.data().service,
                    password: doc.data().password,
                    username: doc.data().username,
                    userId: doc.data().userId
                }))
                setDadosBanco(logins);
                console.log(logins);
            }).catch(error => console.log(error));

        // return querySnapshot;
        // console.log(querySnapshot);
    }

    const asyncStorageKey = storageKey();
    // const storageKeyListToRemove = storageKey();

    const connected = useConnection();

    const [data, setData] = useState();
    // const [listOffline, setListOffline] = useState([]);

    async function handleRemoveData(id) {
        //remover do banco se tiver conectado, senão? adicionar a uma outra lista para remover depois?


        //remover da lista do storage
        const filteredAcessos = data.filter((acesso) => {
            return acesso.id !== id;
        });
        setData(filteredAcessos);

        //salva a nova lista no storage
        await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(filteredAcessos));


        // if (!connected) {//se tiver online remove do banco 
        //     //funcao para remover do banco

        // } else {//se não guarda em uma lista para quando estiver conectado remover

        //     // pegar o que já tem no storage e adicionar mais
        //     const listToRemoveString = await AsyncStorage.getItem(storageKeyListToRemove);
        //     const listToRemove = listToRemoveString ? JSON.parse(listToRemoveString) : []; //se não tiver nenhum registro, vem vazio

        //     // const newData = {
        //     //     id: id
        //     // }
        //     // //cria uma nova lista com os dados que já estavam no storage e os novos dados
        //     // const newListData = [
        //     //     ...listToRemove,
        //     //     newData //salvar apenas o id para poder remover do banco depois
        //     // ]

        //     listToRemove.push(id);
        //     console.log(listToRemove);

        //     //salva a nova lista no storage
        //     await AsyncStorage.setItem(storageKeyListToRemove, JSON.stringify(listToRemove));
        //     // setListOffline(newListData);
        //     // Alert.alert(newListData);
        // }


    }

    async function getDataStorage() {
        console.log('entrou no getDataStorage');
        const data = await AsyncStorage.getItem(asyncStorageKey);
        const parsedData = data ? JSON.parse(data) : []; //se tiver dados no storage, passar para json
        setData(parsedData); //salvar nos states
        // console.log(parsedData);
    }

    // useEffect(() => {
    //     //se mudar o estado da conexão, ver se tem algo na lista pendente para salvar no banco
    //     if (listOffline.length > 0) {
    //         console.log('Lista de ids para remover:', listOffline);
    //         //funcao do banco para excluir os logins com os ids que estão na lista
    //     }
    // }, [connected]);

    // useEffect(() => {
    //     getDataStorage();
    // }, []);


    //quando a página ficar em focus (quando voltar do registro)
    useFocusEffect(useCallback(() => {
        getDataStorage();
        dataLogins();
    }, []));

    useEffect(() => {
        dataLogins();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>{user.email && user.email}</Text>
                {connected ?
                    <Text>Online</Text>
                    :
                    <Text>Offline</Text>
                }
                <TouchableOpacity onPress={logout}>
                    <MaterialIcons
                        name="logout"
                        size={25}
                        color='purple'
                    />
                </TouchableOpacity>
            </View>


            <Title title="Save Passwords App" />

            {/* <Text>Logins:</Text> */}

            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
                <View style={{ alignItems: 'center' }}>

                    {storageData?.length > 0 ? storageData.map((item, index) => (
                        <CardLogins key={index} acesso={item} handleRemoveData={handleRemoveData} />
                        // id={item.id} service={item.service} user={item.username} password={item.password}
                    ))
                        :
                        <Text>Nenhum registro no storage</Text>
                    }

                    {dadosBanco?.length > 0 ? dadosBanco.map((item, index) => (
                        <CardLogins key={index} acesso={item} handleRemoveData={handleRemoveData} />
                        // id={item.id} service={item.service} user={item.username} password={item.password}
                    ))
                        :
                        <Text>Nenhum registro encontrado no banco</Text>
                    }
                </View>

                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        // marginTop: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        paddingTop: Constants.statusBarHeight,
        // flex: 1,
        height: 75,
        width: '100%',
        // backgroundColor: "#e9cafd",
        // borderBottomWidth:2,
        // borderBottomColor: '#e9cafd',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        // paddingVertical:0,
        margin: 0,
    }
});
