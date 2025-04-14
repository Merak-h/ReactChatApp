import { useLoginUser } from "../../../hooks/useLoginUser";
import { Avatar, Button, Clipboard, CloseButton, Drawer, HStack, IconButton, Portal, Separator, Text, VStack } from "@chakra-ui/react";
import { FC, memo, useEffect, useState } from "react";

type Props = {
    isOpen: boolean,
    setOpen: (isOpen:boolean)=>void,
}

export const Profile:FC<Props> = memo((props) => {

    const { account } = useLoginUser();

    const [ account_id, setAccount_id  ] = useState<string>();
    const [ display_name, setDisplay_name  ] = useState<string>();
    const [ email, setEmail  ] = useState<string>();
    const [ icon_src, setIcon_src  ] = useState<string>();
    const [ message, setMessage  ] = useState<string>();
    const [ tel, setTel  ] = useState<string>();
    const [ handle_name, setHandle_name  ] = useState<string>();

    useEffect(()=>{
        if(account){
            setAccount_id(account.account_id);
            setIcon_src(account.icon_src ?? "");
            setHandle_name(account.handle_name);
            setDisplay_name(account.display_name);
            setEmail(account.email?? "");
            setTel(account.tel?? "");
            setMessage(account.message);
        }
    },[account])


    const { isOpen, setOpen } = props;
    return (
        <>
            <Drawer.Root size="full" open={isOpen} onOpenChange={(e) => setOpen(e.open)} >
                {/* <Drawer.Trigger asChild>
                    <Button variant="outline" size="sm">
                    Open Drawer
                    </Button>
                </Drawer.Trigger> */}
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header>
                                <Drawer.Title>プロフィール</Drawer.Title>
                                <Button>
                                    Save
                                </Button>
                            </Drawer.Header>
                            <Drawer.Body>
                                <VStack>
                                    <HStack>
                                        <Avatar.Root>
                                            <Avatar.Fallback name={display_name} />
                                            <Avatar.Image src={icon_src} />
                                        </Avatar.Root>
                                        <Text>{display_name}</Text>
                                        <HStack>
                                            <Text>@{handle_name}</Text>
                                            <Clipboard.Root value={`@${handle_name}`}>
                                                <Clipboard.Trigger asChild>
                                                    <IconButton variant="surface" size="xs">
                                                        <Clipboard.Indicator />
                                                    </IconButton>
                                                </Clipboard.Trigger>
                                            </Clipboard.Root>

                                        </HStack>

                                    </HStack>
                                    <Separator />
                                    <Text>
                                        {message}
                                    </Text>
                                    <Separator />
                                    <h2>プライペート情報</h2>
                                    <Text>{email}</Text>
                                    <Text>{tel}</Text>
                                </VStack>
                            </Drawer.Body>
                            {/* <Drawer.Footer>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save</Button>
                            </Drawer.Footer> */}
                            <Drawer.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
        </>
    );
});