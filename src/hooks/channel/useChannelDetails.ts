import { useState } from "react"
import { ChannelData, readChannelData } from "../../api/readChannelData";
import { useLoginUser } from "../useLoginUser";

type UseChannelDetailsResult = [
    channelData: (ChannelData | undefined),
    getChannelData: GetChannelDataResult
];

type GetChannelDataResult =  (channelId: string) => Promise<void>;

export const useChannelDetails = ():UseChannelDetailsResult => {
    const { account } = useLoginUser();
    const [ channelData, setChannelData ] = useState<ChannelData>();

    const getChannelData:GetChannelDataResult  = async (channelId:string) => {
        try {
            if(!account)throw new Error("アカウント情報が取得できませんでした。");
            const channelData = await readChannelData(channelId, account.account_id);
            if(!channelData) throw new Error('チャンネル情報の取得に失敗');
            setChannelData(channelData);
        } catch (error) {
            console.error("useChannelData :25\n Title :チャンネル情報の取得に失敗 \n", error);
        }
    }

    return [ channelData, getChannelData ];
}