import React, { useEffect, useRef, useState } from "react";
import ErrorAlerts from "../../views/pages/Ui_Interface/Components/ErrorAlert";
import { CreateUser } from "../../utils/PostApi";
import SuccessAlerts from "../../views/pages/Ui_Interface/Components/SuccessAlert";
import { UploadFile } from "../../utils/FileUpload";
import { GetCompanyList } from "../../utils/GetApi";
import { UpdateApi, UpdateUser } from "../../utils/UpdateApi";
import DatePicker from "react-datepicker";
import Select from "react-select";

export const ClientModelPopup = ({ data }) => {
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorAlertPassword, setErrorPasswodAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [apiFailAlert, setApiFailAlert] = useState(false);

  const [companySize, setCompanySize] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companyId1, setCompanyId1] = useState("");

  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyUnitOf, setCompanyUnitOf] = useState("");

  const [companyWeb, setCompanyWeb] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyShopAct, setCompanyShopAct] = useState("");
  const [companyLabourAct, setCompanyLabourAct] = useState("");
  const [companyGST, setCompanyGST] = useState("");
  const [building, setBuilding] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");
  const [linNumber, setLinNumber] = useState("");
  const [proprietorNames, setProprietorNames] = useState([
    {
      proprietor: "",
    },
  ]);

  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [companyLat, setCompanyLat] = useState("");
  const [companyLong, setCompanyLong] = useState("");
  const [maxAttendenceDistance, setMaxAttendenceDistance] = useState("");

  const [proprietorName, setProprietorName] = useState("");
  const [ownerShip, setOwnerShip] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [designation, setDesignation] = useState("");
  const [cinNumber, setCinNumber] = useState("");
  const [cinRegDate, setCinRegDate] = useState("");
  const [msmeNumber, setMsmeRegNumber] = useState("");
  const [msmeRegDate, setMsmeRegDate] = useState("");
  const [contractLabourExpiryDate, setContractLabourExpiryDate] = useState("");

  const [tableData1, setTableData1] = useState([
    {
      module: "EPF Applicable",
      yes: false,
      regno: "",
      date: "",
      tax: "",
      attach: "",
    },
    {
      module: "ESIC Applicable",
      yes: false,
      regno: "",
      date: "",
      tax: "",
      attach: "",
    },
    {
      module: "Prof. Tax Applicable",
      yes: false,
      regno: "",
      date: "",
      tax: "",
      attach: "",
    },
    {
      module: "Welfare Fund Applicable",
      yes: false,
      regno: "",
      date: "",
      tax: "",
      attach: "",
    },
    {
      module: "Workman Compansastion",
      yes: false,
      regno: "",
      date: "",
      tax: "",
      attach: "",
    },
  ]);

  const [tableData] = useState([
    {
      module: "EPF Applicable",
      yes: (
        <label className="custom_check">
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(tableData1[0].module, "yes")}
          />

          <span className="checkmark"></span>
        </label>
      ),
      regno: (
        <input
          type="text"
          onChange={(e) =>
            handleChangeApplicableLaw(e.target.value, 0, "regno")
          }
        />
      ),
      date: (
        <input
          type="text"
          placeholder="DD-MM-YYYY"
          onChange={(e) => handleChangeApplicableLaw(e.target.value, 0, "date")}
        />
      ),
      tax: (
        <input
          type="text"
          onChange={(e) => handleChangeApplicableLaw(e.target.value, 0, "tax")}
        />
      ),
      attach: (
        <>
          <input
            type="file"
            onChange={(e) =>
              handleChangeApplicableLaw(e.target.files[0], 0, "attach")
            }
          />
        </>
      ),
    },
    {
      module: "ESIC Applicable",
      yes: (
        <label className="custom_check">
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(tableData1[1].module, "yes")}
          />
          <span className="checkmark"></span>
        </label>
      ),
      regno: (
        <input
          type="text"
          onChange={(e) =>
            handleChangeApplicableLaw(e.target.value, 1, "regno")
          }
        />
      ),
      date: (
        <input
          type="text"
          placeholder="DD-MM-YYYY"
          onChange={(e) => handleChangeApplicableLaw(e.target.value, 1, "date")}
        />
      ),
      tax: (
        <input
          type="text"
          onChange={(e) => handleChangeApplicableLaw(e.target.value, 1, "tax")}
        />
      ),
      attach: (
        <input
          type="file"
          onChange={(e) =>
            handleChangeApplicableLaw(e.target.files[0], 1, "attach")
          }
        />
      ),
    },
    {
      module: "Prof. Tax Applicable",
      yes: (
        <label className="custom_check">
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(tableData1[2].module, "yes")}
          />
          <span className="checkmark"></span>
        </label>
      ),
      regno: (
        <input
          type="text"
          onChange={(e) =>
            handleChangeApplicableLaw(e.target.value, 2, "regno")
          }
        />
      ),
      date: (
        <input
          type="text"
          placeholder="DD-MM-YYYY"
          onChange={(e) => handleChangeApplicableLaw(e.target.value, 2, "date")}
        />
      ),
      tax: (
        <input
          type="text"
          onChange={(e) => handleChangeApplicableLaw(e.target.value, 2, "tax")}
        />
      ),
      attach: (
        <input
          type="file"
          onChange={(e) =>
            handleChangeApplicableLaw(e.target.files[0], 2, "attach")
          }
        />
      ),
    },
    {
      module: "Welfare Fund Applicable",
      yes: (
        <label className="custom_check">
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(tableData1[3].module, "yes")}
          />
          <span className="checkmark"></span>
        </label>
      ),
      regno: (
        <input
          type="text"
          onChange={(e) =>
            handleChangeApplicableLaw(e.target.value, 3, "regno")
          }
        />
      ),
      date: (
        <input
          type="text"
          placeholder="DD-MM-YYYY"
          onChange={(e) => handleChangeApplicableLaw(e.target.value, 3, "date")}
        />
      ),
      tax: (
        <input
          type="text"
          onChange={(e) => handleChangeApplicableLaw(e.target.value, 3, "tax")}
        />
      ),
      attach: (
        <input
          type="file"
          onChange={(e) =>
            handleChangeApplicableLaw(e.target.files[0], 3, "attach")
          }
        />
      ),
    },
    {
      module: "Workman Compansastion",
      yes: (
        <label className="custom_check">
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(tableData1[4].module, "yes")}
          />
          <span className="checkmark"></span>
        </label>
      ),
      regno: (
        <input
          type="text"
          onChange={(e) =>
            handleChangeApplicableLaw(e.target.value, 4, "regno")
          }
        />
      ),
      date: (
        <input
          type="text"
          placeholder="DD-MM-YYYY"
          onChange={(e) => handleChangeApplicableLaw(e.target.value, 4, "date")}
        />
      ),
      tax: (
        <input
          type="text"
          onChange={(e) => handleChangeApplicableLaw(e.target.value, 4, "tax")}
        />
      ),
      attach: (
        <input
          type="file"
          onChange={(e) =>
            handleChangeApplicableLaw(e.target.files[0], 4, "attach")
          }
        />
      ),
    },
  ]);

  const ownerShipData = [
    { value: 1, label: "Proprietorship" },
    { value: 2, label: "Private Limited" },
    { value: 3, label: "Partnership" },
    { value: 4, label: "Limited Liability Partnership (LLP)" },
    { value: 5, label: "Limited" },
    { value: 6, label: "Public" },
    { value: 7, label: "Govt Entity" },
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

  const nameInput = useRef(null);

  const handleUploadFiles = async (e) => {
    if (nameInput.current.value === "") {
      nameInput.current.className += "invalid";
    } else {
      // Submit the form
    }
    e.preventDefault();

    setLoading(true);
    if (tableData1[0].attach !== "") {
      console.log("0");
      await UploadFile(tableData1[0].attach, phone).then((url) => {
        let list = [...tableData1];
        list[0]["attach"] = url;
        setTableData1(list);
      });
    }
    if (tableData1[1].attach !== "") {
      console.log("1");
      await UploadFile(tableData1[1].attach, phone).then((url) => {
        let list = [...tableData1];
        list[1]["attach"] = url;
        setTableData1(list);
      });
    }
    if (tableData1[2].attach !== "") {
      console.log("2");
      await UploadFile(tableData1[2].attach, phone).then((url) => {
        let list = [...tableData1];
        list[2]["attach"] = url;
        setTableData1(list);
      });
    }
    if (tableData1[3].attach !== "") {
      console.log("3");
      await UploadFile(tableData1[3].attach, phone).then((url) => {
        let list = [...tableData1];
        list[3]["attach"] = url;
        setTableData1(list);
      });
    }
    if (tableData1[4].attach !== "") {
      console.log("4");
      await UploadFile(tableData1[4].attach, phone).then((url) => {
        let list = [...tableData1];
        list[4]["attach"] = url;
        setTableData1(list);
      });
    }
    handleCreateCompany(e);
  };

  const handleUploadFiles1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (typeof tableData1[0]?.attach !== "string") {
      console.log("0");
      await UploadFile(tableData1[0].attach, phone).then((url) => {
        let list = [...tableData1];
        list[0]["attach"] = url;
        setTableData1(list);
      });
    }
    if (typeof tableData1[1]?.attach !== "string") {
      console.log("1");
      await UploadFile(tableData1[1].attach, phone).then((url) => {
        let list = [...tableData1];
        list[1]["attach"] = url;
        setTableData1(list);
      });
    }
    if (typeof tableData1[2]?.attach !== "string") {
      console.log("2");
      await UploadFile(tableData1[2].attach, phone).then((url) => {
        let list = [...tableData1];
        list[2]["attach"] = url;
        setTableData1(list);
      });
    }
    if (typeof tableData1[3]?.attach !== "string") {
      console.log("3");
      await UploadFile(tableData1[3].attach, phone).then((url) => {
        let list = [...tableData1];
        list[3]["attach"] = url;
        setTableData1(list);
      });
    }
    if (typeof tableData1[4]?.attach !== "string") {
      console.log("4");
      await UploadFile(tableData1[4].attach, phone).then((url) => {
        let list = [...tableData1];
        list[4]["attach"] = url;
        setTableData1(list);
      });
    }
    handleUpdateCompany(e);
  };

  const handleCreateCompany = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      if (email !== "") {
        setLoading(true);

        await UploadFile(companyLogo, phone)
          .then(async (url) => {
            if (url) {
              const data = {
                companySize: companySize,
                email: email,
                companyId: companyId1,
                phone: phone,
                companyName: companyName,
                companyUnitOf: companyUnitOf,
                building: building,
                line1: line1,
                line2: line2,
                line3: line3,
                state: state,
                district: district,
                zip: zip,
                companyLat: companyLat,
                companyLong: companyLong,
                maxAttendenceDistance: maxAttendenceDistance,
                contractLabourExpiryDate: contractLabourExpiryDate,
                proprietorName: proprietorName,
                ownerShip: ownerShip,
                contactPersonName: contactPersonName,
                designation: designation,
                cinNumber: cinNumber,
                cinRegDate: cinRegDate.toString(),
                linNumber: linNumber,
                msmeNumber: msmeNumber,
                msmeRegDate: msmeRegDate.toString(),
                companyWeb: companyWeb,
                password: password,
                companyLabourAct: companyLabourAct,
                companyShopAct: companyShopAct,
                companyGST: companyGST,
                companyStatutory: tableData1,
                createdDate: new Date().toString(),
                isActive: true,
                proprietorNames: proprietorNames,
                role: "company",
                avatar: url,
              };
              await CreateUser(data)
                .then((res) => {
                  if (res) {
                    setLoading(false);
                    setSuccessAlert(true);
                    window.location.reload();
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  setApiFailAlert(true);
                });
            } else {
              setApiFailAlert(true);
              setLoading(false);
            }
          })
          .catch((error) => {
            setApiFailAlert(true);
            setLoading(false);
          });
      } else {
        setErrorAlert(true);
        setLoading(false);
      }
    } else {
      setErrorPasswodAlert(true);
    }
  };

  const handleChangeApplicableLaw = (e, i, name) => {
    let list = [...tableData1];
    list[i][name] = e;
    setTableData1(list);
  };

  const handleCheckboxChange = (module, column) => {
    const updatedTableData = [...tableData1];

    const row = updatedTableData.find((item) => item.module === module);

    row[column] = !row[column];
    // console.log({ updatedTableData });
    setTableData1(updatedTableData);
  };

  const handleChangeThumnail = async (e) => {
    setCompanyLogo(e.target.files[0]);
  };

  useEffect(() => {
    getCompanyList();
    if (Object.keys(data).length > 0) {
      setCompanyName(data?.companyName);
      setCompanyUnitOf(data?.companyUnitOf);
      setCompanySize(data?.companySize);
      setCompanyWeb(data?.companyWeb);
      setPassword(data?.password);
      setConfirmPassword(data?.password);
      setBuilding(data?.building);
      setLine1(data?.line1);
      setLine2(data?.line2);
      setLine3(data?.line3);
      setState(data?.state);
      setDistrict(data?.district);
      setZip(data?.zip);
      setCompanyLat(data?.companyLat);
      setCompanyLong(data?.companyLong);
      setMaxAttendenceDistance(data?.maxAttendenceDistance);
      setProprietorName(data?.proprietorName);
      setContactPersonName(data?.contactPersonName);
      setDesignation(data?.designation);
      setEmail(data?.email);
      setPhone(data?.phone);
      setCinNumber(data?.cinNumber);
      // setCinRegDate(new Date(data?.cinRegDate));
      setLinNumber(data?.linNumber);
      setCompanyGST(data?.companyGST);
      setMsmeRegNumber(data?.msmeNumber);
      // setMsmeRegDate(new Date(data?.msmeRegDate));
      setCompanyShopAct(data?.companyShopAct);
      setCompanyLabourAct(data?.companyLabourAct);
      setTableData1(data?.companyStatutory);
      // setContractLabourExpiryDate(new Date(data?.contractLabourExpiryDate));
      setCompanyId(data?.companyId);
      setOwnerShip(data?.ownerShip);
      setProprietorNames(data?.proprietorNames);
    }
  }, [data]);

  const getCompanyList = async () => {
    await GetCompanyList().then((res) => {
      const newData = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setCompanyId1(`PAYROL${new Date().getFullYear()}${newData.length + 1}`);
    });
  };

  const handleUpdateCompany = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      if (email !== "") {
        setLoading(true);

        if (typeof companyLogo === "string") {
          const data1 = {
            companySize: companySize,
            email: email,
            companyId: companyId,
            phone: phone,
            companyName: companyName,
            companyUnitOf: companyUnitOf,
            building: building,
            line1: line1,
            line2: line2,
            line3: line3,
            state: state,
            district: district,
            zip: zip,
            companyLong: companyLong,
            companyLat: companyLat,
            maxAttendenceDistance: maxAttendenceDistance,
            contractLabourExpiryDate: contractLabourExpiryDate,
            proprietorName: proprietorName,
            ownerShip: ownerShip,
            contactPersonName: contactPersonName,
            designation: designation,
            cinNumber: cinNumber,
            cinRegDate: cinRegDate.toString(),
            linNumber: linNumber,
            msmeNumber: msmeNumber,
            msmeRegDate: msmeRegDate.toString(),
            companyWeb: companyWeb,
            password: password,
            companyLabourAct: companyLabourAct,
            companyShopAct: companyShopAct,
            companyGST: companyGST,
            companyStatutory: tableData1,
            proprietorNames: proprietorNames !== undefined ? proprietorNames : [],
            updatedDate: new Date().toString(),
          };
          await UpdateApi("users", data1, data.id)
            .then((res) => {
              if (res) {
                setLoading(false);
                setSuccessAlert(true);
                window.location.reload();
              }
            })
            .catch((err) => {
              setLoading(false);
              setApiFailAlert(true);
            });
        } else {
          await UploadFile(companyLogo, phone)
            .then(async (url) => {
              if (url) {
                const data1 = {
                  companySize: companySize,
                  email: email,
                  companyId: companyId,
                  phone: phone,
                  companyName: companyName,
                  companyUnitOf: companyUnitOf,
                  building: building,
                  line1: line1,
                  line2: line2,
                  line3: line3,
                  state: state,
                  district: district,
                  zip: zip,
                  companyLong: companyLong,
                  companyLat: companyLat,
                  maxAttendenceDistance: maxAttendenceDistance,
                  contractLabourExpiryDate: contractLabourExpiryDate,
                  proprietorName: proprietorName,
                  ownerShip: ownerShip,
                  contactPersonName: contactPersonName,
                  designation: designation,
                  cinNumber: cinNumber,
                  cinRegDate: cinRegDate.toString(),
                  linNumber: linNumber,
                  msmeNumber: msmeNumber,
                  msmeRegDate: msmeRegDate.toString(),
                  companyWeb: companyWeb,
                  password: password,
                  companyLabourAct: companyLabourAct,
                  companyShopAct: companyShopAct,
                  companyGST: companyGST,
                  companyStatutory: tableData1,
                  updatedDate: new Date().toString(),
                  proprietorNames: proprietorNames !== undefined ? proprietorNames : [],
                  avatar: url,
                };

                console.log({data1})
                await UpdateApi("users", data1, data.id)
                  .then((res) => {
                    if (res) {
                      setLoading(false);
                      setSuccessAlert(true);
                      window.location.reload();
                    }
                  })
                  .catch((err) => {
                    setLoading(false);
                    setApiFailAlert(true);
                  });
              } else {
                setApiFailAlert(true);
                setLoading(false);
              }
            })
            .catch((error) => {
              setApiFailAlert(true);
              setLoading(false);
            });
        }
      } else {
        setErrorAlert(true);
        setLoading(false);
      }
    } else {
      setErrorPasswodAlert(true);
    }
  };

  const handleDateChange = (date) => {
    setCinRegDate(date);
  };
  const handleDateChange1 = (date) => {
    setMsmeRegDate(date);
  };

  const handleChangeType = (e) => {
    setOwnerShip(e.label);
  };

  const handleAddProprietor = (e) => {
    e.preventDefault();
    let list = {
      proprietor: "",
    };

    setProprietorNames([...proprietorNames, list]);
  };

  const handleChangeProprietorName = (e, i) => {
    let list = [...proprietorNames];
    list[i]["proprietor"] = e.target.value;
    setProprietorNames(list);
  };

  const handleRemoveProprietorName = (i, item) => {
    let list = proprietorNames?.filter(
      (itemm) => itemm?.proprietor !== item?.proprietor
    );

    setProprietorNames(list);
  };

  return (
    <>
      <div id="add_client" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Company</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {errorAlertPassword && (
              <ErrorAlerts
                text="Password not match"
                setShowAlert={setErrorPasswodAlert}
              />
            )}
            {errorAlert && (
              <ErrorAlerts
                text="Mandatory field required"
                setShowAlert={setErrorAlert}
              />
            )}
            {apiFailAlert && (
              <ErrorAlerts
                text="Something went wrong! Please try again later"
                setShowAlert={setApiFailAlert}
              />
            )}
            {successAlert && <SuccessAlerts text="Company added succesfully" />}
            <div className="modal-body">
              <form onSubmit={handleUploadFiles}>
                <div className="row">
                  <h5 className="modal-title-colored">
                    Basic Detail of The Company
                  </h5>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Company Name <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        ref={nameInput}
                        placeholder="Enter company name"
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Unit of</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter unit of"
                        onChange={(e) => setCompanyUnitOf(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Company Size <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        required
                        placeholder="No. of employees"
                        onChange={(e) => setCompanySize(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Company ID <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control floating"
                        type="text"
                        defaultValue={companyId1}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Company Website</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Company website (If available)"
                        onChange={(e) => setCompanyWeb(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Re-enter password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Company logo <span className="text-danger">*</span>
                      </label>
                      <input
                        accept="image/*"
                        type="file"
                        required
                        onChange={(e) => handleChangeThumnail(e)}
                      />
                      {companyLogo !== "" ? (
                        <img
                          alt=""
                          src={URL.createObjectURL(companyLogo)}
                          style={{
                            width: "106px",
                            height: "106px",
                            marginTop: 10,
                          }}
                        />
                      ) : null}
                    </div>
                  </div>

                  <h5 className="modal-title-colored">
                    Address of The Company
                  </h5>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Building No. / Name{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Building No. / Name"
                        onChange={(e) => setBuilding(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Address Line 1 <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Address Line 1"
                        onChange={(e) => setLine1(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Address Line 2</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Address Line 1"
                        onChange={(e) => setLine2(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Address Line 3</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Address Line 1"
                        onChange={(e) => setLine3(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        State <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="State"
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        District <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="District"
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Zip Pin <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Zip Pin"
                        maxLength={6}
                        minLength={6}
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Latitude</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Company Latitude"
                        onChange={(e) => setCompanyLat(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Longitude</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Company Longitude"
                        onChange={(e) => setCompanyLong(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Maximum Distance For Attendence (In meter)
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Maximum Distance For Attendence"
                        onChange={(e) =>
                          setMaxAttendenceDistance(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <h5 className="modal-title-colored">Owner Detail</h5>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Ownership Type<span className="text-danger">*</span>
                      </label>

                      <Select
                        options={ownerShipData}
                        placeholder="Select"
                        styles={customStyles}
                        required
                        onChange={handleChangeType}
                      />
                    </div>
                  </div>
                  {ownerShip === "Proprietorship" || ownerShip === "" ? (
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="col-form-label">
                          Proprietor Name<span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          placeholder="Name"
                          onChange={(e) => setProprietorName(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="col-md-6">
                        {proprietorNames?.map((item, i) => (
                          <div className="col-md-8" key={i}>
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                {ownerShip === "Private Limited" ||
                                ownerShip === "Limited" ||
                                ownerShip === "Public"
                                  ? "Director"
                                  : ownerShip === "Govt Entity"
                                  ? "Chairman"
                                  : "Partner"}

                                <span className="text-danger">*</span>
                              </label>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Name"
                                  onChange={(e) =>
                                    handleChangeProprietorName(e, i)
                                  }
                                  value={item?.proprietor}
                                />
                                <span className="task-action-btn task-btn-right">
                                  <span
                                    className="action-circle large delete-btn"
                                    title="Delete Task"
                                  >
                                    <i
                                      className="material-icons"
                                      onClick={() =>
                                        handleRemoveProprietorName(i, item)
                                      }
                                    >
                                      delete
                                    </i>
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <button
                            className="btn btn-primary submit-btn"
                            // data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={(e) => handleAddProprietor(e)}
                          >
                            Add More Name
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  <h5 className="modal-title-colored">
                    {" "}
                    Contact Person Detail
                  </h5>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Contact Person Name
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Contact Person Name"
                        onChange={(e) => setContactPersonName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Designation
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Designation"
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Mobile Number <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        maxLength={10}
                        minLength={10}
                        placeholder="Enter mobile number"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Email ID <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control floating"
                        type="email"
                        required
                        placeholder="Email ID"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <h5 className="modal-title-colored"> Registration Number</h5>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">CIN Number</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="CIN Number"
                        onChange={(e) => setCinNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">CIN Reg. Date</label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={cinRegDate}
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
                      <label className="col-form-label">LIN Number</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="LIN Number"
                        onChange={(e) => setLinNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Company GST</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter company GST number"
                        onChange={(e) => setCompanyGST(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">MSME Reg. Number</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="CIN Number"
                        onChange={(e) => setMsmeRegNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">MSME Reg. Date</label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={msmeRegDate}
                          className="form-control floating datetimepicker"
                          type="date"
                          dateFormat="dd-MM-yyyy"
                          placeholderText="DD-MM-YYYY"
                          onChange={handleDateChange1}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Shops & Com. Est Act.
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter shop act"
                        onChange={(e) => setCompanyShopAct(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Contract Labour Act
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter contract labour act"
                        onChange={(e) => setCompanyLabourAct(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Contract Labour Act Expiry Date
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={contractLabourExpiryDate}
                          className="form-control floating datetimepicker"
                          type="date"
                          dateFormat="dd-MM-yyyy"
                          placeholderText="DD-MM-YYYY"
                          onChange={(date) => setContractLabourExpiryDate(date)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <h5 className="modal-title-colored">Applicable Law / Act</h5>
                <div className="table-responsive m-t-15">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th>Applicable Law / Act</th>
                        <th className="text-center">YES/No</th>
                        <th className="text-center">
                          Registration No. (If Applicable)
                        </th>
                        <th className="text-center">Date of coverage</th>
                        {/* <th className="text-center">Registration Number *</th> */}
                        <th className="text-center">Attach Certificate</th>
                        {/* <th className="text-center">Attached Image</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.module}</td>
                          <td>{row.yes}</td>
                          <td>{row.regno}</td>
                          <td>{row.date}</td>
                          {/* <td>{row.tax}</td> */}
                          <td>{row.attach}</td>
                          {/* <td>
                            {tableData1.map((item, i) =>
                              tableData1[i].attach !== "" &&
                              i === index &&
                              Object.keys(data).length === 0 ? (
                                <img
                                  alt=""
                                  src={URL.createObjectURL(
                                    tableData1[i].attach !== null &&
                                      tableData1[i].attach !== undefined
                                      ? tableData1[i].attach
                                      : ""
                                  )}
                                  style={{
                                    width: "70px",
                                    height: "50px",
                                    marginTop: 10,
                                  }}
                                />
                              ) : null
                            )}
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    // data-bs-dismiss="modal"
                    aria-label="Close"
                    type="submit"
                    disabled={loading === true ? true : false}
                  >
                    {loading === true ? (
                      <div className="spinner-border m-0" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div id="edit_client" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Company</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {errorAlertPassword && (
              <ErrorAlerts
                text="Password not match"
                setShowAlert={setErrorPasswodAlert}
              />
            )}
            {errorAlert && (
              <ErrorAlerts
                text="Mandatory field required"
                setShowAlert={setErrorAlert}
              />
            )}
            {apiFailAlert && (
              <ErrorAlerts
                text="Something went wrong! Please try again later"
                setShowAlert={setApiFailAlert}
              />
            )}
            {successAlert && <SuccessAlerts text="Company added succesfully" />}
            <div className="modal-body">
              <form onSubmit={handleUploadFiles1}>
                <div className="row">
                  <h5 className="modal-title-colored">
                    Basic Detail of The Company
                  </h5>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Company Name <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        ref={nameInput}
                        placeholder="Enter company name"
                        onChange={(e) => setCompanyName(e.target.value)}
                        value={companyName}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Unit of</label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Enter unit of"
                        onChange={(e) => setCompanyUnitOf(e.target.value)}
                        value={companyUnitOf}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Company Size <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        required
                        placeholder="No. of employees"
                        onChange={(e) => setCompanySize(e.target.value)}
                        value={companySize}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Company ID <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control floating"
                        type="text"
                        value={companyId}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Company Website</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Company website (If available)"
                        onChange={(e) => setCompanyWeb(e.target.value)}
                        value={companyWeb}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Re-enter password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Company logo <span className="text-danger">*</span>
                      </label>
                      <input
                        accept="image/*"
                        type="file"
                        required
                        onChange={(e) => handleChangeThumnail(e)}
                      />
                      {companyLogo !== "" ? (
                        <img
                          alt=""
                          src={URL.createObjectURL(companyLogo)}
                          style={{
                            width: "106px",
                            height: "106px",
                            marginTop: 10,
                          }}
                        />
                      ) : (
                        <img
                          alt=""
                          src={data?.avatar}
                          style={{
                            width: "106px",
                            height: "106px",
                            marginTop: 10,
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <h5 className="modal-title-colored">
                    Address of The Company
                  </h5>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Building No. / Name{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Building No. / Name"
                        onChange={(e) => setBuilding(e.target.value)}
                        value={building}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Address Line 1 <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Address Line 1"
                        onChange={(e) => setLine1(e.target.value)}
                        value={line1}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Address Line 2</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Address Line 1"
                        onChange={(e) => setLine2(e.target.value)}
                        value={line2}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Address Line 3</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Address Line 1"
                        onChange={(e) => setLine3(e.target.value)}
                        value={line3}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        State <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="State"
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        District <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="District"
                        onChange={(e) => setDistrict(e.target.value)}
                        value={district}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Zip Pin <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Zip Pin"
                        maxLength={6}
                        minLength={6}
                        onChange={(e) => setZip(e.target.value)}
                        value={zip}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Latitude</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Company Latitude"
                        onChange={(e) => setCompanyLat(e.target.value)}
                        value={companyLat}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Longitude</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Company Longitude"
                        onChange={(e) => setCompanyLong(e.target.value)}
                        value={companyLong}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Maximum Distance For Attendence (In meter)
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Maximum Distance For Attendence"
                        onChange={(e) =>
                          setMaxAttendenceDistance(e.target.value)
                        }
                        value={maxAttendenceDistance}
                      />
                    </div>
                  </div>
                  <h5 className="modal-title-colored">Owner Detail</h5>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Ownership Type<span className="text-danger">*</span>
                      </label>

                      <Select
                        options={ownerShipData}
                        placeholder={ownerShip}
                        styles={customStyles}
                        required
                        onChange={handleChangeType}
                      />
                    </div>
                  </div>
                  {ownerShip === "Proprietorship" || ownerShip === "" ? (
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="col-form-label">
                          Proprietor Name<span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          placeholder="Name"
                          value={proprietorName}
                          onChange={(e) => setProprietorName(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="col-md-6">
                        {proprietorNames?.map((item, i) => (
                          <div className="col-md-8" key={i}>
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                {ownerShip === "Private Limited" ||
                                ownerShip === "Limited" ||
                                ownerShip === "Public"
                                  ? "Director"
                                  : ownerShip === "Govt Entity"
                                  ? "Chairman"
                                  : "Partner"}

                                <span className="text-danger">*</span>
                              </label>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Name"
                                  onChange={(e) =>
                                    handleChangeProprietorName(e, i)
                                  }
                                  value={item?.proprietor}
                                />
                                <span className="task-action-btn task-btn-right">
                                  <span
                                    className="action-circle large delete-btn"
                                    title="Delete Task"
                                  >
                                    <i
                                      className="material-icons"
                                      onClick={() =>
                                        handleRemoveProprietorName(i, item)
                                      }
                                    >
                                      delete
                                    </i>
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <button
                            className="btn btn-primary submit-btn"
                            // data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={(e) => handleAddProprietor(e)}
                          >
                            Add More Name
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  <h5 className="modal-title-colored">
                    {" "}
                    Contact Person Detail
                  </h5>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Contact Person Name
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        value={contactPersonName}
                        placeholder="Contact Person Name"
                        onChange={(e) => setContactPersonName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Designation
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        value={designation}
                        placeholder="Designation"
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Mobile Number <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        maxLength={10}
                        minLength={10}
                        value={phone}
                        placeholder="Enter mobile number"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Email ID <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control floating"
                        type="email"
                        required
                        value={email}
                        placeholder="Email ID"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <h5 className="modal-title-colored"> Registration Number</h5>
                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">CIN Number</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="CIN Number"
                        onChange={(e) => setCinNumber(e.target.value)}
                        value={cinNumber}
                      />
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">CIN Reg. Date</label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={cinRegDate}
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
                      <label className="col-form-label">LIN Number</label>
                      <input
                        className="form-control"
                        type="text"
                        value={linNumber}
                        placeholder="LIN Number"
                        onChange={(e) => setLinNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Company GST</label>
                      <input
                        className="form-control"
                        type="text"
                        value={companyGST}
                        placeholder="Enter company GST number"
                        onChange={(e) => setCompanyGST(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">MSME Reg. Number</label>
                      <input
                        className="form-control"
                        type="text"
                        value={msmeNumber}
                        placeholder="CIN Number"
                        onChange={(e) => setMsmeRegNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">MSME Reg. Date</label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={msmeRegDate}
                          className="form-control floating datetimepicker"
                          type="date"
                          dateFormat="dd-MM-yyyy"
                          placeholderText="DD-MM-YYYY"
                          onChange={handleDateChange1}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Shops & Com. Est Act.
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={companyShopAct}
                        placeholder="Enter shop act"
                        onChange={(e) => setCompanyShopAct(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Contract Labour Act
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={companyLabourAct}
                        placeholder="Enter contract labour act"
                        onChange={(e) => setCompanyLabourAct(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        {" "}
                        Contract Labour Act Expiry Date
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={contractLabourExpiryDate}
                          className="form-control floating datetimepicker"
                          type="date"
                          dateFormat="dd-MM-yyyy"
                          placeholderText="DD-MM-YYYY"
                          onChange={(date) => setContractLabourExpiryDate(date)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <h5 className="modal-title-colored">Applicable Law / Act</h5>
                <div className="table-responsive m-t-15">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th>Applicable Law / Act</th>
                        <th className="text-center">YES/No *</th>
                        <th className="text-center">
                          Registration No. (If Applicable)
                        </th>
                        <th className="text-center">Date of coverage</th>
                        {/* <th className="text-center">Registration Number *</th> */}
                        <th className="text-center">Attach Certificate</th>
                        <th className="text-center">Attached Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.module}</td>
                          <td>
                            <label className="custom_check">
                              <input
                                type="checkbox"
                                required
                                checked={tableData1[index]?.yes}
                                onChange={() =>
                                  handleCheckboxChange(
                                    tableData1[index].module,
                                    "yes"
                                  )
                                }
                              />

                              <span className="checkmark"></span>
                            </label>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={tableData1[index]?.regno}
                              onChange={(e) =>
                                handleChangeApplicableLaw(
                                  e.target.value,
                                  index,
                                  "regno"
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={tableData1[index]?.date}
                              placeholder="DD-MM-YYYY"
                              onChange={(e) =>
                                handleChangeApplicableLaw(
                                  e.target.value,
                                  index,
                                  "date"
                                )
                              }
                            />
                          </td>
                          {/* <td>
                            <input
                              type="text"
                              value={tableData1[index]?.tax}
                              required
                              onChange={(e) =>
                                handleChangeApplicableLaw(
                                  e.target.value,
                                  index,
                                  "tax"
                                )
                              }
                            />
                          </td> */}
                          <td>
                            <input
                              type="file"
                              onChange={(e) =>
                                handleChangeApplicableLaw(
                                  e.target.files[0],
                                  index,
                                  "attach"
                                )
                              }
                            />
                          </td>
                          <td>
                            <img
                              src={tableData1[index]?.attach}
                              style={{
                                width: "100px",
                                height: "80px",
                                marginTop: 10,
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                      "Update"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
