import React, { useEffect, useState } from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";

import ErrorAlerts from "../Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../Ui_Interface/Components/SuccessAlert";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { UpdateApi } from "../../../utils/UpdateApi";
import { GetApi } from "../../../utils/GetApi";
import { CreateApi } from "../../../utils/PostApi";

const ArrearParameters = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [showApiSuccessAlert, setShowApiSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const [arrearCalculation, setArrearCaculation] = useState("");

  const [compliancesOverTime, setCompliancesOverTime] = useState("");

  const [arrearApplicabl, setArrearApplicabl] = useState("");

  const [wefDate, setWefDate] = useState("");

  const handleDateChange = (date) => {
    setWefDate(date);
  };

  const compliances = [
    { value: "As Per Regular Structure", label: "As Per Regular Structure" },
    { value: "Only ESI", label: "Only ESI" },
  ];

  const arrearApplicable = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const arrearCalculationList = [
    { value: "Salary Headwise", label: "Salary Headwise" },
    { value: "Combined", label: "Combined" },
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
      "arrearparameters",
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
          if (newData[0]?.wefDate !== "") {
            setWefDate(new Date(newData[0]?.wefDate));
          }
          setArrearApplicabl(newData[0]?.arrearApplicabl);
          setArrearCaculation(newData[0]?.arrearCalculation);
          setCompliancesOverTime(newData[0]?.compliancesOverTime);
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
        arrearApplicabl: arrearApplicabl,
        arrearCalculation: arrearCalculation,
        compliancesOverTime: compliancesOverTime,
        updatedDate: new Date().toString(),
      };
      await UpdateApi("arrearparameters", data, id)
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
        arrearApplicabl: arrearApplicabl,
        arrearCalculation: arrearCalculation,
        compliancesOverTime: compliancesOverTime,
        companyId: localStorage.getItem("userId"),
        createdDate: new Date().toString(),
      };
      await CreateApi("arrearparameters", data1)
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
            maintitle="Arrear Parameters"
            title="Dashboard"
            subtitle="Arrear Parameters"
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
                                  Arrear Applicable
                                  <span className="text-danger">*</span>
                                </label>

                                <Select
                                  options={arrearApplicable}
                                  required
                                  placeholder={arrearApplicabl}
                                  styles={customStyles}
                                  onChange={(e) =>
                                    handleChange(setArrearApplicabl, e.label)
                                  }
                                />
                              </div>
                            </div>
                            {arrearApplicabl === "Yes" ? (
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

                                <div className="col-md-3">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Arrear Calculation
                                      <span className="text-danger">*</span>
                                    </label>
                                    {/* <input
                                      className="form-control"
                                      type="text"
                                      required
                                      value={arrearCalculation}
                                      onChange={(e) =>
                                        setArrearCaculation(e.target.value)
                                      }
                                    /> */}
                                    <Select
                                      options={arrearCalculationList}
                                      required
                                      placeholder={arrearCalculation}
                                      styles={customStyles}
                                      onChange={(e) =>
                                        handleChange(
                                          setArrearCaculation,
                                          e.label
                                        )
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
                                      options={compliances}
                                      required
                                      placeholder={compliancesOverTime}
                                      styles={customStyles}
                                      onChange={(e) =>
                                        handleChange(
                                          setCompliancesOverTime,
                                          e.label
                                        )
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
                                  <SuccessAlerts text="Updated succssefully" />
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

export default ArrearParameters;
