import { useState } from "react";
import { ChannelOverViewData, observeChannelOverView } from "../../api/observeChannelOverView";
import { useLoginUser } from "../useLoginUser";

type UseChannelOverviewssResult = [
    channelOverviews: ChannelOverViewData[],
    getChannelOverviews: (channels: string[])=>GetChannelOverviewsResult
];

type GetChannelOverviewsResult = (()=>void) | undefined;

export const useChannelOverviews = ():UseChannelOverviewssResult =>{
    const { account } = useLoginUser();
    
    const [ channelOverviews, setChannelOverviews ] = useState<ChannelOverViewData[]>([]);

    const getChannelOverviews = (channels: string[]):GetChannelOverviewsResult=> {
        try{

        if(!account) throw new Error("ログイン情報が取得できませんでした");

        if (channels.length === 0)throw new Error("channelsが空です");

            const channelMap = new Map<string, ChannelOverViewData>();
            const unsubscribes: (() => void)[] = [];

            channels.forEach((channelId) => {
                const unsubscribe = observeChannelOverView(channelId, account.account_id??"", (channelData) => {
                    channelMap.set(channelId, channelData);
                    setChannelOverviews(Array.from(channelMap.values())); // 最新の状態に更新
                });
                unsubscribes.push(unsubscribe);
            });
            return () => {
                unsubscribes.forEach((unsub) => unsub()); // 監視解除
            };
        }
        catch(error){
            console.error("useChannelOverviews : 38\n", error);
            return undefined;
        }
    }
return [ channelOverviews, getChannelOverviews ];
}