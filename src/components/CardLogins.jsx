import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CryptoES from "crypto-es";
import { useAuth } from '../hooks/auth';

export function CardLogins({ acesso, handleRemoveData }) { //service, user, password, id
    const [visibilityPassword, setVisibilityPassword] = useState(true);
    const { user } = useAuth();

    function decrypted (password){
        const passDecripted = CryptoES.AES.decrypt(password, toString(user.password));
        return passDecripted.toString(CryptoES.enc.Utf8)
    } 

    return (
        <TouchableOpacity 
        activeOpacity={0.7}
        style={styles.cardContainer} 
        onPress={() => setVisibilityPassword(prevState=>!prevState)}
        > 
            
                <View>
                    <Text style={styles.service}>{acesso?.service}</Text>
                    <View style={styles.containerInfo}>
                        <Text style={styles.label}>Usuário</Text>
                        <Text style={styles.data}>{acesso?.username}</Text>
                    </View>

                    <View style={styles.containerInfo}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput editable={false} style={styles.data} value={decrypted(acesso?.password)} secureTextEntry={visibilityPassword}/>
                    </View>
                </View>

                <TouchableOpacity onPress={() => handleRemoveData(acesso?.id)}>
                    <Feather
                        name="trash"
                        size={20}
                        color='purple'
                    />
                </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '90%',
        backgroundColor: '#FFF',
        marginVertical: 5,
        paddingVertical: 15,
        paddingHorizontal:25,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    label: {
        color: 'gray',
        paddingRight: 5
    },
    service: {
        fontSize: 17,
        fontWeight: '800',
        color: '#bf4ae2' //9e6eec  bf4ae2
    },
    data: {
        fontSize: 16,
        fontWeight: '400',
        color: "#000000"
    },
    containerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2
    }
})