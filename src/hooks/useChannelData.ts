import { promises } from "dns";
import { ChannelData, readChannelData } from "../api/readChannelData"
import { useLoginUser } from "./useLoginUser";
/*
チャンネルの表示名を取得するカスタムフック
表示順位
1, 独自チャンネル名: チャンネルステータスがPersonalではない場合かつ、チャンネル名が設定されている場合
2, "名称未設定グループ": チャンネルステータスがPersonalではない場合かつ、チャンネル名が設定されていない場合
3, 自身が設定した相手の名前: チャンネルステータスがPersonalの場合かつ、そのフレンドに独自のDisplayNameが設定されている場合
4, 相手のDisplayName: チャンネルステータスがPersonalの場合かつ、そのフレンドに独自のDisplayNameが設定されていない場合
5, "名称未設定グループ": チャンネルステータスがPersonalの場合かつ、そのフレンドに独自のDisplayNameが設定されていない場合かつ、フレンド自身が設定したDisplayNameがない場合(本来はあり得ないが,,,)

*/
export const useChannelData = () => {
    const { account } = useLoginUser();
    if(!account) throw new Error("アカウント情報が取得できませんでした。");

    const getChannelData = async (channelId:string):Promise<ChannelData|undefined> => {
        try {
            const channelData = await readChannelData(channelId, account.account_id);
            if(!channelData) throw new Error('チャンネル情報の取得に失敗');
                return channelData;
            
        } catch (error) {
            console.error("useChannelData :25\n Title :チャンネル情報の取得に失敗 \n", error);
        }
    }
    const  getChannelDisplayName = (channelData:ChannelData) => {
        try{
            
            if(channelData.channel_name!=="" && channelData.status !== "personal"){
                return channelData?.channel_name;
            }
            if(channelData.channel_name==="" && channelData.status !== "personal"){
                return "名称未設定グループ";
            }
            if(channelData.status === "personal"){
                const users = channelData.joined_users;
                const friendName = users.find((user)=>{
                    return user.user_id!==account.account_id;
                })?.displayName;
                return friendName;
            }
        }
        catch (error) {
            return error
        }
    }
    return {getChannelData, getChannelDisplayName}
}