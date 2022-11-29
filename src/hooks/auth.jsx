import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    createUserWithEmailAndPassword,
    // onAuthStateChanged,
    // signOut,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../config/firebase'
import { Alert } from "react-native";

const AuthContext = createContext([]);

function AuthProvider({ children }) {
    const [user, setUser] = useState('');
    const userStorageKey = "@savepasswordapp:user";

    

    async function setUserAsync(user) {
        const userLogged = {
            id: user.uid,
            email: user.email,
            nome: user.displayName,
            photo: user.photoURL
        };
        // console.log(userLogged);
        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
    }

    async function register(email, password) {
        // console.log(email, password);

        return await createUserWithEmailAndPassword(
            auth,
            email,
            password)
        // ).then(() => {
        //     Alert.alert("Conta", "Cadastrado com sucesso!");
        //     console.log(data.user);
        //     // setUserAsync(data.user); //setar no storage e no state
        // }).catch((error) => {
        //     console.log(error.message);
        //     Alert.alert("Erro", "Falha ao realizar cadastro! Erro: ", error);
        // })
        // .finally(()=> setIsLoading(false))

    }

    async function signIn(email, password) {
        try {
            const data = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            // console.log(data.user);
            //setar no storage e no state:
            setUserAsync(data.user);
        } catch (error) {
            console.log(error.message);
            Alert.alert("Atenção", "Erro ao logar!")
        }
    }

    async function logout() {
        // await signOut(auth);
        await AsyncStorage.removeItem(userStorageKey);
        setUser([]); //não precisaria, ver porque não 'chama' o useEffect
    }

    async function loadUserStorageDate() {
        const userStoraged = await AsyncStorage.getItem(userStorageKey);

        if (userStoraged) {
            const userLogged = JSON.parse(userStoraged);
            setUser(userLogged);
        } else {
            setUser([]);
        }
    }

    useEffect(() => {
        loadUserStorageDate();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            register,
            signIn,
            logout
        }}>
            {/* value: passa o valor atual */}
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }


  //pega o usuário que está logado
    // onAuthStateChanged(auth, (currentUser) => {
    //     // setUser(currentUser);
    //     // console.log(currentUser);

    //     setUserAsync(currentUser);
    // })