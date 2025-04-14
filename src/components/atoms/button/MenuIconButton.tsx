import { IconButton } from "@chakra-ui/react";
import { FC, memo } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export const MenuIconButton:FC = memo( ()=>{
    return(
        <IconButton
            aria-label="メニューボタン"
            size="sm"
            bg="teal.500"
            display={{ base: "block", md: "none"}}
            >
            <RxHamburgerMenu />
        </IconButton>
    );
})