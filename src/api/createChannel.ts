import { db } from "../firebase";
import { addDoc, doc, serverTimestamp, setDoc, collection} from "firebase/firestore";

type User = string
type Status = 'public' | 'private' | 'personal'

export const createChannel = async (users:Array<User>, name:string = "", icon:string|null = null, status:Status = 'personal') => {
    try{
        const channelRef = await addDoc(collection(db, "channels"), {
            channel_name: name,
            status: status,
            created_at: serverTimestamp(),
            icon_src: icon,
          });
      
          // サブコレクション "users" にユーザーごとのドキュメントを追加
          const usersCollectionRef = collection(channelRef, "users");
      
          const userWrites = users.map((userId) =>
            setDoc(doc(usersCollectionRef, userId), {
              joined_at: serverTimestamp(),
              role: "member", 
            })
          );
      
          await Promise.all(userWrites); // 並列で実行
        return channelRef.id;
    }
    catch(error){
        console.error('updateNickName',error)
        throw error;
    }
}