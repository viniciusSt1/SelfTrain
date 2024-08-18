import React, { createContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(_user => {
            setUser(_user)
        });

        return unsubscribe
    }, []);

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext