import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const readSettings = (account_id:string)=>{
        const readSendKeyMode = async ():Promise<number|false> => {
        try {
            const accountRef = doc(db, "users", account_id);
            const result = await getDoc(accountRef);
            if(result.exists()){
                const data = result.data();
                if(data && data.send_key_mode){
                    return data.send_key_mode;
                }
            }
            throw new Error("send_key_modeが取得できませんでした。");
        }
        catch (error) {
            console.error("updateHandleName", error);
            return false;
        }
    }
    return { readSendKeyMode };
}