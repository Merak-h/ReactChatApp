import { Box, Flex, HStack, IconButton, VStack, Text } from "@chakra-ui/react";
import { FC, memo, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IoChevronBackOutline } from "react-icons/io5";

import { MessageSpeechBubble } from "../../../components/molecules/MessageSpeechBubble";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { MessageInputBox } from "../../../components/molecules/MessageInputBox";
import { createChannelMessage } from "../../../api/createChannelMessage";
import { useChannelDetails } from "../../../hooks/channel/useChannelDetails";
import { useChannelMessages } from "../../../hooks/channel/useChannelMessages";
import { useMessageInput } from "../../../hooks/channel/useMessageInput";
type Props ={
    channelId: string;
    channelName: string;
}
export const Channel:FC<Props> = memo((props)=>{
    const { channelId, channelName } = props;
    
    const navigate = useNavigate();
    const { sendMessage } = useMessageInput();
    const [ channelData, getChannelData ] = useChannelDetails();
    const { messages, watchMessages, setLoadOlderMessageFlag } = useChannelMessages(channelId);

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const topMessageRef = useRef<HTMLDivElement | null>(null);
    

    // 初期化
    useEffect(() => { 
        getChannelData(channelId);// channel data の取得
        watchMessages();// メッセージの取得と監視の開始
    }, [channelId]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries)=>{
                if(entries[0].isIntersecting) setLoadOlderMessageFlag(true);
            },{
                root: chatContainerRef.current, // スクロール対象
                threshold: 0.2,                 // 完全に見えたら
            }
        );
        if (topMessageRef.current) observer.observe(topMessageRef.current);
        return () => observer.disconnect();
    }, [messages, channelId]);



    useEffect(() => {
        if (!chatContainerRef.current || !scrollRef.current) return;
      
        const container = chatContainerRef.current;
      
        // スクロールが最下部近くなら自動スクロール（差がn px以内）
        const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      
        if (isAtBottom) {
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
      
        // 初回ロード時もスクロール
        if (messages?.length && container.scrollTop === 0) {
          scrollRef.current.scrollIntoView({ behavior: "auto" });
        }
    }, [messages]); // メッセージの更新時に実行

    const handleSendMessage = async(message:string):Promise<boolean>=>{
        return await sendMessage(channelId, message)
    }

      
    const handleBack = ()=> {
        navigate("/home/")
    }

    if(channelId!=="")return(
        <Flex h="100%" w="100%" flexDirection="column">
            <Box h="40px" bg="#9976c0" w="100%">
                <HStack w="100%">
                    <IconButton onClick={handleBack} bg="#0000">
                        <IoChevronBackOutline color="#fff" />
                    </IconButton>
                    <HStack w="100%" justifyContent="center">
                        <Link to="/" ><Text color="#fff">{channelName}</Text></Link>
                    </HStack>
                </HStack>
            </Box>
            <Box flex={1} position="relative" overflowY="auto" ref={chatContainerRef} _scrollbar={{width:"6px"}} _scrollbarThumb={{bg:"#0008",borderRadius:"100px"}}>
                <VStack position="relative" bottom={0} gap={4} alignItems="flex-start" pl={4}>
                    {messages?.map((message, index)=>(
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