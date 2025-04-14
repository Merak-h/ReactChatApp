import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { account, friend } from "../types/account";
import { FriendData } from "@/types/frinedData";

export const readFriendData = async (userId: string): Promise<FriendData | null> => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) return null;

  const data = userDocSnap.data();

 
  const account = {
    account_id: userId,
    display_name: data.display_name,
    handle_name: data.handle_name,
    icon_src: data.icon_src ?? null,
    message: data.message ?? "",
  };
  return account;
};
