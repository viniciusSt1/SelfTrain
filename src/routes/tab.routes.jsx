import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeStackScreen, ExplorarStackScreen, PlanejamentoStackScreen, CorpoStackScreen, PerfilStackScreen } from "./stack.routes";

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
    return(
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'white', 
                },
            }}
        >
            <Tab.Screen 
                name="HomeTab"
                component={HomeStackScreen}
                options={{
                    tabBarLabel:'Home'
                }}
            />
            <Tab.Screen 
                name="ExplorarTab"
                component={ExplorarStackScreen}
                options={{
                    tabBarLabel:'Explorar'
                }}
            />
            <Tab.Screen 
                name="PlanejamentoTab"
                component={PlanejamentoStackScreen}
                options={{
                    tabBarLabel:'Planejamento'
                }}
            />
            <Tab.Screen 
                name="CorpoTab"
                component={CorpoStackScreen}
                options={{
                    tabBarLabel:'Corpo'
                }}
            />
            <Tab.Screen 
                name="PerfilTab"
                component={CorpoStackScreen}
                options={{
                    tabBarLabel:'Perfil'
                }}
            />
        </Tab.Navigator>
    )
}