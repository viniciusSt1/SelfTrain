import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Foundation from '@expo/vector-icons/Foundation';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useColorScheme } from "react-native";

import { HomeStackScreen, ExplorarStackScreen, PlanejamentoStackScreen, CorpoStackScreen, PerfilStackScreen } from "./stack.routes";
import { colors, grays } from "../screens/styles";

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
    const isLightMode = useColorScheme() === 'light'
    
    return(
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                headerShown: false,

                tabBarActiveTintColor: isLightMode ? colors.primary2 : colors.primary1, // Cor quando a aba está ativa
                tabBarInactiveTintColor: isLightMode ? grays.gray5 : grays.gray2,
                tabBarLabelStyle: {
                    fontSize: 12, 
                },
                tabBarStyle:{
                    //paddingHorizontal:20,
                    //paddingVertical:5,
                    paddingBottom:5,
                    paddingTop:5,
                    minHeight: 65,
                    backgroundColor: isLightMode ? grays.background_light: grays.background_dark, 
                    borderColor: isLightMode ? grays.gray2 : grays.gray7,
                }
            }}
        >
            <Tab.Screen 
                name="HomeTab"
                component={HomeStackScreen}
                options={{
                    tabBarLabel:"Home",
                    tabBarIcon: ({color}) => <Foundation name="home" size={35} color={color} />
                }}
            />
            <Tab.Screen 
                name="ExplorarTab"
                component={ExplorarStackScreen}
                options={{
                    tabBarLabel:'Explorar',
                    tabBarIcon: ({color,size}) => <Ionicons name="compass" size={35} color={color} />
                }}
            />
            <Tab.Screen 
                name="PlanejamentoTab"
                component={PlanejamentoStackScreen}
                options={{
                    tabBarLabel:'Planejamento',
                    tabBarIcon: ({color,size}) => <Foundation name="clipboard-pencil" size={35} color={color} />
                }}
            />
            <Tab.Screen 
                name="CorpoTab"
                component={CorpoStackScreen}
                options={{
                    tabBarLabel:'Corpo',
                    tabBarIcon: ({color,size}) => <Ionicons name="body" size={35} color={color} />
                }}
            />
            <Tab.Screen 
                name="PerfilTab"
                component={PerfilStackScreen}
                options={{
                    tabBarLabel:'Perfil',
                    tabBarIcon: ({color,size}) => <FontAwesome5 name="user-alt" size={size} color={color} />
                }}
            />
        </Tab.Navigator>
    )
}