import { Box, Center, Flex, IconButton, Input, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailDialog } from "../organisms/user/UserDetailDialog";
import { useSelectedUser } from "../../hooks/useSelectedUser";
// import { User } from "../../types/api/user";
// import { useLoginUser } from "../../hooks/useLoginUser";
import { LuSearch } from "react-icons/lu";
import { IoPersonAddSharp } from "react-icons/io5";
import Fuse from 'fuse.js';
import { AddFriendDialog } from "../molecules/AddFriendDialog";
import { useFriendsList } from "../../hooks/useFriendsList";


export const UserManagement:FC = memo( () => {
    // const { getUsers, users, loading} = useAllUsers();
    const { friendsList, getFriendsList, friendsListLoading} = useFriendsList();
    const [open, setOpen] = useState(false);
    const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false);
    const {getSelectUser, selectedUser} = useSelectedUser();
    // const { loginUser } = useLoginUser();
    // console.log("loginUser from UserManagement",loginUser);

    const [searchInput, setSearchInput] = useState("");

    const handleClickAddFriend = useCallback(()=>{
        // フレンド追加
        setOpenAddFriendDialog(true);
    },[openAddFriendDialog]);

    

    // 検索フィルター
    // const filteredUsers = useMemo(() => {
    //     if (!searchInput || !friendsList) return friendsList;

    //     const trimmed = searchInput.trim().replace(/^[\s\u3000]+|[\s\u3000]+$/g, "");
    //     if(/^@[^ ]*$/.test(trimmed)){
    //         const handleName =trimmed.replace(/@/,"");
    //         console.log(handleName)
    //         const fuse = new Fuse(friendsList, { keys: ['handle_name'], threshold: 0.3 });
    //         return fuse.search(handleName).map(r => r.item);
    //     }
    //     else{
    //         const fuse = new Fuse(friendsList, { keys: ['name', 'display_name', 'handle_name'], threshold: 0.3 });
    //         return fuse.search(searchInput).map(r => r.item);
    //     }
    //   }, [searchInput, friendsList]);


    const normalizeKana = (text: string): string => {
        return text
          .replace(/[\u3041-\u3096]/g, (char) =>
            String.fromCharCode(char.charCodeAt(0) + 0x60)
          )
          .normalize("NFKC");
      };
      
      const filteredUsers = useMemo(() => {
        if (!searchInput || !friendsList) return friendsList;
      
        const trimmed = searchInput.trim().replace(/^[\s\u3000]+|[\s\u3000]+$/g, "");
        const normalizedInput = normalizeKana(trimmed);
      
        const normalizedList = friendsList.map(friend => ({
          ...friend,
          _normalized: {
            name: normalizeKana(friend.name || ""),
            display_name: normalizeKana(friend.display_name || ""),
            handle_name: normalizeKana(friend.handle_name || ""),
          }
        }));
      
        if (/^@[^ ]*$/.test(trimmed)) {
          const handleName = normalizedInput.replace(/^@/, "");
          const fuse = new Fuse(normalizedList, {
            keys: ['_normalized.handle_name'],
            threshold: 0.3
          });
          return fuse.search(handleName).map(r => r.item);
        } else {
          const fuse = new Fuse(normalizedList, {
            keys: ['_normalized.name', '_normalized.display_name', '_normalized.handle_name'],
            threshold: 0.3
          });
          return fuse.search(normalizedInput).map(r => r.item);
        }
      }, [searchInput, friendsList]);
      

    useEffect(()=>{
        getFriendsList();
    },[]);



    const HandleClickUser = (uid:string, nickName:string) => {
        // ユーザー詳細情報のダイアログの開閉ボタン
        setOpen(true);
        getSelectUser({uid,nickName});
    };

    

return(
    <>
    <Box overflow="auto" h="100%">
        <Box>
            <Flex p={{ base:4, md:16}} pt={2} pb={2} gap={4}>
                <Flex flex={1}>
                <Input bg="#ccc" value={searchInput} onChange={e=> setSearchInput(e.target.value)} />
                <IconButton>
                    <LuSearch />
                </IconButton>
                </Flex>
                <IconButton onClick={handleClickAddFriend}>
                    <IoPersonAddSharp />
                </IconButton>
            </Flex>
            {friendsListLoading? <Center h="100vh"><Spinner /></Center>:(
                <Wrap gap="30px" p={{ base:4, md:10}}>
                    {filteredUsers?.map((user)=>(    
                        <WrapItem key={user.user_id} mx="auto">
                            <UserCard data={user} onClick={()=>HandleClickUser(user.user_id, user.display_name)}/>
                        </WrapItem>
                    ))}
                </Wrap>
            )}
            
            <UserDetailDialog open={open} setOpen={setOpen} userData={selectedUser} refresh={getFriendsList}/>
            <AddFriendDialog open={openAddFriendDialog} setOpen={setOpenAddFriendDialog} />
        </Box>
</Box>
    </>
)
}

);