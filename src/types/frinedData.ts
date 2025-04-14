import { account } from "./account"


export type FriendData = (
    Omit<account, "email" | "tel" | "friends" | "channels"> & {
    }
)


export type FriendDataWithNickName = (
    FriendData & {
        nick_name: string
    }
)