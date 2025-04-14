import { updateNickName } from "../api/updateNickName";
import { useContext } from "react";
import { useLoginUser } from "./useLoginUser";

export const useNickName = ()=>{
    const { account } = useLoginUser();
    const changeNickName = (newNickName:string, accountId:string)=>{
        const myId = account?.account_id;
        try{
            if(!myId)throw new Error('ログイン情報が取得できません')
            updateNickName( myId, accountId, newNickName);
        }
        catch(error){
            console.error('useNickName=>changeNickName',error)
        }

    }
    return{changeNickName}
}