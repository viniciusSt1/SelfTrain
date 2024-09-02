import React, { createContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async _user => {  //Função ativada quando um usuário faz login/logout
            if (_user) {
                try {
                    // Obtenha os dados do usuário a partir do Firestore
                    const userDoc = await firestore()
                        .collection('users')
                        .doc(_user.uid)
                        .get();

                    if (userDoc.exists) {
                        // Mescle os dados do Firestore com os dados de autenticação
                        const userData = {
                            ...userDoc.data() // Adicione os dados do Firestore
                        };
                        setUser(userData);
                    } else {
                        console.log("Usuário não encontrado no Firestore");
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do usuário no Firestore: ", error);
                }
            } else {
                setUser(null);
            }
        });

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

            // Atualize o estado local com os novos dados
            setUser(prevState => ({
                ...prevState,
                ...newData
            }));
        } catch (error) {
            console.error("Erro ao atualizar dados do usuário no Firestore: ", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
