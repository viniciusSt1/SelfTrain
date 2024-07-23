import React from 'react';
import { Pressable, Text, TextInput, useColorScheme, View, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import styles, {colors,grays} from '../styles/globalStyles';

export default function Cadastro({ navigation }) {
    const isLightMode = useColorScheme() === 'light';

    return (
        <SafeAreaView style={[styles.center,styles.background(isLightMode)]}>
            <MaterialIcons
                name="keyboard-backspace"
                size={45}
                color={isLightMode ? "black" : "white"}
                onPress={() => { navigation.goBack() }}
                style={style.backIcon}
            />
            <View style={style.logoContainer}>
                <FontAwesome5 name="dumbbell" size={50} color={isLightMode ? 'black' : 'white'} />
                <Text style={style.logoText(isLightMode)}>SelfTrain</Text>
            </View>
            <TextInput
                placeholder="Nome"
                placeholderTextColor={grays.gray4}
                style={style.input}
            />
            <TextInput
                placeholder="Email"
                placeholderTextColor={grays.gray4}
                secureTextEntry
                style={style.input}
            />
            <TextInput
                placeholder="Senha"
                placeholderTextColor={grays.gray4}
                secureTextEntry
                style={style.input}
            />
            <Pressable style={style.cadastroButton} onPress={() => navigation.navigate("App")}>
                <Text style={style.cadastroButtonText}>Cadastrar</Text>
            </Pressable>

        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    backIcon: {
        position: 'absolute',
        top: 45,
        left: 16,
    },
    logoContainer: {
        alignItems:'center',
        marginTop:"-50%"
    },
    logoText: (isLightMode) => ({
        fontSize: 50,
        fontFamily:"Timmana",
        color:isLightMode ? "black" : "white"
    }),
    input: {
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginVertical: 15,
        backgroundColor:"transparent",
        borderStyle:"solid",
        borderBottomWidth:1,
        borderColor:grays.gray4,
        color:grays.gray1
    },
    cadastroButton: {
        backgroundColor: colors.primary1,
        paddingVertical: 10,
        borderRadius: 20,
        width:"80%",
        alignItems:"center",
        marginVertical: 15,
        elevation:5
    },
    cadastroButtonText:{
        color: 'black',
        fontFamily:"Tauri",
        fontSize: 16,
    }
});
