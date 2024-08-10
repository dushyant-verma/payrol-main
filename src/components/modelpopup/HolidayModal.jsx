import React, { useEffect, useState } from "react";
import { CreateApi, CreateDepartments } from "../../utils/PostApi";
import ErrorAlerts from "../../views/pages/Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../../views/pages/Ui_Interface/Components/SuccessAlert";
import { UpdateApi, UpdateDepartment } from "../../utils/UpdateApi";
import Select from "react-select";
import { GetApi } from "../../utils/GetApi";
import DatePicker from "react-datepicker";

const HolidayModal = ({ data }) => {
  const [deductionName, setDeductionName] = useState("");
  const [deductionDisplayName, setDeductionDisplayName] = useState("");
  const [wefDate, setWefDate] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dummyId, setDummyId] = useState(0);
  const [dayApplicable, setDayApplicable] = useState("");
  const [year, setYear] = useState("");

  const [holidays, setHolidays] = useState([
    {
      holidayName: "",
      from: "",
      to: "",
    },
  ]);

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

  const handleCreateHoliday = async (e) => {
    e.preventDefault();
    if (
      year !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== ""
    ) {
      setLoading(true);
      const data1 = {
        year: year,
        holidays: holidays,
        companyId: localStorage.getItem("userId"),
        createdDate: new Date().toString(),
      };
      await CreateApi("holidays", data1)
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

  const handleUpdateHoliday = async (e) => {
    e.preventDefault();
    if (
      year !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== ""
    ) {
      setLoading(true);
      const data1 = {
        year: year,
        holidays: holidays,

        updatedDate: new Date().toString(),
      };
      await UpdateApi("holidays", data1, data?.id)
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

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setYear(data?.year);
      setHolidays(data?.holidays);
    }
  }, [data]);

  const handleAddHoliday = (e) => {
    e.preventDefault();

    setHolidays([...holidays, { holidayname: "", from: "", to: "" }]);
  };

  const handleChangeHoliday = (i, name, e) => {
    let list = [...holidays];
    list[i][name] = e;
    setHolidays(list);
  };

  return (
    <>
      {/* Add Department Modal */}
      <div id="add_holiday" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Holiday</h5>
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
              <form onSubmit={(e) => handleCreateHoliday(e)}>
                <div className="row">
                  <div className="col-md-10">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Year <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        required
                        type="text"
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </div>
                  </div>

                  {holidays.map((item, i) => (
                    <>
                      <div className="col-md-4">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Holiday Name <span className="text-danger">*</span>
                          </label>

                          <input
                            className="form-control"
                            required
                            type="text"
                            onChange={(e) =>
                              handleChangeHoliday(
                                i,
                                "holidayName",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            From <span className="text-danger">*</span>
                          </label>
                          <div className="cal-icon">
                            <DatePicker
                              
                              className="form-control floating datetimepicker"
                              type="date"
                              placeholderText={holidays[i].from?.slice(4, 16)}
                              dateFormat="dd-MM-yyyy"
                              onChange={(date) =>
                                handleChangeHoliday(i, "from", date.toString())
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            To <span className="text-danger">*</span>
                          </label>
                          <div className="cal-icon">
                            <DatePicker
                              
                              className="form-control floating datetimepicker"
                              type="date"
                              placeholderText={holidays[i].to?.slice(4, 16)}
                              dateFormat="dd-MM-yyyy"
                              onChange={(date) =>
                                handleChangeHoliday(i, "to", date.toString())
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                  <div>
                    {" "}
                    <button
                      className="btn btn-primary"
                      onClick={(e) => handleAddHoliday(e)}
                    >
                      + Add
                    </button>
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
      <div id="edit_holiday" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Holiday</h5>
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
              <form onSubmit={(e) => handleUpdateHoliday(e)}>
                <div className="row">
                  <div className="col-md-10">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Year <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setYear(e.target.value)}
                        value={year}
                      />
                    </div>
                  </div>

                  {holidays.map((item, i) => (
                    <>
                      <div className="col-md-4">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Holiday Name <span className="text-danger">*</span>
                          </label>

                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) =>
                              handleChangeHoliday(
                                i,
                                "holidayName",
                                e.target.value
                              )
                            }
                            value={holidays[i]?.holidayName}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            From <span className="text-danger">*</span>
                          </label>
                          <div className="cal-icon">
                            <DatePicker
                              className="form-control floating datetimepicker"
                              type="date"
                              // selected={
                              //   holidays[i].from !== undefined ||
                              //   holidays[i].from !== "" || holidays[i].from !== null
                              //     ? new Date(holidays[i].from?.toString())
                              //     : new Date()
                              // }
                              placeholderText={holidays[i].from?.slice(4, 16)}
                              dateFormat="dd-MM-yyyy"
                              onChange={(date) =>
                                handleChangeHoliday(i, "from", date.toString())
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            To <span className="text-danger">*</span>
                          </label>
                          <div className="cal-icon">
                            
                            <DatePicker
                              className="form-control floating datetimepicker"
                              type="date"
                              // selected={
                              //   holidays[i].to !== undefined ||
                              //   holidays[i].to !== "" || holidays[i].to !== null
                              //     ? new Date(holidays[i].to?.toString())
                              //     : new Date()
                              // }
                              placeholderText={holidays[i].to?.slice(4, 16)}
                              dateFormat="dd-MM-yyyy"
                              onChange={(date) =>
                                handleChangeHoliday(i, "to", date.toString())
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                  <div>
                    {" "}
                    <button
                      className="btn btn-primary"
                      onClick={(e) => handleAddHoliday(e)}
                    >
                      + Add
                    </button>
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

export default HolidayModal;
