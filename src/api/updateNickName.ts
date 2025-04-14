import { db } from "../firebase";
import { collection, doc, setDoc} from "firebase/firestore";

export const updateNickName = (accountId:string,friendId:string, newNickName:string)=>{

    try{
        const nickNameRef = doc(collection(doc(db, "users", accountId),'friends'),friendId);
        setDoc(nickNameRef,{display_name:newNickName},{ merge: true })
    }
    catch(error){
        console.error('updateNickName',error)
    }
    
}