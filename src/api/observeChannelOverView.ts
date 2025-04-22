import { time } from "console";
import { db } from "../firebase";
import { collection, doc, getDocs, getDoc, onSnapshot, Timestamp, where, query, orderBy, limit } from "firebase/firestore";
import { useLoginUser } from "../hooks/useLoginUser";

export type ChannelOverViewData = {
    channelId: string;
    channelName: string;
    channelIcon: string;
    channelStatus: string;
    lastMessage: string;
    lastMessageAt: Timestamp | null;
};
type callback = (data: ChannelOverViewData) => void;
export const observeChannelOverView = (channelId:string, accountId: string, callback:callback) => {
    const unsubscribe = onSnapshot(
        doc(db, "channels", channelId), async (docSnap) => {
            try{
                if (!docSnap.exists()) {
                    throw new Error(`Channel document "${channelId}" does not exist.`);
                }
                const data = docSnap.data();

                const channel: ChannelOverViewData = {
                    channelId: docSnap.id,
                    channelName: data.channel_name,
                    channelIcon: data.icon_src,
                    channelStatus: data.status,
                    lastMessage: data.lastMessage,
                    lastMessageAt: data.lastMessageAt ?? null
                };
                if(data.status==="personal"){
                    const friendId = await getFriendIdWithChannel(channelId, accountId);
                    if(!friendId){
                        channel.channelName = "unknown user"; 
                        getLastMessage(channelId,(message, created_at)=>{
                            channel.lastMessage = message?? "";
                            channel.lastMessageAt = created_at;
                            callback(channel);
                        })
                        return;
                    }
                    const displayName = await getFriendDisplayName(friendId, accountId);
                    if(!displayName){
                        channel.channelName = "unknown user";
                    }else{
                        channel.channelName = displayName;
                    }
                }
                getLastMessage(channelId,(message, created_at)=>{
                    channel.lastMessage = message?? "";
                    channel.lastMessageAt = created_at;
                    callback(channel);
                })
            }
            catch (error) {
                console.error("observeChannelOverView エラー:", error);
                throw error;
            }
        }
    )
    return unsubscribe;
}

const getFriendIdWithChannel = async (channelId:string, accountId:string) => {
    const usersSnap = await getDocs(collection(doc(db,"channels",channelId),"users"));
    return usersSnap.docs.find((doc) => doc.id !== accountId )?.id;
}

const getFriendDisplayName = async (friendId:string, accountId:string) => {
    const userDocSnap = await getDoc(doc(collection(doc(db,"users",accountId),"friends"),friendId,));
    if (!userDocSnap.exists()) return;
    const displayName =  userDocSnap.data().display_name;
    if(displayName!=="") return displayName;
    const user2DocSnap = await getDoc(doc(db,"users",friendId));
    if (!user2DocSnap.exists()) return;
    const display2Name =  user2DocSnap.data().display_name;
    if(!display2Name) return;
    return display2Name;
}

const getLastMessage =  (channelId:string, callback:(message:string|null, creatAt:Timestamp|null)=>void) => {
    const unsubscribe = onSnapshot(query(collection(doc(db,"channels",channelId),"messages"), orderBy("created_at", "desc"), limit(1)),(snapshot)=>{
        console.log(snapshot)
        if (snapshot.empty) {
            callback(null,null);
            return;
        }
        const doc = snapshot.docs[0];
        const data = doc.data();
        callback(data.message, data.created_at);
    })
    return unsubscribe;
}