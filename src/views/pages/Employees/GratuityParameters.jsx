import React, { useEffect, useState } from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";

import ErrorAlerts from "../Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../Ui_Interface/Components/SuccessAlert";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { UpdateApi } from "../../../utils/UpdateApi";
import { GetApi } from "../../../utils/GetApi";
import { CreateApi } from "../../../utils/PostApi";

const GratuityParameters = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [showApiSuccessAlert, setShowApiSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gratuityEligibilty, setGratuityEligibilty] = useState("Yes");
  const [gratuityService, setGratuityService] = useState("");
  const [monthlyRate, setMonthlyRate] = useState("");
  const [id, setId] = useState("");

  const [wefDate, setWefDate] = useState("");

  const handleDateChange = (date) => {
    setWefDate(date);
  };

  const gratuityEligible = [
    { value: 1, label: "Yes" },
    { value: 2, label: "No" },
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
      "gatuityparameters",
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
          if (newData[0]?.wefDate !== "") {
            setWefDate(new Date(newData[0]?.wefDate));
          }

          setGratuityEligibilty(newData[0]?.gratuityEligibilty);
          setGratuityService(newData[0]?.gratuityService);
          setMonthlyRate(newData[0]?.monthlyRate);
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
        gratuityEligibilty: gratuityEligibilty,
        gratuityService: gratuityService,
        monthlyRate: monthlyRate,
        wefDate: wefDate.toString(),
        updatedDate: new Date().toString(),
      };
      await UpdateApi("gatuityparameters", data, id)
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
        gratuityEligibilty: gratuityEligibilty,
        gratuityService: gratuityService,
        monthlyRate: monthlyRate,
        wefDate: wefDate.toString(),
        companyId: localStorage.getItem("userId"),
        createdDate: new Date().toString(),
      };
      await CreateApi("gatuityparameters", data1)
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

  const handleChangeGratuityEligible = (e) => {
    setGratuityEligibilty(e.label);
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Gratuity Parameters"
            title="Dashboard"
            subtitle="Gratuity Parameters"
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
                                  Gratuity Eligiblity form 1st Day
                                  <span className="text-danger">*</span>
                                </label>
                                <Select
                                  options={gratuityEligible}
                                  placeholder={gratuityEligibilty !=="" ? gratuityEligibilty : "Select"}
                                  required
                                  styles={customStyles}
                                  onChange={handleChangeGratuityEligible}
                                />
                              </div>
                            </div>
                            {gratuityEligibilty === "Yes" ? (
                              <>
                                <div className="col-md-4">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      W.E.F. (Date){" "}
                                      <span className="text-danger">*</span>
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
                                      Gratuity Eligiblity Service (Month)
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      required
                                      placeholder="Service in month"
                                      value={gratuityService}
                                      onChange={(e) =>
                                        setGratuityService(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="input-block mb-3">
                                    <label className="col-form-label">
                                      Monthly Rate Devide by days
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      required
                                      placeholder="26 or 30"
                                      value={monthlyRate}
                                      onChange={(e) =>
                                        setMonthlyRate(e.target.value)
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
                                  <SuccessAlerts text="Gratuity created succssefully" />
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

export default GratuityParameters;
