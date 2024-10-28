import { useState, useContext } from 'react';
import { Pressable, Text, TextInput, useColorScheme, View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import styles, { colors, grays } from '../styles/globalStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import UserContext from '../contexts/UserContext';

export default function Cadastro({ navigation }) {
    const isLightMode = useColorScheme() === 'light';
    const { setUser, loading, setLoading } = useContext(UserContext);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function cadastrar(nome, email, senha) {
        if (email === '' || senha === '') {
            Alert.alert('Falha no cadastro', 'Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);

        auth()
            .createUserWithEmailAndPassword(email, senha)
            .then((userCredential) => {
                const user = userCredential.user
                console.log('Usuario criado e logado');
                console.log('UID:', user.uid);

                let novoUsuario = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    emailVerified: user.emailVerified,
                    isAnonymous: user.isAnonymous,
                    creationTime: user.metadata.creationTime,
                    lastSignInTime: user.metadata.lastSignInTime,

                    nome: nome,
                    sexo: null,
                    idade: null,
                }

                const medidas = {
                    data: new Date(),
                    altura: null,
                    antebraco: null,
                    braco: null,
                    cintura: null,
                    ombros: null,
                    panturrilha: null,
                    peito: null,
                    perna: null,
                    peso: null,
                    quadril: null
                }

                treinos = []

                firestore()
                    .collection('users')
                    .doc(user.uid)
                    .set(novoUsuario)
                    .then(() => {
                                firestore()
                                    .collection('users')
                                    .doc(user.uid)
                                    .collection('medidas')
                                    .add(medidas)
                                    .then(() => {
                                        console.log('Usuario adicionado ao firestore');
                                        setUser({...novoUsuario, medidas, treinos})
                                        console.log({...novoUsuario, medidas, treinos})
                                    })
                        setLoading(false)
                    })
                    .catch(error => {
                        console.error('Error adding user data to Firestore:', error);
                        setLoading(false)
                    });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use')
                    Alert.alert('Falha no cadastro', 'Email já esta em uso');

                if (error.code === 'auth/invalid-email')
                    Alert.alert('Falha no cadastro', 'Digite um email válido');

                setLoading(false);
                console.log(error);
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
                placeholder="Nome"
                placeholderTextColor={grays.gray4}
                style={[styles.input(isLightMode), { width: '80%', marginBottom: 20 }]}
                value={nome}
                onChangeText={setNome}
            />
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
            <Pressable style={style.cadastroButton} onPress={() => cadastrar(nome, email, senha)}>
                {loading ? <ActivityIndicator size={24} /> : <Text style={style.cadastroButtonText}>Cadastrar</Text>}
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
    cadastroButton: {
        backgroundColor: colors.primary1,
        paddingVertical: 10,
        borderRadius: 20,
        width: "80%",
        alignItems: "center",
        marginVertical: 15,
        elevation: 5
    },
    cadastroButtonText: {
        color: 'black',
        fontFamily: "Tauri",
        fontSize: 16,
    }
});
