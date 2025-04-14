import { User } from "@/types/api/user";
import axios from "axios";
import { useCallback, useState } from "react"

export const useAllUsers = ()=>{
    const [loading, setLoading] = useState(false);
    const [users,setUsers] = useState<Array <User>>([]);

    const getUsers = useCallback(() =>{
        setLoading(true);
        axios.get<Array <User>>("https://jsonplaceholder.typicode.com/users")
        .then(res=>setUsers(res.data))
        .catch(err=>{alert("ユーザーデータ取得に失敗しました。")})
        .finally(()=>setLoading(false));
    },[]);

    return{getUsers,loading, users}
}
