/**
 * @fileoverview チャンネルIDの一覧を取得・監視するためのカスタムHook
 *
 * @returns {{
*   channels: string[],
*   getChannelIds: () => void | undefined
* }} チャンネルID配列と監視開始関数
*/

import { observeJoinedChannelIds } from "../../api/observeJoinedChannelIds";
import { useState } from "react";
import { useLoginUser } from "../useLoginUser";

type UseChannelIdsResult = [
    channels: string[],
    getChannelIds: ()=>GetChannelIdsResult
];

type GetChannelIdsResult = (()=>void) | undefined;


export const useChannelIds = ():UseChannelIdsResult=> {
     const [ channels, setChannels ] = useState<string[]>([]);

     const { account } = useLoginUser();

     const getChannelIds = ():GetChannelIdsResult => {
        try{
            if(!account) return undefined;

            const channelIdsUnsubscribe = observeJoinedChannelIds(account.account_id??"", (channelIds:string[]) =>{
                setChannels(channelIds);
            });
            return ()=>channelIdsUnsubscribe();
        }
        catch (error) {
            console.error("useChannelIds : 25\n", error);
            return undefined;
        }
     }

    return [ channels, getChannelIds ];
}