import React, { useEffect, useState } from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";

import ErrorAlerts from "../Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../Ui_Interface/Components/SuccessAlert";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { UpdateApi } from "../../../utils/UpdateApi";
import { GetApi } from "../../../utils/GetApi";
import { CreateApi } from "../../../utils/PostApi";

const OverParameters = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [showApiSuccessAlert, setShowApiSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const [leaveCarryForward, setLeaveCarryForward] = useState("");
  const [leaveEncasment, setLeaveEncasment] = useState("");
  const [leaveEncashmentSalary, setLeaveEncashmentSalary] = useState("");
  const [leaveEncashmentSchedule, setLeaveEncashmentSchedule] = useState("");
  const [festivalHoliday, setFestivalHoliday] = useState("");
  const [overTimeHrs, setOverTimeHrs] = useState("");
  const [comboOffApplicabl, setComboOffApplicable] = useState("");
  const [comboOffAllotment, setOffAllotment] = useState("");

  const [maxOtAllowed, setMaxOtAllowed] = useState("");
  const [festivalComboOff, setFestivalComboOff] = useState("");
  const [overTimeComboOff, setOverTimeComboOff] = useState("");
  const [salaryForOt, setSalaryForOt] = useState("");
  const [payHour, setPayHour] = useState("");
  const [overTimeWorkHour, setOverTimeWorkHour] = useState("");
  const [wefDate, setWefDate] = useState("");
  const [complianceOverTime, setComplianceOverTime] = useState("");

  const handleDateChange = (date) => {
    setWefDate(date);
  };

  const comboOffApplicable = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const compliance = [
    { value: "PF", label: "PF" },
    { value: "ESIC", label: "ESIC" },
    { value: "Both", label: "Both" },
  ];
  const leaveEncashmentSalaryy = [
    { value: "NA", label: "NA" },
    { value: "Basic", label: "Basic" },
    { value: "Net", label: "Net" },
    { value: "Gross", label: "Gross" },
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

  useEffect(() => {
    getParameters();
  }, []);

  const getParameters = async () => {
    setLoading(true);
    await GetApi(
      "overtimeparameters",
      "companyId",
      localStorage.getItem("userId")
    )
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log({ id: newData });
        if (newData.length > 0) {
          setId(newData[0]?.id);
          setWefDate(new Date(newData[0]?.wefDate));
          setPayHour(newData[0]?.payHour);
          setComboOffApplicable(newData[0]?.comboOffApplicabl);
          setMaxOtAllowed(newData[0]?.maxOtAllowed);
          setOverTimeWorkHour(newData[0]?.overTimeWorkHour);
          setComplianceOverTime(newData[0]?.complianceOverTime);
          setSalaryForOt(newData[0]?.salaryForOt);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleUpdateParameters = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (id !== "") {
      const data = {
        wefDate: wefDate.toString(),
        comboOffApplicabl: comboOffApplicabl,
        maxOtAllowed: maxOtAllowed,
        payHour: payHour,
        overTimeWorkHour: overTimeWorkHour,
        complianceOverTime: complianceOverTime,
        salaryForOt: salaryForOt,
        updatedDate: new Date().toString(),
      };
      await UpdateApi("overtimeparameters", data, id)
        .then((res) => {
          if (res) {
            setLoading(false);
            setShowApiSuccessAlert(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          setShowApiAlert(true);
        });
    } else {
      const data1 = {
        wefDate: wefDate.toString(),
        comboOffApplicabl: comboOffApplicabl,
        maxOtAllowed: maxOtAllowed,
        overTimeHrs: overTimeHrs,
        complianceOverTime: complianceOverTime,
        salaryForOt: salaryForOt,
        payHour: payHour,
        companyId: localStorage.getItem("userId"),
        createdDate: new Date().toString(),
      };
      await CreateApi("overtimeparameters", data1)
        .then((res) => {
          if (res) {
            setLoading(false);
            setShowApiSuccessAlert(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          setShowApiAlert(true);
        });
    }
  };

  const handleChange = (state, label) => {
    state(label);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Over Time Parameters"
            title="Dashboard"
            subtitle="Over Time Parameters"
          />
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                {/* <SearchBox /> */}
                {loading === true ? (
                  <div className="spinner-border m-0" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-body">
                        <form onSubmit={(e) => handleUpdateParameters(e)}>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Over Time Applicable
                                  <span className="text-danger">*</span>
                                </label>

                                <Select
                                  options={comboOffApplicable}
                                  placeholder={comboOffApplicabl}
                                  styles={customStyles}
                                  required
                                  onChange={(e) =>
                                    handleChange(setComboOffApplicable, e.label)
                                  }
                                />
                              </div>
                            </div>
                            {comboOffApplicabl === "Yes" ? (
                              <>
                                <div className="col-md-4">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      W.E.F. (Date){" "}
                                      <span className="text-danger">*</span>
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
                                      Maximum OT Hours Allowed
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={maxOtAllowed}
                                      required
                                      onChange={(e) =>
                                        setMaxOtAllowed(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Over Time Work Hours
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      required
                                      value={overTimeWorkHour}
                                      onChange={(e) =>
                                        setOverTimeWorkHour(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Pay Hours
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      required
                                      value={payHour}
                                      onChange={(e) =>
                                        setPayHour(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="col-md-4">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Compliences On Over Time
                                      <span className="text-danger">*</span>
                                    </label>

                                    <Select
                                      options={compliance}
                                      placeholder={complianceOverTime}
                                      styles={customStyles}
                                      required
                                      onChange={(e) =>
                                        handleChange(
                                          setComplianceOverTime,
                                          e.label
                                        )
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="col-md-4">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Salary for OT Calculation
                                      <span className="text-danger">*</span>
                                    </label>

                                    <Select
                                      options={leaveEncashmentSalaryy}
                                      required
                                      placeholder={salaryForOt}
                                      styles={customStyles}
                                      onChange={(e) =>
                                        handleChange(setSalaryForOt, e.label)
                                      }
                                    />
                                  </div>
                                </div>
                              </>
                            ) : null}

                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                {showAlert && (
                                  <ErrorAlerts
                                    text="All required field mandatory"
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
                                  <SuccessAlerts text="Updated created succssefully" />
                                )}
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
                                  <div
                                    className="spinner-border m-0"
                                    role="status"
                                  >
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </div>
                                ) : (
                                  "Save"
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverParameters;
