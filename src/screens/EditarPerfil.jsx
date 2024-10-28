import React, { useState, useContext } from 'react';
import { Pressable, Text, TextInput, useColorScheme, View, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles, { colors, grays } from '../styles/globalStyles';
import HeaderBack from '../components/HeaderBack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import UserContext from '../contexts/UserContext';

export default function EditarPerfil({ navigation }) {
    const isLightMode = useColorScheme() === 'light';
    const { user, updateUserProfile } = useContext(UserContext);

    const [nome, setNome] = useState(user.nome || '');
    const [email, setEmail] = useState(user.email || '');
    const [idade, setIdade] = useState(user.idade || '');
    const [sexo, setSexo] = useState(user.sexo || '');
    const [senha, setSenha] = useState(user.senha || '*********');

    const renderInput = (value, setValue, placeholder, keyboardType = 'default', secureTextEntry = false) => {
        return (
            <View style={style.inputContainer}>
                <Text style={style.floatingLabel(value)}>
                    {placeholder}
                </Text>
                <TextInput
                    placeholder=""
                    placeholderTextColor={grays.gray5}
                    style={[styles.input(isLightMode), { paddingTop: value ? 24 : 16 }]}
                    value={value.toString()}
                    autoCapitalize="none"
                    onChangeText={setValue}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    onFocus={() => setValue(value)}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <HeaderBack titulo="Editar Perfil" navigation={navigation} />
                    <View style={styles.center}>
                        <View style={style.imgContainer}>
                            <Image
                                source={isLightMode ? require('../assets/imgs/user-light.png') : require('../assets/imgs/user-dark.png')}
                                style={style.imgProfile}
                            />
                            <MaterialCommunityIcons name="pencil-box" size={30} color={colors.secondary1} style={style.pencil} />
                        </View>
                    </View>
                    <View style={style.inputsContainer}>
                        {renderInput(nome, setNome, "Nome")}
                        {renderInput(email, setEmail, "Email")}
                        {renderInput(idade, setIdade, "Idade", 'numeric')}
                        <Pressable
                            style={[styles.input(isLightMode), { justifyContent: 'center', paddingTop: 16 }]}
                            onPress={() => setSexo(sexo === 'Masculino' ? 'Feminino' : 'Masculino')}
                        >
                            <Text style={style.sexoInput(isLightMode, sexo)}>{sexo === '' ? 'Sexo' : sexo}</Text>
                        </Pressable>
                        {renderInput(senha, setSenha, "Senha", 'default', true)}
                        <Pressable style={style.editButton(isLightMode)} onPress={() => updateUserProfile({ nome, email, idade, sexo }).then(() => navigation.goBack())}>
                            <Text style={style.editButtonText(isLightMode)}>Editar</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    imgContainer: {
        alignItems: 'center',
        position: 'relative',
        height: 100,
        width: 100
    },
    imgProfile: {
        height: 100,
        width: 100,
    },
    pencil: {
        position: 'absolute',
        right: 5,
        bottom: 2
    },
    inputsContainer: {
        width: '100%',
        paddingHorizontal: 40,
        gap: 20
    },
    sexoInput: (isLightMode, sexo) => ({
        color: sexo === '' ? grays.gray5 : isLightMode ? 'black' : 'white',
    }),
    floatingLabel: (value) => ({
        position: 'absolute',
        left: 0,
        color: grays.gray5,
        fontSize: value ? 12 : 16,
        backgroundColor: 'transparent',
        zIndex: 1,
        transition: 'all 0.3s',
        bottom: value ? 35 : 10,
        left: value ? 20 : 40
    }),
    inputContainer: {
        height: 60,
        position: 'relative',
        justifyContent: 'flex-end'
    },
    editButton: (isLightMode) => ({
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isLightMode ? colors.primary1 : colors.secondary1,
        paddingVertical: 8,
        borderRadius: 20,
        elevation: 5
    }),
    editButtonText: (isLightMode) => ({
        fontFamily: 'Tauri',
        color: isLightMode ? 'black' : 'white',
        fontSize: 18,
    })
});
