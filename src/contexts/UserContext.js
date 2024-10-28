import React, { createContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { isFirebaseTimestamp } from "../utils/function_datas";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async _user => {
            console.log("Carregando dados");
            setLoading(true);

            if (_user) {
                try {
                    // Obtenha os dados do usuário a partir do Firestore
                    const userProfileSnapshot = await firestore()
                        .collection('users')
                        .doc(_user.uid)
                        .get();

                    // Verifique se o documento do usuário existe
                    if (userProfileSnapshot.exists) {
                        let userData = {
                            ...userProfileSnapshot.data(), // Dados principais do usuário
                        };

                        // Obtenha os dados da subcoleção "medidas"
                        const userMeasurementsSnapshot = await firestore()
                            .collection('users')
                            .doc(_user.uid)
                            .collection('medidas')
                            .orderBy('data', 'desc') // Ordena pela data em ordem decrescente
                            .limit(1)                 // Limita o resultado ao documento mais recente
                            .get();

                        // Acessa o primeiro documento diretamente
                        userData.medidas = userMeasurementsSnapshot.docs[0]?.data();
                        userData.medidas.data = userData.medidas.data.toDate(); // Converte o Timestamp 

                        // Obtenha os dados da subcoleção "treinos"
                        const userTrainingsSnapshot = await firestore()
                            .collection('users')
                            .doc(_user.uid)
                            .collection('treinos')
                            .orderBy('index')
                            .get();


                        userData.treinos = userTrainingsSnapshot.docs.map(doc => {
                            const data = doc.data();
                            return {
                                ...data,
                                data: data.data?.toDate ? data.data.toDate() : data.data, // Converter Firebase Timestamp se necessário
                            };
                        });

                        //console.log(userData)
                        setUser(userData);
                    } else {
                        console.log("Usuário não encontrado no Firestore");
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do usuário no Firestore: ", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        setLoading(false)
        return () => unsubscribe();
    }, []);


    const updateUserProfile = async (profileData) => {
        if (!user) return;

        try {
            await firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    ...profileData,
                });

            setUser(prevState => ({
                ...prevState,
                ...profileData,
            }));

        } catch (error) {
            console.error("Erro ao atualizar dados de perfil no Firestore: ", error);
        }
    };

    const updateUserMeasurements = async (measurements) => {
        if (!user) return;
    
        try {
            const timestamp = new Date();
    
            // Verifica se as medidas estão vazias e as substitui por null
            const sanitizedMeasurements = Object.fromEntries(
                Object.entries(measurements).map(([key, value]) => [key, value === '' ? null : value])
            );
    
            // Adiciona as medidas na subcoleção 'medidas' para histórico
            await firestore()
                .collection('users')
                .doc(user.uid)
                .collection('medidas')
                .add({
                    data: timestamp,
                    ...sanitizedMeasurements,
                });
    
            setUser(prevState => ({
                ...prevState,
                medidas: {
                    data: timestamp,
                    ...prevState.medidas,
                    ...sanitizedMeasurements,
                }
            }));
    
        } catch (error) {
            console.error("Erro ao atualizar as medidas no Firestore: ", error);
        }
    };

    const updateUserTraining = async (treinos) => {
        if (!user) return;

        try {
            // Cria uma referência para a coleção de treinos do usuário
            const treinosRef = firestore()
                .collection('users')
                .doc(user.uid)
                .collection('treinos');

            // Adiciona cada treino ao Firestore com um campo `index`
            const promises = treinos.map(async (treino, index) => {
                return treinosRef.doc(index.toString()).set({
                    ...treino,
                    index: index  // Adiciona o índice como campo
                });
            });

            // Aguarda que todas as operações de adição sejam concluídas
            await Promise.all(promises);

            // Atualiza o estado do usuário com os treinos adicionados
            setUser(prevState => ({
                ...prevState,
                treinos
            }));

            console.log("Todos os treinos foram adicionados com sucesso!");

        } catch (error) {
            console.error("Erro ao atualizar os treinos no Firestore: ", error);
        }
    };


    return (
        <UserContext.Provider value={{ user, updateUserProfile, updateUserMeasurements, updateUserTraining, setUser, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
