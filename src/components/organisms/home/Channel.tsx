import { Box, Flex, HStack, IconButton, VStack } from "@chakra-ui/react";
import { FC, memo, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

import { IoChevronBackOutline } from "react-icons/io5";

import { ChannelData, readChannelData } from "../../../api/readChannelData";
import { Message, observeChannelMessages } from "../../../api/observeChannelMessages";
import { MessageSpeechBubble } from "../../../components/molecules/MessageSpeechBubble";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { MessageInputBox } from "../../../components/molecules/MessageInputBox";
import { createChannelMessage } from "../../../api/createChannelMessage";
import { useChannelData } from "../../../hooks/useChannelData";
const since = Timestamp.now(); // 現在のタイムスタンプを基準に
type Props ={
    channelId: string
}
export const Channel:FC<Props> = memo((props)=>{
    const { channelId } = props;
    const {account} = useLoginUser();

    const [ channelData, setChannelData ] = useState<ChannelData>();
    const [ channelDisplyName, setChannelDisplyName ] = useState<string>()
    const [ messagesGroup, setMessagesGroup ] = useState<Message[]>([]);
    const [ initialMessages, setinitialMessages ] = useState<Message[]>([]);
    const [ newMessages, setNewMessages ] = useState<Message[]>([]);
    const [ oldMessages, setOldNewMessages ] = useState<Message[]>([]);
    const [ flagOldest, setFlagOldest ] = useState(false);
    const flagOldestRef = useRef(flagOldest);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const topMessageRef = useRef<HTMLDivElement | null>(null);
    const oldUnsubscribersRef = useRef<Array<() => void>>([]);
    const { observeNewMessages, observeInitialMessages, observeOldMessages } = observeChannelMessages();
    const { getChannelData, getChannelDisplayName } = useChannelData();
    
    useEffect(() => {
        // 初期化
        setMessagesGroup([]);
        setinitialMessages([]);
        setNewMessages([]);
        setOldNewMessages([]);
        setFlagOldest(false); 
    }, [channelId]);

    useEffect(() => { // channel data の取得
        if(!channelId) return undefined;
        const channelData = async () => {
            const channelData = await getChannelData(channelId);
            setChannelData(channelData);
        };
        channelData();
    }, [channelId]);

    useEffect(()=>{ // channel name の取得
        if(!channelData)return;
        const channelName = getChannelDisplayName(channelData);
        setChannelDisplyName(channelName);
    },[channelData])

    useEffect(()=>{ // messagesGroupの初期化処理
        setMessagesGroup([...oldMessages,...initialMessages,...newMessages]);
    },[initialMessages, newMessages, oldMessages]);



    useEffect(() => { // 最初の20件を取得して監視
        if(!channelId) return undefined;
        const getInitialMessages = async () => {
            try {
                const InitialMessagesUnsubscribe = observeInitialMessages(channelId, since, (messages)=>{
                    setinitialMessages(messages);
                });
                return () => {
                    InitialMessagesUnsubscribe?.();

                };
            } catch (error) {
                console.error("チャンネル情報の取得に失敗:", error);
            }
        };
        getInitialMessages();
    }, [channelId, account]);

    useEffect(() => { // 新規メッセージの取得と監視
        if(!channelId) return undefined;
        const getChannelData = async () => {
            try {
                const messagesUnsubscribe = observeNewMessages(channelId, since, (newMessages)=>{
                    setNewMessages(newMessages);
                    });
                return () => {
                    messagesUnsubscribe?.();

                };
            } catch (error) {
                console.error("チャンネル情報の取得に失敗:", error);
            }
        };

        getChannelData();
    }, [channelId, account]);
    
    useEffect(() => {
        setFlagOldest(false);
        flagOldestRef.current = false;
        const observer = new IntersectionObserver(
            async (entries) => {
                if(flagOldestRef.current) return;
                if (entries[0].isIntersecting && messagesGroup.length > 0) {
                    const oldest = messagesGroup[0];
                    const olderMessagesUnsubscribe = await observeOldMessages(channelId, oldest.created_at,(olderMessages)=>{
                        if (olderMessages.length > 0) {
                            setOldNewMessages((prev)=>[...olderMessages, ...prev]);
                        }else{
                            setFlagOldest(true);
                            flagOldestRef.current = true;
                        }
                    });
                    oldUnsubscribersRef.current.push(olderMessagesUnsubscribe);
                }
                
            },
            {
                root: chatContainerRef.current, // スクロール対象
                threshold: 0.2,                 // 完全に見えたら
            }
        );
      
        if (topMessageRef.current) {
          observer.observe(topMessageRef.current);
        }
        return () => {
            observer.disconnect();
            oldUnsubscribersRef.current.forEach((unsub) => unsub()); 
            oldUnsubscribersRef.current = [];
        };
      }, [messagesGroup, channelId]);

    const handleSendMessage = async(message:string):Promise<boolean>=>{
        if(!account) throw new Error("アカウント情報が取得できませんでした。");
        return createChannelMessage( channelId, account.account_id, message);
    }

    useEffect(() => {
        if (!chatContainerRef.current || !scrollRef.current) return;
      
        const container = chatContainerRef.current;
      
        // スクロールが最下部近くなら自動スクロール（差が50px以内）
        const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      
        if (isAtBottom) {
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
      
        // 初回ロード時もスクロール
        if (messagesGroup?.length && container.scrollTop === 0) {
          scrollRef.current.scrollIntoView({ behavior: "auto" });
        }
      }, [messagesGroup]); // メッセージの更新時に実行


      const navigate = useNavigate();
    const handleBack = ()=> {
        navigate("/home/")
    }

    if(channelId!=="")return(
        <Flex h="100%" flexDirection="column">
            <Box h="40px">
                <HStack>
                    <IconButton onClick={handleBack} >
                        <IoChevronBackOutline color="#000" />
                    </IconButton>
                    <Link to="/">{channelDisplyName}</Link>
                </HStack>
            </Box>
            <Box flex={1} position="relative" overflowY="auto" ref={chatContainerRef}>
                <VStack position="relative" bottom={0} gap={4} alignItems="flex-start" pl={4}>
                    {messagesGroup?.map((message, index)=>(
                        <Box
                            key={message.message_id}
                            ref={index === 0 ? topMessageRef : null} // 先頭だけ監視対象
                        >
                        <MessageSpeechBubble 
                            key={message.message_id} 
                            content={message.content}
                            user_name={channelData?.joined_users.find(user=>user.user_id==message.sender_id)?.displayName} 
                            icon={channelData?.joined_users.find(user=>user.user_id==message.sender_id)?.icon} 
                            is_read={true}
                            created_at={message.created_at}
                            updated_at={message.updated_at}
                        />
                        </Box>
                    ))}
                    <div ref={scrollRef} />
                </VStack>
            </Box>
            <Box height="fit-content">
                <MessageInputBox callback={handleSendMessage} />
            </Box>
        </Flex>
    );
})