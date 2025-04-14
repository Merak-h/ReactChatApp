import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { friend } from "../types/account"; // 例：{ user_id: string, display_name: string }
import { error } from "console";

export type FriendsList = (friend & {
  name: string,
  handle_name: string;
  message: string;
  icon_src:string
});

export const readFriendsList = async (userId: string): Promise<Array<FriendsList>> => {
  try {
    const userDocRef = doc(db, "users", userId);
    const friendsSnap = await getDocs(collection(userDocRef, "friends"));
    const rawFriends = friendsSnap.docs.map((doc) => doc.data() as friend);

    const enrichedFriends = await Promise.all(
      rawFriends.map(async (friend) => {
        const userDocRef = doc(db, "users", friend.user_id);
        const friendSnap = await getDoc(userDocRef);
        const data = friendSnap.data();
        if(data){
          return {
            ...friend,
            name: data.display_name,
            handle_name: data.handle_name,
            message: data.message,
            icon_src: data.icon_src,
          };
        }
        else{
          throw new Error('データが破損しています。')
        }
      })
    );
    
    return enrichedFriends;
  } catch (error) {
    console.error("readFriendsList エラー:", error);
    throw error;
  }
};
