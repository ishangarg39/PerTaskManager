'use client'; //run this in browser in NextJs


import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";


interface ContextProps {
    userName: string,
    setUserName: Dispatch<SetStateAction<string>>,
    log: boolean,
    setLog: Dispatch<SetStateAction<boolean>>
}

const UserContext = createContext<ContextProps>({
    userName: '',
    setUserName: (): string => '',
    log: false,
    setLog: (): boolean => false
})

export const UserContextProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [log, setLog] = useState(false);
    
    return (
        <UserContext.Provider value={{ userName, setUserName, log, setLog }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => useContext(UserContext);