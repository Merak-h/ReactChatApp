import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { account, friend } from "../types/account";

export const readAccount = async (userId: string): Promise<account | null> => {
  try{
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) return null;

  const data = userDocSnap.data();

  // friends サブコレクション取得
  const friendsSnap = await getDocs(collection(userDocRef, "friends"));
  const friends = friendsSnap.docs.map((doc) => doc.data() as friend);

  // channels サブコレクション取得
  const channelsSnap = await getDocs(collection(userDocRef, "channels"));
  const channels = channelsSnap.docs.map((doc) => doc.id); // or doc.data().channel_id

  const account = {
    account_id: userId,
    display_name: data.display_name,
    handle_name: data.handle_name,
    icon_src: data.icon_src ?? null,
    email: data.email ?? null,
    tel: data.tel ?? null,
    message: data.message ?? "",
    friends,
    channels,
  };
  return account;
}
catch(error){
  console.error("readAccountのエラー", error);
  return null;
}
};
