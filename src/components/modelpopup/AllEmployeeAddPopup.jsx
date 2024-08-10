import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { UploadFile, UploadFileApi } from "../../utils/FileUpload";
import { CreateApi } from "../../utils/PostApi";
import { CheckForEmployee, GetApi, GetCompanyList } from "../../utils/GetApi";
import ErrorAlerts from "../../views/pages/Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../../views/pages/Ui_Interface/Components/SuccessAlert";
import { UpdateApi } from "../../utils/UpdateApi";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
const AllEmployeeAddPopup = ({ empLength }) => {
  console.log("empLength", empLength);
  const empType = [
    { value: 1, label: "Permanent" },
    { value: 2, label: "FTC (Temporary)" },
  ];

  const joiningtype = [
    { value: "New", label: "New" },
    { value: "Rejoin", label: "Rejoin" },
  ];
  const genderList = [
    { value: 1, label: "Male" },
    { value: 2, label: "Female" },
  ];
  const merritalList = [
    { value: 1, label: "Married" },
    { value: 2, label: "Single" },
  ];

  const weekOffDayList = [
    { value: 1, label: "Fix day" },
    { value: 2, label: "Rotation" },
  ];

  const weekOffDayList1 = [
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thusday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
    { value: 7, label: "Sunday" },
  ];

  const employeShareList = [
    { value: 1, label: "On Ceiling" },
    { value: 2, label: "Max" },
  ];

  const contCalList = [
    { value: 1, label: "Fix" },
    { value: 2, label: "Percent" },
  ];

  const ptApplicableList = [
    { value: 1, label: "Yes" },
    { value: 2, label: "No" },
  ];
  const salarystructure = [
    { value: 1, label: "From salary structure" },
    { value: 2, label: "Mannual entry" },
  ];
  const employeeStatus = [
    { value: 1, label: "Active" },
    { value: 2, label: "Left" },
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

  const [empJoinDate, setJoiningDate] = useState("");
  const [spouseDob, setSpouseDob] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [empStatus, setEmpStatus] = useState("Active");
  const [empReJoinDate, setReJoiningDate] = useState("");
  const [empLastWorkingDate, setLastWorkingDate] = useState("");
  const [dummyId, setDummyId] = useState("");
  const [aAdharImage, setAadharImage] = useState("");
  const [aAdharImageUrl, setAadharImageUrl] = useState("");
  const [empImageUrl, setEmpImageUrl] = useState("");

  const [empDob, setDob] = useState("");
  const [empDepartmentEffectiveDate, setDepartmentEffectiveDate] = useState("");
  const [designationEffectiveDate, setDesignationEffectiveDate] = useState("");
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [empAge, setEmpAge] = useState("");
  const [empRetireemntDate, setEmpRetirementDate] = useState("");
  const [tableData1, setTableData1] = useState([
    {
      module: "EPF Applicable",
      yes: false,
      dateofjoining: "",
      employeeshare: "",
      employershare: "",
      uan: "",
      pfacno: "",
    },
    {
      module: "VPF Applicable",
      yes: false,
      dateofjoining: "",
      contcal: "",
      value: "",
      workingdayapply: "",
      closedate: "",
    },
    {
      module: "ESIC Applicable",
      yes: false,
      dateofjoining: "",
      esicnumber: "",
      dispenceryname: "",
      remark: "",
    },
    {
      module: "TDS Applicable",
      yes: false,
      dateofjoining: "",
      ptapplicable: "",
      applicabledate: "",
      wfapplicable: "",
      applicablefrom: "",
    },
  ]);

  const handleCheckboxChange = (module, column) => {
    const updatedTableData = [...tableData1];

    const row = updatedTableData.find((item) => item.module === module);

    row[column] = !row[column];
    setTableData1(updatedTableData);
  };

  const handleChangeApplicableLaw = (e, i, name) => {
    let list = [...tableData1];
    list[i][name] = e;
    setTableData1(list);
  };
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [apiFailAlert, setApiFailAlert] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [empSalary, setSalary] = useState("");
  const [empAadhar, setAadhar] = useState("");
  const [empPan, setPan] = useState("");
  const [empUan, setUan] = useState("");
  const [empEsic, setEsic] = useState("");

  const [empDayOfWeek, setDayOfWeek] = useState("");
  const [empWeekOffDay, setWeekOffDay] = useState("");
  const [contactPersonName1, setContactPersonName1] = useState("");
  const [contactPersonRelation1, setContactPersonRelation1] = useState("");
  const [contactPersonPhone1, setContactPersonPhone1] = useState("");
  const [contactPersonName2, setContactPersonName2] = useState("");
  const [contactPersonRelation2, setContactPersonRelation2] = useState("");
  const [contactPersonPhone2, setContactPersonPhone2] = useState("");
  const [panImage, setPanImage] = useState("");
  const [empBranchEffectiveDate, setBranchEffectiveDate] = useState("");
  const [consultantName, setConsultantName] = useState("");
  const [contractMonth, setContractMonth] = useState("");
  const [empImage, setEmpImage] = useState("");
  const [empImagee, setEmpImagee] = useState("");
  const [probationCompleteDate, setProbationCompleteDate] = useState("");
  const [fixationDate, setFixationDate] = useState("");
  const [empRejoinReferenceNumber, setRejoinReferenceNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [salaryStructur, setSalaryStructur] = useState([]);
  const [salaryStructurDeduction, setSalaryStructurDeduction] = useState([]);
  const [permanentSameAsPresent, setPermanentSameAsPresent] = useState(false);
  const [passport, setPassport] = useState("");
  const [passportImage, setPassportImage] = useState("");
  const [probationJoiningDate, setProbationJoiningDate] = useState("");
  const [passportExpiryDate, setPassportExpiryDate] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [passbookImage, setPassbookImage] = useState("");
  const [salaryEffectiveDate, setSalaryEffectiveDate] = useState("");
  const [empGender, setEmpGender] = useState("");
  const [empMerritalStatus, setEmpMerrital] = useState("");
  const [empSpouseName, setSpouseName] = useState("");
  const [leavingReason, setLeavingReason] = useState("");
  const [empCompanyId, setCompanyId] = useState("");
  const [empCompanyName, setCompanyName] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [presentCity, setPresentCity] = useState("");
  const [presentDistrict, setPresentDistrict] = useState("");
  const [presentState, setPresentState] = useState("");
  const [presentPincode, setPresentPincode] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [permanentCity, setPermanentCity] = useState("");
  const [permanentDistrict, setPermanentDistrict] = useState("");
  const [permanentState, setPermanentState] = useState("");
  const [permanentPincode, setPermanentPincode] = useState("");
  const [categoryEffectiveDate, setCategoryEffectiveDate] = useState("");
  const [empId, setEmpId] = useState("");
  const [empDepartmentId, setDepartmentId] = useState("");
  const [empDepartmentName, setDepartmentName] = useState("");
  const [empBranchId, setBranchId] = useState("");
  const [empBranchName, setBranchName] = useState("");
  const [empDesignationId, setDesignationId] = useState("");
  const [empDesignationName, setDesignationName] = useState("");
  const [designationHead, setDesignationHead] = useState("");

  const [reportingManager, setReportingManager] = useState("");
  const [reportingManagerId, setReportingManagerId] = useState("");

  const [type, setType] = useState("");
  const [joiningType, setJoiningType] = useState("");
  const [designationList, setDesignationList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [salaryStructure, setSalaryStructure] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const [roleUser, setRole] = useState("");
  const [employeeFound, setEmployeeFound] = useState(false);
  const [employeeNotFound, setEmployeeNotFound] = useState(false);
  const [empRetirementAgeFromJob, setEmpRetirementAgeFromJob] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [empCategoryName, setCategoryName] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [generalParameters, setGeneralParameters] = useState([]);
  const [referenceCount, setReferenceCount] = useState("");
  const [empIdCount, setEmpIdCount] = useState("");
  const [filteredCategoryData, setFilteredCategoryData] = useState([]);
  const [reportingManagerList, setReportingManagerList] = useState([]);
  const [salaryForm, setSalaryForm] = useState([
    {
      name: "",
      value: "",
    },
  ]);

  const [salaryFormDeduction, setSalaryFormDeduction] = useState([
    {
      name: "",
      value: "",
    },
  ]);
  const [salaryStructureList, setSalaryStructureList] = useState([]);
  const [salaryStructureId, setSalaryStructureId] = useState("");
  const [salaryStructureName, setSalaryStructureName] = useState("");

  const [policeVerifiedCertificateNo, setPoliceVerifiedCertificateNo] =
    useState("");
  const [policeVerifiedExpiryDate, setPoliceVerifiedExpiryDate] = useState("");
  const [policeVerifiedCertificateImage, setPoliceVerifiedCertificateImage] =
    useState("");

  const [educationList, setEducationList] = useState([
    {
      educationName: "",
      passingYear: "",
      certificate: "",
    },
  ]);

  const [experienceList, setExperienceList] = useState([
    {
      companyName: "",
      designation: "",
      from: "",
      to: "",
      certificate: "",
    },
  ]);

  const [serviceRecordList, setServiceRecordList] = useState([
    {
      letterName: "",
      date: "",
      certificate: "",
    },
  ]);

  const [allowencesList, setAllowencesList] = useState([]);
  const [deductionList, setDeductionList] = useState([]);

  useEffect(() => {
    getGeneralParameters();
    getDesignationList();
    getBranchList();
    let role = localStorage.getItem("userRole");
    let id = localStorage.getItem("userId");
    let name = localStorage.getItem("userName");
    if (role === "admin") {
    } else if (role === "company") {
      setRole(role);
      setCompanyId(id);
      setCompanyName(name);
    }
    // getEmployeeList();
    getEpfParameters();
    getCategoryList();
    getSalaryStructure();
    getAllowencesList();
    getDeductionList();
  }, [empLength]);

  useEffect(() => {
    getReportingManger();
  }, []);

  const getReportingManger = async () => {
    try {
      const q = query(
        collection(db, "employee"),
        where("empCompanyId", "==", localStorage.getItem("userId")),
        where("isDesignationHead", "==", "Yes")
      );
      let getList = await getDocs(q);
      const newData = getList.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (newData?.length > 0) {
        setReportingManagerList([
          {
            value: newData[0]?.id,
            label: `${newData[0]?.name} (${newData[0]?.empDesignationName})`,
          },
        ]);
      } else {
        setReportingManagerList([]);
        setReportingManagerId("");
        setReportingManager("");
      }
    } catch (err) {}
  };

  const getGeneralParameters = async () => {
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

        setGeneralParameters(newData);

        if (newData?.length > 0) {
          if (empLength > 0) {
            handleIncreaseReferenceNumber1(newData);
            handleIncreaseEmpIdNumber1(newData);
          } else {
            setRejoinReferenceNumber(
              newData[0]?.referenceNumberSeriolStartFrom +
                newData[0]?.referenceNumberSeriolStartFromDigit
            );
            setReferenceCount(newData[0]?.referenceNumberSeriolStartFromDigit);

            setEmpId(
              newData[0]?.employeeIdSeriolStartFrom +
                newData[0]?.employeeIdSeriolStartFromDigit
            );
            setEmpIdCount(newData[0]?.employeeIdSeriolStartFromDigit);
          }
        } else {
        }

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const getSalaryStructure = async () => {
    setLoading(true);
    await GetApi(
      "salarystructures",
      "companyId",
      localStorage.getItem("userId")
    )
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        var result = newData.map(function (el) {
          var o = Object.assign({}, el);
          o.label = el.structureName;
          o.value = el.id;
          return o;
        });

        setSalaryStructureList(result);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

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

        setEmpRetirementAgeFromJob(newData[0]?.empRetirementAgeFromJob);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const getBranchList = async () => {
    await GetApi("branch", "createdBy", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        newData.forEach((object) => {
          object.value = object.id;
          object.label = object.branchName;
        });
        setBranchList(newData);
      })
      .catch((err) => {});
  };

  const getCategoryList = async () => {
    await GetApi("category", "createdBy", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        newData.forEach((object) => {
          object.value = object.id;
          object.label = object.categoryName;
        });
        setCategoryList(newData);
      })
      .catch((err) => {});
  };

  const getAllowencesList = async () => {
    await GetApi("allowances", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        newData.forEach((object) => {
          object.value = object.id;
          object.label = object.allowanceName;
        });
        setAllowencesList(newData);
      })
      .catch((err) => {});
  };

  const getDeductionList = async () => {
    await GetApi("deductions", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        newData.forEach((object) => {
          object.value = object.id;
          object.label = object.deductionName;
        });
        setDeductionList(newData);
      })
      .catch((err) => {});
  };

  // const getEmployeeList = async () => {
  //   await GetApi("employee").then((res) => {
  //     const newData = res.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setEmpId(`PAYROL${new Date().getFullYear()}EMP${newData.length + 1}`);
  //   });
  // };

  const getDesignationList = async () => {
    await GetApi("departments", "createdBy", localStorage.getItem("userId"))
      .then(async (res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        newData.forEach((object) => {
          object.value = object.id;
          object.label = object.departmentName;
        });
        setDepartmentList(newData);
        await GetApi(
          "designations",
          "createdBy",
          localStorage.getItem("userId")
        )
          .then(async (res) => {
            const newData1 = res.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));

            newData1.forEach((object) => {
              object.value = object.id;
              object.label = object.designationName;
            });
            setDesignationList(newData1);
            await GetCompanyList()
              .then((res) => {
                const newData = res.docs.map((doc) => ({
                  ...doc.data(),
                  id: doc.id,
                }));

                newData.forEach((object) => {
                  object.value = object.companyId;
                  object.label = object.companyName;
                });
                setCompanyList(newData);
              })
              .catch((err) => {});
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  };

  const handleUploadFiles = async () => {
    setLoading(true);
    let url1 = "";
    if (aAdharImage !== "") {
      await UploadFileApi("employee_profile_images_", aAdharImage, phone).then(
        (url) => {
          url1 = url;
        }
      );
    }
    let url2 = "";
    if (panImage !== "") {
      await UploadFileApi("employee_profile_images_", panImage, phone).then(
        (url) => {
          url2 = url;
        }
      );
    }

    let url3 = "";
    if (passportImage !== "") {
      await UploadFileApi(
        "employee_profile_images_",
        passportImage,
        phone
      ).then((url) => {
        url3 = url;
      });
    }
    let url4 = "";
    if (passbookImage !== "") {
      await UploadFileApi(
        "employee_profile_images_",
        passbookImage,
        phone
      ).then((url) => {
        url4 = url;
      });
    }

    let url5 = "";
    if (policeVerifiedCertificateImage !== "") {
      await UploadFileApi(
        "employee_profile_images_",
        policeVerifiedCertificateImage,
        phone
      ).then((url) => {
        url5 = url;
      });
    }

    handleCreateEmployee(url1, url2, url3, url4, url5);
  };

  const handleCreateEmployee = async (url1, url2, url3, url4, url5) => {
    if (password === confirmPassword) {
      if (joiningType !== "") {
        setLoading(true);

        await UploadFileApi("employee_profile_images_", empImage, phone)
          .then(async (url) => {
            if (url) {
              const data1 = {
                name: name,
                employeeCode: employeeCode,
                dob: empDob.toString(),
                email: email,
                phone: phone,
                secondaryPhone: secondaryPhone,
                presentAddress: presentAddress,
                password: password,
                empId: empId,
                empEsic: empEsic,
                experienceList: experienceList,
                serviceRecordList: serviceRecordList,
                presentCity: presentCity,
                presentDistrict: presentDistrict,
                presentState: presentState,
                presentPincode: presentPincode,
                permanentAddress: permanentAddress,
                permanentCity: permanentCity,
                permanentDistrict: permanentDistrict,
                permanentState: permanentState,
                permanentPincode: permanentPincode,
                empJoinDate: empJoinDate.toString(),
                empCompanyId: empCompanyId,
                empCompanyName: empCompanyName,
                empDepartmentId: empDepartmentId,
                empDepartmentName: empDepartmentName,
                empDesignationId: empDesignationId,
                empDesignationName: empDesignationName,
                empSalary: empSalary,
                probationCompleteDate: probationCompleteDate.toString(),
                probationJoiningDate: probationJoiningDate.toString(),
                fixationDate: fixationDate.toString(),
                empAadhar: empAadhar,
                empBranchEffectiveDate: empBranchEffectiveDate.toString(),
                empPan: empPan,
                empUan: empUan,
                isDesignationHead: designationHead,
                reportingManager: reportingManager,
                reportingManagerId: reportingManagerId,
                empSpouseName: empSpouseName,
                spouseDob: spouseDob.toString(),
                weddingDate: weddingDate.toString(),
                empType: type,
                joiningType: joiningType,
                refernceNumber: empRejoinReferenceNumber,
                fatherName: fatherName,
                motherName: motherName,
                empAge: empAge,
                empRetireemntDate: empRetireemntDate.toString(),
                empGender: empGender,
                empMerritalStatus: empMerritalStatus,
                empBranchName: empBranchName,
                empBranchId: empBranchId,
                policeVerifiedCertificateNo: policeVerifiedCertificateNo,
                policeVerifiedExpiryDate: policeVerifiedExpiryDate.toString(),
                policeVerifiedCertificateImage: url5,
                empLastWorkingDate: empLastWorkingDate.toString(),
                leavingReason: leavingReason,
                empDepartmentEffectiveDate:
                  empDepartmentEffectiveDate.toString(),
                designationEffectiveDate: designationEffectiveDate.toString(),
                empWeekOffDay: empWeekOffDay,
                empDayOfWeek: empDayOfWeek,
                contactPersonName1: contactPersonName1,
                contactPersonRelation1: contactPersonRelation1,
                contactPersonPhone1: contactPersonPhone1,
                contactPersonName2: contactPersonName2,
                contactPersonRelation2: contactPersonRelation2,
                contactPersonPhone2: contactPersonPhone2,
                aAdharImage: url1,
                panImage: url2,
                passport: passport,
                passportImage: url3,
                passportExpiryDate: passportExpiryDate.toString(),
                bankAccountNumber: bankAccountNumber,
                bankName: bankName,
                ifscCode: ifscCode,
                passbookImage: url4,
                consultantName: consultantName,
                contractMonth: contractMonth,
                empStatutory: tableData1,
                categoryId: categoryId,
                empCategoryName: empCategoryName,
                categoryEffectiveDate: categoryEffectiveDate.toString(),
                salaryStructur: salaryStructur,
                salaryEffectiveDate: salaryEffectiveDate.toString(),
                salaryStructure: salaryStructure,
                createdDate: new Date().toString(),
                educationList: educationList,
                salaryStructureId: salaryStructureId,
                salaryStructureName: salaryStructureName,
                isActive: true,
                role: "employee",
                salaryFormDeduction: salaryFormDeduction,
                salaryForm: salaryForm,
                empImage: empImage !== "" ? url : empImagee,
              };

              await CreateApi("employee", data1)
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
      setLoading(false);
    }
  };

  const handleChangeEditThumnail = async (e) => {
    setEmpImage(e.target.files[0]);
  };

  const handleChangeSelect = (id, label, e) => {
    label(e.label);
    id(e.value);
    setSalaryStructur(e);
  };

  useEffect(() => {
    let filteredCategory = categoryList?.filter(
      (item) => item?.id === categoryId
    );
    setFilteredCategoryData(filteredCategory);
  }, [categoryId]);

  const handleChangeDate = (state, date) => {
    state(date);

    if (state === setDob) {
      let a = new Date().getFullYear();
      let b = date?.getFullYear();
      setEmpAge(a - b);
      // setEmpRetirementDate(date);
      const aYearFromNow = new Date(date);
      aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 60);
      setEmpRetirementDate(aYearFromNow);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setProceed(false);
    setJoiningType("");
    setType("");
    setName("");
    setPhone("");
    setAadhar("");
    setPan("");
    setEmail("");
    // setRejoinReferenceNumber("");
  };

  const handleCheckHistory = async (e) => {
    if (empAadhar !== "") {
      e.preventDefault();
      await CheckForEmployee(
        "employee",
        "empCompanyId",
        localStorage.getItem("userId"),
        "empAadhar",
        empAadhar
      ).then((res) => {
        setProceed(true);
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setErrorAlert(false);

        if (newData.length === 0) {
          setEmployeeNotFound(true);
        } else {
          setEmployeeFound(true);
          setName(newData[0]?.name);
          setEsic(newData[0]?.empEsic);
          // setDob(new Date(newData[0]?.dob));
          setEmail(newData[0]?.email);

          setPassword(newData[0]?.password);
          setEmpId(newData[0]?.empId);
          // setJoiningDate(new Date(newData[0]?.empJoinDate));
          setPhone(newData[0]?.phone);
          setCompanyId(newData[0]?.empCompanyId);
          setDepartmentId(newData[0]?.empDepartmentId);
          setDesignationId(newData[0]?.empDesignationId);
          setCompanyName(newData[0]?.empCompanyName);
          setDepartmentName(newData[0]?.empDepartmentName);
          setDesignationName(newData[0]?.empDesignationName);
          setSalary(newData[0]?.empSalary);
          setAadhar(newData[0]?.empAadhar);
          setPan(newData[0]?.empPan);
          setUan(newData[0]?.empUan);
          setType(newData[0]?.empType);
          setConsultantName(newData[0]?.consultantName);
          setContractMonth(newData[0]?.contractMonth);
          setTableData1(newData[0]?.empStatutory);
          setConfirmPassword(newData[0]?.password);
          setJoiningType(newData[0]?.joiningType);
          setRejoinReferenceNumber(newData[0]?.refernceNumber);
          setFatherName(newData[0]?.fatherName);
          setMotherName(newData[0]?.motherName);
          setEmpAge(newData[0]?.empAge);
          // setEmpRetirementDate(new Date(newData[0]?.empRetireemntDate));
          setEmpGender(newData[0]?.empGender);
          setEmpMerrital(newData[0]?.empMerritalStatus);
          setBranchId(newData[0]?.empBranchId);
          setBranchName(newData[0]?.empBranchName);
          // setLastWorkingDate(new Date(newData[0]?.empLastWorkingDate));
          setLeavingReason(newData[0]?.leavingReason);
          // setDepartmentEffectiveDate(
          //   new Date(newData[0]?.empDepartmentEffectiveDate)
          // );
          // setDesignationEffectiveDate(
          //   new Date(newData[0]?.designationEffectiveDate)
          // );
          setWeekOffDay(newData[0]?.empWeekOffDay);
          setDayOfWeek(newData[0]?.empDayOfWeek);
          setSpouseName(newData[0]?.empSpouseName);
          setPassport(newData[0]?.passport);
          // setPassportExpiryDate(newData[0]?.passportExpiryDate);
          setBankAccountNumber(newData[0]?.bankAccountNumber);
          setIfscCode(newData[0]?.ifscCode);
          setBankName(newData[0]?.bankName);
          setAadharImageUrl(newData[0]?.aAdharImageUrl);
          setEmpImageUrl(newData[0]?.empImage);
          setEmpImagee(newData[0]?.empImage);
          // setSpouseDob(newData[0]?.spouseDob);
          // setWeddingDate(newData[0]?.weddingDate);
          // setCategoryEffectiveDate(new Date(newData[0]?.categoryEffectiveDate))
          setContactPersonName1(newData[0]?.contactPersonName1);
          setContactPersonRelation1(newData[0]?.contactPersonRelation1);
          setContactPersonPhone1(newData[0]?.contactPersonPhone1);
          setContactPersonName2(newData[0]?.contactPersonName2);
          setContactPersonRelation2(newData[0]?.contactPersonRelation2);
          setContactPersonPhone2(newData[0]?.contactPersonPhone2);

          setPresentAddress(newData[0]?.presentAddress);
          setPresentCity(newData[0]?.presentCity);
          setPresentState(newData[0]?.presentState);
          setPresentDistrict(newData[0]?.presentDistrict);
          setPresentPincode(newData[0]?.presentPincode);

          setPermanentAddress(newData[0]?.permanentAddress);
          setPermanentCity(newData[0]?.permanentCity);
          setPermanentDistrict(newData[0]?.permanentDistrict);
          setPermanentState(newData[0]?.permanentState);
          setPermanentPincode(newData[0]?.permanentPincode);

          // setBranchEffectiveDate(new Date(newData[0]?.empBranchEffectiveDate))
          setCategoryId(newData[0]?.categoryId);
          setCategoryName(newData[0]?.empCategoryName);
          // setProbationCompleteDate(new Date(newData[0]?.probationCompleteDate))
          // setProbationJoiningDate(new Date(newData[0]?.probationJoiningDate))
          // setFixationDate(new Date(newData[0]?.fixationDate))

          // setSalaryEffectiveDate(new Date(newData[0]?.salaryEffectiveDate))

          setSalaryForm(newData[0]?.salaryStructur);
          setSalaryStructure(newData[0]?.salaryStructure);
          // setPoliceVerifiedCertificateImage(newData[0]?.policeVerifiedCertificateImage)
          setPoliceVerifiedCertificateNo(
            newData[0]?.policeVerifiedCertificateNo
          );
          // setPoliceVerifiedExpiryDate(new Date(newData[0]?.policeVerifiedExpiryDate))
          setSalaryStructureId(newData[0]?.salaryStructureId);
          setSalaryStructureName(newData[0]?.salaryStructureName);
        }
      });
    } else {
      setErrorAlert(true);
    }
  };

  const handleAddSalaryForm = (e) => {
    e.preventDefault();
    setSalaryForm([
      ...salaryForm,
      {
        name: "",
        value: "",
      },
    ]);
  };

  const handleAddSalaryForm1 = (e) => {
    e.preventDefault();
    setSalaryFormDeduction([
      ...salaryFormDeduction,
      {
        name: "",
        value: "",
      },
    ]);
  };

  const handleChangeSalaryForm = (i, text, e) => {
    let list = [...salaryForm];
    list[i][text] = e;
    setSalaryStructur(list);
  };

  const handleChangeSalaryForm1 = (i, text, e) => {
    let list = [...salaryFormDeduction];
    list[i][text] = e;
    setSalaryStructurDeduction(list);
  };

  const handleAddMoreEducation = (e) => {
    e.preventDefault();
    setEducationList([
      ...educationList,
      {
        educationName: "",
        passingYear: "",
        certificate: "",
      },
    ]);
  };

  const handleAddMoreExperience = (e) => {
    e.preventDefault();
    setExperienceList([
      ...experienceList,
      {
        companyName: "",
        designation: "",
        from: "",
        to: "",
        certificate: "",
      },
    ]);
  };

  const handleAddMoreServiceRecord = (e) => {
    e.preventDefault();
    setServiceRecordList([
      ...serviceRecordList,
      {
        letterName: "",
        date: "",
        certificate: "",
      },
    ]);
  };

  const handleChangeExperience = (e, i, name) => {
    let list = [...experienceList];

    list[i][name] = e;

    setExperienceList(list);
  };

  const handleChangeService = (e, i, name) => {
    let list = [...serviceRecordList];

    list[i][name] = e;

    setServiceRecordList(list);
  };

  const handleChangeEducation = (e, i, name) => {
    let list = [...educationList];

    list[i][name] = e;

    setEducationList(list);
  };

  const handleUploadEductionImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    for (var ii = 0; ii < educationList.length; ii++) {
      if (educationList[ii]?.certificate !== "") {
        await UploadFileApi(
          "employee_profile_images_",
          educationList[ii]?.certificate,
          phone
        ).then(async (url) => {
          let list = [...educationList];
          list[ii]["certificate"] = url;
          setEducationList(list);
          if (ii === educationList.length - 1) {
            for (var iii = 0; i < experienceList.length; iii++) {
              if (experienceList[iii]?.certificate !== "") {
                await UploadFileApi(
                  "employee_profile_images_",
                  experienceList[i]?.certificate,
                  phone
                ).then((url) => {
                  let list = [...experienceList];
                  list[iii]["certificate"] = url;
                  setExperienceList(list);
                });
              } else {
              }
            }
            for (var i = 0; i < serviceRecordList.length; i++) {
              if (serviceRecordList[i]?.certificate !== "") {
                await UploadFileApi(
                  "employee_profile_images_",
                  serviceRecordList[i]?.certificate,
                  phone
                ).then((url) => {
                  let list = [...serviceRecordList];
                  list[i]["certificate"] = url;
                  serviceRecordList(list);
                });
              }
            }
            handleUploadFiles();
          }
        });
      } else {
        setErrorAlert(true);
        setLoading(false);
      }
    }
  };

  const handleIncreaseReferenceNumber1 = (e) => {
    
    console.log("e for refre", e)
    let a = parseInt(e[0]?.referenceNumberSeriolStartFromDigit) + empLength;

    let paddedNum = String(a).padStart(
      e[0]?.referenceNumberSeriolStartFromDigit?.length,
      "0"
    );

    setReferenceCount(paddedNum);

    setRejoinReferenceNumber(e[0]?.referenceNumberSeriolStartFrom + paddedNum);
  };

  const handleIncreaseReferenceNumber = (e) => {
    e.preventDefault();

    let a = parseInt(referenceCount) + 1;

    let paddedNum = String(a).padStart(referenceCount?.length, "0");

    setReferenceCount(paddedNum);

    setRejoinReferenceNumber(
      generalParameters[0]?.referenceNumberSeriolStartFrom + paddedNum
    );
  };

  const handleIncreaseEmpIdNumber1 = (e) => {
    console.log("e for emp", e)
    let a = parseInt(e[0]?.employeeIdSeriolStartFromDigit) + empLength;

    let paddedNum = String(a).padStart(e[0]?.employeeIdSeriolStartFromDigit?.length, "0");

    setEmpIdCount(paddedNum);

    setEmpId(e[0]?.employeeIdSeriolStartFrom + paddedNum);
  };

  const handleIncreaseEmpIdNumber = (e) => {
    e.preventDefault();

    let a = parseInt(empIdCount) + 1;

    let paddedNum = String(a).padStart(empIdCount?.length, "0");

    setEmpIdCount(paddedNum);

    setEmpId(generalParameters[0]?.employeeIdSeriolStartFrom + paddedNum);
  };

  const [timeoutId, setTimeoutId] = useState(null);
  const handleSetBasicSalary = (e) => {
    setSalary(e);
    clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        // Your function to run after typing stops
        if (
          parseInt(filteredCategoryData[0]?.wages) <= parseInt(e) &&
          e !== ""
        ) {
          setSalary(e);
        } else {
          alert(
            `Minimum basic salary should be ${filteredCategoryData[0]?.wages}`
          );
          setSalary("");
        }
      }, 1000)
    );
  };

  return (
    <>
      {generalParameters?.length > 0 ? (
        <div
          id="add_employee"
          className="modal custom-modal fade"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
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
              {employeeNotFound && (
                <SuccessAlerts text="Employee record not found! You can add as new employee" />
              )}
              {successAlert && (
                <SuccessAlerts text="Department updated succssefully" />
              )}
              {employeeFound && <SuccessAlerts text="Employee found" />}
              <div className="modal-header">
                <h5 className="modal-title">Add Employee</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setProceed(false)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <form onSubmit={handleUploadEductionImage}>
                <div className="modal-body">
                  {proceed === false ? (
                    <div className="row">
                      <h5 className="modal-title-colored">
                        Generate Reference Number
                      </h5>
                      <div className="col-sm-3">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Joining Type <span className="text-danger">*</span>
                          </label>
                          <Select
                            options={joiningtype}
                            placeholder={joiningType}
                            styles={customStyles}
                            required
                            onChange={(e) =>
                              handleChangeSelect(setDummyId, setJoiningType, e)
                            }
                          />
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Employee Aadhar Number{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            required
                            maxLength={12}
                            minLength={12}
                            onChange={(e) => setAadhar(e.target.value)}
                            value={empAadhar}
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          className="btn btn-primary"
                          style={{ marginRight: 5 }}
                          aria-label="Close"
                          onClick={(e) => handleReset(e)}
                        >
                          Reset
                        </button>
                        <button
                          className="btn btn-primary"
                          style={{ marginLeft: 5 }}
                          aria-label="Close"
                          onClick={(e) => handleCheckHistory(e)}
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="row">
                        <h5 className="modal-title-colored">
                          Generate Reference Number
                        </h5>
                        <div className="col-sm-4">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Joining Type{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Select
                              options={joiningtype}
                              placeholder={joiningType}
                              styles={customStyles}
                              required
                              onChange={(e) =>
                                handleChangeSelect(
                                  setDummyId,
                                  setJoiningType,
                                  e
                                )
                              }
                              isDisabled={proceed === true ? true : false}
                            />
                          </div>
                        </div>

                        {joiningType === "Rejoin" && proceed === true ? (
                          <div className="col-sm-4">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Employment Code{" "}
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                onChange={(e) =>
                                  setEmployeeCode(e.target.value)
                                }
                                value={name}
                              />
                            </div>
                          </div>
                        ) : null}

                        <div className="col-sm-4">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Aadhar Number{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              maxLength={12}
                              minLength={12}
                              onChange={(e) => setAadhar(e.target.value)}
                              value={empAadhar}
                              readOnly={proceed === true ? true : false}
                            />
                          </div>
                        </div>

                        {proceed === true ? (
                          <div className="col-sm-4">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Employment Type{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <Select
                                options={empType}
                                placeholder={type}
                                styles={customStyles}
                                required
                                onChange={(e) =>
                                  handleChangeSelect(setDummyId, setType, e)
                                }
                              />
                            </div>
                          </div>
                        ) : null}
                        {roleUser === "company" ? null : (
                          <div className="col-sm-4">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Company <span className="text-danger">*</span>
                              </label>
                              <Select
                                options={companyList}
                                placeholder={empCompanyName}
                                styles={customStyles}
                                required
                                onChange={(e) =>
                                  handleChangeSelect(
                                    setCompanyId,
                                    setCompanyName,
                                    e
                                  )
                                }
                              />
                            </div>
                          </div>
                        )}
                        {proceed === true ? (
                          <div className="col-sm-4">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Employee Full Name{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                              />
                            </div>
                          </div>
                        ) : null}
                        {proceed === true ? (
                          <div className="col-sm-4">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Mobile Number{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                required
                                maxLength={10}
                                minLength={10}
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                              />
                            </div>
                          </div>
                        ) : null}

                        {proceed === true ? (
                          <div className="col-sm-4">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Pan Number
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                maxLength={10}
                                minLength={10}
                                onChange={(e) => setPan(e.target.value)}
                                value={empPan}
                              />
                            </div>
                          </div>
                        ) : null}
                        {proceed === true ? (
                          <div className="col-sm-4">
                            <div className="input-block mb-3">
                              <label className="col-form-label">Email ID</label>
                              <input
                                className="form-control"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                              />
                            </div>
                          </div>
                        ) : null}
                        {proceed === true ? (
                          <div className="col-sm-4">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Reference Number
                                <span className="text-danger">*</span>
                                {joiningType === "New" &&
                                type !== "" &&
                                name !== "" &&
                                phone !== "" &&
                                empAadhar !== "" &&
                                empPan !== "" &&
                                email !== ""
                                  ? null
                                  : null}
                              </label>
                              <div style={{ display: "flex" }}>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  // onChange={(e) =>
                                  //   setRejoinReferenceNumber(e.target.value)
                                  // }
                                  value={empRejoinReferenceNumber}
                                />
                                <button
                                  className="btn btn-primary"
                                  aria-label="Close"
                                  onClick={handleIncreaseReferenceNumber}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <div className="col-sm-4">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Employee ID <span className="text-danger">*</span>
                            </label>
                            <div style={{ display: "flex" }}>
                              <input
                                type="text"
                                className="form-control"
                                value={empId}
                              />
                              <button
                                className="btn btn-primary"
                                aria-label="Close"
                                onClick={handleIncreaseEmpIdNumber}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <button
                            className="btn btn-primary"
                            style={{ marginRight: 5 }}
                            aria-label="Close"
                            onClick={(e) => handleReset(e)}
                          >
                            Reset
                          </button>
                          {proceed === false ? (
                            <button
                              className="btn btn-primary"
                              style={{ marginLeft: 5 }}
                              aria-label="Close"
                              onClick={(e) => handleCheckHistory(e)}
                            >
                              Proceed
                            </button>
                          ) : null}
                        </div>
                      </div>
                      <div className="row">
                        <h5
                          className="modal-title-colored"
                          style={{ marginTop: 15 }}
                        >
                          Employee Basic Detail
                        </h5>

                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Father's name{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={fatherName}
                              onChange={(e) => setFatherName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Mother's name{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={motherName}
                              onChange={(e) => setMotherName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Date Of Birth{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="cal-icon">
                              <DatePicker
                                selected={empDob}
                                required
                                onChange={(date) =>
                                  handleChangeDate(setDob, date)
                                }
                                className="form-control floating datetimepicker"
                                type="date"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Gender <span className="text-danger">*</span>
                            </label>
                            <Select
                              options={genderList}
                              placeholder={
                                empGender !== "" ? empGender : "Select"
                              }
                              styles={customStyles}
                              required
                              onChange={(e) =>
                                handleChangeSelect(setDummyId, setEmpGender, e)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Password <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Confirm Password{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Age of Employee
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              readOnly={true}
                              value={empAge}
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Retirement Date{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="cal-icon">
                              <DatePicker
                                selected={empRetireemntDate}
                                required
                                className="form-control floating datetimepicker"
                                type="date"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Merrital Status{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Select
                              options={merritalList}
                              placeholder={
                                empMerritalStatus !== ""
                                  ? empMerritalStatus
                                  : "Select"
                              }
                              styles={customStyles}
                              required
                              onChange={(e) =>
                                handleChangeSelect(
                                  setDummyId,
                                  setEmpMerrital,
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                        {empMerritalStatus === "Married" ? (
                          <>
                            <div className="col-sm-3">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Spouse Name{" "}
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  value={empSpouseName}
                                  onChange={(e) =>
                                    setSpouseName(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Spouse Date of Birth{" "}
                                </label>
                                <div className="cal-icon">
                                  <DatePicker
                                    selected={spouseDob}
                                    onChange={(date) =>
                                      handleChangeDate(setSpouseDob, date)
                                    }
                                    className="form-control floating datetimepicker"
                                    type="date"
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="DOB"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-3">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Wedding Anniversary{" "}
                                </label>
                                <div className="cal-icon">
                                  <DatePicker
                                    selected={weddingDate}
                                    onChange={(date) =>
                                      handleChangeDate(setWeddingDate, date)
                                    }
                                    className="form-control floating datetimepicker"
                                    type="date"
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="Wdding Annieversary"
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}

                        <h5 className="modal-title-colored">
                          Employement Detail
                        </h5>
                        {joiningType === "New" || joiningType === "" ? (
                          <div className="col-sm-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Joining Date{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="cal-icon">
                                <DatePicker
                                  required
                                  selected={empJoinDate}
                                  onChange={(date) => {
                                    handleChangeDate(setJoiningDate, date);
                                    setDepartmentEffectiveDate(date);
                                    setDesignationEffectiveDate(date);
                                    setSalaryEffectiveDate(date);
                                    setCategoryEffectiveDate(date)
                                    setBranchEffectiveDate(date)
                                    

                                  }}
                                  className="form-control floating datetimepicker"
                                  type="date"
                                  dateFormat="dd-MM-yyyy"
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="col-sm-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Re-joining Date{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="cal-icon">
                                <DatePicker
                                  required
                                  selected={empReJoinDate}
                                  onChange={(date) => {
                                    handleChangeDate(setReJoiningDate, date);
                                    setDepartmentEffectiveDate(date);
                                    setDesignationEffectiveDate(date);
                                    setSalaryEffectiveDate(date);
                                  }}
                                  className="form-control floating datetimepicker"
                                  type="date"
                                  dateFormat="dd-MM-yyyy"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="col-md-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Status <span className="text-danger">*</span>
                            </label>
                            <Select
                              options={employeeStatus}
                              placeholder={
                                empStatus !== "" ? empStatus : "Select"
                              }
                              required
                              styles={customStyles}
                              onChange={(e) =>
                                handleChangeSelect(setDummyId, setEmpStatus, e)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Last Working Date
                            </label>

                            <div className="cal-icon">
                              <DatePicker
                                selected={empLastWorkingDate}
                                onChange={(date) =>
                                  handleChangeDate(setLastWorkingDate, date)
                                }
                                className="form-control floating datetimepicker"
                                type="date"
                                dateFormat="dd-MM-yyyy"
                                readOnly={empStatus === "Left" ? false : true}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Reason of Leaving{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={leavingReason}
                              onChange={(e) => setLeavingReason(e.target.value)}
                              readOnly={empStatus === "Left" ? false : true}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Branch Name <span className="text-danger">*</span>
                            </label>
                            <Select
                              options={branchList}
                              placeholder={
                                empBranchName !== "" ? empBranchName : "Select"
                              }
                              required
                              styles={customStyles}
                              onChange={(e) =>
                                handleChangeSelect(
                                  setBranchId,
                                  setBranchName,
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Effective Date{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="cal-icon">
                              <DatePicker
                                required
                                selected={empBranchEffectiveDate}
                                onChange={(date) =>
                                  handleChangeDate(setBranchEffectiveDate, date)
                                }
                                className="form-control floating datetimepicker"
                                type="date"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Category <span className="text-danger">*</span>
                            </label>
                            <Select
                              options={categoryList}
                              required
                              placeholder={
                                empCategoryName !== ""
                                  ? empCategoryName
                                  : "Select"
                              }
                              styles={customStyles}
                              onChange={(e) =>
                                handleChangeSelect(
                                  setCategoryId,
                                  setCategoryName,
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Effective Date{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="cal-icon">
                              <DatePicker
                                required
                                selected={categoryEffectiveDate}
                                onChange={(date) =>
                                  handleChangeDate(
                                    setCategoryEffectiveDate,
                                    date
                                  )
                                }
                                className="form-control floating datetimepicker"
                                type="date"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Department Name{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Select
                              options={departmentList}
                              placeholder={
                                empDepartmentName !== ""
                                  ? empDepartmentName
                                  : "Select"
                              }
                              required
                              styles={customStyles}
                              onChange={(e) =>
                                handleChangeSelect(
                                  setDepartmentId,
                                  setDepartmentName,
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Effective Date{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="cal-icon">
                              <DatePicker
                                selected={
                                  empDepartmentEffectiveDate !== ""
                                    ? empDepartmentEffectiveDate
                                    : empJoinDate
                                }
                                onChange={(date) =>
                                  handleChangeDate(
                                    setDepartmentEffectiveDate,
                                    date
                                  )
                                }
                                required
                                className="form-control floating datetimepicker"
                                type="date"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Designation <span className="text-danger">*</span>
                            </label>
                            <Select
                              options={designationList}
                              placeholder={
                                empDesignationName !== ""
                                  ? empDesignationName
                                  : "Select"
                              }
                              required
                              styles={customStyles}
                              onChange={(e) =>
                                handleChangeSelect(
                                  setDesignationId,
                                  setDesignationName,
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Effective Date{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="cal-icon">
                              <DatePicker
                                selected={
                                  designationEffectiveDate !== ""
                                    ? designationEffectiveDate
                                    : empJoinDate
                                }
                                onChange={(date) =>
                                  handleChangeDate(
                                    setDesignationEffectiveDate,
                                    date
                                  )
                                }
                                required
                                className="form-control floating datetimepicker"
                                type="date"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Default Weekly Holiday{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Select
                              options={weekOffDayList}
                              placeholder={
                                empWeekOffDay !== "" ? empWeekOffDay : "Select"
                              }
                              required
                              styles={customStyles}
                              onChange={(e) =>
                                handleChangeSelect(setDummyId, setWeekOffDay, e)
                              }
                            />
                          </div>
                        </div>
                        {empWeekOffDay === "" || empWeekOffDay === "Fix day" ? (
                          <div className="col-sm-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Day of Week{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <Select
                                options={weekOffDayList1}
                                placeholder={
                                  empDayOfWeek !== "" ? empDayOfWeek : "Select"
                                }
                                required
                                styles={customStyles}
                                onChange={(e) =>
                                  handleChangeSelect(
                                    setDummyId,
                                    setDayOfWeek,
                                    e
                                  )
                                }
                              />
                            </div>
                          </div>
                        ) : null}
                        <div className="col-md-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Department Head
                            </label>
                            <Select
                              options={ptApplicableList}
                              placeholder={
                                designationHead !== ""
                                  ? designationHead
                                  : "Select"
                              }
                              styles={customStyles}
                              onChange={(e) =>
                                handleChangeSelect(
                                  setDummyId,
                                  setDesignationHead,
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Reporting Manager
                            </label>
                            <Select
                              options={reportingManagerList}
                              value={reportingManager}
                              placeholder={
                                reportingManager !== ""
                                  ? reportingManager
                                  : "Select"
                              }
                              styles={customStyles}
                              onChange={(e) =>
                                handleChangeSelect(
                                  setReportingManagerId,
                                  setReportingManager,
                                  e
                                )
                              }
                            />
                          </div>
                        </div>

                        {type === "FTC (Temporary)" ? (
                          <>
                            <div className="col-sm-3">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Probation Joining Date
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="cal-icon">
                                  <DatePicker
                                    selected={probationJoiningDate}
                                    onChange={(date) =>
                                      handleChangeDate(
                                        setProbationJoiningDate,
                                        date
                                      )
                                    }
                                    required
                                    className="form-control floating datetimepicker"
                                    type="date"
                                    dateFormat="dd-MM-yyyy"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Fixation date
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="cal-icon">
                                  <DatePicker
                                    selected={fixationDate}
                                    onChange={(date) =>
                                      handleChangeDate(setFixationDate, date)
                                    }
                                    required
                                    className="form-control floating datetimepicker"
                                    type="date"
                                    dateFormat="dd-MM-yyyy"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Probation Complete Date
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="cal-icon">
                                  <DatePicker
                                    selected={probationCompleteDate}
                                    onChange={(date) =>
                                      handleChangeDate(
                                        setProbationCompleteDate,
                                        date
                                      )
                                    }
                                    required
                                    className="form-control floating datetimepicker"
                                    type="date"
                                    dateFormat="dd-MM-yyyy"
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}

                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Old UAN (If available)
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              maxLength={12}
                              minLength={12}
                              value={empUan}
                              onChange={(e) => setUan(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Old ESIC(If available)
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={empEsic}
                              onChange={(e) => setEsic(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Consultant / Ref. Name
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={consultantName}
                              onChange={(e) =>
                                setConsultantName(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        {type === "FTC (Temporary)" ? (
                          <div className="col-sm-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Employee Contract month
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                value={contractMonth}
                                onChange={(e) =>
                                  setContractMonth(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        ) : null}
                        <div className="col-md-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Employee Photo{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              required
                              accept="image/*"
                              type="file"
                              onChange={(e) => handleChangeEditThumnail(e)}
                            />
                            {empImage !== "" ? (
                              <img
                                alt=""
                                src={URL.createObjectURL(empImage)}
                                style={{
                                  width: "106px",
                                  height: "106px",
                                  marginTop: 10,
                                }}
                              />
                            ) : (
                              <img
                                alt=""
                                src={empImagee}
                                style={{
                                  width: "106px",
                                  height: "106px",
                                  marginTop: 10,
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <h5 className="modal-title-colored">Contact Detail</h5>
                      <div className="row">
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Primary Contact Number
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={phone}
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Secondary Contact Number
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              maxLength={10}
                              minLength={10}
                              value={secondaryPhone}
                              onChange={(e) =>
                                setSecondaryPhone(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Emergency Contact Person Name (1)
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={contactPersonName1}
                              onChange={(e) =>
                                setContactPersonName1(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Relation With Employee
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={contactPersonRelation1}
                              onChange={(e) =>
                                setContactPersonRelation1(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Emergency Contact Person Number
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              maxLength={10}
                              minLength={10}
                              value={contactPersonPhone1}
                              onChange={(e) =>
                                setContactPersonPhone1(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Emergency Contact Person Name (2)
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={contactPersonName2}
                              onChange={(e) =>
                                setContactPersonName2(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Relation With Employee
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={contactPersonRelation2}
                              onChange={(e) =>
                                setContactPersonRelation2(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Emergency Contact Person Number
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              maxLength={10}
                              minLength={10}
                              value={contactPersonPhone2}
                              onChange={(e) =>
                                setContactPersonPhone2(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3"></div>
                        <h5 className="modal-title-colored">Address</h5>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Present Address{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={presentAddress}
                              onChange={(e) =>
                                setPresentAddress(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              City <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={presentCity}
                              onChange={(e) => setPresentCity(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              District <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={presentDistrict}
                              onChange={(e) =>
                                setPresentDistrict(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              State <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={presentState}
                              onChange={(e) => setPresentState(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Pincode <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              maxLength={6}
                              minLength={6}
                              value={presentPincode}
                              onChange={(e) =>
                                setPresentPincode(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3"></div>

                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Permanent Same as Present{" "}
                              <input
                                type="checkbox"
                                onChange={() =>
                                  setPermanentSameAsPresent(
                                    !permanentSameAsPresent
                                  )
                                }
                                required
                                checked={permanentSameAsPresent}
                              />
                              <span className="checkmark"></span>
                              <span className="text-danger">*</span>
                            </label>

                            <input
                              className="form-control"
                              type="text"
                              required
                              value={
                                permanentSameAsPresent === true
                                  ? presentAddress
                                  : permanentAddress
                              }
                              onChange={(e) =>
                                setPermanentAddress(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              City <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={
                                permanentSameAsPresent === true
                                  ? presentCity
                                  : permanentCity
                              }
                              onChange={(e) => setPermanentCity(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              District <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={
                                permanentSameAsPresent === true
                                  ? presentDistrict
                                  : permanentDistrict
                              }
                              onChange={(e) =>
                                setPermanentDistrict(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              State <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={
                                permanentSameAsPresent === true
                                  ? presentState
                                  : permanentState
                              }
                              onChange={(e) =>
                                setPermanentState(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Pincode <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              minLength={6}
                              maxLength={6}
                              value={
                                permanentSameAsPresent === true
                                  ? presentPincode
                                  : permanentPincode
                              }
                              onChange={(e) =>
                                setPermanentPincode(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <h5 className="modal-title-colored">Salary Detail</h5>
                      <div className="row">
                        <div className="col-md-3">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Select Salary Structure{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Select
                              options={salarystructure}
                              placeholder={
                                salaryStructure !== ""
                                  ? salaryStructure
                                  : "Select"
                              }
                              required
                              styles={customStyles}
                              onChange={(e) =>
                                handleChangeSelect(
                                  setDummyId,
                                  setSalaryStructure,
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                        {salaryStructure === "From salary structure" ? (
                          <div className="col-md-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Select Salary Structure{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <Select
                                options={salaryStructureList}
                                placeholder={
                                  salaryStructureName !== ""
                                    ? salaryStructureName
                                    : "Select"
                                }
                                required
                                styles={customStyles}
                                onChange={(e) =>
                                  handleChangeSelect(
                                    setSalaryStructureId,
                                    setSalaryStructureName,
                                    e
                                  )
                                }
                              />
                            </div>
                          </div>
                        ) : salaryStructure === "Mannual entry" ? (
                          <>
                            <div className="col-sm-3">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Basic salary{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  value={empSalary}
                                  onChange={(e) =>
                                    handleSetBasicSalary(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Salary Effective Date
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="cal-icon">
                                  <DatePicker
                                    selected={salaryEffectiveDate}
                                    onChange={(date) =>
                                      handleChangeDate(
                                        setSalaryEffectiveDate,
                                        date
                                      )
                                    }
                                    required
                                    className="form-control floating datetimepicker"
                                    type="date"
                                    dateFormat="dd-MM-yyyy"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Allowences
                                </label>
                                {salaryForm.map((item, i) => (
                                  <>
                                    <div className="row">
                                      <div className="col-md-6" key={i}>
                                        <div className="input-block mb-3">
                                          <label className="col-form-label">
                                            {i + 1}
                                            {`. `}
                                            Name
                                          </label>

                                          <Select
                                            options={allowencesList}
                                            placeholder={"Select"}
                                            styles={customStyles}
                                            onChange={(e) =>
                                              handleChangeSalaryForm(
                                                i,
                                                "name",
                                                e.label
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6" key={i + 1}>
                                        <div className="input-block mb-3">
                                          <label className="col-form-label">
                                            Value
                                          </label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            value={salaryForm[i].value}
                                            onChange={(e) =>
                                              handleChangeSalaryForm(
                                                i,
                                                "value",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ))}
                                {salaryStructure === "Mannual entry" ? (
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
                                ) : null}
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="input-block mb-3">
                                <label className="col-form-label">
                                  Deductions
                                </label>
                                {salaryFormDeduction?.map((item, i) => (
                                  <>
                                    <div className="row">
                                      <div className="col-md-6" key={i}>
                                        <div className="input-block mb-3">
                                          <label className="col-form-label">
                                            {i + 1}
                                            {`. `}
                                            Name
                                          </label>

                                          <Select
                                            options={deductionList}
                                            placeholder={"Select"}
                                            styles={customStyles}
                                            onChange={(e) =>
                                              handleChangeSalaryForm1(
                                                i,
                                                "name",
                                                e.label
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6" key={i + 1}>
                                        <div className="input-block mb-3">
                                          <label className="col-form-label">
                                            Value
                                          </label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            value={salaryFormDeduction[i].value}
                                            onChange={(e) =>
                                              handleChangeSalaryForm1(
                                                i,
                                                "value",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ))}
                                {salaryStructure === "Mannual entry" ? (
                                  <div className="col-md-4">
                                    <div className="input-block mb-3">
                                      <button
                                        className="btn btn-primary submit-btn"
                                        aria-label="Close"
                                        onClick={(e) => handleAddSalaryForm1(e)}
                                      >
                                        + Add More
                                      </button>
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>

                      <h5 className="modal-title-colored">
                        Compliances Detail
                      </h5>

                      <div
                        className="table-responsive m-t-15"
                        style={{ overflowX: "initial" }}
                      >
                        <table className="table table-striped custom-table">
                          <thead>
                            <tr>
                              <th>Compliances</th>
                              <th className="text-center">Yes/No</th>
                              <th className="text-center">Effective Date</th>
                              <th className="text-center">Employee Share</th>
                              <th className="text-center">Employer Share</th>
                              <th className="text-center">UAN Number</th>
                              <th className="text-center">PF A/C No.</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>EPF Applicable</td>
                              <td>
                                <label className="custom_check">
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      handleCheckboxChange(
                                        tableData1[0].module,
                                        "yes"
                                      )
                                    }
                                    checked={tableData1[0].yes}
                                  />

                                  <span className="checkmark"></span>
                                </label>
                              </td>
                              <td>
                                <input
                                  style={{ width: "122px" }}
                                  type="text"
                                  placeholder="DD-MM-YYYY"
                                  value={empJoinDate?.toString()?.slice(0, 16)}
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.target.value,
                                      0,
                                      "dateofjoining"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <Select
                                  options={employeShareList}
                                  placeholder={
                                    tableData1[0]?.employeeshare !== ""
                                      ? tableData1[0]?.employeeshare
                                      : "Select"
                                  }
                                  styles={customStyles}
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.label,
                                      0,
                                      "employeeshare"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <Select
                                  options={employeShareList}
                                  placeholder={
                                    tableData1[0]?.employershare !== ""
                                      ? tableData1[0]?.employershare
                                      : "Select"
                                  }
                                  styles={customStyles}
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.label,
                                      0,
                                      "employershare"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.target.value,
                                      0,
                                      "uan"
                                    )
                                  }
                                  style={{ width: "122px" }}
                                  value={tableData1[0]?.uan}
                                  maxLength={12}
                                  minLength={12}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.target.value,
                                      0,
                                      "pfacno"
                                    )
                                  }
                                  style={{ width: "122px" }}
                                  value={tableData1[0]?.pfacno}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div
                        className="table-responsive m-t-15"
                        style={{ overflowX: "initial" }}
                      >
                        <table className="table table-striped custom-table">
                          <thead>
                            <tr>
                              <th>Compliances</th>
                              <th className="text-center">Yes/No</th>
                              <th className="text-center">Effective Date</th>
                              <th className="text-center">Cont. Calculation</th>
                              <th className="text-center">
                                Value (Amnt / Percent)
                              </th>
                              <th className="text-center">Working Day Apply</th>
                              {/* <th className="text-center">Close Date</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>VPF Applicable</td>
                              <td>
                                <label className="custom_check">
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      handleCheckboxChange(
                                        tableData1[1].module,
                                        "yes"
                                      )
                                    }
                                    checked={tableData1[1]?.yes}
                                  />

                                  <span className="checkmark"></span>
                                </label>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={empJoinDate?.toString()?.slice(0, 16)}
                                  style={{ width: "122px" }}
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.target.value,
                                      1,
                                      "dateofjoining"
                                    )
                                  }
                                  placeholder="DD-MM-YYYY"
                                />
                              </td>
                              <td>
                                <Select
                                  options={contCalList}
                                  placeholder={
                                    tableData1[1]?.contcal !== ""
                                      ? tableData1[1]?.contcal
                                      : "Select"
                                  }
                                  styles={customStyles}
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.label,
                                      1,
                                      "contcal"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.target.value,
                                      1,
                                      "value"
                                    )
                                  }
                                  style={{ width: "122px" }}
                                  value={tableData1[1]?.value}
                                />
                              </td>
                              <td>
                                <Select
                                  options={ptApplicableList}
                                  placeholder={
                                    tableData1[1]?.workingdayapply !== ""
                                      ? tableData1[1]?.workingdayapply
                                      : "Select"
                                  }
                                  styles={customStyles}
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.label,
                                      1,
                                      "workingdayapply"
                                    )
                                  }
                                />
                              </td>
                              {/* <td>
                            <input
                              type="text"
                              onChange={(e) =>
                                handleChangeApplicableLaw(
                                  e.target.value,
                                  1,
                                  "closedate"
                                )
                              }
                              required
                              style={{width: "122px"}}
                              value={tableData1[1]?.closedate}
                              placeholder="DD-MM-YYYY"
                            />
                          </td> */}
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div
                        className="table-responsive m-t-15"
                        style={{ overflowX: "initial" }}
                      >
                        <table className="table table-striped custom-table">
                          <thead>
                            <tr>
                              <th>Compliances</th>
                              <th className="text-center">Yes/No</th>
                              <th className="text-center">Effective Date</th>
                              <th className="text-center">ESIC Number</th>
                              <th className="text-center">Dispansery Name</th>
                              <th className="text-center">Remark</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>ESIC Applicable</td>
                              <td>
                                <label className="custom_check">
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      handleCheckboxChange(
                                        tableData1[2].module,
                                        "yes"
                                      )
                                    }
                                    checked={tableData1[2]?.yes}
                                  />

                                  <span className="checkmark"></span>
                                </label>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={empJoinDate?.toString()?.slice(0, 16)}
                                  style={{ width: "122px" }}
                                  placeholder="DD-MM-YYYY"
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.target.value,
                                      2,
                                      "dateofjoining"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.target.value,
                                      2,
                                      "esicnumber"
                                    )
                                  }
                                  style={{ width: "122px" }}
                                  value={tableData1[2]?.esicnumber}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.target.value,
                                      2,
                                      "dispenceryname"
                                    )
                                  }
                                  style={{ width: "122px" }}
                                  value={tableData1[2]?.dispenceryname}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.target.value,
                                      2,
                                      "remark"
                                    )
                                  }
                                  style={{ width: "122px" }}
                                  value={tableData1[2]?.remark}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div
                        className="table-responsive m-t-15"
                        style={{ overflowX: "initial" }}
                      >
                        <table className="table table-striped custom-table">
                          <thead>
                            <tr>
                              <th>Compliances</th>
                              <th className="text-center">Yes/No</th>
                              <th className="text-center">Effective Date</th>
                              <th className="text-center">PT Applicable</th>
                              <th className="text-center">Applicable Date</th>
                              <th className="text-center">W.F. Applicable</th>
                              <th className="text-center">Applicable From</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>TDS Applicable</td>
                              <td>
                                <label className="custom_check">
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      handleCheckboxChange(
                                        tableData1[3].module,
                                        "yes"
                                      )
                                    }
                                    checked={tableData1[3]?.yes}
                                  />

                                  <span className="checkmark"></span>
                                </label>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={empJoinDate?.toString()?.slice(0, 16)}
                                  style={{ width: "122px" }}
                                  placeholder="DD-MM-YYYY"
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.target.value,
                                      3,
                                      "dateofjoining"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <Select
                                  options={ptApplicableList}
                                  placeholder={
                                    tableData1[3]?.ptapplicable !== ""
                                      ? tableData1[3]?.ptapplicable
                                      : "Select"
                                  }
                                  styles={customStyles}
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.label,
                                      3,
                                      "ptapplicable"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.target.value,
                                      3,
                                      "applicabledate"
                                    )
                                  }
                                  style={{ width: "122px" }}
                                  value={tableData1[3]?.applicabledate}
                                  placeholder="DD-MM-YYYY"
                                />
                              </td>
                              <td>
                                <Select
                                  options={ptApplicableList}
                                  placeholder={
                                    tableData1[3]?.wfapplicable !== ""
                                      ? tableData1[3]?.wfapplicable
                                      : "Select"
                                  }
                                  styles={customStyles}
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.label,
                                      3,
                                      "wfapplicable"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder="DD-MM-YYYY"
                                  onChange={(e) =>
                                    handleChangeApplicableLaw(
                                      e.target.value,
                                      3,
                                      "applicablefrom"
                                    )
                                  }
                                  style={{ width: "122px" }}
                                  value={tableData1[3]?.applicablefrom}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <h5 className="modal-title-colored">KYC Detail</h5>
                      <div className="table-responsive m-t-15">
                        <table className="table table-striped custom-table">
                          <thead>
                            <tr>
                              <th>Aadhar Doc</th>
                              <th className="text-center">Aadhar Number</th>
                              <th className="text-center">Upload</th>
                              <th className="text-center">Uploaded Image</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                Aadhar <span className="text-danger">*</span>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={empAadhar}
                                  maxLength={12}
                                  minLength={12}
                                  required
                                />
                              </td>
                              <td>
                                <input
                                  type="file"
                                  onChange={(e) =>
                                    setAadharImage(e.target.files[0])
                                  }
                                />
                              </td>
                              <td>
                                {aAdharImage !== "" ? (
                                  <img
                                    src={URL.createObjectURL(aAdharImage)}
                                    style={{
                                      width: "100px",
                                      height: "80px",
                                      marginTop: 10,
                                    }}
                                  />
                                ) : null}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="table-responsive m-t-15">
                        <table className="table table-striped custom-table">
                          <thead>
                            <tr>
                              <th>Pan Doc</th>
                              <th className="text-center">Pan Number</th>
                              <th className="text-center">Upload</th>
                              <th className="text-center">Uploaded Image</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Pan</td>
                              <td>
                                <input
                                  type="text"
                                  value={empPan}
                                  maxLength={10}
                                  minLength={10}
                                />
                              </td>
                              <td>
                                <input
                                  type="file"
                                  onChange={(e) =>
                                    setPanImage(e.target.files[0])
                                  }
                                />
                              </td>
                              <td>
                                {panImage !== "" ? (
                                  <img
                                    src={URL.createObjectURL(panImage)}
                                    style={{
                                      width: "100px",
                                      height: "80px",
                                      marginTop: 10,
                                    }}
                                  />
                                ) : null}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="table-responsive m-t-15">
                        <table className="table table-striped custom-table">
                          <thead>
                            <tr>
                              <th>Passport Doc</th>
                              <th className="text-center">Passport Number</th>
                              <th className="text-center">Expiry Date</th>
                              <th className="text-center">Upload</th>
                              <th className="text-center">Uploaded Image</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Passport</td>
                              <td>
                                <input
                                  type="text"
                                  onChange={(e) => setPassport(e.target.value)}
                                  value={passport}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder="DD-MM-YYYY"
                                  onChange={(e) =>
                                    setPassportExpiryDate(e.target.value)
                                  }
                                  value={passportExpiryDate}
                                />
                              </td>
                              <td>
                                <input
                                  type="file"
                                  onChange={(e) =>
                                    setPassportImage(e.target.files[0])
                                  }
                                />
                              </td>

                              <td>
                                {passportImage !== "" ? (
                                  <img
                                    src={URL.createObjectURL(passportImage)}
                                    style={{
                                      width: "100px",
                                      height: "80px",
                                      marginTop: 10,
                                    }}
                                  />
                                ) : null}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="table-responsive m-t-15">
                        <table className="table table-striped custom-table">
                          <thead>
                            <tr>
                              <th>Bank Doc</th>
                              <th className="text-center">Account Number</th>
                              <th className="text-center">IFSC Code</th>
                              <th className="text-center">Bank Name</th>
                              <th className="text-center">Upload passbook</th>
                              <th className="text-center">Uploaded passbook</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                Bank <span className="text-danger">*</span>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  onChange={(e) =>
                                    setBankAccountNumber(e.target.value)
                                  }
                                  value={bankAccountNumber}
                                  required
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  onChange={(e) => setIfscCode(e.target.value)}
                                  value={ifscCode}
                                  required
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  onChange={(e) => setBankName(e.target.value)}
                                  value={bankName}
                                  required
                                />
                              </td>
                              <td>
                                <input
                                  type="file"
                                  onChange={(e) =>
                                    setPassbookImage(e.target.files[0])
                                  }
                                />
                              </td>

                              <td>
                                {passbookImage !== "" ? (
                                  <img
                                    src={URL.createObjectURL(passbookImage)}
                                    style={{
                                      width: "100px",
                                      height: "80px",
                                      marginTop: 10,
                                    }}
                                  />
                                ) : null}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="table-responsive m-t-15">
                        <table className="table table-striped custom-table">
                          <thead>
                            <tr>
                              <th>Police Verification</th>
                              <th className="text-center">Certificate No.</th>
                              <th className="text-center">Expiry Date</th>

                              <th className="text-center">
                                Upload Certificate
                              </th>
                              <th className="text-center">
                                Uploaded Certificate
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Police Verification</td>
                              <td>
                                <input
                                  type="text"
                                  onChange={(e) =>
                                    setPoliceVerifiedCertificateNo(
                                      e.target.value
                                    )
                                  }
                                  value={policeVerifiedCertificateNo}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  onChange={(e) =>
                                    setPoliceVerifiedExpiryDate(e.target.value)
                                  }
                                  value={policeVerifiedExpiryDate}
                                />
                              </td>

                              <td>
                                <input
                                  type="file"
                                  onChange={(e) =>
                                    setPoliceVerifiedCertificateImage(
                                      e.target.files[0]
                                    )
                                  }
                                />
                              </td>

                              <td>
                                {policeVerifiedCertificateImage !== "" ? (
                                  <img
                                    src={URL.createObjectURL(
                                      policeVerifiedCertificateImage
                                    )}
                                    style={{
                                      width: "100px",
                                      height: "80px",
                                      marginTop: 10,
                                    }}
                                  />
                                ) : null}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <h5
                        className="modal-title-colored"
                        style={{ marginTop: 10 }}
                      >
                        Education Detail
                      </h5>

                      {educationList.map((item, i) => (
                        <div className="row" key={i}>
                          <div className="col-md-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                {i + 1} Education Name
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                value={item?.educationName}
                                onChange={(e) =>
                                  handleChangeEducation(
                                    e.target.value,
                                    i,
                                    "educationName"
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                passing Year
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                value={item?.passingYear}
                                onChange={(e) =>
                                  handleChangeEducation(
                                    e.target.value,
                                    i,
                                    "passingYear"
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Certificate
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                onChange={(e) =>
                                  handleChangeEducation(
                                    e.target.files[0],
                                    i,
                                    "certificate"
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <div>
                        <button
                          className="btn btn-primary"
                          style={{ alignSelf: "flex-start" }}
                          // data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={(e) => handleAddMoreEducation(e)}
                        >
                          + Add
                        </button>
                      </div>

                      <h5
                        className="modal-title-colored"
                        style={{ marginTop: 10 }}
                      >
                        Experience Detail
                      </h5>

                      {experienceList.map((item, i) => (
                        <div className="row" key={i}>
                          <div className="col-md-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                {i + 1} Company Name
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                value={item?.companyName}
                                onChange={(e) =>
                                  handleChangeExperience(
                                    e.target.value,
                                    i,
                                    "companyName"
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Designation
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                value={item?.designation}
                                onChange={(e) =>
                                  handleChangeExperience(
                                    e.target.value,
                                    i,
                                    "designation"
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">From</label>
                              <input
                                className="form-control"
                                type="text"
                                value={item?.from}
                                placeholder="DD-MM-YYYY"
                                onChange={(e) =>
                                  handleChangeExperience(
                                    e.target.value,
                                    i,
                                    "from"
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">To</label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="DD-MM-YYYY"
                                value={item?.to}
                                onChange={(e) =>
                                  handleChangeExperience(
                                    e.target.value,
                                    i,
                                    "to"
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Certificate
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                onChange={(e) =>
                                  handleChangeExperience(
                                    e.target.files[0],
                                    i,
                                    "certificate"
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <div>
                        <button
                          className="btn btn-primary"
                          style={{ alignSelf: "flex-start" }}
                          // data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={(e) => handleAddMoreExperience(e)}
                        >
                          + Add
                        </button>
                      </div>

                      <h5
                        className="modal-title-colored"
                        style={{ marginTop: 10 }}
                      >
                        Service Record
                      </h5>

                      {serviceRecordList.map((item, i) => (
                        <div className="row" key={i}>
                          <div className="col-md-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                {i + 1} Letter Name
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                value={item?.letterName}
                                onChange={(e) =>
                                  handleChangeService(
                                    e.target.value,
                                    i,
                                    "letterName"
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">Date</label>
                              <input
                                className="form-control"
                                type="text"
                                value={item?.date}
                                placeholder="DD-MM-YYYY"
                                onChange={(e) =>
                                  handleChangeService(e.target.value, i, "date")
                                }
                              />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="input-block mb-3">
                              <label className="col-form-label">
                                Attachment
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                onChange={(e) =>
                                  handleChangeService(
                                    e.target.files[0],
                                    i,
                                    "certificate"
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <div>
                        <button
                          className="btn btn-primary"
                          style={{ alignSelf: "flex-start" }}
                          // data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={(e) => handleAddMoreServiceRecord(e)}
                        >
                          + Add
                        </button>
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
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div
          id="add_employee"
          className="modal custom-modal fade"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <ErrorAlerts
                text="Please add all general parameter"
                setShowAlert={setErrorAlert}
              />

              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllEmployeeAddPopup;
