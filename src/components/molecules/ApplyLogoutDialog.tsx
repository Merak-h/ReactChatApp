import { useAuth } from "../../hooks/useAuth";
import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import { FC, memo} from "react";

type Props = {
    open: boolean;
    setOpen: (isOpen:boolean)=>void;
}

export const ApplyLogoutDialog:FC<Props> = memo((props) => {
    const {open, setOpen} = props;
    const { logout } = useAuth();
    const handleLogoutButton = ()=>logout();
    
    return(
        <Dialog.Root size="xs" open={open} onOpenChange={(e) => setOpen(e.open)} >
            <Dialog.ActionTrigger />
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                ログアウト
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text>本当にログアウトしますか？</Text>
                        </Dialog.Body>
                        <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline">キャンセル</Button>
                        </Dialog.ActionTrigger>
                        <Button onClick={handleLogoutButton}>ログアウト</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
})