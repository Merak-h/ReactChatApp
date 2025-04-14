import { FC, memo, useEffect, useState } from "react";

import { Avatar, Box, Button, Card, Circle, Container, Flex, Float, HStack, Input, Separator, Stack, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useLoginUser } from "../../hooks/useLoginUser";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDummy } from "../../hooks/useDummy";
import { ChannelsListCard } from "../organisms/home/ChannelsListCard";
import { Channel } from "../organisms/home/Channel";

export const Home:FC = memo( () => {

        const { account } = useLoginUser();

        const [uid] = useState(account?.account_id);
        const [userName] = useState(account?.display_name);
        // const [createdAt] = useState(loginUser?.metadata.creationTime);
        // const [lastLoginAt] = useState(loginUser?.metadata.lastSignInTime);
        
        const [currentChannel, setCurrentChannel] = useState('default');

        
        

    //    const handleSubmit = async () => {
    //         try {
    //             await setDoc(doc(db, "users", uid!), {
    //               message:"tesut",
    //             }, {}); // ← merge: true で既存データを上書きしない
    //             console.log("メッセージ保存成功");
    //           } catch (err) {
    //             console.error("Firestore書き込みエラー:", err);
    //           }
    //    } 


       const {dummyChannelsList} = useDummy();
       const [channelsList,setChannelsList] = useState(dummyChannelsList);
       
        // console.log(channelsList)


        const handleOpneChannel = (hcannelId:string) =>{
            setCurrentChannel(hcannelId)
        }


return(
    <>
        <Container h="100%">
            <Box>
                {uid}
            </Box>
            <Box>
            {userName}
            </Box>
            <Flex h="100%">
                <Box overflow="auto" h="100%" w="300px">
                    <Box w="100%">
                        {channelsList.map((channel)=>(
                            <ChannelsListCard  
                                key={channel.id}
                                id={channel.id} 
                                displayName={channel.displayName} 
                                icon={channel.icon} 
                                message={channel.message} 
                                timestamp={channel.timestamp} 
                                unread={channel.unread}
                                onClick={()=>{handleOpneChannel(channel.id)}}
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