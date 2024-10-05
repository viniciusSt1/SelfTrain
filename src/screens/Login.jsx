import React, { useState } from 'react';
import { Pressable, Text, TextInput, useColorScheme, View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import styles, { colors, grays } from '../styles/globalStyles';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function Login({ navigation }) {
    const isLightMode = useColorScheme() === 'light';
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    function login_form() {
        if (email === '' || senha === '') {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);

        auth()
            .signInWithEmailAndPassword(email, senha)
            .then(() => {
                console.log('Login efetuado com sucesso');
                setLoading(false);
                //navigation.navigate("App")
            })
            .catch(error => {
                console.log('Erro ao tentar logar', error);
                setLoading(false);

                switch (error.code) {
                    case 'auth/invalid-email':
                        Alert.alert('Erro de Login', 'O email fornecido é inválido.');
                        break;
                    case 'auth/user-not-found':
                        Alert.alert('Erro de Login', 'Nenhum usuário encontrado com esse email.');
                        break;
                    case 'auth/wrong-password':
                        Alert.alert('Erro de Login', 'Senha incorreta.');
                        break;
                    case 'auth/user-disabled':
                        Alert.alert('Erro de Login', 'A conta do usuário foi desativada.');
                        break;
                    case 'auth/network-request-failed':
                        Alert.alert('Erro de Login', 'Falha na rede. Verifique sua conexão com a internet.');
                        break;
                    case 'auth/too-many-requests':
                        Alert.alert('Erro de Login', 'Muitos pedidos foram feitos. Tente novamente mais tarde.');
                        break;
                    case 'auth/operation-not-allowed':
                        Alert.alert('Erro de Login', 'Operação não permitida. Verifique as configurações do Firebase.');
                        break;
                    case 'auth/invalid-credential':  // Adiciona este caso para tratar o erro específico
                        Alert.alert('Erro de Login', 'Credenciais inválidas. Verifique o email ou senha fornecidos.');
                        break;
                    default:
                        Alert.alert('Erro de Login', 'Ocorreu um erro desconhecido. Por favor, tente novamente.');
                        break;
                }
            });
    }


    return (
        <SafeAreaView style={[styles.center, styles.background(isLightMode)]}>
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
                style={[styles.input(isLightMode), { width: '80%', marginBottom: 20 }]}
                value={email}
                autoCapitalize="none"
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Senha"
                placeholderTextColor={grays.gray4}
                secureTextEntry
                style={[styles.input(isLightMode), { width: '80%', marginBottom: 20 }]}
                value={senha}
                autoCapitalize="none"
                onChangeText={setSenha}
            />
            <Pressable style={style.loginButton} onPress={() => login_form()}>
                {loading ? <ActivityIndicator size={24} /> : <Text style={style.loginButtonText}>Login</Text>}
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
        alignItems: 'center',
        //marginTop:"-50%"
    },
    logoText: (isLightMode) => ({
        fontSize: 50,
        fontFamily: "Timmana",
        color: isLightMode ? "black" : "white"
    }),
    loginButton: {
        backgroundColor: colors.primary1,
        paddingVertical: 10,
        borderRadius: 20,
        width: "80%",
        alignItems: "center",
        marginVertical: 15,
        elevation: 5
    },
    loginButtonText: {
        color: 'black',
        fontFamily: "Tauri",
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
        alignItems: 'center',
        paddingVertical: 10,
        width: "80%",
        borderRadius: 20,
        marginTop: 15,
        backgroundColor: isLightMode ? colors.primary9 : grays.gray3,
        gap: 20,
        elevation: 5
    }),
    googleButtonText: (isLightMode) => ({
        color: isLightMode ? 'white' : colors.primary9,
        fontFamily: "Tauri",
        fontSize: 14,
    }),
});
