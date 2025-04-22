import { FC, memo, useEffect, useState } from "react";

import { Avatar, Box, Button, Card, Circle, Container, Flex, Float, HStack, Input, Separator, Stack, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useLoginUser } from "../../hooks/useLoginUser";
import { doc, DocumentData, QuerySnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDummy } from "../../hooks/useDummy";
import { ChannelsListCard } from "../organisms/home/ChannelsListCard";
import { Channel } from "../organisms/home/Channel";
import { useChannels } from "../../hooks/useChannels";
import { useNavigate, useParams  } from "react-router-dom";
import { readChannelList } from "../../api/read ChannelList";
import { observeJoinedChannelIds } from "../../api/observeJoinedChannelIds";
import { ChannelOverViewData, observeChannelOverView } from "../../api/observeChannelOverView";

export const Home:FC = memo( () => {

        const { id:channelId } = useParams();

        const { account } = useLoginUser();

        // const [createdAt] = useState(loginUser?.metadata.creationTime);
        // const [lastLoginAt] = useState(loginUser?.metadata.lastSignInTime);
        
        const [currentChannel, setCurrentChannel] = useState(channelId||'');

    //    const {dummyChannelsList} = useDummy();
    //    const [channelsList,setChannelsList] = useState(dummyChannelsList);
       

        const navigate = useNavigate();
        const handleOpneChannel = (hcannelId:string) =>{
            setCurrentChannel(hcannelId)
            navigate(`/home/${currentChannel}`);
        }


        // てｓｔ
        const [channels, setChannels] = useState<string[]>([]);
        const [channelsList, setChannelsList] = useState<ChannelOverViewData[]>([]);

        useEffect(()=>{
            if(account)
             observeJoinedChannelIds(account.account_id, (channels) =>{
                setChannels(channels);

            });
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

        useEffect(()=>{console.log('channelsList',channelsList)}, [channelsList]);


return(
    <>
        <Container h="100%">
            <Flex h="100%">
                <Box overflow="auto" h="100%" w="300px">
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
                <Box>
                    <Channel channelId={currentChannel}>

                    </Channel>
                {/* <p>Home</p>
        <p>
            To Do
        </p>
        <p>
            リロード時にログインユーザーの情報が消える問題
        </p>
        <p>
            Firebaseに情報を登録
        </p>
        <p>
            web socket
        </p>
        <p>
            web hook
        </p>
        <Box>
            {createdAt===lastLoginAt?"初めまして！こんにちは！":"おかえりなさい！"}{userName??"名無し"}さん
        </Box>
        <Button onClick={handleSubmit}>登録</Button> */}
                </Box>
            </Flex>

        </Container>
    </>
)
}

);