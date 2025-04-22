import { Avatar, AvatarIcon, CloseButton, Dialog, Field, Input, Stack, Text, Flex, IconButton, HStack, Icon } from "@chakra-ui/react";
import { BsChatLeftText } from "react-icons/bs";
import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";

import { User } from "../../../types/api/user";
import { PrimaryButton } from "../../../components/atoms/button/PrimaryButton";
import { FriendDataWithNickName } from "../../../types/frinedData";
import { useNickName } from "../../../hooks/useNickName";
import { useChannels } from "../../../hooks/useChannels";
import { Navigate, useNavigate } from "react-router-dom";

type Props = {
    open: boolean;
    setOpen: (isOpen:boolean)=>void;
    userData: FriendDataWithNickName | null;
    refresh: ()=>void,
}

export const UserDetailDialog:FC<Props> = memo((props)=>{
    const {open, setOpen, userData, refresh} = props;
    const [ accountId, setAccountId ] = useState("");
    const [ displayName, setDisplayName ] = useState("");
    const [ handleName, setHandleName ] = useState("");
    const [ iconSrc, setIconSrc ] = useState("");
    const [ message, setMessage  ] = useState("");
    const [ nickName, setNickName ] = useState("");

    const [ isChangeNickNameinput, setIsChangeNickNameinput ] = useState(false);
    const [ newNickName, setNewNickName ] = useState("");
    const [ updateNickNameError, setUpdateNickNameError ] = useState(false);

    useEffect(()=>{
        setAccountId(userData?.account_id??"");
        setDisplayName(userData?.display_name??"");
        setHandleName(userData?.handle_name??"");
        setIconSrc(userData?.icon_src??"");
        setMessage(userData?.message??"");
        setNickName(userData?.nick_name??"");
        setNewNickName(userData?.nick_name??userData?.display_name??"")
    },[userData]);

    const { changeNickName } = useNickName()
    const handleUpdate = () =>{
        try{
            if(accountId==="")throw new Error('フレンドidが取得できません');
            changeNickName(newNickName, accountId);
            setIsChangeNickNameinput(false);
            setNickName(newNickName);
            setUpdateNickNameError(false);
            refresh();
        }
        catch(error){
            console.error('handleUpdate',error);
            setUpdateNickNameError(true);
        }
    }

    const { getPersonalChannel } = useChannels()
    const navigate = useNavigate();
    const handleJumpChannel = async () =>{
        const channel = await getPersonalChannel(accountId);
        navigate(`/home/${channel}`);
    }

    return(

        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} motionPreset="slide-in-bottom">
        <Dialog.Trigger />
        <Dialog.Backdrop />
        <Dialog.Positioner>
            <Dialog.Content pb={6} autoFocus={false}>
                <Dialog.CloseTrigger />
                <Dialog.Header>
                    <Dialog.Title>
                    ユーザー詳細
                    </Dialog.Title>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Header>
                <Dialog.Body mx={4}>
                    <Stack>
                        <Avatar.Root size="2xl">
                            <Avatar.Fallback name={displayName}/>
                            <Avatar.Image src={iconSrc} />
                        </ Avatar.Root>
                        <Text textStyle="sm" fontWeight="bold" color="#6f80c8" textDecoration="underline">@{handleName}</Text>
                        {isChangeNickNameinput?
                        <>
                            {updateNickNameError && <Text color="#f55">変更に失敗しました。</Text>}
                            <HStack>
                                <Input value={newNickName} placeholder="フレンドの名前" onChange={(e)=>{setNewNickName(e.target.value)}}/>
                                <IconButton onClick={handleUpdate}>
                                    <FaCheck />
                                </IconButton>
                            </HStack>
                            <Text textStyle="xs" fontWeight="light" color="#888" lineHeight={0} marginBottom={2}>( {displayName} )</Text>
                        </>
                        :
                        nickName===""?
                            <HStack>
                                <Text textStyle="md" fontWeight="bold" lineHeight={1}>{displayName}</Text>
                                <IconButton size="xs" backgroundColor="#0000" _hover={{backgroundColor:"#0002"}} onClick={()=>{setIsChangeNickNameinput(true)}}>
                                    <BiSolidEditAlt color="#000"/>
                                </IconButton>
                            </HStack>
                        :
                        <>
                            <HStack>
                                <Text textStyle="md" fontWeight="bold" lineHeight={1}>{nickName}</Text>
                                <IconButton size="xs" backgroundColor="#0000" _hover={{backgroundColor:"#0002"}} onClick={()=>{setIsChangeNickNameinput(true)}}>
                                    <BiSolidEditAlt color="#000"/>
                                </IconButton>
                            </HStack>
                            <Text textStyle="xs" fontWeight="light" color="#888" lineHeight={0} marginBottom={2}>( {displayName} )</Text>
                        </>
                        }
                        <Text>{message}</Text>
                        <IconButton size="sm" w="fit-content" onClick={handleJumpChannel}>
                                <BsChatLeftText />
                            </IconButton>
                    </Stack>
                </Dialog.Body>
            </Dialog.Content>
        </Dialog.Positioner>
    </Dialog.Root>
    );
})