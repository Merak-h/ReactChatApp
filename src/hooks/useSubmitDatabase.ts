import { useCallback, useEffect, useState } from "react";
import { useLoginUser } from "./useLoginUser";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

const submitDatabase = async () => {
    const {account:account} = useLoginUser();
    const uid= account?.account_id;
    if(uid){
        try {
            await setDoc(doc(db, "users", uid, "friends",), 
            {
              isFriend: true,
              isPending: true,
              isApplied: false,
              isFavorite: false,
              isBlock: false,
              BecomeFriendAt: 1743064414
            }, 
            {merge: true}); // ← merge: true で既存データを上書きしない
            console.log("メッセージ保存成功");
          } catch (err) {
            console.error("Firestore書き込みエラー:", err);
          }
    }
    else{
        console.error("Firestore書き込みエラー:", "uidが存在しません。");
    }
} 
export const useSubmitDatabase = ()=>{
  const addFriend = useCallback(() =>{
    submitDatabase();
  },[])
    return {addFriend}
}