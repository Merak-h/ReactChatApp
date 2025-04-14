import { FriendsList, readFriendsList } from "../api/readFriendsList";
import { LoginUserContext } from "../providers/LoginUserProvider";
import { useContext, useState } from "react";

export const useFriendsList = () => {

    const { account } = useContext(LoginUserContext)
    const [friendsList, setFriendList] = useState<Array<FriendsList>>();
    const [friendsListLoading, setFriendsListLoading] = useState(false);

    const getFriendsList = async () => {
        setFriendsListLoading(true);
        if(!account){throw new Error('アカウント情報が取得できませんでした')}
        try{
            const result = await readFriendsList(account.account_id);
            setFriendList(result);
            setFriendsListLoading(false);
        }
        catch(error){
            setFriendsListLoading(false);
            console.error('useFriendsList=>showFriendsList:',error);
            throw error;
        }
    }


    
    
    return{friendsList, getFriendsList, friendsListLoading}
}