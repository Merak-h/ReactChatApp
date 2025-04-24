import { doc, getDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export const getFriendDisplayName = async (friendId:string, accountId:string) => {
    const userDocSnap = await getDoc(doc(collection(doc(db,"users",accountId),"friends"),friendId,));
    if (userDocSnap.exists()) {
        const displayName =  userDocSnap.data().display_name;
        if(displayName!=="" && displayName) return displayName;
        
    }
    const user2DocSnap = await getDoc(doc(db,"users",friendId));
    if (user2DocSnap.exists()){
        const display2Name =  user2DocSnap.data().display_name;
        if(display2Name && display2Name!=="")
        return display2Name;
    }
    return null;
}