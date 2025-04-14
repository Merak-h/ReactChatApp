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
        <Box w="320px" bg="#999" display={{base: "none", md:"block"}} overflow="auto">
            <Button bg="#999" color="#333" borderRadius={0} w="100%" _hover={{bg: "#888"}} onClick={handleClickHome}>Home</Button>
            <Button bg="#999" color="#333" borderRadius={0} w="100%" _hover={{bg: "#888"}} onClick={handleClickUserManagement}>ユーザー一覧</Button>
            <Button bg="#999" color="#333" borderRadius={0} w="100%" _hover={{bg: "#888"}} onClick={handleClickSetting}>設定</Button>
        </Box>
        </>
    );
});