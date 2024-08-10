import React, { useEffect, useState } from "react";
import { CreateApi, CreateDepartments } from "../../utils/PostApi";
import ErrorAlerts from "../../views/pages/Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../../views/pages/Ui_Interface/Components/SuccessAlert";
import { UpdateApi, UpdateDepartment } from "../../utils/UpdateApi";
import Select from "react-select";

const CategoryModal = ({ data }) => {
  const [categoryName, setCategoryName] = useState("");
  const [wages, setWages] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [showApiSuccessAlert, setShowApiSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (
      categoryName !== "" &&
      wages !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== "" &&
      localStorage.getItem("userRole") !== undefined &&
      localStorage.getItem("userRole") !== null &&
      localStorage.getItem("userRole") !== ""
    ) {
      setLoading(true);
      const data = {
        categoryName: categoryName,
        wages: wages,
        createdBy: localStorage.getItem("userId"),
        createdUserRole: localStorage.getItem("userRole"),
        createdDate: new Date().toString(),
      };
      await CreateApi("category", data)
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

  const handleEditCategory = async (e) => {
    e.preventDefault();
    if (
      categoryName !== "" &&
      wages !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== "" &&
      localStorage.getItem("userRole") !== undefined &&
      localStorage.getItem("userRole") !== null &&
      localStorage.getItem("userRole") !== ""
    ) {
      setLoading(true);
      const data1 = {
        categoryName: categoryName,
        wages: wages,
        updateBy: localStorage.getItem("userId"),
        updatedUserRole: localStorage.getItem("userRole"),
        updatedDate: new Date().toString(),
      };
      await UpdateApi("category", data1, data.id)
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
      setCategoryName(data?.categoryName);
      setWages(data?.wages);
    }
  }, [data]);
  return (
    <>
      {/* Add Department Modal */}
      <div id="add_category" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Category</h5>
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
              <form onSubmit={(e) => handleCreateCategory(e)}>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Category Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                  <label className="col-form-label">
                    Minimum Wages Required
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    onChange={(e) => setWages(e.target.value)}
                  />

                  {showAlert && (
                    <ErrorAlerts
                      text="Please input all required field"
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
                    <SuccessAlerts text="Category created succssefully" />
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
      <div id="edit_category" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Category</h5>
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
              <form onSubmit={(e) => handleEditCategory(e)}>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Category Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) => setCategoryName(e.target.value)}
                    value={categoryName}
                  />
                  <label className="col-form-label">
                    Minimum Wages Required
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) => setWages(e.target.value)}
                    value={wages}
                  />

                  {showAlert && (
                    <ErrorAlerts
                      text="Please input all required field"
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
                    <SuccessAlerts text="Category updated succssefully" />
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

export default CategoryModal;
