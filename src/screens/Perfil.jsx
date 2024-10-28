import React, { useContext } from 'react';
import { View, Text, Button, ScrollView, useColorScheme, Image, StyleSheet, Pressable, Alert, Linking } from 'react-native';
import UserContext from '../contexts/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import styles, { colors, grays } from '../styles/globalStyles';

export default function Perfil({ navigation }) {
    const isLightMode = useColorScheme() === 'light';
    const { user, updateUser } = useContext(UserContext);

    /* 
    useFocusEffect( // Executa uma função sempre que a tela ganhar foco
        React.useCallback(() => {
            if (user) {
                console.log("UID:", user.uid);
                console.log("Email:", user.email);
                console.log("Nome de exibição:", user.displayName);
                console.log("Foto do perfil:", user.photoURL);
                console.log("Email verificado:", user.emailVerified);
                console.log("Usuário anônimo:", user.isAnonymous);
                console.log("Data de criação:", user.creationTime);
                console.log("Último login:", user.lastSignInTime);
            }

            // Função de limpeza, se necessário
            return () => {
                // Função a ser executada para quando a tela perder o foco
            };
        }, [user]) // Reexecutar quando `user` mudar
    );
    */
    const phoneNumber = '5519982037314'; // Exemplo: +55 11 99999-9999

    const openWhatsApp = () => {
        const url = `https://wa.me/${phoneNumber}`;
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert('Erro', 'Não é possível abrir o WhatsApp.');
            }
        }).catch(err => {
            console.error('Erro ao tentar abrir o WhatsApp', err);
            Alert.alert('Erro', 'Não foi possível abrir o WhatsApp. Verifique o erro no console.');
        });
    };

    async function deletarConta() {
        Alert.alert(
            "Deletar conta",
            "Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Deletar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const currentUser = auth().currentUser;
                            if (currentUser) {
                                const treinosRef = firestore().collection('users').doc(currentUser.uid).collection('treinos');
                                const medidasRef = firestore().collection('users').doc(currentUser.uid).collection('medidas');

                                // Deletar documentos dentro da subcoleção "treinos"
                                const treinosSnapshot = await treinosRef.get();
                                const deleteTreinosPromises = treinosSnapshot.docs.map(doc => doc.ref.delete());
                                await Promise.all(deleteTreinosPromises);

                                // Deletar documentos dentro da subcoleção "medidas"
                                const medidasSnapshot = await medidasRef.get();
                                const deleteMedidasPromises = medidasSnapshot.docs.map(doc => doc.ref.delete());
                                await Promise.all(deleteMedidasPromises);

                                // Deletar o documento do usuário principal
                                await firestore().collection('users').doc(currentUser.uid).delete();

                                // Deletar autenticação do usuário
                                await currentUser.delete();

                                Alert.alert("Conta deletada", "Sua conta foi deletada com sucesso.");
                            }
                        } catch (error) {
                            if (error.code === 'auth/requires-recent-login') {
                                Alert.alert(
                                    "Erro ao deletar conta",
                                    "Por razões de segurança, por favor, faça login novamente e tente excluir a conta."
                                );
                            } else
                                Alert.alert("Erro", "Ocorreu um erro ao deletar sua conta. Tente novamente mais tarde.");
                        }
                    }
                }
            ]
        );
    }

    async function att() {
        //user.nome='tucaaa'
        await updateUser({ nome: 'Vinicius Stefanes' })
    }

    if (!user) {
        return <Text>Carregando...</Text>;
    }

    return (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <Text style={styles.header(isLightMode)}>Seu perfil</Text>
                    <View style={style.profileContainer}>
                        <Image
                            source={isLightMode ? require('../assets/imgs/user-light.png') : require('../assets/imgs/user-dark.png')}
                            style={style.profileImage}
                        />
                        <View style={style.profileDetails}>
                            <Text style={style.profileName(isLightMode)}>{user.nome}</Text>
                            <Text style={style.profileEmail(isLightMode)}>{user.email}</Text>
                        </View>
                    </View>
                    <Pressable style={style.section(isLightMode)} onPress={() => navigation.navigate('EditarPerfil')}>
                        <Text style={style.sectionText(isLightMode)}>Editar Perfil</Text>
                    </Pressable>
                    <Pressable style={style.section(isLightMode)} onPress={() => navigation.navigate('EditarMedidas')}>
                        <Text style={style.sectionText(isLightMode)}>Editar Medidas</Text>
                    </Pressable>
                    <Pressable style={style.section(isLightMode)} onPress={() => navigation.navigate('Notifications')}>
                        <Text style={style.sectionText(isLightMode)}>Notificações</Text>
                    </Pressable>
                    <Pressable style={style.section(isLightMode)} onPress={() => openWhatsApp()}>
                        <Text style={style.sectionText(isLightMode)}>Contate-nos</Text>
                    </Pressable>
                    <Pressable style={style.section(isLightMode)} onPress={() => deletarConta()}>
                        <Text style={style.sectionText(isLightMode)}>Deletar conta</Text>
                    </Pressable>
                    <Pressable style={style.section(isLightMode)} onPress={() => auth().signOut()}>
                        <Text style={style.sectionText(isLightMode)}>Sair</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    profileDetails: {
        flex: 1,
        gap: 5
    },
    profileName: (isLightMode) => ({
        fontSize: 18,
        fontWeight: '600',
        color: isLightMode ? 'black' : 'white',
        fontFamily: 'OutFit'
    }),
    profileEmail: (isLightMode) => ({
        fontSize: 16,
        color: isLightMode ? grays.gray5 : grays.gray1,
        fontFamily: 'OutFit'
    }),
    section: (isLightMode) => ({
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: isLightMode ? grays.gray4 : grays.gray7
    }),
    sectionText: (isLightMode) => ({
        fontSize: 16,
        color: isLightMode ? 'black' : 'white',
        fontFamily: 'Rubik'
    }),
});
