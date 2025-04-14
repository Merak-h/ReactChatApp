export type account = {
    account_id: string,
    display_name: string,
    handle_name: string,
    // first_name: string,
    // last_name: string,
    icon_src: string | null,
    email: string | null,
    tel: string | null,
    message: string,
    friends: friend[],
    channels: string[],
}
export type friend = {
    user_id: string,
    display_name: string,
    
}