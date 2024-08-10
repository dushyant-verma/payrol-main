import React, { useEffect, useState } from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";

import ErrorAlerts from "../Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../Ui_Interface/Components/SuccessAlert";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { UpdateApi } from "../../../utils/UpdateApi";
import { GetApi } from "../../../utils/GetApi";
import { CreateApi } from "../../../utils/PostApi";

const TdsParameters = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [showApiSuccessAlert, setShowApiSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const [tdsApplicabl, setTdsApplicabl] = useState("");

  const [wefDate, setWefDate] = useState("");

  const [salaryForm, setSalaryForm] = useState([
    {
      salaryFrom: "",
      salaryUpto: "",
      tds: "",
    },
  ]);

  const [tdsForm, setTdsForm] = useState([]);

  const handleDateChange = (date) => {
    setWefDate(date);
  };

  const tdsApplicable = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
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
    await GetApi("tdsparameters", "companyId", localStorage.getItem("userId"))
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
          setTdsApplicabl(newData[0]?.tdsApplicabl);
          setSalaryForm(newData[0]?.tdsForm);
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
        tdsApplicabl: tdsApplicabl,
        tdsForm: tdsForm,
        updatedDate: new Date().toString(),
      };
      await UpdateApi("tdsparameters", data, id)
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
        tdsApplicabl: tdsApplicabl,
        tdsForm: tdsForm,
        companyId: localStorage.getItem("userId"),
        createdDate: new Date().toString(),
      };
      await CreateApi("tdsparameters", data1)
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

  const handleAddSalaryForm = (e) => {
    e.preventDefault();
    setSalaryForm([
      ...salaryForm,
      {
        salaryFrom: "",
        salaryUpto: "",
        tds: "",
      },
    ]);
  };

  const handleChangeSalaryForm = (i, text, e) => {
    let list = [...salaryForm];
    list[i][text] = e;
    setTdsForm(list);
  };

  console.log({ tdsForm });

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="TDS Parameters"
            title="Dashboard"
            subtitle="TDS Parameters"
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
                            <div className="col-md-6">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  TDS Applicable
                                  <span className="text-danger">*</span>
                                </label>

                                <Select
                                  options={tdsApplicable}
                                  required
                                  placeholder={tdsApplicabl}
                                  styles={customStyles}
                                  onChange={(e) =>
                                    handleChange(setTdsApplicabl, e.label)
                                  }
                                />
                              </div>
                            </div>

                            {tdsApplicabl === "Yes" ? (
                              <>
                                <div className="col-md-6">
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

                                {salaryForm.map((item, i) => (
                                  <>
                                    <div className="col-md-4" key={i}>
                                      <div className="input-block mb-3">
                                        <label className="col-form-label">
                                          {i + 1}
                                          {`. `}
                                          Salary Form
                                          <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          value={salaryForm[i].salaryFrom}
                                          required
                                          onChange={(e) =>
                                            handleChangeSalaryForm(
                                              i,
                                              "salaryFrom",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4" key={i + 1}>
                                      <div className="input-block mb-3">
                                        <label className="col-form-label">
                                          Salary Upto
                                          <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          required
                                          value={salaryForm[i].salaryUpto}
                                          onChange={(e) =>
                                            handleChangeSalaryForm(
                                              i,
                                              "salaryUpto",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4" key={i + 2}>
                                      <div className="input-block mb-3">
                                        <label className="col-form-label">
                                          TDS %
                                          <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          required
                                          value={salaryForm[i].tds}
                                          onChange={(e) =>
                                            handleChangeSalaryForm(
                                              i,
                                              "tds",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </>
                                ))}

                                <div className="col-md-4">
                                  <div className="input-block mb-3">
                                    <button
                                      className="btn btn-primary submit-btn"
                                      aria-label="Close"
                                      onClick={(e) => handleAddSalaryForm(e)}
                                    >
                                      + Add More
                                    </button>
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

export default TdsParameters;
