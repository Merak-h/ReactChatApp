// import { toaster } from "@/components/ui/toaster"
// import { toaster } from "@/components/ui/toaster";
// import { useToastContext } from "@ark-ui/react";
import { useCallback } from "react"

type Props = {
    title: string;
    status: "info" | "warning" | "success" | "error";
}

export const useMessage = () => {


    const showMessage = useCallback((props: Props) => {
        const {title, status} = props;
        // toaster.create({
        //     title: title,
        //     type: status,
        //     duration: 2000,
            
        // })
    },[]);

    return{showMessage};
}