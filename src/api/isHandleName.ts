import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";


export const isHandleName = async (handleName:string) => {
    const q = query(collection(db, "users"), where("handle_name", "==", handleName));
    const snapshot = await getDocs(q);

    return !snapshot.empty;
}