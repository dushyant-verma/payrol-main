import React, { useEffect, useState } from "react";
import { CreateApi, CreateDepartments } from "../../utils/PostApi";
import ErrorAlerts from "../../views/pages/Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../../views/pages/Ui_Interface/Components/SuccessAlert";
import { UpdateApi, UpdateDepartment } from "../../utils/UpdateApi";
import Select from "react-select";
import { GetApi } from "../../utils/GetApi";
import DatePicker from "react-datepicker";

const AllowancesModal = ({ data }) => {
  console.log({ data });
  const [allowanceName, setAllowanceName] = useState("");
  const [allowanceDisplayName, setAllowanceDisplayName] = useState("");
  const [wefDate, setWefDate] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dummyId, setDummyId] = useState(0);
  const [dayApplicable, setDayApplicable] = useState("");
  const [pfApplicable, setPfApplicable] = useState("");
  const [esicApplicable, setEsicApplicable] = useState("");

  const applicable = [
    { value: 1, label: "Yes" },
    { value: 2, label: "No" },
  ];

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

  const handleCreateAllowance = async (e) => {
    e.preventDefault();
    if (
      allowanceName !== "" &&
      allowanceDisplayName !== "" &&
      wefDate !== "" &&
      dayApplicable !== "" &&
      pfApplicable !== "" &&
      esicApplicable !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== ""
    ) {
      setLoading(true);
      const data1 = {
        allowanceName: allowanceName,
        allowanceDisplayName: allowanceDisplayName,
        wefDate: wefDate.toString(),
        dayApplicable: dayApplicable,
        pfApplicable: pfApplicable,
        esicApplicable: esicApplicable,
        companyId: localStorage.getItem("userId"),
        createdDate: new Date().toString(),
      };
      await CreateApi("allowances", data1)
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

  const handleUpdateAllowance = async (e) => {
    e.preventDefault();
    if (
      allowanceName !== "" &&
      allowanceDisplayName !== "" &&
      wefDate !== "" &&
      dayApplicable !== "" &&
      pfApplicable !== "" &&
      esicApplicable !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== ""
    ) {
      setLoading(true);
      const data1 = {
        allowanceName: allowanceName,
        allowanceDisplayName: allowanceDisplayName,
        wefDate: wefDate.toString(),
        dayApplicable: dayApplicable,
        pfApplicable: pfApplicable,
        esicApplicable: esicApplicable,
        updatedDate: new Date().toString(),
      };
      await UpdateApi("allowances", data1, data?.id)
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
      setAllowanceName(data?.allowanceName);
      setAllowanceDisplayName(data?.allowanceDisplayName);
      setDayApplicable(data?.dayApplicable);
      setPfApplicable(data?.pfApplicable);
      setEsicApplicable(data?.esicApplicable);
    }
  }, [data]);

  return (
    <>
      {/* Add Department Modal */}
      <div
        id="add_allowances"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Allowances</h5>
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
              <form onSubmit={(e) => handleCreateAllowance(e)}>
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
                        Allowance Name <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        required
                        type="text"
                        onChange={(e) => setAllowanceName(e.target.value)}
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
                          setAllowanceDisplayName(e.target.value)
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

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        PF Applicable
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={applicable}
                        required
                        placeholder={pfApplicable}
                        styles={customStyles}
                        onChange={(e) =>
                          handleChangeSelect(setDummyId, setPfApplicable, e)
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        ESIC Applicable
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={applicable}
                        required
                        placeholder={esicApplicable}
                        styles={customStyles}
                        onChange={(e) =>
                          handleChangeSelect(setDummyId, setEsicApplicable, e)
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
        id="edit_allowances"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Allowances</h5>
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
              <form onSubmit={(e) => handleUpdateAllowance(e)}>
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
                        Allowance Name <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setAllowanceName(e.target.value)}
                        value={allowanceName}
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
                          setAllowanceDisplayName(e.target.value)
                        }
                        value={allowanceDisplayName}
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

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        PF Applicable
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={applicable}
                        placeholder={pfApplicable}
                        styles={customStyles}
                        onChange={(e) =>
                          handleChangeSelect(setDummyId, setPfApplicable, e)
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        ESIC Applicable
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={applicable}
                        placeholder={esicApplicable}
                        styles={customStyles}
                        onChange={(e) =>
                          handleChangeSelect(setDummyId, setEsicApplicable, e)
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

export default AllowancesModal;
