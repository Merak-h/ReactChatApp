import { useLoginUser } from "../../hooks/useLoginUser";
import { Avatar, Button, Card, Clipboard, CloseButton, Container, Drawer, Heading, HStack, IconButton, Input, Portal, Separator, Stack, Text, VStack } from "@chakra-ui/react";
import { FC, memo, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import BackButton from "../atoms/button/BackButton";
import { IoChevronBackOutline } from "react-icons/io5";
import { HiUpload } from "react-icons/hi";
import { useMessage } from "../../hooks/useMessage";

export const Setting:FC = memo(() => {

    const { account } = useLoginUser();

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
        if(key!=='Enter' || !message)return;
        try{
            updateMessage(message);
            console.log(message)
            element.currentTarget.blur();
            setCurrentMessage(message);
        }
        catch(error){
            console.error('updateMessage',error);
            setMessage('更新できませんでした')
        }
    }


    return (
        <Container backgroundColor="#efefef" minHeight="100vh">
           <VStack alignItems="flex-start" p={4} maxWidth={600} m="auto">
            <HStack w="100%" justifyContent="space-between">
                <BackButton >
                    <IoChevronBackOutline color="#000" />
                </BackButton>
                <BackButton >
                    <IoClose color="#000"/>
                </BackButton>
                </HStack>
                <Heading as="h1">設定</Heading>
                <Heading as="h2">プロフィール</Heading>
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
                            <Button size="xs" height={7}>編集</Button>
                        </HStack>
                    </VStack>

                    <VStack alignItems="flex-start" gap={0} p={4} w="100%">
                        <Text fontSize="sm" fontWeight="medium" color="#6a6a6a">ハンドルネーム</Text>
                        <HStack  justifyContent="space-between" w="100%">
                            <Text>@{currentHandle_name}</Text>
                            <Button size="xs" height={7}>編集</Button>
                        </HStack>
                    </VStack>
                </>
                
                <Separator variant="solid" size="sm" w="100%" mt={8} mb={8}/>
                <Heading as="h3">プライペート情報</Heading>
                <VStack alignItems="flex-start" gap={0} p={4} w="100%">
                        <Text fontSize="sm" fontWeight="medium" color="#6a6a6a">メールアドレス</Text>
                        <HStack  justifyContent="space-between" w="100%">
                            <Text>{email!==""? email :"情報なし"}</Text>
                            <Button size="xs" height={7}>編集</Button>
                        </HStack>
                    </VStack>
                    <VStack alignItems="flex-start" gap={0} p={4} w="100%">
                        <Text fontSize="sm" fontWeight="medium" color="#6a6a6a">電話番号</Text>
                        <HStack  justifyContent="space-between" w="100%">
                            <Text>{tel!==""? tel : "情報なし"}</Text>
                            <Button size="xs" height={7}>編集</Button>
                        </HStack>
                    </VStack>
            </VStack>
        </Container>
    );
});