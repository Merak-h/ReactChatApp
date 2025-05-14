import { db } from "../firebase";
import { addDoc, collection, doc, Timestamp } from "firebase/firestore";

export const createChannelMessage = async (channelId:string, senderId:string, message:string):Promise<boolean>=>{
    try{
        console.log("createChannelMessage",channelId,senderId,message);
        if(!channelId || !senderId || !message || message==="") return false;
        const messageRef = collection(doc(db, "channels", channelId), "messages");
        await addDoc(messageRef, {
            content: message,
            created_at: Timestamp.now(),
            is_deleted: false,
            sender_id: senderId,
            updated_at: null,
        });
        return true;
    }
    catch(error){
        console.error('createChannelMessage',error);
        return false;
    }
    
}