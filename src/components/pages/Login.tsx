import { memo, FC, useState, ChangeEvent, useEffect } from "react";
import { Box, Button, Flex, Heading, Input, Separator, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, User } from "firebase/auth";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";

export const Login: FC = memo(() => {

    const {login} = useAuth();
    const handleLogin = ()=>login();

    return(
        <Flex align="center" justify="center" height="100vh">
            <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
                <Heading as="h1" size="lg" textAlign="center">ユーザー管理アプリ</Heading>
                <Separator my={4} />
                <Stack px={10} py={4} spaceY={6}>
                    {/* <Input placeholder="ユーザーID" value={userId} onChange={handleChangeUserId}/> */}
                    <PrimaryButton handleClick={handleLogin}>
                        Googleでログイン
                    </PrimaryButton>
                </Stack>
            </Box>
        </Flex>
    );
});