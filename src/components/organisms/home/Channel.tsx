import { channel, message, useApiChannel } from "../../../hooks/api/useApiChannel";
import { useApiUser, user } from "../../../hooks/api/useApiUser";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { FC, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props ={
    channelId: string
}
export const Channel:FC<Props> = memo((props)=>{
    const {channelId} = props;

    const [channel, setChannel] = useState<channel>();
    const [users, setUsers] = useState<user[]>();

    // チャンネル情報の取得
    const {getChannel} = useApiChannel();

    useEffect(() => {
        const fetch = async () => {
          const data = await getChannel(channelId);
          setChannel(data);
        };
        fetch();
      }, [channelId]);

    //   ユーザー情報の取得
    const {getUsers} = useApiUser();
      useEffect(()=>{
        if(channel){
            const fetch = async () => {
                const data = await getUsers(channel.users);
                setUsers(data);
            };
            fetch();
        }
      },[channel])

    const displayUser = (user_id:string)=>{
        return users?.find(user=>(
            user_id === user.user_id
        ));
    }

    return(
        <Box>
            <Box>
                <HStack>
                    <Link to="/channle">{channel?.channel_name}</Link>
                </HStack>
            </Box>
            <Box>
                {channel?.messages.map((message:message)=>(
                    <Box key={message.message_id}>
                        <HStack>
                            <Avatar.Root>
                                <Avatar.Fallback />
                                <Avatar.Image />
                            </Avatar.Root>
                            <VStack>
                                <HStack>
                                    <Text>{displayUser(message.sender_id)?.display_name ?? 'Unknown User'}</Text>
                                    <Text>{message.creat_at}</Text>
                                    <Text>{message.creat_at !== message.update_at ? '編集' : ''}</Text>
                                </HStack>
                                <Text>{message.text}</Text>
                            </VStack>
                        </HStack>
                    </Box>
                ))}
            </Box>
        </Box>
    );
})