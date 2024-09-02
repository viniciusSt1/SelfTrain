import React, { useState } from 'react';
import { Pressable, Text, TextInput, useColorScheme, View, StyleSheet, Alert, ScrollView, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles, {colors,grays} from '../styles/globalStyles';
import HeaderBack from '../components/HeaderBack'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';

export default function EditarPerfil({ navigation }) {
    const isLightMode = useColorScheme() === 'light';
    const { user, updateUser } = useContext(UserContext);

    const [nome,setNome] = useState(user.nome || '')
    const [email, setEmail] = useState(user.email || '');
    const [idade,setIdade] = useState(user.idade || '');
    const [sexo,setSexo] = useState(user.sexo || '')
    const [senha, setSenha] = useState(user.senha);
    
    return (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <HeaderBack titulo="Editar Perfil" navigation = {navigation} />
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
                        <TextInput
                            placeholder="Nome"
                            placeholderTextColor={grays.gray5}
                            style={styles.input(isLightMode)}
                            value={nome}
                            autoCapitalize="none"
                            onChangeText={setNome}
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={grays.gray5}
                            style={styles.input(isLightMode)}
                            value={email}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                        />
                        <TextInput
                            placeholder="Idade"
                            placeholderTextColor={grays.gray5}
                            style={styles.input(isLightMode)}
                            value={idade.toString()}
                            //autoCapitalize="none"
                            keyboardType='numeric'
                            onChangeText={setIdade}
                        />
                        <Pressable
                            style={styles.input(isLightMode)}
                            onPress={() => sexo == 'Masculino' ? setSexo("Feminino") : setSexo("Masculino")}
                            //onChangeText={setSexo}
                        >
                            <Text style={style.sexoInput(isLightMode,sexo)}>{sexo == '' ? 'Sexo' : sexo}</Text>
                        </Pressable>
                        <TextInput
                            placeholder="Senha"
                            placeholderTextColor={grays.gray5}
                            secureTextEntry
                            style={styles.input(isLightMode)}
                            value={senha}
                            autoCapitalize="none"
                            onChangeText={setSenha}
                        />
                        <Pressable style={style.editButton(isLightMode)} onPress={() => updateUser({nome,email,idade,sexo}).then(navigation.goBack())} >
                            <Text style={style.editButtonText(isLightMode)}>Editar</Text>
                        </Pressable>
                    </View>
                    

                </View>
            </ScrollView>
            
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    imgContainer:{
        alignItems:'center',
        position:'relative',
        height:100,
        width:100
    },
    imgProfile:{
        height:100,
        width:100,
    },
    pencil:{
        position:'absolute',
        right:5,
        bottom:2
    },
    inputsContainer:{
        width:'100%',
        paddingHorizontal: 40,
        gap:20
    },
    sexoInput:(isLightMode,sexo) => ({
        color: sexo == '' ? grays.gray5 : isLightMode ? 'black' : 'white' 
    }),
    editButton: (isLightMode) => ({
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: isLightMode ? colors.primary1 : colors.secondary1,
        paddingVertical:8,
        borderRadius: 20,
        elevation:5
    }),
    editButtonText: (isLightMode) => ({
        fontFamily: 'Tauri',
        color: isLightMode ? 'black' : 'white',
        fontSize:18,
    })
});
