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

const DailyBasisAttendence = () => {
  var time = new Date();
  const [empList, setEmpList] = useState([]);
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
  const present = [
    { value: 1, label: "Present" },
    { value: 2, label: "Weekly Off" },
    { value: 3, label: "Festival Holiday" },
    { value: 4, label: "Hold" },
  ];

  useEffect(() => {
    getEmployeeList();
  }, [searchDataDepartment, searchDataBranch]);

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
        setDepartmentList(newData);
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
          object.value = object.id;
          object.label = object.leaveShortName;
        });
        setLeaveList([...newData, ...present]);
      })
      .catch((err) => {});
  };

  const getEmployeeList = async () => {
    setLoading(true);
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
        setEmpList(newData);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
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
      sorter: (a, b) => a.name.length - b.name.length,
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
      render: (i, record) => (
        <div className="input-block mb-1" >
          <Select
            required
            options={leaveList}
            placeholder={"Select"}
            styles={customStyles}
            onChange={(e) => {
              setPresentData(e.label);
              setLeaveData(e.label);
            }}
          />
        </div>
      ),
    },

    {
      title: "Action",
      sorter: true,
      render: (i, record) => (
        <span>
          <div>
            <button
              className="btn btn-primary"
              // data-bs-dismiss="modal"
              aria-label="Close"
              onClick={(e) => handleMarkAttendence(e, record.id)}
            >
              {loading1 === true ? (
                <div className="spinner-border m-0" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </span>
      ),
    },
  ];

  const handleMarkAttendence = async (e, empid) => {
    e.preventDefault();
    if (
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== ""
    ) {
      setLoading1(true);
      const data = {
        punchIn: time.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        date: selectedDate1.toString(),
        empId: empid,
        companyId: localStorage.getItem("userId"),
        presentData: presentData,
        leaveData: leaveData,
        type: "daily",
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
            maintitle="Daily Attendence"
            title="Dashboard"
            subtitle="Daily Attendence"
            modal="#add_employee"
            // name="Add Employee"
            Linkname="/employees"
            Linkname1="/employees-list"
          />
          {/* /Page Header */}
          <h2>Attendence Date: {selectedDate1.toDateString()}</h2>
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
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive" style={{ overflowX: "initial" }}>
                {loading === true ? (
                  <div className="spinner-border m-0" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <Table
                    className="table-striped"
                    columns={columns}
                    dataSource={empList}
                    rowKey={(record) => record.id}
                  />
                )}
                {/* <SearchBox /> */}
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </div>
  );
};

export default DailyBasisAttendence;
