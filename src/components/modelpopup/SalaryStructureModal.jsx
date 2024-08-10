import React, { useEffect, useState } from "react";
import { CreateApi, CreateDepartments } from "../../utils/PostApi";
import ErrorAlerts from "../../views/pages/Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../../views/pages/Ui_Interface/Components/SuccessAlert";
import { UpdateApi, UpdateDepartment } from "../../utils/UpdateApi";
import Select from "react-select";
import { GetApi } from "../../utils/GetApi";
import DatePicker from "react-datepicker";

const SalaryStructureModal = ({ data }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [structureName, setStructureName] = useState("");
  const [structureDisplayName, setStructureDisplayName] = useState("");

  const [allowancesList, setAllowancesList] = useState([]);
  const [deductionList, setDeductionList] = useState([]);
  const [salarytimePeriod, setSalaryTimePeriod] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [daSalary, setDaSalary] = useState("");

  const [salaryDataAllowance, setSalaryDataAllowance] = useState([
    {
      allowance: "",
      allowanceId: "",
      amount: "",
    },
  ]);
  const [salaryDataDeduction, setSalaryDataDeduction] = useState([
    {
      deduction: "",
      deductionID: "",
      amount: "",
    },
  ]);

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

  const handleCreateSalaryStructure = async (e) => {
    e.preventDefault();
    if (
      structureName !== "" &&
      structureDisplayName !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== ""
    ) {
      setLoading(true);
      const data1 = {
        structureName: structureName,
        structureDisplayName: structureDisplayName,
        salaryDataAllowance: salaryDataAllowance,
        salaryDataDeduction: salaryDataDeduction,
        salarytimePeriod: salarytimePeriod,
        basicSalary: basicSalary,
        daSalary: daSalary,
        companyId: localStorage.getItem("userId"),
        createdDate: new Date().toString(),
      };
      await CreateApi("salarystructures", data1)
        .then((res) => {
          if (res) {
            setLoading(false);
            window.location.reload();
          }
        })
        .catch((err) => {
          setShowApiAlert(true);
          setLoading(false);
        });
    } else {
      setShowAlert(true);
    }
  };

  const handleUpdateStructure = async (e) => {
    e.preventDefault();
    if (
      structureName !== "" &&
      structureDisplayName !== "" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== ""
    ) {
      setLoading(true);
      const data1 = {
        structureName: structureName,
        structureDisplayName: structureDisplayName,
        salaryDataAllowance: salaryDataAllowance,
        salaryDataDeduction: salaryDataDeduction,
        salarytimePeriod: salarytimePeriod,
        basicSalary: basicSalary,
        daSalary: daSalary,
        updatedDate: new Date().toString(),
      };
      await UpdateApi("salarystructures", data1, data?.id)
        .then((res) => {
          if (res) {
            setLoading(false);
            window.location.reload();
          }
        })
        .catch((err) => {
          setShowApiAlert(true);
          setLoading(false);
        });
    } else {
      setShowAlert(true);
    }
  };

  const handleChangeSelect = (i, name, value, e) => {
    let list = [...salaryDataAllowance];
    list[i][name] = e.label;
    list[i][value] = e.value;
    setSalaryDataAllowance(list);

    let filteredList = allowancesList?.filter((item)=> item?.label !== e.label)
    setAllowancesList(filteredList)
  };

  const handleChangeSelect1 = (i, name, e) => {
    let list = [...salaryDataAllowance];
    list[i][name] = e;
    setSalaryDataAllowance(list);
    let filteredList = allowancesList?.filter((item)=> item?.label !== e.label)
    setAllowancesList(filteredList)
  };

  const handleChangeSelectDeduction = (i, name, value, e) => {
    let list = [...salaryDataDeduction];
    list[i][name] = e.label;
    list[i][value] = e.value;
    setSalaryDataDeduction(list);
    let filteredList = deductionList?.filter((item)=> item?.label !== e.label)
    setDeductionList(filteredList)
  };

  const handleChangeSelectDeduction1 = (i, name, e) => {
    let list = [...salaryDataDeduction];
    list[i][name] = e;
    setSalaryDataDeduction(list);
    let filteredList = deductionList?.filter((item)=> item?.label !== e.label)
    setDeductionList(filteredList)
  };

 

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setStructureName(data?.structureName);
      setStructureDisplayName(data?.structureDisplayName);
      setSalaryDataAllowance(data?.salaryDataAllowance);
      setSalaryDataDeduction(data?.salaryDataDeduction);
      setBasicSalary(data?.basicSalary);
      setDaSalary(data?.daSalary);
      setSalaryTimePeriod(data?.salarytimePeriod);
    }
  }, [data]);

  useEffect(() => {
    getAllowances();
    getDeductions();
  }, []);

  const getAllowances = async () => {
    setLoading(true);
    await GetApi("allowances", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        var result = newData.map(function (el) {
          var o = Object.assign({}, el);
          o.label = el.allowanceName;
          o.value = el.id;
          return o;
        });
        setAllowancesList(result);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const getDeductions = async () => {
    setLoading(true);
    await GetApi("deductions", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        var result = newData.map(function (el) {
          var o = Object.assign({}, el);
          o.label = el.deductionName;
          o.value = el.id;
          return o;
        });
        setDeductionList(result);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleAddSalaryData = (e) => {
    e.preventDefault();
    setSalaryDataAllowance([
      ...salaryDataAllowance,
      {
        allowance: "",
        allowanceId: "",
      },
    ]);
  };

  const handleAddSalaryDataDeduction = (e) => {
    e.preventDefault();
    setSalaryDataDeduction([
      ...salaryDataDeduction,
      {
        deduction: "",
        deductionID: "",
      },
    ]);
  };

  const handleDeleteSalaryData = (e, i) => {
    e.preventDefault();
    let list = salaryDataAllowance.filter(
      (item) => item !== salaryDataAllowance[i]
    );
    
    setSalaryDataAllowance(list);
    allowancesList?.push({label: salaryDataAllowance[i]?.allowance, value: salaryDataAllowance[i]?.allowanceId})
  };

  const handleDeleteSalaryDataDeduction = (e, i) => {
    e.preventDefault();
    let list = salaryDataDeduction.filter(
      (item) => item !== salaryDataDeduction[i]
    );

    setSalaryDataDeduction(list);
    deductionList?.push({label: salaryDataDeduction[i]?.allowance, value: salaryDataDeduction[i]?.allowanceId})
  };

  const salaryTimePeriod = [
    {
      label: "26",
      value: "26",
    },
    {
      label: "27",
      value: "27",
    },
    {
      label: "30",
      value: "30",
    },
    {
      label: "31",
      value: "31",
    },
    {
      label: "Monthly",
      value: "Monthly",
    },
    {
      label: "Per day",
      value: "Per day",
    },
  ];

  

  return (
    <>
      {/* Add Department Modal */}
      <div
        id="add_salarystructure"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Salary Structure</h5>
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
              <form onSubmit={(e) => handleCreateSalaryStructure(e)}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Salary Structure Name{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        required
                        className="form-control"
                        type="text"
                        onChange={(e) => setStructureName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Display Name of Structure Structure{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        required
                        className="form-control"
                        type="text"
                        onChange={(e) =>
                          setStructureDisplayName(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Basic <span className="text-danger">*</span>
                      </label>

                      <input
                        required
                        className="form-control"
                        type="text"
                        onChange={(e) => setBasicSalary(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        DA <span className="text-danger">*</span>
                      </label>

                      <input
                        required
                        className="form-control"
                        type="text"
                        onChange={(e) => setDaSalary(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Salary structure time period
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        required
                        options={salaryTimePeriod}
                        placeholder={
                          salarytimePeriod !== "" ? salarytimePeriod : "Select"
                        }
                        
                        styles={customStyles}
                        // value={salarytimePeriod}
                        onChange={(e) => setSalaryTimePeriod(e.label)}
                      />
                    </div>
                  </div>

                  {salaryDataAllowance?.map((item, i) => (
                    <>
                      <div key={i} className="row col-md-6">
                        <div className="col-md-8">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              {i + 1}. Choose Allowance
                            </label>

                            <Select
                              
                              options={allowancesList}
                              placeholder={item?.allowance}
                              styles={customStyles}
                              value={item?.allowance}
                              onChange={(e) =>
                                handleChangeSelect(
                                  i,
                                  "allowance",
                                  "allowanceId",
                                  e
                                )
                              }
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="input-block mb-3">
                              <label className="col-form-label">Amount</label>

                              <input
                                
                                className="form-control"
                                type="text"
                                onChange={(e) =>
                                  handleChangeSelect1(
                                    i,
                                    "amount",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>

                        {salaryDataAllowance?.length > 1 ? (
                          <div
                            className="col-md-1"
                            style={{ marginTop: "2.5vw" }}
                          >
                            <button
                              className="btn btn-primary"
                              // data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={(e) => handleDeleteSalaryData(e, i)}
                            >
                              -
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </>
                  ))}
                  <div style={{ marginBottom: "1.5vw" }}>
                    <button
                      className="btn btn-primary"
                      // data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={(e) => handleAddSalaryData(e)}
                    >
                      + Add
                    </button>
                  </div>
                  {salaryDataDeduction?.map((item, i) => (
                    <>
                      <div key={i} className="row col-md-6">
                        <div className="col-md-8">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              {i + 1}. Choose Deduction
                            </label>

                            <Select
                              
                              options={deductionList}
                              placeholder={item?.deduction}
                              value={item?.deduction}
                              styles={customStyles}
                              onChange={(e) =>
                                handleChangeSelectDeduction(
                                  i,
                                  "deduction",
                                  "deductionID",
                                  e
                                )
                              }
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="input-block mb-3">
                              <label className="col-form-label">Amount</label>

                              <input
                                
                                className="form-control"
                                type="text"
                                onChange={(e) =>
                                  handleChangeSelectDeduction1(
                                    i,
                                    "amount",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {salaryDataDeduction?.length > 1 ? (
                          <div
                            className="col-md-1"
                            style={{ marginTop: "2.5vw" }}
                          >
                            <button
                              className="btn btn-primary"
                              // data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={(e) =>
                                handleDeleteSalaryDataDeduction(e, i)
                              }
                            >
                              -
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </>
                  ))}
                  <div style={{ marginBottom: "1.5vw" }}>
                    <button
                      className="btn btn-primary"
                      // data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={(e) => handleAddSalaryDataDeduction(e)}
                    >
                      + Add
                    </button>
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
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Department Modal */}
      {/* Edit Department Modal */}
      <div
        id="edit_salarystructure"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Salary Structure</h5>
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
              <form onSubmit={(e) => handleUpdateStructure(e)}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Salary Structure Name{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setStructureName(e.target.value)}
                        value={structureName}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Display Name of Structure Structure{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) =>
                          setStructureDisplayName(e.target.value)
                        }
                        value={structureDisplayName}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Basic <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setBasicSalary(e.target.value)}
                        value={basicSalary}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        DA <span className="text-danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setDaSalary(e.target.value)}
                        value={daSalary}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Salary structure time period
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={salaryTimePeriod}
                        placeholder={
                          salarytimePeriod !== "" ? salarytimePeriod : "Select"
                        }
                        styles={customStyles}
                        value={salarytimePeriod}
                        onChange={(e) => setSalaryTimePeriod(e.value)}
                      />
                    </div>
                  </div>

                  {salaryDataAllowance?.map((item, i) => (
                    <>
                      <div key={i} className="row col-md-6">
                        <div className="col-md-8">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              {i + 1}. Choose Allowance
                            </label>

                            <Select
                              options={allowancesList}
                              placeholder={item?.allowance}
                              styles={customStyles}
                              value={item?.allowance}
                              onChange={(e) =>
                                handleChangeSelect(
                                  i,
                                  "allowance",
                                  "allowanceId",
                                  e
                                )
                              }
                            />
                          </div>
                        </div>

                        {salaryDataAllowance?.length > 1 ? (
                          <div
                            className="col-md-1"
                            style={{ marginTop: "2.5vw" }}
                          >
                            <button
                              className="btn btn-primary"
                              // data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={(e) => handleDeleteSalaryData(e, i)}
                            >
                              -
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </>
                  ))}
                  <div style={{ marginBottom: "1.5vw" }}>
                    <button
                      className="btn btn-primary"
                      // data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={(e) => handleAddSalaryData(e)}
                    >
                      + Add
                    </button>
                  </div>
                  {salaryDataDeduction?.map((item, i) => (
                    <>
                      <div key={i} className="row col-md-6">
                        <div className="col-md-8">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              {i + 1}. Choose Deduction
                            </label>

                            <Select
                              options={deductionList}
                              placeholder={item?.deduction}
                              value={item?.deduction}
                              styles={customStyles}
                              onChange={(e) =>
                                handleChangeSelectDeduction(
                                  i,
                                  "deduction",
                                  "deductionID",
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                        {salaryDataDeduction?.length > 1 ? (
                          <div
                            className="col-md-1"
                            style={{ marginTop: "2.5vw" }}
                          >
                            <button
                              className="btn btn-primary"
                              // data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={(e) =>
                                handleDeleteSalaryDataDeduction(e, i)
                              }
                            >
                              -
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </>
                  ))}
                  <div style={{ marginBottom: "1.5vw" }}>
                    <button
                      className="btn btn-primary"
                      // data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={(e) => handleAddSalaryDataDeduction(e)}
                    >
                      + Add
                    </button>
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
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Department Modal */}
    </>
  );
};

export default SalaryStructureModal;
