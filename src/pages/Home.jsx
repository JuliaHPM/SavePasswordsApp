import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CardLogins } from '../components/CardLogins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useAuth } from '../hooks/auth';
import { useConnection } from '../hooks/useConnection';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Title } from '../components/Title';
import { useFocusEffect } from '@react-navigation/native';
import { useStorage } from '../contexts/storageContext';
import { dataLogins, db, deleteLogin, saveOnFirestore } from '../config/firebase';
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';

export default function Home() {
    const { user, logout } = useAuth();
    const connected = useConnection();
    const {
        storageData,
        setStorageData,
        saveStorage,
        // loadStorageData,
        storageKeyData } = useStorage();

    // const [dadosBanco, setDadosBanco] = useState();

    async function handleBackup() {
        if (connected) {
            // excluir o que tem no banco
            await getDocs(query(collection(db, "logins"), where("userId", "==", user.id)))
                .then(res => {
                // if(res.docs.length < storageData.length){ //não dá pra comparr tamanho porque pode ter excluido dados do storage..
                    res.docs.map(doc => (
                        deleteLogin(doc.id))
                    )
                // }
                }).catch(error => console.log(error));

            //salvar os dados do storage no firebase 
            storageData.map(data => {
                saveOnFirestore(data);
            })

            Alert.alert("Sucesso", "Dados salvos na nuvem!")
        }else{
            Alert.alert("Atenção", "Conecte-se à internet para salvar os dados na nuvem!")
        }
    }

    async function loginsDatabase() {
        //pegar os dados no banco para comparar, 
        //se os dados do async não tiverem dados salvar os dados do banco no storage
        if (connected) {
            await getDocs(query(collection(db, "logins"), where("userId", "==", user.id)))
                .then(res => {
                    const logins = res.docs.map(doc => ({
                        id: doc.id,
                        service: doc.data().service,
                        password: doc.data().password,
                        username: doc.data().username,
                        userId: doc.data().userId
                    }))
                    console.log("entrou no loginsDatabase logins");
                    // setDadosBanco(logins);
                    // console.log(logins);
                    //salvar no state:
                    setStorageData(logins);
                    //salvar no async storage
                    saveStorage(storageKeyData, logins);
                }).catch(error => console.log(error));
        } else{
            console.log("Não conectado");
        }
    }

    async function handleRemoveData(id) {
        //remover do banco se tiver conectado, senão? adicionar a uma outra lista para remover depois?

        //remover da lista do storage
        const filteredAcessos = storageData.filter((acesso) => {
            return acesso.id !== id;
        });
        setStorageData(filteredAcessos);//muda o state

        //salva a nova lista no storage
        saveStorage(storageKeyData, filteredAcessos);
    }

    async function getDataStorage(key) {
        // console.log('entrou no getDataStorage');
        await AsyncStorage.getItem(key).then((data) => {
            const parsedData = data ? JSON.parse(data) : []; //se tiver dados no storage, passar para json
            setStorageData(parsedData); //salvar nos states
            // console.log("data no storage", data);
        }).catch(error => {
            console.log(error);
        });
    }

  //quando a página ficar em focus (quando voltar do registro)
    useFocusEffect(useCallback(() => {
        getDataStorage(storageKeyData);
    }, []));

    useEffect(() => {
        getDataStorage(storageKeyData); //pegar dados do storage
    }, []);

    useEffect(() => {
        //se não tiver dados no storage, procurar no banco e se tiver no banco salvar no storage
        if (storageData.length === 0) { //===0 ou null?
            loginsDatabase();
        }
        // console.log("Conectado? ",connected)
    }, [connected]); //observar a conexão pois no inicio ela vem nula

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>{user.email && user.email}</Text>
                {connected ?
                    <Text>Online</Text>
                    :
                    <Text>Offline</Text>
                }
                
                {/* botão para pegar os dados do banco */}
                {/* <TouchableOpacity onPress={loginsDatabase}>
                    <Ionicons
                        name="cloud-download-outline"
                        size={25}
                        color='purple'
                    />
                </TouchableOpacity> */}
                
                <TouchableOpacity onPress={handleBackup}>
                    <Ionicons
                        name="cloud-upload-outline"
                        size={25}
                        color='purple'
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={logout}>
                    <MaterialIcons
                        name="logout"
                        size={25}
                        color='purple'
                    />
                </TouchableOpacity>
            </View>

            <Title title="Save Passwords App" />

            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
                <View style={{ alignItems: 'center' }}>
                    {/* <Text>dados storage</Text> */}
                    {storageData?.length > 0 ? storageData.map((item, index) => (
                        <CardLogins key={index} acesso={item} handleRemoveData={handleRemoveData} />
                        // id={item.id} service={item.service} user={item.username} password={item.password}
                    ))
                        :
                        <Text>Adicione um login para aparecer aqui</Text>
                    }
                    {/* <Text>dados banco</Text>
                    {dadosBanco?.length > 0 ? dadosBanco.map((item, index) => (
                        <CardLogins key={index} acesso={item} handleRemoveData={handleRemoveData} />
                        // id={item.id} service={item.service} user={item.username} password={item.password}
                    ))
                        :
                        <Text>Nenhum registro encontrado no banco</Text>
                    } */}
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



  //pegar os dados que foram salvos offline e salvar
    // useEffect(() => {
    //     const storageNewDataOffline = loadStorageData(storageKeyNewDataOffline);
    //     //se tiver dados no storage a serem salvos e se tiver conectado salvar na api
    //     async function saveOfflineData() {
    //         if (storageNewDataOffline.length > 0 && connected) { 
    //             console.log("salvando dados no banco");
    //             storageNewDataOffline.forEach(data => {
    //                 saveOnFirestore(data)
    //                     .then(() => AsyncStorage.removeItem(storageKeyNewDataOffline)) //removeAll - remover os dados do storage
    //             });
    //         }
    //     }

    //     saveOfflineData();
    // }, [connected]); //verificar sempre que mudar a conexão

    // useEffect(() => {
    //     //se mudar o estado da conexão, ver se tem algo na lista pendente para salvar no banco
    //     if (listOffline.length > 0) {
    //         console.log('Lista de ids para remover:', listOffline);
    //         //funcao do banco para excluir os logins com os ids que estão na lista
    //     }
    // }, [connected]);
