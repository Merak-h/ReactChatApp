import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * フレンド追加処理（双方向）
 * - 自分がすでにフレンド登録していれば is_approve を true に更新
 * - 相手ユーザーが存在しない場合はエラーを投げる
 */
export const addFriend = async (userId: string, friendId: string) => {
    try {
        const userDocRef = doc(db, "users", friendId);
        const userSnap = await getDoc(userDocRef);
    
        if (!userSnap.exists()) {
          throw new Error("相手のユーザーが存在しません");
        }
    
        const myFriendRef = doc(collection(doc(db, "users", userId), "friends"), friendId);
        const theirFriendRef = doc(collection(doc(db, "users", friendId), "friends"), userId);
    
        const myDocSnap = await getDoc(myFriendRef);
        if (myDocSnap.exists()) {
          await setDoc(myFriendRef, { is_approve: true }, { merge: true });
          return;
        }
    
        const myFriend = {
          user_id: friendId,
          display_name: "",
          is_approve: true,
        };
    
        const theirFriend = {
          user_id: userId,
          display_name: "",
          is_approve: false,
        };
    
        await setDoc(myFriendRef, myFriend, { merge: true });
        await setDoc(theirFriendRef, theirFriend, { merge: true });
    
      } catch (error) {
        console.error("addFriend にてエラー:", error);
        throw error; // 上位でキャッチしたい場合
      }
};
