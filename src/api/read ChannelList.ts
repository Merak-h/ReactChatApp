import { db } from "../firebase";
import { useLoginUser } from "../hooks/useLoginUser"
import { error } from "console";
import { collection, collectionGroup, doc, getDoc, getDocs, query, where, onSnapshot, DocumentData, QuerySnapshot } from "firebase/firestore";

export const  readChannelList = async (userId:string, callback: (snapshot:QuerySnapshot<DocumentData>) => void) =>{
    try {
        const joinedChannelIds: string[] = [];
        // "users" サブコレクションを横断検索
        const userSubDocs = onSnapshot(
            query(
              collectionGroup(db, "users"),where("__name__", "==", userId)
            ),
            (snapshot) => {
              callback(snapshot);
            //   snapshot.forEach((docSnap) => {
            //     const pathParts = docSnap.ref.path.split("/");
            //     const channelId = pathParts[1]; // "channels/{channelId}/users/{uid}" なので index 1
            //     joinedChannelIds.push(channelId);
            // });
            // console.log("snapshot", snapshot);
            }
        );
    
        

    
        // // 対応する channels ドキュメントを取得
        // const channelList = await Promise.all(
        //   joinedChannelIds.map(async (channelId) => {
        //     const channelRef = doc(db, "channels", channelId);
        //     const channelSnap = await getDoc(channelRef);
        //     if (channelSnap.exists()) {
        //       return { id: channelSnap.id, ...channelSnap.data() };
        //     }
        //     return null;
        //   })
        // );
    
        // // nullを除外して返す
        // return channelList.filter((c): c is NonNullable<typeof c> => c !== null);
      } catch (error) {
        console.error("getJoinedChannels", error);
        throw error;
      }
}