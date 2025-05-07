import { HStack, IconButton, Input, Switch, Textarea, Toggle, VStack } from "@chakra-ui/react";
import { RiSendPlaneFill } from "react-icons/ri";
import { FC, memo, useState } from "react";

type Props = {
    callback: (message:string)=>Promise<boolean>;
}

export const MessageInputBox:FC<Props> = memo((props)=>{
    const {callback} = props;

    const [message, setMessage] = useState<string>("");
    const [enableKeySent, setEnableKeySent] = useState(true);



    const onClick = async () => {
        const success = await callback(message);
        if(success){
            setMessage("");
        }
    }

    const handleSendToEnter = async (e:React.KeyboardEvent<HTMLTextAreaElement>)=>{
        const key = e.key;
        const isCtrl = e.ctrlKey;
        if(key == 'Enter' && isCtrl && enableKeySent){
            const success = await callback(message);
            if(success){
                setMessage("");
            }
        }
    }

    return(
        <VStack w="100%">
            <HStack w="100%" justifyContent="right" pr={14}>
                <Switch.Root checked={enableKeySent} onCheckedChange={e=>{setEnableKeySent(e.checked)}}>
                    <Switch.Label>Send to [ Ctrl ] + [ Enter ]</Switch.Label>
                    <Switch.HiddenInput />
                        <Switch.Control>
                            <Switch.Thumb />
                        </Switch.Control>
                </Switch.Root>
            </HStack>
            <HStack p={1} h="fit-content" w="100%">
                <Textarea placeholder="メッセージを入力" autoresize onChange={(e)=>{setMessage(e.target.value)}} value={message} rows={1} maxHeight="9rem" lineHeight="1.5rem" onKeyUp={e=>handleSendToEnter(e)}/>
                <IconButton onClick={onClick}>
                    <RiSendPlaneFill />
                </IconButton>
            </HStack>
        </VStack>
    );
});