import { db } from "../firebase";
import {collection, query, where, getDocs, doc, getDoc} from "firebase/firestore";

type Status = "public" | "private" | "personal";


export const isChannel = async (userId: string, status: Status = "personal"): Promise<string | false> => {
  try {
    // ステータスが一致する channels を取得
    const channelQuery = query(
      collection(db, "channels"),
      where("status", "==", status)
    );
    const channelSnapshots = await getDocs(channelQuery);

    for (const channelDoc of channelSnapshots.docs) {
      const userDocRef = doc(db, "channels", channelDoc.id, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        return channelDoc.id; // 該当チャンネルが見つかったらID返す
      }
    }

    return false; // 見つからなかったら false
  } catch (error) {
    console.error("isChannel", error);
    throw error;
  }
};