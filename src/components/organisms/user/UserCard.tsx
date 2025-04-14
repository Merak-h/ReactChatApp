import { FriendsList } from "@/api/readFriendsList";
import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { FC, memo } from "react";

type Friend = {
    data: FriendsList,
    onClick : (uid:String)=>void,
}

export const UserCard:FC<Friend> = memo((props)=>{
    const { data, onClick } = props;
    return(
        <Box w="260px" h="260px" bg="white" borderRadius="10px" shadow="md" p={4} _hover={{cursor: "pointer", opacity: "0.8"}} onClick={()=>onClick(data.user_id)}>
            <Stack textAlign="center">
                <Image boxSize="160px" borderRadius="full" m="auto" src={data.icon_src} alt="プロフィール画像" />
                {data.display_name===""?<Text fontSize="lg" fontWeight="bold">{data.name}</Text>:
                    <>
                        <Text fontSize="lg" fontWeight="bold" marginBottom="0px">{data.display_name}</Text>
                        <Text fontSize="small" color="gray" marginTop="0px" lineHeight={0}>{data.name}</Text>
                    </>
                }
                <Text fontSize="small" color="gray">@{data.handle_name}</Text>
                <Text fontSize="small" color="gray">{data.message}</Text>
            </Stack>
        </Box>
    );
});