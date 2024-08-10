import React, { useEffect, useState } from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";

import ErrorAlerts from "../Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../Ui_Interface/Components/SuccessAlert";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { UpdateApi } from "../../../utils/UpdateApi";
import { GetApi } from "../../../utils/GetApi";
import { CreateApi } from "../../../utils/PostApi";

const ComboOffParameters = () => {
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

  const [leaveShortName, setLeaveShortName] = useState("");
  const [festivalComboOff, setFestivalComboOff] = useState("");
  const [overTimeComboOff, setOverTimeComboOff] = useState("");

  const [maxCarryForward, setMaxCarryForward] = useState("");

  const [wefDate, setWefDate] = useState("");

  const handleDateChange = (date) => {
    setWefDate(date);
  };

  const comboOffApplicable = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const offAllotmentt = [
    { value: "Nex month", label: "Nex month" },
    { value: "When Earned", label: "When Earned" },
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
      "combooffparameters",
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
          if(newData[0]?.wefDate !==""){
            setWefDate(new Date(newData[0]?.wefDate));
          }
          
          setComboOffApplicable(newData[0]?.comboOffApplicabl);
          setOffAllotment(newData[0]?.offAllotmentt);
          setFestivalHoliday(newData[0]?.festivalHoliday);
          setFestivalComboOff(newData[0]?.festivalComboOff);
          setOverTimeHrs(newData[0]?.overTimeHrs);
          setOverTimeComboOff(newData[0]?.overTimeComboOff);
          setLeaveCarryForward(newData[0]?.leaveCarryForward);
          setMaxCarryForward(newData[0]?.maxCarryForward);
          setLeaveEncasment(newData[0]?.leaveEncasment);
          setLeaveEncashmentSalary(newData[0]?.leaveEncashmentSalary);
          setLeaveEncashmentSchedule(newData[0]?.leaveEncashmentSchedule);
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
        offAllotmentt: comboOffAllotment,
        festivalHoliday: festivalHoliday,
        festivalComboOff: festivalComboOff,
        overTimeHrs: overTimeHrs,
        overTimeComboOff: overTimeComboOff,
        offCarryForward: leaveCarryForward,
        maxCarryForward: maxCarryForward,
        leaveEncasment: leaveEncasment,
        leaveEncashmentSalary: leaveEncashmentSalary,
        leaveEncashmentSchedule: leaveEncashmentSchedule,
        updatedDate: new Date().toString(),
      };
      await UpdateApi("combooffparameters", data, id)
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
        offAllotmentt: comboOffAllotment,
        festivalHoliday: festivalHoliday,
        festivalComboOff: festivalComboOff,
        overTimeHrs: overTimeHrs,
        overTimeComboOff: overTimeComboOff,
        offCarryForward: leaveCarryForward,
        maxCarryForward: maxCarryForward,
        leaveEncasment: leaveEncasment,
        leaveEncashmentSalary: leaveEncashmentSalary,
        leaveEncashmentSchedule: leaveEncashmentSchedule,
        companyId: localStorage.getItem("userId"),
        createdDate: new Date().toString(),
      };
      await CreateApi("combooffparameters", data1)
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
            maintitle="Combo Off Parameters"
            title="Dashboard"
            subtitle="Combo Off Parameters"
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
                                  Combo Off Applicable
                                  <span className="text-danger">*</span>
                                </label>

                                <Select
                                  options={comboOffApplicable}
                                  required
                                  placeholder={comboOffApplicabl}
                                  styles={customStyles}
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
                                      Off Allotment after
                                      <span className="text-danger">*</span>
                                    </label>

                                    <Select
                                      options={offAllotmentt}
                                      required
                                      placeholder={comboOffAllotment}
                                      styles={customStyles}
                                      onChange={(e) =>
                                        handleChange(setOffAllotment, e.label)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Festival Holiday
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      required
                                      value={festivalHoliday}
                                      onChange={(e) =>
                                        setFestivalHoliday(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Combo Off
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      required
                                      value={festivalComboOff}
                                      onChange={(e) =>
                                        setFestivalComboOff(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Over Time Hrs.
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      required
                                      value={overTimeHrs}
                                      onChange={(e) =>
                                        setOverTimeHrs(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Combo Off
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={overTimeComboOff}
                                      required
                                      onChange={(e) =>
                                        setOverTimeComboOff(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                {/* <div className="col-md-4">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Off Carry Forward
                                      <span className="text-danger">*</span>
                                    </label>

                                    <Select
                                      options={comboOffApplicable}
                                      required
                                      placeholder={leaveCarryForward}
                                      styles={customStyles}
                                      onChange={(e) =>
                                        handleChange(
                                          setLeaveCarryForward,
                                          e.label
                                        )
                                      }
                                    />
                                  </div>
                                </div> */}
                                {/* <div className="col-md-4">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Max Carry Forward
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      required
                                      placeholder="Max Carry Forward"
                                      value={maxCarryForward}
                                      onChange={(e) =>
                                        setMaxCarryForward(e.target.value)
                                      }
                                    />
                                  </div>
                                </div> */}
                                {/* <div className="col-md-4">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Leave Encashment Applicable
                                      <span className="text-danger">*</span>
                                    </label>

                                    <Select
                                      options={comboOffApplicable}
                                      required
                                      placeholder={leaveEncasment}
                                      styles={customStyles}
                                      onChange={(e) =>
                                        handleChange(setLeaveEncasment, e.label)
                                      }
                                    />
                                  </div>
                                </div> */}

                                {/* <div className="col-md-4">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Leave Encashment (Salary Eligblity)
                                      <span className="text-danger">*</span>
                                    </label>

                                    <Select
                                      options={leaveEncashmentSalaryy}
                                      placeholder={leaveEncashmentSalary}
                                      required
                                      styles={customStyles}
                                      onChange={(e) =>
                                        handleChange(
                                          setLeaveEncashmentSalary,
                                          e.label
                                        )
                                      }
                                    />
                                  </div>
                                </div> */}

                                {/* <div className="col-md-4">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Leave Encashment Schedule
                                      <span className="text-danger">*</span>
                                    </label>

                                    <Select
                                      options={leaveEncashmentSalaryy}
                                      placeholder={leaveEncashmentSchedule}
                                      required
                                      styles={customStyles}
                                      onChange={(e) =>
                                        handleChange(
                                          setLeaveEncashmentSchedule,
                                          e.label
                                        )
                                      }
                                    />
                                  </div>
                                </div> */}
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

export default ComboOffParameters;
