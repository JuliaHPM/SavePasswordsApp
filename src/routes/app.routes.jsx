// rotas privadas

import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import Home from "../pages/Home";
import { Register } from "../pages/RegisterLogins";


const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
    return (
        // contexto de navegação
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "purple",
                tabBarLabelPosition: "beside-icon",
                tabBarStyle: {
                    height: 60
                }
            }}
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <MaterialIcons
                            name="home"
                            size={size}
                            color={color}
                            // tamanho e cores dinamicas
                        />
                    )
                }}
            />
            <Screen
                name="Registro Logins"
                component={Register}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <MaterialIcons
                            name="post-add"
                            size={size}
                            color={color}
                            // tamanho e cores dinamicas
                        />
                    )
                }}
            />
        </Navigator>
    )
}