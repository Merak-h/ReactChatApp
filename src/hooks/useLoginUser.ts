import { LoginUserContext, LoginUserContextType } from "../providers/LoginUserProvider"
import { useContext } from "react"

export const useLoginUser = ():LoginUserContextType=> useContext(LoginUserContext);

