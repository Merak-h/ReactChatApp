import { FC, useEffect, useState } from "react";
import { Button, CloseButton, Dialog, Input, Portal, Text } from "@chakra-ui/react";

type Props = {
    title:string;
    defaultValue: string;
    open: boolean;
    setOpen: (isOpen:boolean)=>void;
    callback : (inputValue:string)=>Promise<boolean>;
}

export const  TextInputDialog:FC<Props> = (props)=>{
    const {title, defaultValue, open, setOpen, callback} =  props;

    const [ inputValue, setInputValue ] = useState<string>("");
    const [ error, setError] = useState("");

    useEffect(()=>{
        setError("");
        setInputValue(defaultValue??"");
    },[open])
    useEffect(()=>{
        setInputValue(defaultValue??"");
    },[defaultValue])


    const handleOnClick = async () => {
        const result = await callback(inputValue);
        if(result){
            setOpen(false);
        }
        else{
            setError(`${title}の更新ができませんでした。再度お試しください`)
        }
    }

    return(
        <Dialog.Root size="xs" open={open} onOpenChange={(e) => setOpen(e.open)} >
            <Dialog.ActionTrigger />
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                {title}
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text color="#ff6666">{error}</Text>
                            <Input placeholder={` ${title}を入力`} value={inputValue}  onChange={e=>setInputValue(e.target.value)}/>
                        </Dialog.Body>
                        <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline">キャンセル</Button>
                        </Dialog.ActionTrigger>
                        <Button onClick={handleOnClick}>更新</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}