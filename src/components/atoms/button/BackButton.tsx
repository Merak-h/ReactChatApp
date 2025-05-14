import { Button, ChakraProviderProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    children?: ReactNode;
    p?:string;
}
const BackButton:FC<Props> = (props) => {
    const { children, p } = props;
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // ブラウザの履歴スタックで1つ前に戻る
    };

    return <Button backgroundColor="#0000" p={p} _hover={{opacity:0.5}} onClick={goBack}>{children ?? "戻る"}</Button>;
};

export default BackButton;
