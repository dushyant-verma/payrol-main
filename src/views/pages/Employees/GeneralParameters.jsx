import React, { useEffect, useState } from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";
import Select from "react-select";

import ErrorAlerts from "../Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../Ui_Interface/Components/SuccessAlert";

import { UpdateApi } from "../../../utils/UpdateApi";
import { GetApi } from "../../../utils/GetApi";
import { CreateApi } from "../../../utils/PostApi";

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

const GeneralParameters = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [showApiSuccessAlert, setShowApiSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [arrear, setArrer] = useState("Yes");

  const [employeeContributionRate, setEmployeeContributionRate] = useState("");
  const [pfCeilingWages, setPfCeilingWages] = useState("");
  const [employerContributionRate, setEmployerContributionRate] = useState("");
  const [pensionContributionRate, setPensionContributionRate] = useState("");
  const [maxPensionCont, setMaxPensionCont] = useState("");
  const [maxWagesCont, setMaxWagesCont] = useState("");
  const [maxWagesEdli, setMaxWagesEdli] = useState("");
  const [adminChargesRate, setAdminChargesRate] = useState("");
  const [edliContRate, setEdliContRate] = useState("");
  const [edliContRate1, setEdliContRate1] = useState("");
  const [edliContRateDigit1, setEdliContRateDigit1] = useState("");

  const [inspectionChargeRate, setInspectionChargeRate] = useState("");
  const [inspectionChargeRate1, setInspectionChargeRate1] = useState("");
  const [inspectionChargeRateDigit1, setInspectionChargeRateDigit1] =
    useState("");

  const [id, setId] = useState("");

  const [wefDate, setWefDate] = useState("");

  const weekOffDayList = [
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thusday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
    { value: 7, label: "Sunday" },
  ];

  useEffect(() => {
    getEpfParameters();
  }, []);

  const getEpfParameters = async () => {
    setLoading(true);
    await GetApi(
      "generalparameters",
      "companyId",
      localStorage.getItem("userId")
    )
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (newData.length > 0) {
          setId(newData[0]?.id);
          setEmployeeContributionRate(newData[0]?.empRetirementAgeInPf);
          setPfCeilingWages(newData[0]?.empRetirementAgeInEps);
          setEmployerContributionRate(newData[0]?.empRetirementAgeFromJob);
          setPensionContributionRate(newData[0]?.minNoticePeriodForFtc);
          setMaxPensionCont(newData[0]?.minNoticePeriodForPermanent);
          setMaxWagesCont(newData[0]?.defaultDeutyHrs);
          setMaxWagesEdli(newData[0]?.grasePreiodDuety);
          setAdminChargesRate(newData[0]?.defaulWeeklyOff);
          setEdliContRate(newData[0]?.employeeIdSeriolStartFrom);
          setEdliContRate1(newData[0]?.employeeIdSeriolStartFrom1);

          setInspectionChargeRate(newData[0]?.referenceNumberSeriolStartFrom);
          setInspectionChargeRate1(newData[0]?.referenceNumberSeriolStartFrom1);
          setInspectionChargeRateDigit1(
            newData[0]?.referenceNumberSeriolStartFromDigit
          );
          setEdliContRateDigit1(newData[0]?.employeeIdSeriolStartFromDigit);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleUpdateEpfParameters = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (id !== "") {
      const data = {
        empRetirementAgeInPf: employeeContributionRate,
        empRetirementAgeInEps: pfCeilingWages,
        empRetirementAgeFromJob: employerContributionRate,
        minNoticePeriodForFtc: pensionContributionRate,
        minNoticePeriodForPermanent: maxPensionCont,
        defaultDeutyHrs: maxWagesCont,
        grasePreiodDuety: maxWagesEdli,
        defaulWeeklyOff: adminChargesRate,
        employeeIdSeriolStartFrom: edliContRate,
        referenceNumberSeriolStartFrom: inspectionChargeRate,
        employeeIdSeriolStartFromDigit: edliContRateDigit1,
        referenceNumberSeriolStartFromDigit: inspectionChargeRateDigit1,
        updatedDate: new Date().toString(),
      };
      await UpdateApi("generalparameters", data, id)
        .then((res) => {
          if (res) {
            setLoading(false);
            setShowApiSuccessAlert(true);
          }
        })
        .catch(async (err) => {
          setLoading(false);
          setShowApiAlert(true);
        });
    } else {
      const data1 = {
        empRetirementAgeInPf: employeeContributionRate,
        empRetirementAgeInEps: pfCeilingWages,
        empRetirementAgeFromJob: employerContributionRate,
        minNoticePeriodForFtc: pensionContributionRate,
        minNoticePeriodForPermanent: maxPensionCont,
        defaultDeutyHrs: maxWagesCont,
        grasePreiodDuety: maxWagesEdli,
        defaulWeeklyOff: adminChargesRate,
        employeeIdSeriolStartFrom: edliContRate,
        employeeIdSeriolStartFromDigit: edliContRateDigit1,
        referenceNumberSeriolStartFrom: inspectionChargeRate,
        referenceNumberSeriolStartFromDigit: inspectionChargeRateDigit1,

        companyId: localStorage.getItem("userId"),
        createdDate: new Date().toString(),
      };
      await CreateApi("generalparameters", data1)
        .then((res) => {
          console.log({ res });
          window.location.reload();
        })
        .catch((err) => {});
    }
  };

  const handleChangeBranch = (e) => {
    setAdminChargesRate(e.label);
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="General Parameters"
            title="Dashboard"
            subtitle="General Parameters"
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
                        <form onSubmit={(e) => handleUpdateEpfParameters(e)}>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Emp Retirement Age In EPF
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Age in Year"
                                  value={employeeContributionRate}
                                  onChange={(e) =>
                                    setEmployeeContributionRate(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Emp Retirement Age In EPS
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Age in Year"
                                  value={pfCeilingWages}
                                  onChange={(e) =>
                                    setPfCeilingWages(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Emp Retirement Age from Job
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Age in Year"
                                  value={employerContributionRate}
                                  onChange={(e) =>
                                    setEmployerContributionRate(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Minimum Notice Period for FTC (In Month)
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  value={pensionContributionRate}
                                  onChange={(e) =>
                                    setPensionContributionRate(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Min. Notice Period for Permanent (In Month)
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  value={maxPensionCont}
                                  onChange={(e) =>
                                    setMaxPensionCont(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Default Duety Hours With Lunch
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  value={maxWagesCont}
                                  onChange={(e) =>
                                    setMaxWagesCont(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Grase Preiod in Duety (Minute)
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  value={maxWagesEdli}
                                  onChange={(e) =>
                                    setMaxWagesEdli(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Default Weekly Off
                                  <span className="text-danger">*</span>
                                </label>
                                {/* <input
                                  className="form-control"
                                  type="text"
                                  required
                                  value={adminChargesRate}
                                  onChange={(e) =>
                                    setAdminChargesRate(e.target.value)
                                  }
                                /> */}
                                <Select
                                  options={weekOffDayList}
                                  placeholder={adminChargesRate !=="" ? adminChargesRate : "Select"}
                                  styles={customStyles}
                                  required
                               
                                  onChange={handleChangeBranch}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Employee ID Seriol Prefix
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  value={edliContRate}
                                  onChange={(e) =>
                                    setEdliContRate(e.target.value)
                                  }
                                />
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Employee ID Seriol Digit
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  value={edliContRateDigit1}
                                  onChange={(e) =>
                                    setEdliContRateDigit1(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Reference Number Seriol Prefix
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  value={inspectionChargeRate}
                                  onChange={(e) =>
                                    setInspectionChargeRate(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Reference Number Seriol Digit
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  value={inspectionChargeRateDigit1}
                                  onChange={(e) =>
                                    setInspectionChargeRateDigit1(
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="input-block mb-3">
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

export default GeneralParameters;
