import { useLoginUser } from "../../hooks/useLoginUser";
import { Accordion, Avatar, Button, Card, Checkbox, Clipboard, CloseButton, Container, Drawer, Heading, HStack, IconButton, Input, Portal, RadioGroup, Separator, Span, Stack, Switch, Text, VStack } from "@chakra-ui/react";
import { FC, memo, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import BackButton from "../atoms/button/BackButton";
import { IoChevronBackOutline } from "react-icons/io5";
import { HiUpload } from "react-icons/hi";
import { useMessage } from "../../hooks/useMessage";
import { TextInputDialog } from "../molecules/TextInputDialog";
import { updateSettings } from "../../api/updateSettings";
import { promises } from "dns";
import { RadioAccordion } from "../molecules/RadioAccordion";
import { readSettings } from "../../api/readSettings";

export const Setting:FC = memo(() => {

    const { account, setAccount } = useLoginUser();
    const {
            updateDisplayName, 
            updateHandleName, 
            updateEmail,
            updateSendKeyMode,
        } = updateSettings(account?.account_id??"");
    const {
            readSendKeyMode,
        } = readSettings(account?.account_id??"");

    const [ currentAccount_id, setCurrentAccount_id  ] = useState<string>();
    const [ currentDisplay_name, setCurrentDisplay_name  ] = useState<string>();
    const [ currentEmail, setCurrentEmail  ] = useState<string>();
    const [ currentIcon_src, setCurrentIcon_src  ] = useState<string>();
    const [ currentMessage, setCurrentMessage  ] = useState<string>();
    const [ currentTel, setCurrentTel  ] = useState<string>();
    const [ currentHandle_name, setCurrentHandle_name  ] = useState<string>();

    const [ account_id, setAccount_id  ] = useState<string>();
    const [ display_name, setDisplay_name  ] = useState<string>();
    const [ email, setEmail  ] = useState<string>();
    const [ icon_src, setIcon_src  ] = useState<string>();
    const [ message, setMessage  ] = useState<string>();
    const [ tel, setTel  ] = useState<string>();
    const [ handle_name, setHandle_name  ] = useState<string>();

    const [isOpenDisplayName, setIsOpenDisplayName] = useState(false);
    const [isOpenHandleName, setIsOpenHandleName] = useState(false);
    const [isOpenEmail, setIsOpenEmail] = useState(false);
    const [isOpenTel, setIsOpenTel] = useState(false);
    
     const {updateMessage} = useMessage();

    const currentAccountData = Array
    useEffect(()=>{
        if(account){
            setAccount_id(account.account_id);
            setIcon_src(account.icon_src ?? "");
            setHandle_name(account.handle_name);
            setDisplay_name(account.display_name);
            setEmail(account.email?? "");
            setTel(account.tel?? "");
            setMessage(account.message);

            setCurrentAccount_id(account.account_id);
            setCurrentIcon_src(account.icon_src ?? "");
            setCurrentHandle_name(account.handle_name);
            setCurrentDisplay_name(account.display_name);
            setCurrentEmail(account.email?? "");
            setCurrentTel(account.tel?? "");
            setCurrentMessage(account.message);
        }
    },[account])

    const handleKeyUpMessage = (element:React.KeyboardEvent<HTMLInputElement>)=>{
        const {key} = element
        // if(key!=='Enter' || !message)return;
        if(key!=='Enter')return;
        try{
            updateMessage(message?? "");
            console.log(message)
            element.currentTarget.blur();
            setCurrentMessage(message);
        }
        catch(error){
            console.error('updateMessage',error);
            setMessage('更新できませんでした')
        }
    }

    const handleUpdateDisplayName = async (displaytName:string):Promise<boolean>=>{
        try{
            const newDisplayName = await  updateDisplayName(displaytName);
            if(!newDisplayName){throw new Error('表示名の更新失敗')}
            setCurrentDisplay_name(newDisplayName);
            setAccount(prev => prev ? { ...prev, display_name: newDisplayName } : prev);
            return true;
        }
        catch (error){
            console.error("handleUpdateDisplayName",error);
            return false;
        }
    }

    const handleUpdateHandleName = async (handleName:string):Promise<boolean>=>{
        try{
            const newHandleName = await  updateHandleName(handleName);
            if(!newHandleName){throw new Error('表示名の更新失敗')}
            setCurrentHandle_name(newHandleName);
            setAccount(prev => prev ? { ...prev, handle_name: newHandleName } : prev);
            return true;
        }
        catch (error){
            console.error("handleUpdateDisplayName",error);
            return false;
        }
    }

    const handleUpdateEmail = async (email:string):Promise<boolean>=>{
        try{
            const newEmail = await  updateEmail(email);
            if(!newEmail){throw new Error('表示名の更新失敗')}
            setCurrentEmail(newEmail);
            setAccount(prev => prev ? { ...prev, email: newEmail } : prev);
            return true;
        }
        catch (error){
            console.error("handleUpdateDisplayName",error);
            return false;
        }
    }

    const handleUpdateTel = async (tel:string):Promise<boolean>=>{
        try{
            const newTel = await  updateEmail(tel);
            if(!newTel){throw new Error('表示名の更新失敗')}
            setCurrentTel(newTel);
            setAccount(prev => prev ? { ...prev, tel: newTel } : prev);
            return true;
        }
        catch (error){
            console.error("handleUpdateDisplayName",error);
            return false;
        }
    }



    const  sendKeyStatus= ["none", "Enter", "Shift + Enter", "Ctrl + Enter", "Alt + Enter"];
    const [ sendKeyMode, setSendKeyMode ] = useState(sendKeyStatus[3]);
    useEffect(()=>{
        (async()=>{
            const result = await readSendKeyMode();
            console.log(result);
            console.log(sendKeyStatus[result!==false?result:0]);
            setSendKeyMode(sendKeyStatus[result!==false?result:0]);
        })();
    },[]);
    const handleUpdateSendKey = async (status:string)=>{
        const index = sendKeyStatus.indexOf(status);
        await updateSendKeyMode(index);
    }

    return (
        <Container backgroundColor="#bcb9c2" height="100vh" maxW="none" overflow="auto"  _scrollbar={{width:"6px"}} _scrollbarThumb={{bg:"#0008",borderRadius:"100px"}}>
           <VStack alignItems="flex-start" p={0} maxWidth={600} m="auto">
                <HStack w="100%" justifyContent="space-between" position="fixed" zIndex={10} bg="#bcb9c2" paddingTop={6} paddingBottom={6}>
                    <HStack>
                        <BackButton p="0px">
                            <IoChevronBackOutline color="#000" />
                        </BackButton>
                        <Heading as="h1">設定</Heading>
                    </HStack>

                    <BackButton >
                        <IoClose color="#000"/>
                    </BackButton>
                </HStack>
                <Heading as="h2" paddingTop="160px">プロフィール</Heading>
                <Card.Root w={460} p={8}>
                    <Card.Body borderRadius={8}>
                        <Stack>
                            <HStack gap={8}>
                                <Avatar.Root size="2xl">
                                    <Avatar.Fallback name={currentDisplay_name} />
                                    <Avatar.Image src={icon_src} />
                                </Avatar.Root>
                                <VStack alignItems="flex-start">
                                    <Text fontSize="xl" fontWeight="bold">{currentDisplay_name}</Text>
                                    <Clipboard.Root value={`@${currentHandle_name}`}>
                                        <Clipboard.Trigger asChild>
                                            <Button size="xs" backgroundColor="#66f8" variant="solid" _hover={{backgroundColor:"#3e3ec487"}}>
                                                <HStack>
                                                    <Text fontSize="md" fontWeight="semibold">@{currentHandle_name}</Text>
                                                    <Clipboard.Indicator />
                                                </HStack>
                                            </Button>
                                        </Clipboard.Trigger>
                                    </Clipboard.Root>
                                </VStack>
                            </HStack>
                            {currentMessage && <Text>{currentMessage}</Text>}
                        </Stack>
                    </Card.Body>
                </Card.Root>

                <Heading as="h3">一言メッセージ</Heading>
                <Input value={message} onChange={(e)=>setMessage(e.target.value)} onKeyUp={e=>handleKeyUpMessage(e)} placeholder="メッセージを追加しましょう！"/>
                <Separator variant="solid" size="sm" w="100%" mt={8} mb={0}/>

                <>
                    <Button size="xs" height={7} mt={6} mb={6}>
                        アイコンを変更する
                        <HiUpload />
                    </Button>
                    <VStack alignItems="flex-start" gap={0} p={4} w="100%">
                        <Text fontSize="sm" fontWeight="medium" color="#6a6a6a">表示名</Text>
                        <HStack justifyContent="space-between" w="100%">
                            <Text>{currentDisplay_name}</Text>
                            <Button size="xs" height={7} onClick={()=>setIsOpenDisplayName(true)}>編集</Button>
                        </HStack>
                            <TextInputDialog title="表示名" defaultValue={currentDisplay_name??""} open={isOpenDisplayName} setOpen={setIsOpenDisplayName} callback={handleUpdateDisplayName} />
                    </VStack>

                    <VStack alignItems="flex-start" gap={0} p={4} w="100%">
                        <Text fontSize="sm" fontWeight="medium" color="#6a6a6a">ハンドルネーム</Text>
                        <HStack  justifyContent="space-between" w="100%">
                            <Text>@{currentHandle_name}</Text>
                            <Button size="xs" height={7} onClick={()=>setIsOpenHandleName(true)}>編集</Button>
                        </HStack>
                        <TextInputDialog title="ハンドルネーム" defaultValue={currentHandle_name??""} open={isOpenHandleName} setOpen={setIsOpenHandleName} callback={handleUpdateHandleName} />
                    </VStack>
                </>
                
                <Separator variant="solid" size="sm" w="100%" mt={8} mb={8}/>
                <Heading as="h3">プライペート情報</Heading>
                <VStack alignItems="flex-start" gap={0} p={4} w="100%">
                    <Text fontSize="sm" fontWeight="medium" color="#6a6a6a">メールアドレス</Text>
                    <HStack  justifyContent="space-between" w="100%">
                        <Text>{email!==""? email :"情報なし"}</Text>
                        <Button size="xs" height={7} onClick={()=>setIsOpenEmail(true)}>編集</Button>
                    </HStack>
                    <TextInputDialog title="メールアドレス" defaultValue={currentEmail??""} open={isOpenEmail} setOpen={setIsOpenEmail} callback={handleUpdateEmail} />
                </VStack>
                <VStack alignItems="flex-start" gap={0} p={4} w="100%">
                    <Text fontSize="sm" fontWeight="medium" color="#6a6a6a">電話番号</Text>
                    <HStack  justifyContent="space-between" w="100%">
                        <Text>{tel!==""? tel : "情報なし"}</Text>
                        <Button size="xs" height={7} onClick={()=>setIsOpenTel(true)}>編集</Button>
                    </HStack>
                    <TextInputDialog title="電話番号" defaultValue={currentTel??""} open={isOpenTel} setOpen={setIsOpenTel} callback={handleUpdateTel} />
                </VStack>

                <Separator variant="solid" size="sm" w="100%" mt={8} mb={8}/>
                <Heading as="h3">Channel</Heading>
                <VStack w="100%" paddingBottom="128px">
                    <VStack w="100%">

                        <RadioAccordion 
                            title={"送信のショートカット"}  
                            values={sendKeyStatus} 
                            defaultValue={3} 
                            currentValue={sendKeyMode} 
                            setCurrentValue= {setSendKeyMode}
                            callback={handleUpdateSendKey}
                        />
                        
                    </VStack>
                </VStack>
            </VStack>
        </Container>
    );
});