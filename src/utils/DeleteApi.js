import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const DeleteDepartment = async (docName, id) => {
  try {
    const docRef = doc(db, docName, id);

    await deleteDoc(docRef)
    return true;
  } catch (err) {
    return null;
  }
};
