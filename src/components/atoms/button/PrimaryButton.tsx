import { Button } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

type Props ={
    children: ReactNode;
    handleClick: ()=> void;
    disabled?: boolean;
    loading?:boolean;
}

export const PrimaryButton: FC<Props> = memo((props)=>{
    const {children,handleClick, disabled=false, loading=false} = props;
    return(
        <Button bg="teal.400" _hover={{opacity: 0.8}} onClick={handleClick} disabled={disabled || loading}>
            {children}
        </Button>
    );
});