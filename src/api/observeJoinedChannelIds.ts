import { db } from "../firebase";
import {
  collectionGroup,
  onSnapshot,
} from "firebase/firestore";

/**
 * 指定された userId が所属している channelId 一覧をリアルタイムで取得する
 * @param userId FirestoreのUID
 * @param callback チャンネルIDリストを返すコールバック
 * @returns unsubscribe関数（監視解除用）
 */
export const observeJoinedChannelIds = (
  userId: string,
  callback: (channelIds: string[]) => void
) => {
  const unsubscribe = onSnapshot(
    collectionGroup(db, "users"),
    (snapshot) => {
      const channelIds: string[] = [];

      snapshot.forEach((docSnap) => {
        if (docSnap.id === userId) {
          const pathParts = docSnap.ref.path.split("/");
          if (pathParts[0] === "channels" && pathParts[2] === "users") {
            channelIds.push(pathParts[1]); // channelId
          }
        }
      });

      callback(channelIds);
    }
  );

  return unsubscribe;
};