import { FC, memo, ReactNode } from "react";
import { Header } from "../organisms/layout/Header";
import { SideBar } from "../organisms/layout/SideBar";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";


export const DashboardLayout:FC = memo(()=>{
    
    return (
        <Flex flexDirection="column" h="100vh">
        
            <Header />
            <Flex flex={1} overflow="hidden">
                <SideBar />
                <Box w="100%" bg="#ccc"h="100%">
                    <Outlet />
                </Box>
            </Flex>
        </Flex>
    );
});