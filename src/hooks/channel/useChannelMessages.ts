import { useEffect, useRef, useState } from "react";
import { Timestamp } from "firebase/firestore";

import { Message, observeChannelMessages } from "../../api/observeChannelMessages";

export const useChannelMessages = (channelId:string)=> {
    const { observeNewMessages, observeInitialMessages, observeOldMessages } = observeChannelMessages();
    
    const [ messages, setMessages ] = useState<Message[]>([]);
    const [ loadOlderMessageFlag, setLoadOlderMessageFlag　] = useState(false);
    
    const since = Timestamp.now();
    const flagOldest = useRef(false);
    const channelIdRef = useRef(channelId);
    const messageMapRef = useRef(new Map<string, Message>());
    const unsubscribesRef = useRef<Array<() => void>>([]);

    const watchMessages = () =>{
        try {
            if(!channelId) throw new Error("チャンネルIDが取得できませんでした");
            if(channelIdRef.current !== channelId) {
                // 初期化
                channelIdRef.current = channelId;
                messageMapRef.current.clear(); 
                setMessages([]);
                flagOldest.current = false;
                setLoadOlderMessageFlag(false);
                unsubscribesRef.current.forEach(unsub => unsub());
                unsubscribesRef.current = [];
            };
            
            // 最初の20件を取得して監視
            const unsubscribeInitMessage = observeInitialMessages(channelId, since, (messages)=>{
                messages.forEach ((message) => {
                    messageMapRef.current.set(message.message_id, message);
                    setMessages(
                        Array.from(messageMapRef.current.values()).sort((a, b) =>
                        a.created_at.toMillis() - b.created_at.toMillis())
                    );
                });
                unsubscribesRef.current.push(unsubscribeInitMessage);
            });

            // 新規メッセージを取得して監視
            const unsubscribeNewMessage = observeNewMessages(channelId, since, (messages)=>{
                messages.forEach ((message) => {
                    messageMapRef.current.set(message.message_id, message);
                    setMessages(
                        Array.from(messageMapRef.current.values()).sort((a, b) =>
                        a.created_at.toMillis() - b.created_at.toMillis())
                    );
                });
                unsubscribesRef.current.push(unsubscribeNewMessage);
            });
        } 
        catch (error) {
            console.error("チャンネル情報の取得に失敗:", error);
        }
    }

    useEffect(() =>{
        if(!loadOlderMessageFlag || flagOldest.current) return;
        const unsubscribeOldMessage = observeOldMessages(channelId, messages[0].created_at, (messages)=>{
            if(messages.length > 0){
                console.log("[messages]\n",messages)
                messages.forEach ((message) => {
                    messageMapRef.current.set(message.message_id, message);
                    setMessages(
                        Array.from(messageMapRef.current.values()).sort((a, b) =>
                            a.created_at.toMillis() - b.created_at.toMillis())
                    );
                });
                setLoadOlderMessageFlag(false);
            }
            else{
                flagOldest.current = true;
            }
            unsubscribesRef.current.push(unsubscribeOldMessage);
        });
    },[loadOlderMessageFlag]);
    

    return { messages, watchMessages, setLoadOlderMessageFlag };
}