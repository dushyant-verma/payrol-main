import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AttendanceEmployeeFilter from "../../../components/AttendanceEmployeeFilter";
import { base_url } from "../../../base_urls";
import { UpdateApi } from "../../../utils/UpdateApi";
import { CreateApi } from "../../../utils/PostApi";
import { GetApi } from "../../../utils/GetApi";

const EmployeeCompleteAttendence = () => {
  var time = new Date();
  const [users, setUsers] = useState([]);
  const [activity, setActivity] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [punchIn, setPunchIn] = useState(false);
  const [punchIndata, setPunchIndata] = useState([]);
  const [punchOutdata, setPunchOutdata] = useState([]);
  const [attendenceData, setAttenedenceData] = useState([]);
  const [todayactivity, setTodayActivity] = useState([]);

  const userElements = data?.map((user, index) => ({
    key: index,
    id: user.id,
    Date: user.Date,
    PunchIn: user.PunchIn,
    PunchOut: user.PunchOut,
    Production: user.Production,
    Break: user.Break,
    Overtime: user.Overtime,
  }));

  const columns = [
    {
      title: "Employee Id",
      dataIndex: "empId",
      sorter: (a, b) => a.empId.length - b.empId.length,
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "PunchIn",
      dataIndex: "punchIn",
      sorter: (a, b) => a.punchIn.length - b.punchIn.length,
    },
    {
      title: "PunchOut",
      dataIndex: "punchOut",
      sorter: (a, b) => a.punchOut.length - b.punchOut.length,
    },
  ];
  // useEffect(() => {
  //   axios
  //     .get(base_url + "/api/attendenceemployeedatatable.json")
  //     .then((res) => setData(res.data));
  // }, []);

  // useEffect(() => {
  //   axios.get(base_url + "/api/attendenceemployee.json").then((res) => {
  //     // Assuming the API response is an array of objects
  //     const apiData = res.data;
  //     // Map the API data to the statisticsData format
  //     const mappedData = apiData?.map((data) => ({
  //       title: data.title,
  //       value: data.value,
  //       valuespan: data.valuespan,
  //       progressWidth: data.progressWidth,
  //       progressBarColor: data.progressBarColor,
  //     }));
  //     setUsers(mappedData);
  //   });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(base_url + "/api/attendenceemployeeactivity.json")
  //     .then((res) => setActivity(res.data));
  // }, []);

  const handleMarkAttendence = async (status) => {
    if (
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== ""
    ) {
      setLoading(true);
      const data = {
        punchIn: time.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        date: new Date().toString(),
        empId: localStorage.getItem("userId"),
        companyId: localStorage.getItem("userId"),
        lastStatus: status,
        presentData: "Punchin",
        leaveData: "Punchin",
        type: "self",
      };

      const data1 = {
        punchOut: time.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        date: new Date().toString(),
        empId: localStorage.getItem("userId"),
        companyId: localStorage.getItem("userId"),
        lastStatus: status,
        presentData: "Punchout",
        leaveData: "Punchout",
        type: "self",
      };

      await CreateApi("empattendence", status === "punchIn1" ? data : data1)
        .then((res) => {
          if (res) {
            setLoading(false);

            if (status === "punchIn1") {
              setPunchIn(true);
            } else {
              setPunchIn(false);
            }
            getEmpAttendence();
          }
        })
        .catch((err) => {
          // setShowApiAlert(true);
          setLoading(false);
        });
    } else {
      // setShowAlert(true);
    }
  };

  useEffect(() => {
    getEmpAttendence();
  }, []);

  const getEmpAttendence = async () => {
    setLoading(true);
    await GetApi("empattendence", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        let punchInData1 = newData?.filter((item) =>
          JSON.stringify(item).includes("punchIn")
        );
        punchInData1.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });

        setPunchIndata(punchInData1);

        let punchOutData1 = newData?.filter((item) =>
          JSON.stringify(item).includes("punchOut")
        );

        punchOutData1.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        setPunchOutdata(punchOutData1);

        newData.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });

        setAttenedenceData(newData);

        let todayActivity = newData?.filter(
          (item) =>
            item?.date?.slice(0, 15) === new Date().toString()?.slice(0, 15)
        );

        setTodayActivity(todayActivity);

        if (newData[0]?.lastStatus === "punchIn1") {
          setPunchIn(true);
        } else {
          setPunchIn(false);
        }

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  

  const ActivityData = (item) => {
    return (
      <li key={item?.item?.i}>
        <p className="mb-0">
          {item?.item?.lastStatus === "punchIn1"
            ? "Punch In at"
            : "Punch Out at"}
        </p>
        <p className="res-activity-time">
          <i className="fa-regular fa-clock"></i>{" "}
          {item?.item?.lastStatus === "punchIn1"
            ? item?.item?.punchIn
            : item?.item?.punchOut}
        </p>
      </li>
    );
  };

  return (
    <>
      <div className="page-wrapper">
        {/* /Page Header */}
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Attendance"
            title="Dashboard"
            subtitle="Attendance"
          />

          {/* /Page Header */}
          <div className="row">
            <div className="col-md-4">
              <div className="card punch-status">
                <div className="card-body">
                  <h5 className="card-title">
                    Timesheet{" "}
                    <small className="text-muted">
                      {new Date().toDateString()}
                    </small>
                  </h5>
                  <div className="punch-det">
                    <h6>Punch In at</h6>
                    <p>
                      {punchIndata[punchIndata?.length - 1]?.date?.slice(0, 16)}{" "}
                      {punchIndata[punchIndata?.length - 1]?.punchIn}
                    </p>
                  </div>
                  {punchIn === true ? (
                    <div className="punch-info">
                      <div
                        className="punch-hours"
                        style={{ borderColor: "#6FD12F" }}
                      >
                        <span>Active</span>
                      </div>
                    </div>
                  ) : (
                    <div className="punch-info">
                      <div
                        className="punch-hours"
                        style={{ borderColor: "#CF2828" }}
                      >
                        <span>In Active</span>
                      </div>
                    </div>
                  )}

                  <div className="punch-btn-section">
                    <button
                      type="button"
                      className="btn btn-primary punch-btn"
                      onClick={() => handleMarkAttendence("punchIn1")}
                      disabled={punchIn===true ? true:false}
                    >
                      Punch In
                    </button>
                  </div>

                  <div className="punch-btn-section">
                    <button
                      type="button"
                      className="btn btn-primary punch-btn"
                      onClick={() => handleMarkAttendence("punchOut1")}
                      disabled={punchIn===true ? false:true}
                    >
                      Punch Out
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card recent-activity">
                <div className="card-body">
                  <h5 className="card-title">Today Activity</h5>
                  <ul className="res-activity-list">
                    {todayactivity.length > 0 ? (
                      todayactivity?.map((item, i) => (
                        <ActivityData item={item} i={i} />
                      ))
                    ) : (
                      <p>No activities available.</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* <AttendanceEmployeeFilter /> */}
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={
                      attendenceData?.length > 0 ? attendenceData : []
                    }
                    className="table-striped"
                    rowKey={(record) => record.id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeCompleteAttendence;
