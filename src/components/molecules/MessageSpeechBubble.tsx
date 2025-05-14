import { Box, HStack, VStack, Avatar, Text,  } from "@chakra-ui/react"
import { FC } from "react"
import { Timestamp } from "firebase/firestore";
import { useFormatTimeAgo } from "../../hooks/formats/useFormatTimeAgo";

type Props = {
    icon?: string | null,
    user_name: string,
    is_read: boolean;
    content: string;
    created_at: Timestamp,
    updated_at: Timestamp | null,
}
export const MessageSpeechBubble:FC<Props> = (props) => {
    const { icon, user_name , is_read, content, created_at, updated_at} = props;
    // const { message_id, content, sender_id, created_at, updated_at, is_deleted } = message;

    const {ago} = useFormatTimeAgo(created_at);
    return(
        <Box w="100%">
            <HStack  w="100%" alignItems="flex-start">
                <Avatar.Root mt={4}>
                    <Avatar.Fallback name={user_name} />
                    { icon && <Avatar.Image src={icon} /> }
                </Avatar.Root>
                <VStack alignItems="flex-start" gap={0}>
                    <HStack gap={4}>
                        <Text fontSize="sm" fontWeight="bold">{user_name ?? 'Unknown User'}</Text>
                        {/* <Text>{is_deleted}</Text> */}
                        {/* <Text>{created_at !== updated_at ? '編集済' : ''}</Text> */}
                        <Text fontSize="xs" fontWeight="bold" opacity={0.6}>{ago}</Text>
                    </HStack>
                    <Text whiteSpace="pre-line" fontSize="md" fontWeight="md" borderRadius={4} backgroundColor="#00000022" pl={2} pr={2} pt={1} pb={1}>{content}</Text>
                </VStack>
            </HStack>
        </Box>
    )
}