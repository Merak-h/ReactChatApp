import { Avatar, Button, Dialog, Flex, IconButton, Portal, Text, VStack } from "@chakra-ui/react";
import { FC, memo, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

import { useLoginUser } from "../../hooks/useLoginUser";
import { ApplyLogoutDialog } from "./ApplyLogoutDialog";
import { useNavigate } from "react-router-dom";

type Props = {
    open: boolean;
    setOpen: (isOpen:boolean)=>void;
    openProfile: (isOpen:boolean)=>void;
}

export const ProfileOverviewDialog:FC<Props> = memo((props) => {
    const {open, setOpen, openProfile} = props;

    const { account } = useLoginUser();

    const [userIcon, setUserIcon] = useState(account?.icon_src??"");
    const [displayName, setDisplayName] = useState(account?.display_name??"名無");
    const [email, setEmail] = useState(account?.email??"");
    const [handleName, setHandleame] = useState(account?.handle_name??"");

    const [isPushLogout, setIsPushLogout] = useState(false);

    useEffect(()=>{
        setUserIcon(account?.icon_src??"");
        setDisplayName(account?.display_name??"名無");
        setEmail(account?.email??"");
        setHandleame(account?.handle_name??"");
    },[account]);

    const handleClickLogoutButton = ()=>{
        setIsPushLogout(true);
        setOpen(false);
    }

    const navigate  = useNavigate();
    const handleClickEdit = ()=>{
        navigate("/setting")
        // openProfile(true);
    }

    return(
        <>
            <Dialog.Root size="xs" motionPreset="slide-in-top" open={open} onOpenChange={(e) => setOpen(e.open)} >
                <Dialog.Trigger />
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content position="fixed" top={-12} right={4} w={60} p={2}>
                            <Dialog.Body m={0} p={0}>
                                <Flex w="100%" justifyContent="right" p={0} m={0} >
                                    <IconButton size="xs" bg="#0000" onClick={handleClickEdit}>
                                        <FiEdit color="#333"/>
                                    </IconButton>

                                </Flex>
                                <VStack>
                                    <VStack>
                                        <Avatar.Root size="xl" mt={4}>
                                            <Avatar.Fallback name={displayName} />
                                            <Avatar.Image src={userIcon} />
                                        </Avatar.Root>
                                        <Text>{displayName}</Text>
                                        <Text>@{handleName}</Text>
                                        <Text>{email}</Text>
                                    </VStack>
                                    <Button m={6} onClick={handleClickLogoutButton}>ログアウトする</Button>
                                </VStack>
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
            <ApplyLogoutDialog open={isPushLogout} setOpen={setIsPushLogout} />
            
        </>
    );
});