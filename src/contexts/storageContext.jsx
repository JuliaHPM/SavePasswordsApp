import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { storageKey } from "../utils/storageKey";

const StorageContext = createContext([]);

function StorageProvider({ children }) {
    const [storageData, setStorageData] = useState('');
    const asyncStorageKey = storageKey();

    async function removeAll(key) {
        await AsyncStorage.removeItem(key);
        setStorageData([]); //não precisaria, ver porque não 'chama' o useEffect
    }

    async function loadStorageData(key) {
        const storageDataString = await AsyncStorage.getItem(key);
        console.log('dados no loadStorageData', storageDataString );

        if (storageDataString) {
            const storageDataJson = JSON.parse(storageDataString);
            setStorageData(storageDataJson);
        } else {
            setStorageData([]);
        }
    }

    useEffect(() => {
        loadStorageData(asyncStorageKey);
    }, []);

    

    return (
        <StorageContext.Provider value={{
            storageData,
            removeAll,
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

