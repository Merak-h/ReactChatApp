import { doc, setDoc, collection, setDoc as setSubDoc } from "firebase/firestore";
import { db } from "../firebase";
import { account, friend } from "../types/account";
import { User } from "firebase/auth";
import { isHandleName } from "./isHandleName";

/* 
アカウント作成用API
*/
const generateHandleName = async (email?: string): Promise<string> => {
    const sanitize = (input: string): string =>
      input.replace(/[.#$\[\]/\\]/g, "_");
  
    if (email) {
      const localPart = sanitize(email.split("@")[0]);
      const isUsed = await isHandleName(localPart);
      if (!isUsed) {
        return localPart;
      }
  
      // 重複していた場合ランダム付加で再試行
      while (true) {
        const randomWord = await fetch("https://random-word-api.herokuapp.com/word?length=4")
          .then(res => res.json())
          .then(result => result[0]);
        const candidate = `${localPart}_${randomWord}`;
        const exists = await isHandleName(candidate);
        if (!exists) return candidate;
      }
    } else {
      // email がない場合完全にランダム
      while (true) {
        const randomWord = await fetch("https://random-word-api.herokuapp.com/word?length=8")
          .then(res => res.json())
          .then(result => result[0]);
        const exists = await isHandleName(randomWord);
        if (!exists) return randomWord;
      }
    }
  };

export const createAccount = async (user:User) => {

  const handle_name = await generateHandleName(user.email ?? undefined);




  const account:account = {
    account_id: user.uid,
    display_name: user.displayName || "名無し",
    handle_name: handle_name,
    icon_src: user.photoURL,
    email: user.email,
    tel: user.phoneNumber,
    message: "",
    friends: [],
    channels: [],
}

console.log('eeejees:',account);

  // フィールド部分だけ（サブコレクションを除外）
  const userData = {
    account_id: user.uid,
    display_name: user.displayName || "名無し",
    handle_name: handle_name,
    icon_src: user.photoURL,
    email: user.email,
    tel: user.phoneNumber,
    message: "",
    created_at: user.metadata.creationTime,
    last_login_at:user.metadata.lastSignInTime,
  };

  const userRef = doc(db, "users", user.uid);

  // ドキュメント作成
  await setDoc(userRef, userData, { merge: true });

// 以下はアカウント作成時には持ちえないサブコレクションなので、一旦コメントアウト

//   // --- friends サブコレクション ---
//   for (const friend of friends) {
//     const friendRef = doc(collection(userRef, "friends"), friend.user_id);
//     await setSubDoc(friendRef, friend); // friend: { user_id, display_name }
//   }

//   // --- channels サブコレクション ---
//   for (const channelId of channels) {
//     const channelRef = doc(collection(userRef, "channels"), channelId);
//     await setSubDoc(channelRef, { channel_id: channelId }); // 必要なら他の情報も追加可
//   }
return account;
};
