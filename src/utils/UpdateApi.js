import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const UpdateUser = async (data, id) => {
  try {
    await updateDoc(doc(db, "users", id), data);
    return true;
  } catch (err) {
    console.log({ err });
    return false;
  }
};

export const UpdateDepartment = async (data, id) => {
  try {
    await updateDoc(doc(db, "departments", id), data);
    return true;
  } catch (err) {
    console.log({ err });
    return false;
  }
};

export const UpdateApi = async (docName, data, id) => {
  try {
    await updateDoc(doc(db, docName, id), data);
    return true;
  } catch (err) {
    console.log({ err });
    return false;
  }
};
