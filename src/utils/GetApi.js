import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const GetUser = async (email, password, empLoginEnable) => {
  try {
    const q = query(
      collection(db, empLoginEnable === true ? "employee" : "users"),
      where(empLoginEnable === true ? "empId" : "email", "==", email),
      where("password", "==", password)
    );

    let user = await getDocs(q);
    return user;
  } catch (err) {
    return null;
  }
};

export const GetCompanyList = async () => {
  try {
    const q = query(collection(db, "users"), where("role", "==", "company"));
    let companyList = await getDocs(q);
    return companyList;
  } catch (err) {
    return null;
  }
};

export const GetDepartmentList = async () => {
  try {
    const q = query(collection(db, "departments"));
    let departmentList = await getDocs(q);
    return departmentList;
  } catch (err) {
    return null;
  }
};
export const GetApi = async (docName, search, id) => {
  if (search !== undefined && id !== undefined) {
    try {
      const q = query(collection(db, docName), where(search, "==", id));
      let getList = await getDocs(q);
      return getList;
    } catch (err) {
      return null;
    }
  } else {
    try {
      const q = query(collection(db, docName));
      let getList = await getDocs(q);
      return getList;
    } catch (err) {
      return null;
    }
  }
};

export const GetFilteredEmployeeList = async (
  docName,
  empBranchId,
  empDepartmentId,
  userid
) => {
  try {
    const q = query(
      collection(db, docName),
      where("empCompanyId", "==", userid),
      where("empBranchId", "==", empBranchId),
      where("empDepartmentId", "==", empDepartmentId)
    );
    let getList = await getDocs(q);
    return getList;
  } catch (err) {
    return null;
  }
};

export const CheckForEmployee = async (
  docName,
  empCompanyId,
  id,
  empAadhar,
  number
) => {
  try {
    const q = query(
      collection(db, docName),
      where(empCompanyId, "==", id),
      where(empAadhar, "==", number)
    );
    let getList = await getDocs(q);
    return getList;
  } catch (err) {
    return null;
  }
};
