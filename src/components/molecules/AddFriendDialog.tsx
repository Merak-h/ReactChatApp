import { Button, CloseButton, Dialog, Flex, IconButton, Input, Portal, Text } from "@chakra-ui/react"
import { FC, memo, useCallback, useState } from "react"
import { BsSendPlus } from "react-icons/bs";

import { useAddFriend } from "../../hooks/useAddFriend";

type Props = {
    open: boolean;
    setOpen: (isOpen:boolean)=>void;
}

export const AddFriendDialog:FC<Props> = memo((props) => {

    const {open, setOpen} = props;
    const [ handleName, setHandleName] = useState<string>();
    const [isError, setIsError] = useState(false);

    const { addFriendByHandleName } = useAddFriend();

    const handleAddFriend= async ()=>{
        // フレンドを追加する処理
        try {
            handleName && await addFriendByHandleName(handleName)
            setHandleName("");
            setIsError(false);
            setOpen(false);
        }
        catch (error) {
            // console.error("フレンド追加に失敗しました:", error);
            // エラーメッセージを表示したい場合はここでハンドル
            setHandleName("");
            setIsError(true);
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
                                       フレンドの追加
                                   </Dialog.Title>
                               </Dialog.Header>
                               <Dialog.Body>
                                   <Text>追加したいフレンドのファンドルネームを入力して下さい。</Text>
                                   {isError && <Text>追加に失敗しました。</Text>}
                                   <Flex>
                                        <Input placeholder="例: @friend_id" onChange={e=>setHandleName(e.target.value)} value={handleName}></Input>
                                        <IconButton onClick={handleAddFriend}>
                                                <BsSendPlus />
                                        </IconButton>
                                   </Flex>
                               </Dialog.Body>
                               {/* <Dialog.Footer>
                               <Dialog.ActionTrigger asChild>
                                   <Button variant="outline">キャンセル</Button>
                               </Dialog.ActionTrigger>
                               <Button onClick={handleAddFriend}>ログアウト</Button>
                               </Dialog.Footer> */}
                               <Dialog.CloseTrigger asChild>
                                   <CloseButton size="sm" />
                               </Dialog.CloseTrigger>
                           </Dialog.Content>
                       </Dialog.Positioner>
                   </Portal>
               </Dialog.Root>
    )
})