import React, { useEffect, useState } from "react";
import { CreateApi, CreateDepartments } from "../../utils/PostApi";
import ErrorAlerts from "../../views/pages/Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../../views/pages/Ui_Interface/Components/SuccessAlert";
import { UpdateApi, UpdateDepartment } from "../../utils/UpdateApi";
import Select from "react-select";
import { GetApi } from "../../utils/GetApi";
import DatePicker from "react-datepicker";

const DeductionModal = ({ data }) => {
  const [deductionName, setDeductionName] = useState("");
  const [deductionDisplayName, setDeductionDisplayName] = useState("");
  const [wefDate, setWefDate] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dummyId, setDummyId] = useState(0);
  const [dayApplicable, setDayApplicable] = useState("");

  const DayApplicable = [
    { value: 1, label: "Yes" },
    { value: 2, label: "Fix Monthly" },
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

  const handleDateChange = (date) => {
    setWefDate(date);
  };

  const handleCreateDeduction = async (e) => {
    e.preventDefault();
    if (
      deductionName !== "" &&
      deductionDisplayName !== "" &&
      wefDate !== "" &&
      dayApplicable !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== ""
    ) {
      setLoading(true);
      const data1 = {
        deductionName: deductionName,
        deductionDisplayName: deductionDisplayName,
        wefDate: wefDate.toString(),
        dayApplicable: dayApplicable,

        companyId: localStorage.getItem("userId"),
        createdDate: new Date().toString(),
      };
      await CreateApi("deductions", data1)
        .then((res) => {
          if (res) {
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

  const handleUpdateDeduction = async (e) => {
    e.preventDefault();
    if (
      deductionName !== "" &&
      deductionDisplayName !== "" &&
      wefDate !== "" &&
      dayApplicable !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== ""
    ) {
      setLoading(true);
      const data1 = {
        deductionName: deductionName,
        deductionDisplayName: deductionDisplayName,
        wefDate: wefDate.toString(),
        dayApplicable: dayApplicable,

        updatedDate: new Date().toString(),
      };
      await UpdateApi("deductions", data1, data?.id)
        .then((res) => {
          if (res) {
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

  const handleChangeSelect = (id, label, e) => {
    label(e.label);
    id(e.value);
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setWefDate(new Date(data?.wefDate));
      setDeductionName(data?.deductionName);
      setDeductionDisplayName(data?.deductionDisplayName);
      setDayApplicable(data?.dayApplicable);
    }
  }, [data]);

  return (
    <>
      {/* Add Department Modal */}
      <div id="add_deduction" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Deduction</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
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
            <div className="modal-body">
              <form onSubmit={(e) => handleCreateDeduction(e)}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        W.E.F. (Date) <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                        required
                          selected={wefDate}
                          className="form-control floating datetimepicker"
                          type="date"
                          placeholderText="DD-MM-YYYY"
                          dateFormat="dd-MM-yyyy"
                          onChange={handleDateChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Deduction Name <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        required
                        type="text"
                        onChange={(e) => setDeductionName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Display Name of Salary Head{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        type="text"
                        required
                        onChange={(e) =>
                          setDeductionDisplayName(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Working Day Applicable
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={DayApplicable}
                        required
                        placeholder={dayApplicable}
                        styles={customStyles}
                        onChange={(e) =>
                          handleChangeSelect(setDummyId, setDayApplicable, e)
                        }
                      />
                    </div>
                  </div>
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
        id="edit_deduction"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Deduction</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
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
            <div className="modal-body">
              <form onSubmit={(e) => handleUpdateDeduction(e)}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        W.E.F. (Date) <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={wefDate}
                          className="form-control floating datetimepicker"
                          type="date"
                          placeholderText="DD-MM-YYYY"
                          dateFormat="dd-MM-yyyy"
                          onChange={handleDateChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Deduction Name <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setDeductionName(e.target.value)}
                        value={deductionName}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Display Name of Salary Head{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) =>
                          setDeductionDisplayName(e.target.value)
                        }
                        value={deductionDisplayName}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Working Day Applicable
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={DayApplicable}
                        placeholder={dayApplicable}
                        styles={customStyles}
                        onChange={(e) =>
                          handleChangeSelect(setDummyId, setDayApplicable, e)
                        }
                      />
                    </div>
                  </div>
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

export default DeductionModal;
