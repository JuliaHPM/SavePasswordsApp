import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "../hooks/auth";
// import { Alert } from "react-native";

const StorageContext = createContext([]);

function StorageProvider({ children }) {

    const { user } = useAuth();

    const storageKeyData = `@savepasswords:acessos_user:${user.id}`; //dados que virão do banco
    // const storageKeyNewDataOffline = `@savepasswords:newDataOffline:${user.id}`; //dados para serem salvos no banco quando conectar com a internet
    // const storageKeyDataToRemoveOffline = `@savepasswords:listToRemoveOffline:${user.id}`; //dados que deverão ser excluidos do banco quando conectado

    const [storageData, setStorageData] = useState('');

    async function removeAll(key) {
        await AsyncStorage.removeItem(key);
        setStorageData([]); //não precisaria, ver porque não 'chama' o useEffect
    }

    async function saveStorage(key, data) {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    }

    async function loadStorageData(key) {
        const storageDataString = await AsyncStorage.getItem(key);
        // console.log('dados no loadStorageData', storageDataString);

        if (storageDataString) {
            const storageDataJson = JSON.parse(storageDataString);
            setStorageData(storageDataJson);
            return storageDataJson;
        } else {
            setStorageData([]);
            return [];
        }
    }

    useEffect(() => {
        loadStorageData(storageKeyData);
    }, []);

    return (
        <StorageContext.Provider value={{
            storageData,
            setStorageData,
            // loadStorageData,
            removeAll,
            saveStorage,
            storageKeyData,

        }}>
            {/* value: passa o valor atual */}
            {children}
        </StorageContext.Provider>
    )
}

function useStorage() {
    const context = useContext(StorageContext);

    return context;
}

export { StorageProvider, useStorage }

