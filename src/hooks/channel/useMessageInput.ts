import { createChannelMessage } from "../../api/createChannelMessage";
import { useLoginUser } from "../useLoginUser";

export const useMessageInput = () => {
    const { account } = useLoginUser();
    const sendMessage = async ( channelId: string, message: string):Promise<boolean> => {
        try{
            if (!account) throw new Error("アカウント情報が取得できませんでした。");
            return await createChannelMessage( channelId, account.account_id, message);
        }
        catch(error){
            console.error("useMessageInput : 13\n", error);
            return false;
        }
    }
    return { sendMessage };
}
