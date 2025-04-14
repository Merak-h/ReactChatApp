import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase";

export const isAccount = async (userId: string)=> {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    return !userDocSnap.exists();
}