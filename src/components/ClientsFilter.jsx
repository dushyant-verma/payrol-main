import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const ClientsFilter = ({ setSearchdata }) => {
  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");

  const handleSearch = () => {
    if (companyId !== "" || companyName !== "" || companyPhone !== "") {
      let data = {
        companyId: companyId,
        companyName: companyName,
        phone: companyPhone,
      };
      setSearchdata(data);
    } else {
      // setSearchdata({});
    }
  };

  const handleClear = () => {
    setSearchdata({});
    setCompanyId("");
    setCompanyName("");
    setCompanyPhone("");
  };

  return (
    <>
      <div className="row filter-row">
        <div className="col-sm-6 col-md-3">
          <div
            className={
              companyId
                ? "input-block form-focus focused"
                : "input-block form-focus"
            }
          >
            <input
              type="text"
              className="form-control floating"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
            />
            <label className="focus-label">Company ID</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div
            className={
              companyName
                ? "input-block form-focus focused"
                : "input-block form-focus"
            }
          >
            <input
              type="text"
              className="form-control floating"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <label className="focus-label">Company Name</label>
          </div>
        </div>
        {/* <div className="col-sm-6 col-md-3">
          <div className="input-block form-focus select-focus">
            <Select
              options={companies}
              placeholder="Select Companies"
              styles={customStyles}
            />
            <label className="focus-label">Company</label>
          </div>
        </div> */}
        <div className="col-sm-6 col-md-3">
          <div
            className={
              companyPhone
                ? "input-block form-focus focused"
                : "input-block form-focus"
            }
          >
            <input
              type="text"
              className="form-control floating"
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
            />
            <label className="focus-label">Company phone</label>
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
        {companyId !== "" || companyName !== "" || companyPhone !== "" ? (
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

export default ClientsFilter;
