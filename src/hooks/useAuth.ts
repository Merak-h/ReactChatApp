import { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser"
import { signInWithPopup, signOut, User } from "firebase/auth";
import { auth, provider } from "../firebase";
import { isAccount } from "../api/isAccount";
import { createAccount } from "../api/createAccount";
import { account } from "../types/account";
import { readAccount } from "../api/readAccount";

export const useAuth = () => {
    const navigate = useNavigate();
    const {showMessage} = useMessage();
    const { setAccount } = useLoginUser();

    const login = useCallback(async()=>{
        try {
            const result = await signInWithPopup(auth, provider);
            const user:User = result.user;
            console.log(user)

            const isNewUser = await isAccount(user.uid);

            if (isNewUser) {
                const accountData = await createAccount(user);
                console.log('qwert123:',accountData);
                setAccount(accountData);
            }
            else{
                const accountData = await readAccount(user.uid);
                console.log('qwert123:',accountData);
                setAccount(accountData);
            }

            
            navigate("/home");
        } catch (error) {
            console.error("ログインエラー:", error);
        }
    },[navigate, showMessage, setAccount])

    const logout = useCallback(async () => {
        try {
            await signOut(auth);
            console.log("ログアウト成功");
            navigate("/");
        } catch (error) {
            console.error("ログアウトエラー:", error);
        }
    },[navigate]);
    return{login, logout}
}