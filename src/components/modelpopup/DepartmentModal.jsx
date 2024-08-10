import React, { useEffect, useState } from "react";
import { CreateDepartments } from "../../utils/PostApi";
import ErrorAlerts from "../../views/pages/Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../../views/pages/Ui_Interface/Components/SuccessAlert";
import { UpdateDepartment } from "../../utils/UpdateApi";
import Select from "react-select";
import { GetApi } from "../../utils/GetApi";

const DepartmentModal = ({ data }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [displayDepartmentName, setDisplayDepartmentName] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [showApiSuccessAlert, setShowApiSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [branchName, setBranchName] = useState("");

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

  const handleCreateDepartment = async (e) => {
    e.preventDefault();
    if (
      departmentName !== "" &&
      displayDepartmentName !== "" &&
      branchName !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== "" &&
      localStorage.getItem("userRole") !== undefined &&
      localStorage.getItem("userRole") !== null &&
      localStorage.getItem("userRole") !== ""
    ) {
      setLoading(true);
      const data = {
        departmentName: departmentName,
        displayDepartmentName: displayDepartmentName,
        branchName: branchName,
        createdBy: localStorage.getItem("userId"),
        createdUserRole: localStorage.getItem("userRole"),
        createdDate: new Date().toString(),
      };
      await CreateDepartments(data)
        .then((res) => {
          if (res) {
            setShowApiSuccessAlert(true);
            setLoading(false);
            window.location.reload();
          }
        })
        .catch((err) => {
          setShowApiAlert(true);
          setLoading(false);
        });
    } else {
      setShowAlert(true);
    }
  };

  const handleEditDepartment = async (e) => {
    e.preventDefault();
    if (
      departmentName !== "" &&
      displayDepartmentName !== "" &&
      branchName !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== "" &&
      localStorage.getItem("userRole") !== undefined &&
      localStorage.getItem("userRole") !== null &&
      localStorage.getItem("userRole") !== ""
    ) {
      setLoading(true);
      const data1 = {
        departmentName: departmentName,
        displayDepartmentName: displayDepartmentName,
        branchName: branchName,
        updateBy: localStorage.getItem("userId"),
        updatedUserRole: localStorage.getItem("userRole"),
        updatedDate: new Date().toString(),
      };
      await UpdateDepartment(data1, data.id)
        .then((res) => {
          if (res) {
            setShowApiSuccessAlert(true);
            setLoading(false);
            window.location.reload();
          }
        })
        .catch((err) => {
          setShowApiAlert(true);
          setLoading(false);
        });
    } else {
      setShowAlert(true);
    }
  };

  useEffect(() => {
    setDepartmentName(data?.departmentName);
    setDisplayDepartmentName(data?.displayDepartmentName);
    setBranchName(data?.branchName);
    getBranchList();
  }, [data]);

  const getBranchList = async () => {
    await GetApi("branch","createdBy",localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        newData.forEach((object) => {
          object.value = object.id;
          object.label = object.branchName;
        });
        setBranchList(newData);
      })
      .catch((err) => {});
  };

  const handleChangeBranch = (e) => {
    setBranchName(e.label);
  };


  return (
    <>
      {/* Add Department Modal */}
      <div
        id="add_department"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Department</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => handleCreateDepartment(e)}>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Department Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) => setDepartmentName(e.target.value)}
                    required
                  />
                  <label className="col-form-label">
                    Display Department Name{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    onChange={(e) => setDisplayDepartmentName(e.target.value)}
                  />
                  <label className="col-form-label">
                    Under Which Branch <span className="text-danger">*</span>
                  </label>
                  <Select
                    options={branchList}
                    placeholder="Select"
                    styles={customStyles}
                    required
                    
                    onChange={handleChangeBranch}
                  />
                  {showAlert && (
                    <ErrorAlerts
                      text="Please input department name"
                      setShowAlert={setShowAlert}
                    />
                  )}
                  {showApiAlert && (
                    <ErrorAlerts
                      text="Something went wrong! Please try again later"
                      setShowAlert={setShowApiAlert}
                    />
                  )}
                  {showApiSuccessAlert && (
                    <SuccessAlerts text="Department created succssefully" />
                  )}
                </div>

                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    // data-bs-dismiss="modal"
                    aria-label="Close"
                    type="submit"
                  >
                    {loading === true ? (
                      <div className="spinner-border m-0" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Department Modal */}
      {/* Edit Department Modal */}
      <div
        id="edit_department"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Department</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => handleEditDepartment(e)}>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Department Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) => setDepartmentName(e.target.value)}
                    value={departmentName}
                  />
                  <label className="col-form-label">
                    Display Department Name{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) => setDisplayDepartmentName(e.target.value)}
                    value={displayDepartmentName}
                  />
                  <label className="col-form-label">
                    Under Which Branch <span className="text-danger">*</span>
                  </label>
                  <Select
                    options={branchList}
                    placeholder="Select"
                    styles={customStyles}
                    onChange={handleChangeBranch}
                  />
                  {showAlert && (
                    <ErrorAlerts
                      text="Please input department name"
                      setShowAlert={setShowAlert}
                    />
                  )}
                  {showApiAlert && (
                    <ErrorAlerts
                      text="Something went wrong! Please try again later"
                      setShowAlert={setShowApiAlert}
                    />
                  )}
                  {showApiSuccessAlert && (
                    <SuccessAlerts text="Department created succssefully" />
                  )}
                </div>

                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    // data-bs-dismiss="modal"
                    aria-label="Close"
                    type="submit"
                  >
                    {loading === true ? (
                      <div className="spinner-border m-0" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Department Modal */}
    </>
  );
};

export default DepartmentModal;
