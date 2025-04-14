import { channelsList } from "../../..//hooks/useDummy";
import { useFormatTimeAgo } from "../../../hooks/formats/useFormatTimeAgo";
import { Avatar, Box, Circle, Float, HStack, Separator, Text, VStack } from "@chakra-ui/react"
import { FC, memo, useEffect, useState } from "react"

type Props = channelsList & {onClick:()=>void};
export const ChannelsListCard:FC<Props> = memo((props)=>{
    const{id, displayName, icon, message, timestamp, unread, onClick} =props;
    const {ago} = useFormatTimeAgo(timestamp);


    return(
        <Box w="100%" onClick={onClick}>
            <Separator />
                <HStack padding={2} w="100%">
                    <Box w="fit-content" h="fit-content" position="relative" flex="0 0 fit-content">
                        <Avatar.Root>
                            <Avatar.Fallback name={displayName} />
                            <Avatar.Image src={icon} />
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