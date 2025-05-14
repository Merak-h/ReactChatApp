import { Button } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

type Props ={
    children: ReactNode;
    handleClick: ()=> void;
    disabled?: boolean;
    loading?:boolean;
    bg?: string;
}

export const PrimaryButton: FC<Props> = memo((props)=>{
    const {children,handleClick, disabled=false, loading=false, bg} = props;
    return(
        <Button bg={bg?? "teal.400"} _hover={{opacity: 0.8}} onClick={handleClick} disabled={disabled || loading}>
            {children}
        </Button>
    );
});