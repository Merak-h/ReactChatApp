import { MenuDrawer } from "../../molecules/MenuDrawer";
import { Avatar, Button, Flex, Heading, IconButton, Image, } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { ProfileOverviewDialog } from "../../../components/molecules/ProfileOverviewDialog";
import { Profile } from "../../../components/organisms/setting/Profile";
// import { HamburgerIcon } from "@chakra-ui/icons";

export const Header:FC = memo(()=>{

    const [open, setOpen] = useState(false);
    const [openUserIcon, setOpenUserIcon] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    
    const navigate = useNavigate();
    const handleClickHome= ()=> navigate("/home");
    const handleClickUserManagement= ()=> navigate("/user");
    const handleClickSetting= ()=> navigate("/setting");

    const { account } = useLoginUser();

    const [userIcon, setUserIcon] = useState(account?.icon_src??"");
    const [displayName, setDisplayName] = useState(account?.display_name??"名無");
    const [handleName, setHandleName] = useState(account?.handle_name??"名無");

    useEffect(()=>{
        setUserIcon(account?.icon_src??"");
        setDisplayName(account?.display_name??"名無");
        setHandleName(account?.handle_name??"");
    },[account]);

    const handleClickUserIcon = useCallback(()=>{
        setOpenUserIcon(true);
    },[setOpenUserIcon]);
    return(
        <>
            <Flex as="nav" bg="teal.500" color="gray.50" align="center" justify="space-between" padding={{base:3,md:5}}>
                <Flex align="center" as="a" mr={8} _hover={{cursor: "pointer"}} onClick={handleClickHome}>
                    <Heading as="h1" fontSize={{base: "md", md:"lg"}}>チャットアプリ</Heading>
                </Flex>
                <Flex gap={4}>
                    <Button size="sm" p={0} w={10} height={10} borderRadius={100} overflow="hidden" onClick={handleClickUserIcon}>
                        <Avatar.Root size="md" >
                            <Avatar.Fallback name={displayName} />
                            <Avatar.Image src={userIcon} />
                        </Avatar.Root>
                    </Button>
                    <MenuDrawer 
                    open={open} 
                    setOpen={setOpen} 
                    handleClickHome={handleClickHome} 
                    handleClickUserManagement={handleClickUserManagement} 
                    handleClickSetting={handleClickSetting}/>
                </Flex>
            </Flex>
            <ProfileOverviewDialog open={openUserIcon} setOpen={setOpenUserIcon} openProfile={setOpenProfile}/>
            <Profile isOpen={openProfile} setOpen={setOpenProfile}/>
        </>
    );
})