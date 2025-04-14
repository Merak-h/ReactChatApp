import { useContext } from "react";

import { getUidByHandleName } from "../api/getHandleName"
import { addFriend } from "../api/addFriend"
import { LoginUserContext } from "../providers/LoginUserProvider";

export const useAddFriend = () => {
    const { account } = useContext(LoginUserContext);
  
    const addFriendByHandleName = async (handle_name: string) => {
        try{
            if (!account) throw new Error("自身のアカウント情報が取得出来ません");
            handle_name = cleanInput(handle_name);
            const friendId = await getUidByHandleName(handle_name);
            if (!friendId) throw new Error("ハンドルネームに一致するユーザーが見つかりません。");;
        
            await addFriend(account.account_id, friendId);
        } 
        catch (error) {
            console.error("useAddFriend にてエラー:", error);
            throw error; // 上位でキャッチしたい場合
        }
    };
        
            return { addFriendByHandleName };
  };

  function cleanInput(str:string) {
    // 前後の半角スペース（\s）と全角スペース（\u3000）を削除
    str = str.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
    
    // 文頭の @ を削除（あれば1つだけ）
    if (str.startsWith('@')) {
      str = str.substring(1);
    }
  
    return str;
  }