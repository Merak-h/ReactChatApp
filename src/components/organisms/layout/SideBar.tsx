import { Box, Button, Stack } from "@chakra-ui/react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

export const SideBar = memo(()=>{

    const navigate = useNavigate();

    const handleClickHome = ()=>navigate("/home");
    const handleClickUserManagement = ()=>navigate("/user");
    const handleClickSetting = ()=>navigate("/setting");
    return(
        <>
        <Box w="320px" bg="#6b607e" display={{base: "none", md:"block"}} overflow="auto">
            <Button bg="#0000" color="#ffffff" borderRadius={0} w="100%" _hover={{bg: "#ffffff6e"}}　fontSize={16} fontFamily='"Noto Sans JP", sans-serif'  onClick={handleClickHome}>Home</Button>
            <Button bg="#0000" color="#ffffff" borderRadius={0} w="100%" _hover={{bg: "#ffffff6e"}}　fontSize={16} fontFamily='"Noto Sans JP", sans-serif'  onClick={handleClickUserManagement}>ユーザー</Button>
            <Button bg="#0000" color="#ffffff" borderRadius={0} w="100%" _hover={{bg: "#ffffff6e"}}　fontSize={16} fontFamily='"Noto Sans JP", sans-serif'  onClick={handleClickSetting}>設定</Button>
        </Box>
        </>
    );
});