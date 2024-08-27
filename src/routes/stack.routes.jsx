import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Corpo from '../screens/Corpo';
import Explorar from '../screens/Explorar';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import Planejamento from '../screens/Planejamento';
import Treino from '../screens/Treino';
import Treinos_agroups from '../screens/Treino_agroups'
import Exercicio from '../screens/Exercicio'
import Questionario from '../screens/Questionario';
import EditarPerfil from '../screens/EditarPerfil'
import EditarMedidas from '../screens/EditarMedidas'
import Treino_agroups from '../screens/Treino_agroups';

const HomeStack = createNativeStackNavigator();
export function HomeStackScreen() {
    return (
        <HomeStack.Navigator 
            initialRouteName="Home"
            screenOptions={{headerShown: false}}
        >
            <HomeStack.Screen
                name="Home"
                component={Home} />
            <HomeStack.Screen
                name="Question"
                component={Questionario}
                options={{ tabBarStyle: { display: 'none' } }} />
            <HomeStack.Screen
                name="Treino" 
                component={Treino} />    
            <HomeStack.Screen
                name="Treino_agroups"
                component={Treino_agroups} />
            <HomeStack.Screen
                name="Exercicio"
                component={Exercicio} />
        </HomeStack.Navigator>
    );
}

const ExplorarStack = createNativeStackNavigator();
export function ExplorarStackScreen() {
    return (
        <ExplorarStack.Navigator 
            initialRouteName="Explorar"
            screenOptions={{headerShown: false}}
        >
            <ExplorarStack.Screen 
                name="Explorar" 
                component={Explorar} />
            <ExplorarStack.Screen
                name="Treino"
                component={Treino} />
            <ExplorarStack.Screen
                name="Exercicio"
                component={Exercicio} />
        </ExplorarStack.Navigator>
    );
}

const PlanejamentoStack = createNativeStackNavigator();
export function PlanejamentoStackScreen() {
    return (
        <PlanejamentoStack.Navigator 
            initialRouteName="Planejamento"
            screenOptions={{headerShown: false}}
        >
            <PlanejamentoStack.Screen 
                name="Planejamento" 
                component={Planejamento} />
            <HomeStack.Screen
                name="Treino_agroups"
                component={Treino_agroups} />  
            <PlanejamentoStack.Screen
                name="Treino"
                component={Treino} />
            <PlanejamentoStack.Screen
                name="Exercicio"
                component={Exercicio} />
        </PlanejamentoStack.Navigator>
    );
}

const CorpoStack = createNativeStackNavigator();
export function CorpoStackScreen() {
    return (
        <CorpoStack.Navigator 
            initialRouteName="Corpo"
            screenOptions={{headerShown: false}}
        >
            <CorpoStack.Screen 
                name="Corpo" 
                component={Corpo} />
            <CorpoStack.Screen
                name="EditarMedidas"
                component={EditarMedidas} />
        </CorpoStack.Navigator>
    );
}

const PerfilStack = createNativeStackNavigator();
export function PerfilStackScreen() {
    return (
        <PerfilStack.Navigator 
            initialRouteName="Perfil"
            screenOptions={{headerShown: false}}
        >
            <PerfilStack.Screen 
                name="Perfil" 
                component={Perfil} />
            <PerfilStack.Screen 
                name="EditarPerfil" 
                component={EditarPerfil} />
            <PerfilStack.Screen 
                name="EditarMedidas" 
                component={EditarMedidas} />

        </PerfilStack.Navigator>
    );
}
