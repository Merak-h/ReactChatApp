import { HStack, IconButton, Input, Textarea } from "@chakra-ui/react";
import { RiSendPlaneFill } from "react-icons/ri";
import { FC, memo, useState } from "react";

type Props = {
    callback: (message:string)=>Promise<boolean>;
}

export const MessageInputBox:FC<Props> = memo((props)=>{
    const {callback} = props;

    const [message, setMessage] = useState<string>("");

    const onClick = async () => {
        const success = await callback(message);
        if(success){
            setMessage("");
        }
    }

    return(
        <HStack p={1} h="fit-content">
        <Textarea placeholder="メッセージを入力" autoresize onChange={(e)=>{setMessage(e.target.value)}} value={message} rows={1} maxHeight="9rem" lineHeight="1.5rem"/>
        <IconButton onClick={onClick}>
            <RiSendPlaneFill />
        </IconButton>
        </HStack>
    );
});