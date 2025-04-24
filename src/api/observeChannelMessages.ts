import { db } from "../firebase";
import { collection, doc, DocumentData, limit, onSnapshot, orderBy, query, QuerySnapshot, Timestamp, where } from "firebase/firestore";

export type Message = {
    message_id: string;
    content: string; // メッセージの内容
    sender_id: string; // 送信者のユーザーID
    created_at: Timestamp
    updated_at: Timestamp |null;
    is_deleted: boolean;
}

export const observeChannelMessages = () => {
    
    // 最新のメッセージを監視・取得する
    const observeNewMessages = (channelId:string, since:Timestamp, callback:(messages:Array<Message>)=>void)=> {
        if (!channelId) {
            callback([]);
            return () => {}; // 空のunsubscribe返す
        }
        const unsubscribe = onSnapshot(
            query(
                collection(doc(db, "channels",channelId), "messages"),
                where("created_at", ">", since),
                orderBy("created_at", "asc")
            ),
            (snapshot: QuerySnapshot<DocumentData>) => {
                const messages: Array<Message> = [];
                snapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    messages.push({
                        message_id: docSnap.id,
                        content: data.content,
                        sender_id: data.sender_id,
                        created_at: data.created_at,
                        updated_at: data.updated_at,
                        is_deleted: data.is_deleted
                    });
                });
                callback(messages);
            }
        );
        return unsubscribe;

    }

    // 最初に表示する20件分を取得する
    const observeInitialMessages = (channelId:string, since:Timestamp, callback:(messages:Array<Message>)=>void)=> {
        if (!channelId) {
            callback([]);
            return () => {}; // 空のunsubscribe返す
        }
        const unsubscribe = onSnapshot(
            query(
                collection(doc(db, "channels",channelId), "messages"),
                where("created_at", "<=", since),
                orderBy("created_at", "desc"),
                limit(20)
            ),
            (snapshot: QuerySnapshot<DocumentData>) => {
                const messages: Array<Message> = [];
                snapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    messages.push({
                        message_id: docSnap.id,
                        content: data.content,
                        sender_id: data.sender_id,
                        created_at: data.created_at,
                        updated_at: data.updated_at,
                        is_deleted: data.is_deleted
                    });
                });
                callback(messages.reverse());
            }
        );
        return unsubscribe;
    }

    const observeOldMessages = (channelId:string, before:Timestamp, callback:(messages:Array<Message>)=>void)=> {
        if (!channelId) {
            callback([]);
            return () => {}; // 空のunsubscribe返す
        }
        const unsubscribe = onSnapshot(
            query(
                collection(doc(db, "channels",channelId), "messages"),
                where("created_at", "<", before),
                orderBy("created_at", "desc"),
                limit(20)
            ),
            (snapshot: QuerySnapshot<DocumentData>) => {
                const messages: Array<Message> = [];
                snapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    messages.push({
                        message_id: docSnap.id,
                        content: data.content,
                        sender_id: data.sender_id,
                        created_at: data.created_at,
                        updated_at: data.updated_at,
                        is_deleted: data.is_deleted
                    });
                });
                callback(messages.reverse());
            }
        );
        return unsubscribe;
    }
    return {observeNewMessages, observeInitialMessages, observeOldMessages}
}

