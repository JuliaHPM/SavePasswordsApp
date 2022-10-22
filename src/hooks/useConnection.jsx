import React, { useEffect, useState } from "react";
import { useNetInfo } from '@react-native-community/netinfo';


export function useConnection() {
    const netInfo = useNetInfo();
    const [connected, setConnected] = useState();

    useEffect(() => {
        if (netInfo.isConnected) {
            setConnected(true);
        } else {
            setConnected(false);
        }
    }, [netInfo.isConnected]);

    return connected
}


