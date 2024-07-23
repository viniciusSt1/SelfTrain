import React from 'react';
import { Pressable, Text, TextInput, useColorScheme, View, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import styles, {colors,grays} from '../styles/globalStyles';

export default function Login({ navigation }) {
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
                placeholder="Email"
                placeholderTextColor={grays.gray4}
                style={style.input}
            />
            <TextInput
                placeholder="Senha"
                placeholderTextColor={grays.gray4}
                secureTextEntry
                style={style.input}
            />
            <Pressable style={style.loginButton} onPress={() => navigation.navigate("App")}>
                <Text style={style.loginButtonText}>Login</Text>
            </Pressable>
            <View style={style.linksContainer}>
                <Text style={style.linkText(isLightMode)} onPress={() => navigation.navigate("Cadastro")}>Não tenho cadastro</Text>
                <Text style={style.linkText(isLightMode)}>Esqueci minha senha</Text>
            </View>
            <Pressable style={style.googleButton(isLightMode)}>
                <AntDesign name="google" size={25} color={isLightMode ? 'white' : colors.primary9} />
                <Text style={style.googleButtonText(isLightMode)}>Sign in with Google</Text>
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
    loginButton: {
        backgroundColor: colors.primary1,
        paddingVertical: 10,
        borderRadius: 20,
        width:"80%",
        alignItems:"center",
        marginVertical: 15,
        elevation:5
    },
    loginButtonText: {
        color: 'black',
        fontFamily:"Tauri",
        fontSize: 16,
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 15,
    },
    linkText: (isLightMode) => ({
        color: isLightMode ? grays.gray5 : grays.gray4,
        textDecorationLine: 'underline',
    }),
    googleButton: (isLightMode) => ({
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingVertical: 10,
        width:"80%",
        borderRadius: 20,
        marginTop: 15,
        backgroundColor: isLightMode ? colors.primary9 : grays.gray3,
        gap:20,
        elevation:5
    }),
    googleButtonText: (isLightMode) => ({
        color: isLightMode ? 'white' : colors.primary9,
        fontFamily:"Tauri",
        fontSize: 14,
    }),
});
