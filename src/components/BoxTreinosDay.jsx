import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { colors, grays } from '../styles/globalStyles';

export default function BoxGroupsDay({ navigation, agrupamentos, numero, dia, data, onPress, isLightMode }) {
    return (
        <Pressable style={style.container(isLightMode)} onPress={onPress}>
            <Image 
                source={isLightMode ? require("../assets/icons/waitExercicio-light.png") : require("../assets/icons/waitExercicio-dark.png")}
                style={style.icon}
            />
            
            <View style={style.boxtext}>
                <Text style={style.boxtextdia(isLightMode)}>{numero}º treino</Text>
                <Text style={style.boxtextdata(isLightMode)}>{dia} {data}</Text>
                <Text style={style.boxtextagrupamentos}>{agrupamentos.join(" + ")}</Text>
            </View>
        </Pressable>
    );
}

const style = StyleSheet.create({
    container: (isLightMode) => ({
        alignItems:"center",
        width:"100%",
        flexDirection:"row",
        paddingVertical:10,
        paddingHorizontal:20,
        justifyContent:"space-between",
        backgroundColor: isLightMode ? "white" : grays.gray7,
        borderRadius:20,
        elevation:3
    }),
    icon:{
        
    },
    boxtext:{
        width:"70%"
    },
    boxtextdia:(isLightMode) => ({
        fontFamily:"Outfit",
        color: isLightMode ? colors.primary3 : colors.primary1,
        fontSize: 12
    }),

    boxtextdata:(isLightMode) => ({
        fontFamily:"Actor",
        color: isLightMode ? "black" : "white",
        fontSize: 16
    }),
    boxtextagrupamentos:{
        fontFamily:"RobotoCondensed",
        color:grays.gray10,
        fontSize: 14
    }
});
