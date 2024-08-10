import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Table } from "antd";
import EmployeeListFilter from "../../../components/EmployeeListFilter";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AllEmployeeAddPopup from "../../../components/modelpopup/AllEmployeeAddPopup";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import { GetApi, GetFilteredEmployeeList } from "../../../utils/GetApi";
import AllEmployeeEditPopup from "../../../components/modelpopup/AllEmployeeEditPopup";
import Select from "react-select";
import { CreateApi } from "../../../utils/PostApi";
import DatePicker from "react-datepicker";

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

const MonthlyBasisAttendence = () => {
  var time = new Date();
  const [empList, setEmpList] = useState([]);
  const [empSortedList, setEmpSortedList] = useState([]);

  const [sortingValue, setSortingValue] = useState("");
  const [searchDataBranch, setSearchdataBranch] = useState("");
  const [searchDataDepartment, setSearchdataDepartment] = useState("");
  const [selectedDate1, setSelectedDate1] = useState(new Date());

  const [branchList, setBranchList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [leaveList, setLeaveList] = useState([]);
  const [presentData, setPresentData] = useState("");
  const [leaveData, setLeaveData] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [empStatusData, setEmpStatusData] = useState([
    { name: "", value: 0, empid: "" },
  ]);

  const present = [
    { value: 1, label: "Present", val: 0 },
    { value: 2, label: "Weekly Off", val: 0 },
    { value: 3, label: "Festival Holiday", val: 0 },
    { value: 4, label: "Hold", val: 0 },
  ];
  const dept = [{ value: "All", label: "All" }];

  const sort = [
    { value: 1, label: "Name" },
    { value: 2, label: "Emp ID" },
  ];

  useEffect(() => {
    getEmployeeList();
  }, [searchDataDepartment, searchDataBranch, sortingValue]);

  useEffect(() => {
    getBranchList();
    getDepartmentList();
    getLeaveList();
  }, []);

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
  const getDepartmentList = async () => {
    await GetApi("departments", "createdBy", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        newData.forEach((object) => {
          object.value = object.id;
          object.label = object.departmentName;
        });
        setDepartmentList([...dept, ...newData]);
      })
      .catch((err) => {});
  };

  const getLeaveList = async () => {
    await GetApi("leaveparameters", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        newData.forEach((object) => {
          object.value = 0;
          object.label = object.leaveShortName;
          object.val = object.val;
        });
        setLeaveList([...newData, ...present]);
      })
      .catch((err) => {});
  };

  const getEmployeeList = async () => {
    setLoading(true);
    if (searchDataDepartment === "All") {
      setSearchdataBranch("");
      await GetApi("employee", localStorage.getItem("userId"))
        .then((res) => {
          const newData = res.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          if (sortingValue === "") {
            setEmpList(newData);
          } else {
            if (sortingValue === "Name") {
              const compare = (a, b) => {
                if (a.name > b.name) {
                  return -1;
                } else if (a.name > b.name) {
                  return 1;
                } else {
                  return 0;
                }
              };
              const sortedList = newData.sort(compare);
              setEmpList(sortedList);
            } else {
              const compare = (a, b) => {
                if (a.empId < b.empId) {
                  return -1;
                } else if (a.empId > b.empId) {
                  return 1;
                } else {
                  return 0;
                }
              };
              const sortedList = newData.sort(compare);
              setEmpList(sortedList);
            }
          }

          setLoading(false);
        })
        .catch((err) => setLoading(false));
    } else {
      await GetFilteredEmployeeList(
        "employee",
        searchDataBranch,
        searchDataDepartment,
        localStorage.getItem("userId")
      )
        .then((res) => {
          const newData = res.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          if (sortingValue === "") {
            setEmpList(newData);
          } else {
            if (sortingValue === "Name") {
              const compare = (a, b) => {
                if (a.name > b.name) {
                  return -1;
                } else if (a.name > b.name) {
                  return 1;
                } else {
                  return 0;
                }
              };
              const sortedList = newData.sort(compare);
              setEmpList(sortedList);
            } else {
              const compare = (a, b) => {
                if (a.empId < b.empId) {
                  return -1;
                } else if (a.empId > b.empId) {
                  return 1;
                } else {
                  return 0;
                }
              };
              const sortedList = newData.sort(compare);
              setEmpList(sortedList);
            }
          }
          setLoading(false);
        })
        .catch((err) => setLoading(false));
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span className="table-avatar">
          <Link to="/profile" state={record} className="avatar">
            <img alt="" src={record.empImage} />
          </Link>
          <Link to="/profile" state={record}>
            <span>{record.name}</span>
          </Link>
        </span>
      ),
      sorter: (a, b) => a < b,
    },
    {
      title: "Employee ID",
      dataIndex: "empId",
      sorter: (a, b) => a.empId.length - b.empId.length,
    },

    {
      title: "Designation",
      sorter: true,
      render: (i, record) => <span>{record.empDesignationName}</span>,
    },

    {
      title: "Status",
      sorter: true,
      render: (ii, record) => (
        <d>
          <div className="input-block mb-1" style={{ display: "ruby" }}>
            {leaveList?.map((item, i) => (
              <div className="row" key={i}>
                <div className="col-md-4">
                  <div className="input-block mb-1">
                    <label className="col-form-label">{item?.label}</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-block mb-1">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="0"
                      name={item?.label}
                      onChange={(e) => handleChangeStatusData(e, i, record.id)}
                      value={
                        empStatusData[i] !== undefined
                          ? empStatusData[i].val
                          : 0
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </d>
      ),
    },
  ];

  const handleChangeStatusData = (e, i, id) => {
    let list = [...leaveList];
    delete list[0].companyId;
    delete list[0].createdDate;
    delete list[0].dayMothYearDate;
    delete list[0].empid;
    delete list[0].id;
    delete list[0].leaveAllotment;
    delete list[0].leaveCarryForward;
    delete list[0].leaveDate;
    delete list[0].leaveEligblity;
    delete list[0].leaveEncashmentSalary;
    delete list[0].leaveEncashmentSchedule;
    delete list[0].leaveEncasment;
    delete list[0].leaveShortName;
    delete list[0].leaveType;
    delete list[0].maxCarryForward;
    delete list[0].updatedDate;
    delete list[0].wefDate;

    list[i]["label"] = e.target.name;
    list[i]["val"] = parseInt(e.target.value);

    // list.forEach((object) => {
    //   object.empid = id;
    // });
    setEmpStatusData(list);
  };

  const handleMarkAttendence = async (e) => {
    e.preventDefault();
    setLoading1(true);
    for (var i = 0; i < empList.length; i++) {
      if (
        localStorage.getItem("userId") !== undefined &&
        localStorage.getItem("userId") !== null &&
        localStorage.getItem("userId") !== ""
      ) {
        const data = {
          punchIn: time.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          date: selectedDate1.toString(),
          empId: empList[i].id,
          companyId: localStorage.getItem("userId"),
          presentData: presentData,
          leaveData: leaveData,
          attendenceStatus: empStatusData,
          type: "monthly",
          lastStatus: presentData === "Present" ? "punchIn1" : "punchOut1",
        };

        await CreateApi("empattendence", data)
          .then((res) => {
            
            if (res) {
              setLoading1(false);
            }
          })
          .catch((err) => {
            setLoading1(false);
          });
      } else {
      }

      if(i === (empList.length - 1)){
        alert("Attendence updated")
      }
    }
  };
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };

  return (
    <div>
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Monthly Attendence"
            title="Dashboard"
            subtitle="Monthly Attendence"
            modal="#add_employee"
            // name="Add Employee"
            Linkname="/employees"
            Linkname1="/employees-list"
          />
          {/* /Page Header */}
          <h2>
            Attendence Month: {selectedDate1?.toDateString()?.slice(4, 15)}
          </h2>
          <div className="row filter-row">
            <div className="col-sm-3">
              <div className="input-block mb-3">
                <Select
                  options={departmentList}
                  placeholder={"Select Department"}
                  styles={customStyles}
                  onChange={(e) => setSearchdataDepartment(e.value)}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="input-block mb-3">
                <Select
                  options={branchList}
                  placeholder={"Select Branch"}
                  styles={customStyles}
                  onChange={(e) => setSearchdataBranch(e.value)}
                  isDisabled={searchDataDepartment === "All" ? true : false}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="cal-icon">
                <DatePicker
                  selected={selectedDate1}
                  onChange={handleDateChange1}
                  className="form-control floating datetimepicker"
                  type="date"
                  dateFormat="dd-MM-yyyy"
                  maxDate={new Date()}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="input-block mb-3">
                <Select
                  options={sort}
                  placeholder={"Select sort by"}
                  styles={customStyles}
                  onChange={(e) => setSortingValue(e.label)}
                />
              </div>
            </div>
          </div>
          <div className="input-block mb-1" style={{ display: "flex" }}>
            {leaveList?.map((item, i) => (
              <span style={{ display: "flex" }}>
                <div className="col-md-3" key={i}>
                  <div className="input-block mb-1">
                    <label className="col-form-label">{item?.label}</label>
                  </div>
                </div>
                <div className="col-md-4" key={i}>
                  <div className="input-block mb-1">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="0"
                      name={item?.label}
                      onChange={(e) => handleChangeStatusData(e, i)}
                    />
                  </div>
                </div>
              </span>
            ))}
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                {loading === true ? (
                  <div className="spinner-border m-0" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    <Table
                      className="table-striped"
                      columns={columns}
                      dataSource={empList}
                      rowKey={(record) => record.id}
                    />
                  </>
                )}
                {/* <SearchBox /> */}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: 10,
                }}
              >
                <button
                  className="btn btn-primary"
                  disabled={loading}
                  onClick={(e) => handleMarkAttendence(e)}
                >
                  {loading === true ? "Please wait..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </div>
  );
};

export default MonthlyBasisAttendence;
