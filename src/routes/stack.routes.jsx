import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Corpo from '../screens/Corpo';
import Explorar from '../screens/Explorar';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import Planejamento from '../screens/Planejamento';
import Treino from '../screens/Treino';

const HomeStack = createNativeStackNavigator();
export function HomeStackScreen() {
    return (
        <HomeStack.Navigator 
            initialRouteName="HomeStack"
            screenOptions={{headerShown: false}}
        >
            <HomeStack.Screen
                name="HomeStack"
                component={Home} />
            <HomeStack.Screen
                name="Treino"
                component={Treino} />

            {/*Outras telas dessa stack */}
        </HomeStack.Navigator>
    );
}

const ExplorarStack = createNativeStackNavigator();
export function ExplorarStackScreen() {
    return (
        <ExplorarStack.Navigator 
            initialRouteName="ExplorarStack"
            screenOptions={{headerShown: false}}
        >
            <ExplorarStack.Screen 
                name="ExplorarStack" 
                component={Explorar} />

            {/*Outras telas dessa stack */}
        </ExplorarStack.Navigator>
    );
}

const PlanejamentoStack = createNativeStackNavigator();
export function PlanejamentoStackScreen() {
    return (
        <PlanejamentoStack.Navigator 
            initialRouteName="PlanejamentoStack"
            screenOptions={{headerShown: false}}
        >
            <PlanejamentoStack.Screen 
                name="PlanejamentoStack" 
                component={Planejamento} />
            
            {/*Outras telas dessa stack */}
        </PlanejamentoStack.Navigator>
    );
}

const CorpoStack = createNativeStackNavigator();
export function CorpoStackScreen() {
    return (
        <CorpoStack.Navigator 
            initialRouteName="CorpoStack"
            screenOptions={{headerShown: false}}
        >
            <CorpoStack.Screen 
                name="CorpoStack" 
                component={Corpo} />
            
            {/*Outras telas dessa stack */}
        </CorpoStack.Navigator>
    );
}

const PerfilStack = createNativeStackNavigator();
export function PerfilStackScreen() {
    return (
        <PerfilStack.Navigator 
            initialRouteName="PerfilStack"
            screenOptions={{headerShown: false}}
        >
            <PerfilStack.Screen 
                name="PerfilStack" 
                component={Perfil} />

            {/*Outras telas dessa stack */}
        </PerfilStack.Navigator>
    );
}
