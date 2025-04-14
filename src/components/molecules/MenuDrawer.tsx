import { Button, Drawer, IconButton, Portal } from "@chakra-ui/react";
import { FC, memo } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

type Props = {
    setOpen: (e:boolean)=>void;
    open: boolean;
    handleClickHome: ()=> void,
    handleClickUserManagement: ()=> void,
    handleClickSetting: ()=> void
}
export const MenuDrawer:FC<Props>= memo((props)=>{
    const {open, setOpen,handleClickHome,handleClickUserManagement,handleClickSetting} = props;
    return(
        <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="start">
                            <Drawer.Trigger asChild>
                                <IconButton
                                    aria-label="メニューボタン"
                                    size="sm"
                                    bg="teal.500"
                                    display={{ base: "block", md: "none"}}
                                    >
                                    <RxHamburgerMenu />
                                </IconButton>
                                {/* <MenuIconButton /> */}
                            </Drawer.Trigger>
                            <Portal>
                                <Drawer.Backdrop />
                                <Drawer.Positioner>
                                    <Drawer.Content>
                                        <Drawer.Body p={0} bg={"gray.100"} pt={20}>
                                            <Button bg="#0000" color="#333" w="100%" onClick={handleClickHome}>Home</Button>
                                            <Button bg="#0000" color="#333" w="100%" onClick={handleClickUserManagement}>ユーザー一覧</Button>
                                            <Button bg="#0000" color="#333" w="100%" onClick={handleClickSetting}>設定</Button>
                                        </Drawer.Body>
                                        {/* <Drawer.CloseTrigger asChild>
                                            <CloseButton size="sm" />
                                        </Drawer.CloseTrigger> */}
                                    </Drawer.Content>
                                </Drawer.Positioner>
                            </Portal>
                            </Drawer.Root>
    );
});