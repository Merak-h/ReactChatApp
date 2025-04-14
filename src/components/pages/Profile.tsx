import { Box, Container, VStack } from "@chakra-ui/react";
import { FC } from "react";

export const Profile:FC = ()=>{
    return(
        <>
            <Container>
                <h1>プロフィール</h1>
                <VStack>
                    <h2>個人設定(自分のみ閲覧可)</h2>
                    <h2>公開プロフィール設定</h2>
                </VStack>
            </Container>
        </>
    );
}