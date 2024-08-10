import {addDoc, collection} from 'firebase/firestore';
import { db } from '../firebase';


export const CreateUser = async data => {
  try {
    let user = await addDoc(collection(db, 'users'), data);
    return user;
  } catch (err) {
    return null;
  }
};
export const CreateDepartments = async department => {
  try {
    let departments = await addDoc(collection(db, 'departments'), department);
    return departments;
  } catch (err) {
    return null;
  }
};

export const CreateApi = async (docName,data) => {
  try {
    let createapi = await addDoc(collection(db, docName), data);
    return createapi;
  } catch (err) {
    return null;
  }
};
