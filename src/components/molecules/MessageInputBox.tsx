import { HStack, IconButton, Input, Switch, Textarea, Toggle, VStack } from "@chakra-ui/react";
import { RiSendPlaneFill } from "react-icons/ri";
import { FC, memo, useEffect, useState } from "react";
import { readSettings } from "../../api/readSettings";
import { useLoginUser } from "../../hooks/useLoginUser";
import { updateSettings } from "../../api/updateSettings";

type Props = {
    callback: (message:string)=>Promise<boolean>;
}

export const MessageInputBox:FC<Props> = memo((props)=>{
    const {callback} = props;
    const { account } = useLoginUser();
    const { readSendKeyMode } = readSettings(account?account.account_id:"");
    const { updateSendKeyMode } = updateSettings(account?account.account_id:"");

    const [message, setMessage] = useState<string>("");
    const [defaultSendKeyMode, setDefaultSendKeyMode] = useState(0);
    const [sendKeyMode, setSendKeyMode] = useState(0);


    const initSendKeyMode = async ()=>{
        const result = await readSendKeyMode();
        setSendKeyMode(result !== false ? result : 0);
        setDefaultSendKeyMode(result !== false ? result : 0);
    }
    useEffect(()=>{
        initSendKeyMode();
    },[])

    const handleSwitchMode = (enable:boolean) =>{
        if(defaultSendKeyMode===0){
            setSendKeyMode(enable?3:0);
            updateSendKeyMode(enable?3:0);
        }else{
            setSendKeyMode(enable?defaultSendKeyMode:0);
            updateSendKeyMode(enable?defaultSendKeyMode:0);
        }

    }



    const onClick = async () => {
        const success = await callback(message);
        if(success){
            setMessage("");
        }
    }

    const handleSendToEnter = async (e:React.KeyboardEvent<HTMLTextAreaElement>)=>{
        const key = e.key;
        const isCtrl = e.ctrlKey;
        const isShift = e.shiftKey;
        const isAlt = e.altKey;

        if(sendKeyMode===0)return;
        if(sendKeyMode===1 && key == 'Enter' && !isShift && !isCtrl && !isAlt){
            const success = await callback(message);
            if(success){
                setMessage("");
            }
        }
        if(sendKeyMode===2 && key == 'Enter' && isShift ){
            const success = await callback(message);
            if(success){
                setMessage("");
            }
        }
        if(sendKeyMode===3 && key == 'Enter' && isCtrl ){
            const success = await callback(message);
            if(success){
                setMessage("");
            }
        }
        if(sendKeyMode===3 && key == 'Enter' && isAlt ){
            const success = await callback(message);
            if(success){
                setMessage("");
            }
        }
    }

    const  sendKeyStatus= ["none", "Enter", "Shift + Enter", "Ctrl + Enter", "Alt + Enter"];

    return(
        <VStack w="100%">
            <HStack w="100%" justifyContent="right" pr={14}>
                <Switch.Root colorPalette="#925ad3" checked={sendKeyMode!==0} onCheckedChange={e=>{handleSwitchMode(e.checked)}}>
                    <Switch.Label>Send to {sendKeyStatus[defaultSendKeyMode!==0?defaultSendKeyMode:3]}</Switch.Label>
                    <Switch.HiddenInput />
                        <Switch.Control>
                            <Switch.Thumb />
                        </Switch.Control>
                </Switch.Root>
            </HStack>
            <HStack p={1} h="fit-content" w="100%">
                <Textarea placeholder="メッセージを入力" autoresize onChange={(e)=>{setMessage(e.target.value)}} value={message} rows={1} maxHeight="9rem" lineHeight="1.5rem" onKeyUp={e=>handleSendToEnter(e)} outlineColor="#7c6291"/>
                <IconButton onClick={onClick} bg="#8668a8" _hover={{bg:"#715492"}} _active={{bg:"#645179"}}>
                    <RiSendPlaneFill />
                </IconButton>
            </HStack>
        </VStack>
    );
});