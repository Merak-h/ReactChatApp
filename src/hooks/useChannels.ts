import { createChannel } from "../api/createChannel";
import { isChannel } from "../api/isChannel"
import { useLoginUser } from "./useLoginUser";


export const useChannels = () => {
    const {account} = useLoginUser()
    const getPersonalChannel = async (user_id:string) =>{
        const channel  = await isChannel(user_id);
        if(channel){
            return channel;
        }else{
            if(account){
                const users = [
                    user_id,
                    account.account_id

                ]
                const channel = await createChannel(users)
                return channel;
            }
        }

    }
    return { getPersonalChannel}
}