export type user ={
    user_id:string,
    display_name:string,
    icon:string,
}

export const useApiUser = ()=>{
    const getUser = (userId:string) =>{
        const user = users.find((user)=>{
            return user.user_id === userId
        })
        return user;
    }
    const getUsers = (userIds:String[]):user[] =>{
        return userIds.map((userId)=>(
                    users.find((user)=>{
                        return user.user_id === userId;
                    })
                ))
                .filter((user): user is user => user !== undefined)
    }
    return {getUser, getUsers}
}


const users: user[] = [
    {
      user_id: "user_001",
      display_name: "山田 太郎",
      icon: "https://example.com/icons/user1.png",
    },
    {
      user_id: "user_002",
      display_name: "佐藤 花子",
      icon: "https://example.com/icons/user2.png",
    },
    {
      user_id: "user_003",
      display_name: "田中 一郎",
      icon: "https://example.com/icons/user3.png",
    },
    {
      user_id: "user_004",
      display_name: "鈴木 美咲",
      icon: "https://example.com/icons/user4.png",
    },
    {
      user_id: "user_005",
      display_name: "高橋 健太",
      icon: "https://example.com/icons/user5.png",
    },
  ];