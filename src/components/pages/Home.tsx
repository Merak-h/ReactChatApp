import { FC, memo, useEffect, useState } from "react";

import { Avatar, Box, Button, Card, Circle, Container, Flex, Float, HStack, Input, Separator, Stack, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useLoginUser } from "../../hooks/useLoginUser";
import { doc, DocumentData, QuerySnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ChannelsListCard } from "../organisms/home/ChannelsListCard";
import { Channel } from "../organisms/home/Channel";
import { useChannels } from "../../hooks/useChannels";
import { useNavigate, useParams  } from "react-router-dom";
import { observeJoinedChannelIds } from "../../api/observeJoinedChannelIds";
import { ChannelOverViewData, observeChannelOverView } from "../../api/observeChannelOverView";

export const Home:FC = memo( () => {

        const { id:channelId } = useParams();

        const { account } = useLoginUser();

        // const [createdAt] = useState(loginUser?.metadata.creationTime);
        // const [lastLoginAt] = useState(loginUser?.metadata.lastSignInTime);
        
        const [currentChannel, setCurrentChannel] = useState(channelId||'');


       useEffect(()=>{
        setCurrentChannel(currentChannel)
       },[channelId])

        const navigate = useNavigate();
        const handleOpneChannel = (hcannelId:string) =>{
            setCurrentChannel(hcannelId)
            navigate(`/home/${hcannelId}`);
        }

        const [channels, setChannels] = useState<string[]>([]);
        const [channelsList, setChannelsList] = useState<ChannelOverViewData[]>([]);

        useEffect(()=>{
            if(!account) return ;
             const channelIdsUnsubscribe = observeJoinedChannelIds(account.account_id, (channels) =>{
                setChannels(channels);
            });
            return ()=>channelIdsUnsubscribe();
        },[]);

        useEffect(() => {
        if (channels.length === 0) return;

        const channelMap = new Map<string, ChannelOverViewData>();
        const unsubscribes: (() => void)[] = [];

        channels.forEach((channelId) => {
            const unsubscribe = observeChannelOverView(channelId, account?.account_id??"", (channelData) => {
            channelMap.set(channelId, channelData);
            setChannelsList(Array.from(channelMap.values())); // 最新の状態に更新
            });
            unsubscribes.push(unsubscribe);
        });

        return () => {
            unsubscribes.forEach((unsub) => unsub()); // 監視解除
        };
        }, [channels]);


return(
    <>
        <Container h="100%" w="100%" p={0}>
            <Flex h="100%" w="100%" justifyContent="left">
                <Box overflow="auto" h="100%" w="300px">
                    {/* <Box>
                        {createdAt===lastLoginAt?"初めまして！こんにちは！":"おかえりなさい！"}{userName??"名無し"}さん
                    </Box> */}
                    <Box w="100%">
                        {channelsList?.map((channel)=>(
                            <ChannelsListCard  
                                key={channel.channelId}
                                id={channel.channelId} 
                                displayName={channel.channelName} 
                                icon={channel.channelIcon} 
                                message={channel.lastMessage} 
                                timestamp={channel.lastMessageAt} 
                                // unread={channel.unreradCount}
                                unread={0}
                                onClick={()=>{handleOpneChannel(channel.channelId)}}
                                isCurrent = {currentChannel == channel.channelId}
                            />
                        ))}
                    </Box>
                </Box>
                <Box h="100%" w="100%">
                    <Channel channelId={currentChannel} />
                </Box>
            </Flex>

        </Container>
    </>
)
}

);