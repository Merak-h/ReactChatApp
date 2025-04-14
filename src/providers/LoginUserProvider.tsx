import { account } from "../types/account";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { readAccount } from "../api/readAccount";


export type LoginUserContextType = {
    account: account | null
    setAccount: Dispatch<SetStateAction<account | null>>
    loading: boolean
}

export const LoginUserContext = createContext<LoginUserContextType>({} as LoginUserContextType);

export const LoginUserProvider = (props: {children: ReactNode}) => {
    const { children } = props;
    const [account, setAccount] = useState<account | null> (null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
            if (user) {
                const account = await readAccount(user.uid);
                setAccount(account);
              } else {
                setAccount(null);
              }
              setLoading(false);
        });
    
        return () => unsubscribe(); // クリーンアップ
    }, []);
    return (
        <LoginUserContext.Provider value={{account, setAccount, loading}}>
            {children}
        </LoginUserContext.Provider>
    )
}
