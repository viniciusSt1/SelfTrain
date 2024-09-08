import React, { useContext } from 'react';
import { View, Text, Button, ScrollView, useColorScheme, Image, StyleSheet, Pressable } from 'react-native';
import UserContext from '../contexts/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from "@react-native-firebase/auth";
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
                    <Pressable style={style.section(isLightMode)}>
                        <Text style={style.sectionText(isLightMode)} onPress={() => navigation.navigate('Notifications')}>Notificações</Text>
                    </Pressable>
                    <Pressable style={style.section(isLightMode)}>
                        <Text style={style.sectionText(isLightMode)}>Contate-nos</Text>
                    </Pressable>
                    <Pressable style={style.section(isLightMode)} onPress={() => att()}>
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
