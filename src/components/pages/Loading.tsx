import { Container, Flex, Text, ProgressCircle, VStack, AbsoluteCenter } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

type Props={
    loadFinish:boolean;
    callback: (finish:boolean)=>void;
}

export const Loading:FC<Props> = (props) => {
    const { loadFinish, callback } = props;
    const [loadRange, setLoadRange] = useState<number>(0);
    useEffect(()=>{
        if(loadRange==100)callback(true);
        if(loadRange<75 || loadFinish){
            setTimeout(()=>{
                setLoadRange(loadRange + 1);
            },1);
        }
    },[loadRange]);
    useEffect(()=>{
        setLoadRange(loadRange + 3 );
    },[loadFinish]);
    return(
        <>
        <Container w="100%" h="100vh">
            <Flex justifyContent="center" alignItems="center" w="100%" h="100%">
                <VStack>
                    <Text>Loading...</Text>
                    <ProgressCircle.Root size="md" value={loadRange} colorPalette="purple">
                        <ProgressCircle.Circle>
                            <ProgressCircle.Track />
                            <ProgressCircle.Range strokeLinecap="round" />
                        </ProgressCircle.Circle>
                        <AbsoluteCenter>
                            <ProgressCircle.ValueText />
                        </AbsoluteCenter>
                    </ProgressCircle.Root>
                    
                </VStack>
            </Flex>
        </Container>
        </>
    );
}