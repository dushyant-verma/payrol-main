import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { TimePicker } from "antd";
import Select from "react-select";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { GetApi } from "../../utils/GetApi";
import { UpdateApi } from "../../utils/UpdateApi";

dayjs.extend(customParseFormat);

const ScheduleModelPopup = () => {
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

  const [selectedDate1, setSelectedDate1] = useState(null);
  const [shiftsData, setShiftsData] = useState([]);
  const [employeelist, setEmployeeList] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [shiftName, setShiftName] = useState("");
  const [shiftId, setShiftId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDateChange1 = (date) => {
    console.log({ date });
    setSelectedDate1(date);
  };

  useEffect(() => {
    getShiftList();
    getEmployeeList();
  }, []);

  const getShiftList = async () => {
    await GetApi("shifts", "companyId", localStorage.getItem("userId")).then(
      (res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // console.log({ newData });
        newData.forEach((object) => {
          object.label = object.shiftName;
        });
        setShiftsData(newData);
      }
    );
  };

  const getEmployeeList = async () => {
    await GetApi(
      "employee",
      "empCompanyId",
      localStorage.getItem("userId")
    ).then((res) => {
      const newData = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // console.log({ newData });
      newData.forEach((object) => {
        object.label = object.name;
      });
      setEmployeeList(newData);
    });
  };

  const handleSelectShift = (e) => {
    // console.log({ e });
    setShiftId(e?.id);
    setShiftName(e?.shiftName);
  };

  const handleSelectShift1 = (e) => {
    // console.log({ e: e?.id });
    setEmployeeId(e?.id);
  };

  const handleUpdateEmployeeShift = async () => {
    if (shiftId !== "" && employeeId !== "" && selectedDate1 !== null) {
      setLoading(true);
      let data = {
        shiftId: shiftId,
        shiftName: shiftName,
        effectiveDate: selectedDate1?.toString()?.slice(0, 16),
      };
      await UpdateApi("employee", data, employeeId)
        .then((res) => setLoading(false))
        .catch((err) => setLoading(false));
    }
  };

  return (
    <>
      <div id="add_schedule" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Assign Shift</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <form onSubmit={handleUpdateEmployeeShift}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Employee Name <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={employeelist}
                        placeholder="Select"
                        styles={customStyles}
                        required
                        onChange={(e) => handleSelectShift1(e)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Effective From Date
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          required
                          selected={selectedDate1}
                          onChange={handleDateChange1}
                          className="form-control floating datetimepicker"
                          type="date"
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Shifts <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={shiftsData}
                        placeholder="Select"
                        styles={customStyles}
                        required
                        onChange={(e) => handleSelectShift(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    onClick={handleUpdateEmployeeShift}
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
    </>
  );
};

export default ScheduleModelPopup;
