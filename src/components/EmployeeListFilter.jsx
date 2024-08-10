import React, { useState } from "react";
import { Link } from "react-router-dom";

const EmployeeListFilter = ({ setSearchdata }) => {
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [empPhone, setEmpPhone] = useState("");

  const handleSearch = () => {
    if (empId !== "" || empName !== "" || empPhone !== "") {
      let data = {
        empId: empId,
        empName: empName,
        empPhone: empPhone,
      };
      setSearchdata(data);
    } else {
      // setSearchdata({});
    }
  };

  const handleClear = () => {
    setSearchdata({});
    setEmpId("");
    setEmpName("");
    setEmpPhone("");
  };

  return (
    <>
      <div className="row filter-row">
        <div className="col-sm-6 col-md-3">
          <div
            className={
              empId
                ? "input-block form-focus focused"
                : "input-block form-focus"
            }
          >
            <input
              type="text"
              className="form-control floating"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
            />
            <label className="focus-label">Employee ID</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div
            className={
              empName
                ? "input-block form-focus focused"
                : "input-block form-focus"
            }
          >
            <input
              type="text"
              className="form-control floating"
              value={empName}
              onChange={(e) => setEmpName(e.target.value)}
            />
            <label className="focus-label">Employee Name</label>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div
            className={
              empPhone
                ? "input-block form-focus focused"
                : "input-block form-focus"
            }
          >
            <input
              type="text"
              className="form-control floating"
              value={empPhone}
              onChange={(e) => setEmpPhone(e.target.value)}
            />
            <label className="focus-label">Employee phone</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-1">
          <Link
            to="#"
            className="btn btn-success btn-block w-100"
            onClick={handleSearch}
          >
            {" "}
            Search{" "}
          </Link>
        </div>
        {empId !== "" || empName !== "" || empPhone !== "" ? (
          <div className="col-sm-6 col-md-1">
            <Link
              to="#"
              className="btn btn-success btn-block w-100"
              onClick={handleClear}
            >
              {" "}
              Clear{" "}
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default EmployeeListFilter;
