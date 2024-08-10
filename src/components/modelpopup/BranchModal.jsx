import React, { useEffect, useState } from "react";
import { CreateApi, CreateDepartments } from "../../utils/PostApi";
import ErrorAlerts from "../../views/pages/Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../../views/pages/Ui_Interface/Components/SuccessAlert";
import { UpdateApi, UpdateDepartment } from "../../utils/UpdateApi";
import Select from "react-select";

const BranchModal = ({ data }) => {
  const [branchName, setBranchName] = useState("");
  const [branchDisplayName, setBranchDisplayName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");

  const [editDepartmentName, setEditDepartmentName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [showApiSuccessAlert, setShowApiSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [haveBranch, setBranch] = useState("Yes");

  const branch = [
    { value: 1, label: "Yes" },
    { value: 2, label: "No" },
  ];

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

  const handleChangeBranch = (e) => {
    setBranch(e.label);
  };

  const handleCreateBranch = async (e) => {
    e.preventDefault();
    if (
      branchName !== "" &&
      branchDisplayName !== "" &&
      branchAddress !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== "" &&
      localStorage.getItem("userRole") !== undefined &&
      localStorage.getItem("userRole") !== null &&
      localStorage.getItem("userRole") !== ""
    ) {
      setLoading(true);
      const data = {
        branchName: branchName,
        branchDisplayName: branchDisplayName,
        branchAddress: branchAddress,
        haveBranch: haveBranch,
        createdBy: localStorage.getItem("userId"),
        createdUserRole: localStorage.getItem("userRole"),
        createdDate: new Date().toString(),
      };
      await CreateApi("branch", data)
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

  const handleEditBranch = async (e) => {
    e.preventDefault();
    if (
      branchName !== "" &&
      branchDisplayName !== "" &&
      branchAddress !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== "" &&
      localStorage.getItem("userRole") !== undefined &&
      localStorage.getItem("userRole") !== null &&
      localStorage.getItem("userRole") !== ""
    ) {
      setLoading(true);
      const data1 = {
        branchName: branchName,
        branchDisplayName: branchDisplayName,
        branchAddress: branchAddress,
        updateBy: localStorage.getItem("userId"),
        updatedUserRole: localStorage.getItem("userRole"),
        updatedDate: new Date().toString(),
      };
      await UpdateApi("branch", data1, data.id)
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
    if (Object.keys(data).length > 0) {
      setBranchName(data?.branchName);
      setBranchDisplayName(data?.branchDisplayName);
      setBranchAddress(data?.branchAddress);
    }
  }, [data]);
  return (
    <>
      {/* Add Department Modal */}
      <div id="add_branch" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Branch</h5>
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
              <form onSubmit={(e) => handleCreateBranch(e)}>
                <div className="input-block mb-3">
                  {/* <label className="col-form-label">
                    Have Branches of Company{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <Select
                    options={branch}
                    placeholder="Select"
                    styles={customStyles}
                    required
                    onChange={handleChangeBranch}
                  /> */}
                  {haveBranch === "Yes" ? (
                    <>
                      <label className="col-form-label">
                        Branch Name <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        onChange={(e) => setBranchName(e.target.value)}
                      />
                      <label className="col-form-label">
                        Display Branch Name{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        onChange={(e) => setBranchDisplayName(e.target.value)}
                      />
                      <label className="col-form-label">
                        Branch Address <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        onChange={(e) => setBranchAddress(e.target.value)}
                      />
                    </>
                  ) : null}
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
                    <SuccessAlerts text="Branch created succssefully" />
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
      <div id="edit_branch" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Branch</h5>
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
              <form onSubmit={(e) => handleEditBranch(e)}>
                <div className="input-block mb-3">
                  <>
                    <label className="col-form-label">
                      Branch Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(e) => setBranchName(e.target.value)}
                      value={branchName}
                    />
                    <label className="col-form-label">
                      Display Branch Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(e) => setBranchDisplayName(e.target.value)}
                      value={branchDisplayName}
                    />
                    <label className="col-form-label">
                      Branch Address <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(e) => setBranchAddress(e.target.value)}
                      value={branchAddress}
                    />
                  </>

                  {showAlert && (
                    <ErrorAlerts
                      text="Please input branch name"
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
                    <SuccessAlerts text="Branch created succssefully" />
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
                      "Save"
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

export default BranchModal;
