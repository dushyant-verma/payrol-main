import React, { useEffect, useState } from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";

import ErrorAlerts from "../Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../Ui_Interface/Components/SuccessAlert";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { UpdateApi } from "../../../utils/UpdateApi";
import { GetApi } from "../../../utils/GetApi";
import { CreateApi } from "../../../utils/PostApi";

const BonusParameters = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showApiAlert, setShowApiAlert] = useState(false);
  const [showApiSuccessAlert, setShowApiSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [bonusRate, setBonusRate] = useState("");
  const [maxBonusWages, setMaxBonusWages] = useState("");
  const [minBonusWages, setMinBonusWages] = useState("");
  const [maxBonusAmnt, setMaxBonusAmnt] = useState("");
  const [minBonusAmnt, setMinBonusAmnt] = useState("");
  const [minDays, setMinDays] = useState("");

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
    await GetApi("bonusparameters", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (newData.length > 0) {
          setId(newData[0]?.id);
          setBonusRate(newData[0]?.bonusRate);
          setMaxBonusWages(newData[0]?.maxBonusWages);
          setMinBonusWages(newData[0]?.minBonusWages);
          setMaxBonusAmnt(newData[0]?.maxBonusAmnt);
          setMinBonusAmnt(newData[0]?.minBonusAmnt);
          setMinDays(newData[0]?.minDays);
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
        bonusRate: bonusRate,
        maxBonusWages: maxBonusWages,
        minBonusWages: minBonusWages,
        maxBonusAmnt: maxBonusAmnt,
        minBonusAmnt: minBonusAmnt,
        minDays: minDays,
        wefDate: wefDate.toString(),
        updatedDate: new Date().toString(),
      };
      await UpdateApi("bonusparameters", data, id)
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
        bonusRate: bonusRate,
        maxBonusWages: maxBonusWages,
        minBonusWages: minBonusWages,
        maxBonusAmnt: maxBonusAmnt,
        minBonusAmnt: minBonusAmnt,
        minDays: minDays,
        wefDate: wefDate.toString(),
        companyId: localStorage.getItem("userId"),
        createdDate: new Date().toString(),
      };
      await CreateApi("bonusparameters", data1)
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
            maintitle="Bonus Parameters"
            title="Dashboard"
            subtitle="Bonus Parameters"
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
                                  Bonus Rate
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Rate in %"
                                  value={bonusRate}
                                  onChange={(e) => setBonusRate(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Maximum Bonus Wages Limit
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Wages Amt"
                                  value={maxBonusWages}
                                  onChange={(e) =>
                                    setMaxBonusWages(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Minimum Bonus Wages Limit
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Wages Amt"
                                  value={minBonusWages}
                                  onChange={(e) =>
                                    setMinBonusWages(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Maximum Bonus Amount
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Max Amount"
                                  value={maxBonusAmnt}
                                  onChange={(e) =>
                                    setMaxBonusAmnt(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Minimum Bonus Amount
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Max Amount"
                                  value={minBonusAmnt}
                                  onChange={(e) =>
                                    setMinBonusAmnt(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Minimum Days For Bonus App.
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Days"
                                  value={minDays}
                                  onChange={(e) => setMinDays(e.target.value)}
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
                                  <SuccessAlerts text="Bonus created succssefully" />
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

export default BonusParameters;
