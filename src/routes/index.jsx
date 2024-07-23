import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import Inicio from '../screens/Inicio';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro'
import TabRoutes from './tab.routes';

const InicioStack = createNativeStackNavigator();
export default function Routes() {
    // Configurando fontes do aplicativo
    const [loaded, error] = useFonts({
        'Actor': require('../assets/fonts/Actor-Regular.ttf'),
        'Inter': require('../assets/fonts/Inter-Regular.ttf'),
        'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
        'RobotoCondensed': require('../assets/fonts/RobotoCondensed-Medium.ttf'),
        'Rubik': require('../assets/fonts/Rubik-Regular.ttf'),
        'Tauri': require('../assets/fonts/Tauri-Regular.ttf'),
        'Timmana': require('../assets/fonts/Timmana-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded || error)
            SplashScreen.hideAsync();
    }, [loaded, error]);


    if (!loaded && !error)
        return null;

    return (
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
                <InicioStack.Screen
                    name="App"
                    component={TabRoutes}
                />
            </InicioStack.Navigator >
        </NavigationContainer>
    )
}