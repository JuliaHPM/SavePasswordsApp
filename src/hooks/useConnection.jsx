import React, { useCallback, useEffect, useState } from "react";
import { useNetInfo } from '@react-native-community/netinfo';
// import { useFocusEffect } from "@react-navigation/native";

export function useConnection() {
    const netInfo = useNetInfo();
    const [connected, setConnected] = useState();

    useEffect(() => {
        if (netInfo.isConnected) {
            setConnected(true);
        } else {
            setConnected(false);
        }
        // console.log("Conexão: ", netInfo.isConnected)
    }, [netInfo.isConnected]);

    return connected
}


