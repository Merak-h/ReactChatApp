import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase";

/**
 * ハンドルネームからユーザーのUIDを取得する関数
 * @param handle_name - 例 "@bob_det"
 * @returns uid（string）または null（見つからなければ）
 */
export const getUidByHandleName = async (handle_name: string): Promise<string | null> => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("handle_name", "==", handle_name));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;

  const docSnap = querySnapshot.docs[0]; // 1件目を取得
  return docSnap.id; // ← このIDが uid
};
