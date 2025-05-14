import { memo, FC, useState, ChangeEvent, useEffect } from "react";
import { Box, Button, Flex, Heading, Image, Input, Separator, Stack, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, User } from "firebase/auth";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";

export const Login: FC = memo(() => {

    const {login} = useAuth();
    const handleLogin = ()=>login();

    return(
        <VStack align="center" justify="center" height="100vh" w="100%" bg="#b8b4c0">
                <Text fontFamily='"Slackside One", cursive' fontSize={32} color="#fff" textShadow="0 8px 8px 8px #000">Wellcome to <Text display="inline" fontFamily='"Playwrite DK Loopet", cursive'>Wiee Chat</Text> !</Text>

                    {/* <Input placeholder="ユーザーID" value={userId} onChange={handleChangeUserId}/> */}
                    <Box paddingTop={10}>
                        <Button onClick={handleLogin} bg="#8571ad" p={6} fontSize={18} position="relative" paddingRight={10} borderRadius="100px 0 0 100px">
                            Googleでログイン
                            <Box padding={2} bg="#fff" borderRadius={100} position="absolute" top="50%" right="0%" transform="translate(50%,-50%)">
                                <Image src="googleLogo.svg" display="block" height="40px" width="40px"/>
                            </Box>
                        </Button>
                    </Box>
        </VStack>
    );
});