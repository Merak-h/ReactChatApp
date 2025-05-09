import { doc, setDoc } from "firebase/firestore";
import { useLoginUser } from "../hooks/useLoginUser";
import { db } from "../firebase";

type UpdateSetting = {
    handle_name:string;
    display_name:string;
    icon_src:string;
    email:string;
    message:string;
    tel:string;

}
export const updateSettings = (account_id:string) => {

    // const { account} = useLoginUser();
    // if(!account) throw new Error("アカウント情報が取得できませんでした。");
    // const account_id = account.account_id;

    const updateHandleName = async (handle_name:string):Promise<string|false> => {
        try {
            const accountRef = doc(db, "users", account_id);
            await setDoc(accountRef, { handle_name }, { merge: true });
            return handle_name;
        }
        catch (error) {
            console.error("updateHandleName", error);
            return false;
        }
    }

    const updateDisplayName = async (display_name:string):Promise<string|false> => {
        try {
            const accountRef = doc(db, "users", account_id);
            setDoc(accountRef, { display_name }, { merge: true });
            return display_name;
        }
        catch (error) {
            console.error("updateDisplayName", error);
            return false;
        }
    }

    const updateIconSrc = async (icon_src:string):Promise<string|false> => {
        try {
            const accountRef = doc(db, "users", account_id);
            setDoc(accountRef, { icon_src }, { merge: true });
            return icon_src;
        }
        catch (error) {
            console.error("updateIconSrc", error);
            return false;
        }
    }
    const updateEmail = async (email:string) => {
        try {
            const accountRef = doc(db, "users", account_id);
            setDoc(accountRef, { email }, { merge: true });
            return email;
        }
        catch (error) {
            console.error("updateEmail", error);
            return false;
        }
    }
    const updateMessage = async (message:string) => {
        try {
            const accountRef = doc(db, "users", account_id);
            setDoc(accountRef, { message }, { merge: true });
            return message;
        }
        catch (error) {
            console.error("updateMessage", error);
            return false;
        }
    }
    const updateTel = async (tel:string) => {
        try {
            const accountRef = doc(db, "users", account_id);
            setDoc(accountRef, { tel }, { merge: true });
            return tel;
        }
        catch (error) {
            console.error("updateTel", error);
            return false;
        }
    }
    const updateSendKeyMode = async (send_key_mode:number) => {
        try {
            const accountRef = doc(db, "users", account_id);
            setDoc(accountRef, { send_key_mode }, { merge: true });
            return send_key_mode;
        }
        catch (error) {
            console.error("updateSendKeyMode", error);
            return false;
        }
    }



    return {updateHandleName, updateDisplayName, updateIconSrc, updateEmail, updateMessage, updateTel, updateSendKeyMode};
}