export type message = {
    message_id: string,
    sender_id: string,
    receiver_id: string,
    text: string,
    is_read:boolean,
    creat_at: string,
    update_at:string,
    delete_at:string|false,
}
export type channel = {
    channnel_id:string,
    channel_name:string,
    status:'private'|'pubric',
    messages:message[],
    users: String[],
    creat_at:string,
    delete_at:string,
}


export const useApiChannel = ()=>{
    const getChannel = (id:string):channel=>{
        return {
            channnel_id: id,
            channel_name: "プライベートチャット",
            status: "private",
            creat_at: "2025-04-01T12:00:00Z",
            delete_at: "",
            users: ["user_001", "user_002"],
            messages: [
                ...moreMessages("user_001","user_002"),
            ]
        }
    }
    return{getChannel}
}



const moreMessages =(user1:string,user2:string):message[]=> {return(Array.from({ length: 8 }, (_, i) => ({
    message_id: String(i),
    sender_id: i % 2 === 0 ? user1 : user2,
    receiver_id: i % 2 === 0 ? user2 : user1,
    text: `メッセージ${i + 4}`,
    is_read: i % 2 === 0,
    creat_at: `2025-04-01T12:${(i + 3).toString().padStart(2, "0")}:00Z`,
    update_at: `2025-04-01T12:${(i + 3).toString().padStart(2, "0")}:00Z`,
    delete_at: false,
  })))};

const dummyChannels: channel[] = [
    {
      channnel_id: "channel_1",
      channel_name: "プライベートチャット",
      status: "private",
      creat_at: "2025-04-01T12:00:00Z",
      delete_at: "",
      users:["user_001", "user_002"],
      messages: [
        ...moreMessages("user_001","user_002"),
      ],
    },
    {
      channnel_id: "channel_2",
      channel_name: "パブリックルーム",
      status: "pubric",
      creat_at: "2025-04-01T14:00:00Z",
      delete_at: "",
      users: ["user_001", "user_003"],
      messages: [
        ...moreMessages("user_001","user_003"),
      ],
    },
  ];
  
  