import React, { useEffect, useState } from "react";

import Breadcrumbs from "../../../../../components/Breadcrumbs";
import { Link } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddSalaryModal from "../../../../../components/modelpopup/AddSalaryModal";
import SalaryTable from "./SalaryTable";
import { GetApi, GetFilteredEmployeeList } from "../../../../../utils/GetApi";

const EmployeeSalary = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [loading, setLoading] = useState(false);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#ff9b44",
      },
    }),
  };

  useEffect(() => {
    getEmployeeList();
  }, [branchId, departmentId]);

  useEffect(() => {
    getDepartmentList();
    getBranchList();
  }, []);

  const getEmployeeList = async () => {
    setLoading(true);
    await GetFilteredEmployeeList(
      "employee",
      branchId,
      departmentId,
      localStorage.getItem("userId")
    )
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // console.log({ newData });
        newData.forEach((object) => {
          object.joinDate = object.empJoinDate?.slice(0, 16);
        });
        setEmployeeList(newData);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };

  const getDepartmentList = async () => {
    await GetApi(
      "departments",
      "createdBy",
      localStorage.getItem("userId")
    ).then((res) => {
      const newData = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // console.log({ newData });
      newData.forEach((object) => {
        object.label = object.departmentName;
      });
      setDepartmentList(newData);
    });
  };

  const getBranchList = async () => {
    await GetApi("branch", "createdBy", localStorage.getItem("userId")).then(
      (res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // console.log({ newData });
        newData.forEach((object) => {
          object.label = object.branchDisplayName;
        });
        setBranchList(newData);
      }
    );
  };

  const handleChangeBranch = (e) => {
    console.log({ e });
    setBranchId(e?.id);
  };

  const handleChangeDepartment = async (e) => {
    console.log({ e });
    setDepartmentId(e?.id);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Employee Salary"
            title="Dashboard"
            subtitle="Salary"
            modal="#add_salary"
            name="Add Salary"
          />

          <div className="row filter-row">
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="input-block mb-3 form-focus select-focus">
                <Select
                  placeholder="--Select--"
                  onChange={(e) => handleChangeDepartment(e)}
                  options={departmentList}
                  className="select floating"
                  styles={customStyles}
                />
                <label className="focus-label">Department</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="input-block mb-3 form-focus select-focus">
                <Select
                  placeholder="--Select--"
                  onChange={(e) => handleChangeBranch(e)}
                  options={branchList}
                  className="select floating"
                  styles={customStyles}
                />
                <label className="focus-label">Branch</label>
              </div>
            </div>
          </div>

          {loading === true ? (
            <div className="spinner-border m-0" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <SalaryTable employeeList={employeeList} />
          )}
        </div>
      </div>
      <AddSalaryModal />
    </>
  );
};

export default EmployeeSalary;
