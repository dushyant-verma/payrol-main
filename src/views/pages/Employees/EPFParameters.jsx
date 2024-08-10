import React, { useEffect, useState } from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";

import ErrorAlerts from "../Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../Ui_Interface/Components/SuccessAlert";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { UpdateApi } from "../../../utils/UpdateApi";
import { GetApi } from "../../../utils/GetApi";
import { CreateApi } from "../../../utils/PostApi";

const EPFParameters = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [showApiSuccessAlert, setShowApiSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [arrear, setArrer] = useState("Yes");
  const arrearr = [
    { value: 1, label: "Yes" },
    { value: 2, label: "No" },
  ];

  const [employeeContributionRate, setEmployeeContributionRate] = useState("");
  const [pfCeilingWages, setPfCeilingWages] = useState("");
  const [employerContributionRate, setEmployerContributionRate] = useState("");
  const [pensionContributionRate, setPensionContributionRate] = useState("");
  const [maxPensionCont, setMaxPensionCont] = useState("");
  const [maxWagesCont, setMaxWagesCont] = useState("");
  const [maxWagesEdli, setMaxWagesEdli] = useState("");
  const [adminChargesRate, setAdminChargesRate] = useState("");
  const [adminCharge, setAdminCharges] = useState("");

  const [edliContRate, setEdliContRate] = useState("");
  const [inspectionChargeRate, setInspectionChargeRate] = useState("");
  const [id, setId] = useState("");
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

  const [wefDate, setWefDate] = useState("");

  const handleDateChange = (date) => {
    setWefDate(date);
  };

  const handleChangeArrear = (e) => {
    setArrer(e.label);
  };

  useEffect(() => {
    getEpfParameters();
  }, []);

  const getEpfParameters = async () => {
    setLoading(true);
    await GetApi("epfparameters", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (newData.length > 0) {
          setId(newData[0]?.id);
          setEmployeeContributionRate(newData[0]?.employeeContributionRate);
          setPfCeilingWages(newData[0]?.pfCeilingWages);
          setEmployerContributionRate(newData[0]?.employerContributionRate);
          setPensionContributionRate(newData[0]?.pensionContributionRate);
          setMaxPensionCont(newData[0]?.maxPensionCont);
          setMaxWagesCont(newData[0]?.maxWagesCont);
          setMaxWagesEdli(newData[0]?.maxWagesEdli);
          setAdminChargesRate(newData[0]?.adminChargesRate);
          setEdliContRate(newData[0]?.edliContRate);
          setInspectionChargeRate(newData[0]?.inspectionChargeRate);
          setArrer(newData[0]?.arrear);
          setWefDate(new Date(newData[0]?.wefDate));
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
        employeeContributionRate: employeeContributionRate,
        pfCeilingWages: pfCeilingWages,
        employerContributionRate: employerContributionRate,
        pensionContributionRate: pensionContributionRate,
        maxPensionCont: maxPensionCont,
        maxWagesCont: maxWagesCont,
        maxWagesEdli: maxWagesEdli,
        adminChargesRate: adminChargesRate,
        edliContRate: edliContRate,
        inspectionChargeRate: inspectionChargeRate,
        arrear: arrear,
        adminCharge: adminCharge,
        wefDate: wefDate.toString(),
        updatedDate: new Date().toString(),
      };
      await UpdateApi("epfparameters", data, id)
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
        employeeContributionRate: employeeContributionRate,
        pfCeilingWages: pfCeilingWages,
        employerContributionRate: employerContributionRate,
        pensionContributionRate: pensionContributionRate,
        maxPensionCont: maxPensionCont,
        maxWagesCont: maxWagesCont,
        maxWagesEdli: maxWagesEdli,
        adminChargesRate: adminChargesRate,
        edliContRate: edliContRate,
        inspectionChargeRate: inspectionChargeRate,
        arrear: arrear,
        adminCharge: adminCharge,
        wefDate: wefDate.toString(),
        companyId: localStorage.getItem("userId"),
        createdDate: new Date().toString(),
      };
      await CreateApi("epfparameters", data1)
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
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="EPF Parameters"
            title="Dashboard"
            subtitle="EPF Parameters"
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
                                  Employee Contribution Rate
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Rate in %"
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
                                  PF Celing Wages
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Wages Amount"
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
                                  Employer Contribution Rate
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Rate in %"
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
                                  Pension Contribution Rate
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Rate in %"
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
                                  Maximum Pension Cont.
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Max Con. Amount"
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
                                  Maximum Wages for Pension
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Max Wages for cont."
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
                                  Maximum Wages for EDLI
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Max Wages for cont."
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
                                  Admin Charges Rate A/C 02
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Rate in %"
                                  value={adminChargesRate}
                                  onChange={(e) =>
                                    setAdminChargesRate(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Min Admin Charges
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Admin charge"
                                  value={adminCharge}
                                  onChange={(e) =>
                                    setAdminCharges(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  EDLI Cont. Rate A/C 21
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Rate in %"
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
                                  Inspection Charges Rate A/C 22
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Rate in %"
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
                                  Pension Cont. App. on Arrear
                                  <span className="text-danger">*</span>
                                </label>
                                <Select
                                  required
                                  options={arrearr}
                                  placeholder="Select"
                                  styles={customStyles}
                                  onChange={handleChangeArrear}
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
                                  <SuccessAlerts text="EPF created succssefully" />
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

export default EPFParameters;
