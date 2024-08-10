import React, { useEffect, useState } from "react";
import { CreateApi, CreateDepartments } from "../../utils/PostApi";
import ErrorAlerts from "../../views/pages/Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../../views/pages/Ui_Interface/Components/SuccessAlert";
import { UpdateApi, UpdateDepartment } from "../../utils/UpdateApi";
import Select from "react-select";
import { GetApi } from "../../utils/GetApi";
import DatePicker from "react-datepicker";

const LeaveModal = ({ data }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [showApiSuccessAlert, setShowApiSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [dayMothYearDate, setDayMonthYearDate] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveEligblity, setLeaveEligblity] = useState("");
  const [leaveAllotment, setLeaveAllotment] = useState("");
  const [leaveCarryForward, setLeaveCarryForward] = useState("");
  const [leaveEncasment, setLeaveEncasment] = useState("");
  const [leaveEncashmentSalary, setLeaveEncashmentSalary] = useState("");
  const [leaveEncashmentSchedule, setLeaveEncashmentSchedule] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [leaveShortName, setLeaveShortName] = useState("");
  const [maxCarryForward, setMaxCarryForward] = useState("");

  const [wefDate, setWefDate] = useState("");

  const handleDateChange = (date) => {
    setWefDate(date);
  };
  const leaveCarryForwardd = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const leaveEligblityy = [
    { value: "Day", label: "Day" },
    { value: "Month", label: "Month" },
    { value: "Year", label: "Year" },
  ];
  const leaveAllotmentt = [
    { value: "Nex month", label: "Nex month" },
    { value: "When Earned", label: "When Earned" },
  ];
  const leaveEncashmentSalaryy = [
    { value: "NA", label: "NA" },
    { value: "Basic", label: "Basic" },
    { value: "Net", label: "Net" },
    { value: "Gross", label: "Gross" },
  ];

  const leaveEncashmentSchedulee = [
    { value: "Yearly", label: "Yearly" },
    { value: "At Full and Final", label: "At Full and Final" },
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
    if (Object.keys(data).length > 0) {
      console.log({ data });
      setId(data?.id);
      setWefDate(new Date(data?.wefDate));
      setLeaveType(data?.leaveType);
      setLeaveShortName(data?.leaveShortName);
      setLeaveEligblity(data?.leaveEligblity);
      setDayMonthYearDate(data?.dayMothYearDate);
      setLeaveDate(data?.leaveDate);
      setLeaveAllotment(data?.leaveAllotment);
      setLeaveCarryForward(data?.leaveCarryForward);
      setMaxCarryForward(data?.maxCarryForward);
      setLeaveEncasment(data?.leaveEncasment);
      setLeaveEncashmentSalary(data?.leaveEncashmentSalary);
      setLeaveEncashmentSchedule(data?.leaveEncashmentSchedule);
    }
  }, [data]);

  const handleUpdateParameters = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (id !== "") {
      const data = {
        wefDate: wefDate.toString(),
        leaveType: leaveType,
        leaveShortName: leaveShortName,
        leaveEligblity: leaveEligblity,
        dayMothYearDate: dayMothYearDate.toString(),
        leaveDate: leaveDate.toString(),
        leaveAllotment: leaveAllotment,
        leaveCarryForward: leaveCarryForward,
        maxCarryForward: maxCarryForward,
        leaveEncasment: leaveEncasment,
        leaveEncashmentSalary: leaveEncashmentSalary,
        leaveEncashmentSchedule: leaveEncashmentSchedule,
        updatedDate: new Date().toString(),
      };
      await UpdateApi("leaveparameters", data, id)
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
    }
  };

  const handleCreateLeave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data1 = {
      wefDate: wefDate.toString(),
      leaveType: leaveType,
      leaveShortName: leaveShortName,
      leaveEligblity: leaveEligblity,
      dayMothYearDate: dayMothYearDate.toString(),
      leaveDate: leaveDate.toString(),
      leaveAllotment: leaveAllotment,
      leaveCarryForward: leaveCarryForward,
      maxCarryForward: maxCarryForward,
      leaveEncasment: leaveEncasment,
      leaveEncashmentSalary: leaveEncashmentSalary,
      leaveEncashmentSchedule: leaveEncashmentSchedule,
      companyId: localStorage.getItem("userId"),
      createdDate: new Date().toString(),
    };
    await CreateApi("leaveparameters", data1)
      .then((res) => {
        if (res) {
          setLoading(false);
          window.location.reload();
        }
      })
      .catch((err) => {
        setLoading(false);
        setShowApiAlert(true);
      });
  };

  const handleChange = (e) => {
    setLeaveEligblity(e.label);
  };
  const handleChange1 = (e) => {
    setLeaveAllotment(e.label);
  };
  const handleChange2 = (e) => {
    setLeaveCarryForward(e.label);
  };
  const handleChange3 = (e) => {
    setLeaveEncasment(e.label);
  };
  const handleChange4 = (e) => {
    setLeaveEncashmentSalary(e.label);
  };
  const handleChange5 = (e) => {
    setLeaveEncashmentSchedule(e.label);
  };

  console.log({leaveEligblity})
  return (
    <>
      {/* Add Department Modal */}
      <div id="add_leave" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Leave</h5>
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
              <form onSubmit={(e) => handleCreateLeave(e)}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        W.E.F. (Date) <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={wefDate}
                          required
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
                        Leave Type
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Full name"
                        onChange={(e) => setLeaveType(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Display Name of Leave
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Sort name"
                        onChange={(e) => setLeaveShortName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Leave Eligblity On Behalf
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={leaveEligblityy}
                        placeholder="Day / Month / Year"
                        styles={customStyles}
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        {leaveEligblity}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Days"
                        onChange={(e) => setDayMonthYearDate(e.target.value)}
                      />
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Leave"
                        onChange={(e) => setLeaveDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Leave Allotment after
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={leaveAllotmentt}
                        required
                        placeholder="Select (Next Month / After Days"
                        styles={customStyles}
                        onChange={handleChange1}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Leave Carry Forward
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={leaveCarryForwardd}
                        placeholder="Select"
                        required
                        styles={customStyles}
                        onChange={handleChange2}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
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
                        onChange={(e) => setMaxCarryForward(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Leave Encashment Applicable
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={leaveCarryForwardd}
                        placeholder="Select"
                        required
                        styles={customStyles}
                        onChange={handleChange3}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Leave Encashment (Salary Eligblity)
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={leaveEncashmentSalaryy}
                        placeholder="Select (NA / Basic /Net /Gross"
                        styles={customStyles}
                        required
                        onChange={handleChange4}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Leave Encashment Schedule
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={leaveEncashmentSchedulee}
                        placeholder="Yearly / At Full and Final"
                        styles={customStyles}
                        required
                        onChange={handleChange5}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
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
                        <SuccessAlerts text="L created succssefully" />
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
                        <div className="spinner-border m-0" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Department Modal */}
      <div id="edit_leave" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Leave</h5>
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
              <form onSubmit={(e) => handleUpdateParameters(e)}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        W.E.F. (Date) <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={wefDate}
                          required
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
                        Leave Type
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Full name"
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Display Name of Leave
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Sort name"
                        value={leaveShortName}
                        onChange={(e) => setLeaveShortName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Leave Eligblity On Behalf
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={leaveEligblityy}
                        placeholder={
                          leaveEligblity !== ""
                            ? leaveEligblity
                            : "Day / Month / Year"
                        }
                        styles={customStyles}
                        required
                        onChange={handleChange}
                        // defaultValue={{
                        //   label: leaveEligblity,
                        //   value: leaveEligblity,
                        // }}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        {leaveEligblity}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Days"
                        value={dayMothYearDate}
                        onChange={(e) => setDayMonthYearDate(e.target.value)}
                      />
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Leave"
                        value={leaveDate}
                        onChange={(e) => setLeaveDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Leave Allotment after
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={leaveAllotmentt}
                        required
                        placeholder={leaveAllotment !=="" ? leaveAllotment:"Select (Next Month / After Days"}
                        styles={customStyles}
                        onChange={handleChange1}
                        
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Leave Carry Forward
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={leaveCarryForwardd}
                        placeholder={leaveCarryForward !=="" ? leaveCarryForward : "Select"}
                        required
                        styles={customStyles}
                        onChange={handleChange2}
                       
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
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
                        onChange={(e) => setMaxCarryForward(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Leave Encashment Applicable
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={leaveCarryForwardd}
                        placeholder={leaveCarryForward !== "" ? leaveCarryForward : "Select"}
                        required
                        styles={customStyles}
                        onChange={handleChange3}
                        
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Leave Encashment (Salary Eligblity)
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={leaveEncashmentSalaryy}
                        placeholder={leaveEncashmentSalary !== "" ? leaveEncashmentSalary : "Select (NA / Basic /Net /Gross"}
                        styles={customStyles}
                        required
                        onChange={handleChange4}
                        
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Leave Encashment Schedule
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={leaveEncashmentSchedulee}
                        placeholder={leaveEncashmentSchedule !=="" ? leaveEncashmentSchedule : "Yearly / At Full and Final"}
                        styles={customStyles}
                        required
                        onChange={handleChange5}
                        
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
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
                        <SuccessAlerts text="L created succssefully" />
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
                        <div className="spinner-border m-0" role="status">
                          <span className="visually-hidden">Loading...</span>
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
      </div>
      {/* /Edit Department Modal */}
    </>
  );
};

export default LeaveModal;
