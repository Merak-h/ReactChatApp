// import { toaster } from "@/components/ui/toaster"
// import { toaster } from "@/components/ui/toaster";
// import { useToastContext } from "@ark-ui/react";
import { useCallback } from "react"
import { useLoginUser } from "./useLoginUser";
import { createMessage } from "../api/createMessage";

type Props = {
    title: string;
    status: "info" | "warning" | "success" | "error";
}

export const useMessage = () => {


    // const showMessage = useCallback((props: Props) => {
    //     const {title, status} = props;
    //     // toaster.create({
    //     //     title: title,
    //     //     type: status,
    //     //     duration: 2000,
            
    //     // })
    // },[]);

    // return{showMessage};
    const { account } = useLoginUser();
    const updateMessage = (message:string)=>{
        try{
            if(!account)throw new Error('ログイン情報が取得できませんでした');
            createMessage(account.account_id, message);
        }
        catch(error){
            console.error('useMessage=>updateMessage',error)
        }

    }
    return{updateMessage}
}