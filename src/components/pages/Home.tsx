import { FC, memo, useEffect } from "react";
import { Box, Center, Container, Flex, Text } from "@chakra-ui/react";
import { useNavigate, useParams  } from "react-router-dom";
import { Channel } from "../organisms/home/Channel";
import { ChannelsListCard } from "../organisms/home/ChannelsListCard";
import { useChannelIds } from "../../hooks/channel/useChannelIds";
import { useChannelOverviews } from "../../hooks/channel/useChannelOverviews";

export const Home:FC = memo(() => {
    const navigate = useNavigate();
    const { id:channelId } = useParams();
    const [ channels, getChannelIds ] = useChannelIds();
    const [ channelOverviews, getChannelOverviews ] = useChannelOverviews();

    useEffect(()=>{ // hcannel id 一覧リストの取得・監視
        return getChannelIds();
    },[]);

    useEffect(() => {// hcannel id 一覧リストから各hcannelのデータ概要の取得・監視
        return getChannelOverviews(channels);

    }, [channels]);

    const handleOpneChannel = (hcannelId:string) =>{
        navigate(`/home/${hcannelId}`);
    }

    return(
        <>
            <Container h="100%" w="100%" p={0}>
                <Flex h="100%" w="100%" justifyContent="left">
                    <Box overflow="auto" h="100%" w="300px">
                        {/* <Box>
                            {createdAt===lastLoginAt?"初めまして！こんにちは！":"おかえりなさい！"}{userName??"名無し"}さん
                        </Box> */}
                        <Box w="100%">
                            {channelOverviews?.map((channel)=>(
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
                                    isCurrent = {channelId == channel.channelId}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Center h="100%" w="100%">
                        {!channelId ||channelId===""?
                            <Box>
                                <Text>ようこそ</Text>
                            </Box>:
                            <Channel 
                                channelId={channelId||""} 
                                channelName={
                                    channelOverviews.find((channelData)=>channelData.channelId==channelId)?.channelName||""
                                } 
                            />
                        }
                    </Center>
                </Flex>

            </Container>
        </>
    )
});
