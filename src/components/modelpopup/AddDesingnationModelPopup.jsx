import React, { useEffect, useState } from "react";
import Select from "react-select";
import { GetApi, GetDepartmentList } from "../../utils/GetApi";
import { CreateApi, CreateDepartments } from "../../utils/PostApi";
import ErrorAlerts from "../../views/pages/Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../../views/pages/Ui_Interface/Components/SuccessAlert";
import { UpdateApi } from "../../utils/UpdateApi";

const AddDesingnationModelPopup = ({ data }) => {
  const [departmentList, setDepartmentList] = useState([]);
  const [designationName, setDesignationName] = useState("");
  const [displayDesignationName, setDisplayDesignationName] = useState("");

  const [departmentId, setDepartmentid] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [showApiSuccessAlert, setShowApiSuccessAlert] = useState(false);
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
    getDepartmentList();
    if (data) {
      setDesignationName(data?.designationName);
      setDisplayDesignationName(data?.displayDesignationName);
    }
  }, [data]);

  const getDepartmentList = async () => {
    await GetApi("departments","createdBy",localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        newData.forEach((object) => {
          object.value = object.id;
          object.label = object.departmentName;
        });
        setDepartmentList(newData);
      })
      .catch((err) => {});
  };

  const handleChangeDepartment = (e) => {
    setDepartmentid(e.value);
    setDepartmentName(e.label);
  };

  const handleCreateDesignation = async (e) => {
    e.preventDefault()
    if (
      designationName !== "" &&
      departmentId !== "" &&
      displayDesignationName !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== "" &&
      localStorage.getItem("userRole") !== undefined &&
      localStorage.getItem("userRole") !== null &&
      localStorage.getItem("userRole") !== ""
    ) {
      setLoading(true);
      let data1 = {
        designationName: designationName,
        departmentId: departmentId,
        departmentName: departmentName,
        displayDesignationName: displayDesignationName,
        createdBy: localStorage.getItem("userId"),
        createdUserRole: localStorage.getItem("userRole"),
        createdDate: new Date().toString(),
      };
      await CreateApi("designations", data1)
        .then((res) => {
          setShowApiSuccessAlert(true);
          setLoading(false);
          window.location.reload();
        })
        .catch((err) => {
          setLoading(false);
          setShowApiAlert(true);
        });
    } else {
      setShowAlert(true);
    }
  };

  const handleUpdateDesignation = async () => {
    if (
      designationName !== "" &&
      displayDesignationName !== "" &&
      departmentId !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== "" &&
      localStorage.getItem("userRole") !== undefined &&
      localStorage.getItem("userRole") !== null &&
      localStorage.getItem("userRole") !== ""
    ) {
      setLoading(true);
      let data1 = {
        designationName: designationName,
        departmentId: departmentId,
        departmentName: departmentName,
        displayDesignationName: displayDesignationName,
        updatedBy: localStorage.getItem("userId"),
        updatedUserRole: localStorage.getItem("userRole"),
        updatedDate: new Date().toString(),
      };
      await UpdateApi("designations", data1, data.id)
        .then((res) => {
          setShowApiSuccessAlert(true);
          setLoading(false);
          window.location.reload();
        })
        .catch((err) => {
          setLoading(false);
          setShowApiAlert(true);
        });
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      <div
        id="add_designation"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Designation</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <form onSubmit={handleCreateDesignation}>
            <div className="modal-body">
              <div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Designation Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    onChange={(e) => setDesignationName(e.target.value)}
                  />
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Display Designation Name{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    onChange={(e) => setDisplayDesignationName(e.target.value)}
                  />
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Department <span className="text-danger">*</span>
                  </label>

                  <Select
                    options={departmentList}
                    placeholder="Select Department"
                    styles={customStyles}
                    required
                    onChange={handleChangeDepartment}
                  />
                </div>

                <div className="submit-section">
                  {showAlert && (
                    <ErrorAlerts
                      text="Mandatory field required"
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
                    <SuccessAlerts text="Department updated succssefully" />
                  )}
                  <button
                    className="btn btn-primary submit-btn"
                    // data-bs-dismiss="modal"
                    aria-label="Close"
                    // onClick={handleCreateDesignation}
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
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>

      <div
        id="edit_designation"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Designation</h5>
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
              <div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Designation Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={designationName}
                    onChange={(e) => setDesignationName(e.target.value)}
                  />
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Display Designation Name{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={displayDesignationName}
                    onChange={(e) => setDisplayDesignationName(e.target.value)}
                  />
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Department <span className="text-danger">*</span>
                  </label>

                  <Select
                    options={departmentList}
                    placeholder="Select Department"
                    styles={customStyles}
                    onChange={handleChangeDepartment}
                  />
                </div>

                <div className="submit-section">
                  {showAlert && (
                    <ErrorAlerts
                      text="Mandatory field required"
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
                    <SuccessAlerts text="Department updated succssefully" />
                  )}
                  <button
                    className="btn btn-primary submit-btn"
                    // data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleUpdateDesignation}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDesingnationModelPopup;
