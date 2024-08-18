import React, { useContext, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import UserContext from '../contexts/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from "@react-native-firebase/auth";

export default function Perfil() {
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            console.log("UID:", user.uid);
            console.log("Email:", user.email);
            console.log("Nome de exibição:", user.displayName);
            console.log("Foto do perfil:", user.photoURL);
            console.log("Email verificado:", user.emailVerified);
            console.log("Usuário anônimo:", user.isAnonymous);
            console.log("Data de criação:", user.metadata.creationTime);
            console.log("Último login:", user.metadata.lastSignInTime);
        }
    }, [])
    

    if (!user) {
        return <Text>Carregando...</Text>; // ou você pode redirecionar o usuário para a tela de login
    }

    return (
        <SafeAreaView>
            <Text>Bem-vindo, {user.name}!</Text>
            <Text>Email: {user.email}</Text>
            {/* Outros dados do usuário que você queira exibir */}
            <Button title="sair" onPress={() => auth().signOut()}/>
        </SafeAreaView>
    );
}
