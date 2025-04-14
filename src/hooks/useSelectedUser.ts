import { read } from "fs";
import { useCallback, useState } from "react"
import { readFriendData } from "../api/readFriendData";
import { FriendDataWithNickName } from "../types/frinedData";

type Props ={
    uid:string
    nickName: string,
}
export const useSelectedUser = ()=>{
    const [selectedUser, setSelectedUser] = useState<FriendDataWithNickName| null>(null);
    const getSelectUser = useCallback( async (props:Props)=>{
        const {uid:userId, nickName} = props;
        try{
        const userData = await readFriendData(userId);
        if(!userData){
            throw new Error('ユーザーデータが破損しています')
        }
        setSelectedUser({...userData ,nick_name:nickName});
    }
    catch(error){
        console.error('useSelectedUser=>onSelectUser:',error);
        throw error
    }
        // const {uid, users} = props;
        // const targetUser = users.find((user) => user.id ===uid)
        // setSelectedUser(targetUser!);

    },[])
    return{getSelectUser,selectedUser};
}