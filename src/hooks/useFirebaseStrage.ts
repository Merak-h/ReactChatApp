import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useCallback } from "react";


export const useFirebaseStrage = ()=>{
    
    const handleUpdateMessage = useCallback(async(message: string)=>{
        const user = auth.currentUser;
    if (!user) {
      console.error("ユーザーがログインしていません");
      return;
    }
  
    try {
      await setDoc(doc(db, "users", user.uid), {
        message,
      }, { merge: true }); // ← merge: true で既存データを上書きしない
      console.log("メッセージ保存成功");
    } catch (err) {
      console.error("Firestore書き込みエラー:", err);
    }
    },[])
    return {handleUpdateMessage}
} 