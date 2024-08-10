import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ErrorAlerts from "../Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../Ui_Interface/Components/SuccessAlert";
import DatePicker from "react-datepicker";
import { UpdateApi } from "../../../utils/UpdateApi";
import { GetApi } from "../../../utils/GetApi";
import { CreateApi } from "../../../utils/PostApi";

const ESICParameters = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [showApiSuccessAlert, setShowApiSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeContributionRate, setEmployeeContributionRate] = useState("");
  const [esicCeilingWages, setEsicCeilingWages] = useState("");
  const [employerContributionRate, setEmployerContributionRate] = useState("");
  const [id, setId] = useState("");

  const [wefDate, setWefDate] = useState("");

  const handleDateChange = (date) => {
    setWefDate(date);
  };

  useEffect(() => {
    getEpfParameters();
  }, []);

  const getEpfParameters = async () => {
    setLoading(true);
    await GetApi("esicparameters", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (newData.length > 0) {
          setId(newData[0]?.id);
          setEmployeeContributionRate(newData[0]?.employeeContributionRate);
          setEsicCeilingWages(newData[0]?.esicCeilingWages);
          setEmployerContributionRate(newData[0]?.employerContributionRate);
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
    if(id !== ""){
      const data = {
        employeeContributionRate: employeeContributionRate,
        esicCeilingWages: esicCeilingWages,
        employerContributionRate: employerContributionRate,
        wefDate: wefDate.toString(),
        updatedDate: new Date().toString(),
      };
      await UpdateApi("esicparameters", data, id)
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
    }else{
      const data1 = {
        employeeContributionRate: employeeContributionRate,
        esicCeilingWages: esicCeilingWages,
        employerContributionRate: employerContributionRate,
        wefDate: wefDate.toString(),
        companyId: localStorage.getItem("userId"),
        createdDate: new Date().toString(),
      };
      await CreateApi("esicparameters", data1)
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
            maintitle="ESIC Parameters"
            title="Dashboard"
            subtitle="ESIC Parameters"
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
                                required
                                  className="form-control"
                                  type="text"
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
                                  ESIC Celing Wages
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Wages Amount"
                                  value={esicCeilingWages}
                                  onChange={(e) =>
                                    setEsicCeilingWages(e.target.value)
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
                                  <SuccessAlerts text="ESIC created succssefully" />
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

export default ESICParameters;
