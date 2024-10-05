import React, { createContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { isFirebaseTimestamp } from "../utils/function_datas";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async _user => {  // Função ativada quando um usuário faz login/logout
            console.log("Carregando dados");
            setLoading(true)

            if (_user) {
                try {
                    // Obtenha os dados do usuário a partir do Firestore
                    const userDoc = await firestore()
                        .collection('users')
                        .doc(_user.uid)
                        .get();

                    if (userDoc.exists) {
                        // Mescle os dados do Firestore com os dados de autenticação
                        let userData = {
                            ...userDoc.data() // Adicione os dados do Firestore
                        };


                        userData.treinos = userData.treinos.map(treino => {
                            return {
                                ...treino,
                                data: isFirebaseTimestamp(treino.data)
                                    ? treino.data.toDate()  // Converte para Date
                                    : treino.data // Mantém o valor se não for Timestamp
                            };

                        })

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

        return unsubscribe;
    }, []);


    const updateUser = async (newData) => {
        if (!user) return;
    
        try {
            // Atualize os dados no Firestore
            await firestore()
                .collection('users')
                .doc(user.uid)
                .update(newData);
    
            setUser(prevState => {
                const updatedUser = {
                    ...prevState,
                    ...newData,
                };
                //console.log("usuario atualizado : ", updatedUser);
                return updatedUser;
            });
    
        } catch (error) {
            console.error("Erro ao atualizar dados do usuário no Firestore: ", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser, setUser, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
