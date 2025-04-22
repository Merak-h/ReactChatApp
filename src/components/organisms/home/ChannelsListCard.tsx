import { useFormatTimeAgo } from "../../../hooks/formats/useFormatTimeAgo";
import { Avatar, Box, Circle, Float, HStack, Separator, Text, VStack } from "@chakra-ui/react"
import { Timestamp } from "firebase/firestore";
import { FC, memo, useEffect, useState } from "react"

type Props = channelsList & {onClick:()=>void, isCurrent:boolean};

type channelsList = {
    id: string;
    displayName: string;
    icon: string;
    message: string;
    timestamp: Timestamp | null; // Unix time
    unread: number;
};
export const ChannelsListCard:FC<Props> = memo((props)=>{
    const{id, displayName, icon, message, timestamp, unread, onClick, isCurrent} =props;
    const {ago} = useFormatTimeAgo(timestamp);


    return(
        <Box w="100%" backgroundColor= { isCurrent ?"#ac96ce": "transparent"} onClick={onClick} >
            <Separator />
                <HStack padding={2} w="100%">
                    <Box w="fit-content" h="fit-content" position="relative" flex="0 0 fit-content">
                        <Avatar.Root>
                            <Avatar.Fallback name={displayName} />
                            {icon ?
                            <Avatar.Image src={icon} />:
                            null
                            }
                        </Avatar.Root>
                        {unread===0 || (
                            <Float placement="top-start" offset="2">
                                <Circle size="4" bg="red" color="white">
                                    {unread}
                                </Circle>
                            </Float>
                        )}
                    </Box>
                    <VStack gap={0} minW={0} flex="0 1 100%">
                        <Text textStyle="md" fontWeight="semibold" w="100%" lineHeight={1}>{displayName}</Text>
                        <Text textStyle="sm" fontWeight="light" color="#444" w="100%" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{message}</Text>
                    </VStack>
                        <Text textStyle="xs" fontWeight="light" lineHeight={1} w="fit-content" wordBreak="keep-all" flex="0 0 fit-content">{ago}</Text>
                </HStack>
            <Separator />
        </Box>
    )
});