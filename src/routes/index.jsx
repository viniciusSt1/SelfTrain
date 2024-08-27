import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import { useContext, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import UserContext from '../contexts/UserContext';

import Inicio from '../screens/Inicio';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro'
import TabRoutes from './tab.routes';

const InicioStack = createNativeStackNavigator();
export default function Routes() {
    const { user } = useContext(UserContext)

    // Configurando fontes do aplicativo
    const [loaded, error] = useFonts({
        'Actor': require('../assets/fonts/Actor-Regular.ttf'),
        'Inter': require('../assets/fonts/Inter-Regular.ttf'),
        'RobotoCondensed': require('../assets/fonts/RobotoCondensed-Medium.ttf'),
        'Rubik': require('../assets/fonts/Rubik-Regular.ttf'),
        'Tauri': require('../assets/fonts/Tauri-Regular.ttf'),
        'Timmana': require('../assets/fonts/Timmana-Regular.ttf'),
        'Outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded || error)
            SplashScreen.hideAsync();
    }, [loaded, error]);


    if (!loaded && !error)
        return null;

    return user ? (
        <NavigationContainer>
            <TabRoutes />
        </NavigationContainer>
    ) : (
        <NavigationContainer>
            <InicioStack.Navigator
                initialRouteName="InicioStack"
                screenOptions={{ headerShown: false }}
            >
                <InicioStack.Screen
                    name="InicioStack"
                    component={Inicio}
                />
                <InicioStack.Screen
                    name="Login"
                    component={Login}
                />
                <InicioStack.Screen
                    name="Cadastro"
                    component={Cadastro}
                />
            </InicioStack.Navigator >
        </NavigationContainer>
    )
}