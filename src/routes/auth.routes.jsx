// rotas públicas
import React from "react";
import {createStackNavigator} from '@react-navigation/stack'
import { SignIn } from "../pages/SingIn";
import {RegisterUser} from '../pages/RegisterUser'

const {Navigator, Screen} = createStackNavigator();

export function AuthRoutes(){
    return(
        <Navigator screenOptions={{
            headerShown: false,
           
        }}>
            <Screen
                name="SignIn"
                component={SignIn}
            />
            <Screen
                name="RegisterUser"
                component={RegisterUser}
            />
        </Navigator>
    )
}