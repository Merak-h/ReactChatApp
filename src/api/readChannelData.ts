import { db } from "../firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { getFriendDisplayName } from "./getFriendDisplayName";
import { readFriendData } from "./readFriendData";

export type ChannelData = {
        channel_id: string;
        channel_name: any;
        status: any;
        created_at: any;
        icon_src: any;
        joined_users: joinuser[];
}
type joinuser = {
    user_id: string;
    displayName: any;
    icon: string | null;
}
export const readChannelData = async (channelId: string, account:string) => {
    try{
        if(!account) throw new Error("ログイン情報が取得できませんでした。");
        if(!channelId)return undefined;
        const [channelSnap, friendsSnap] = await Promise.all([
            getDoc(doc(db, "channels", channelId)),
            getDocs(collection(doc(db, "channels", channelId), "users")),
        ]);
        
        if (!channelSnap.exists()) return null;
        const data = channelSnap.data();
        const friendIds = friendsSnap.docs.map((doc) => doc.id);
        const joinUsers = await Promise.all(
            friendIds.map(async (friendId) => {
                const displayName =  await getFriendDisplayName(friendId, account);
                const friendData = await readFriendData(friendId);
                return{
                    user_id: friendId,
                    displayName,
                    icon: friendData?.icon_src ?? null,
                }
            // const [displayName, friendData] = await Promise.all([
            //     getFriendDisplayName(friendId, account),
            //     readFriendData(friendId),
            // ]);
            // return {
            //     user_id: friendId,
            //     displayName,
            //     icon: friendData?.icon_src ?? null,
            // };
            })
        );
        const channelData:ChannelData = {
            channel_id: channelId,
            channel_name: data.channel_name ?? "",
            status: data.status,
            created_at: data.created_at,
            icon_src: data.icon_src ?? null,
            joined_users: joinUsers,
        }
        return channelData
    }
    catch (error) {
        console.error("readChannelData エラー:", error);
        throw error;
  }
}

