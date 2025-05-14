import { db } from "../firebase";
import { doc, setDoc} from "firebase/firestore";

export const createMessage = (uid:string, message:string)=>{
    try{
        const messageRef = doc(db, "users", uid);
        setDoc(messageRef,{message:message},{ merge: true })
    }
    catch(error){
        console.error('updateNickName',error)
    }
}