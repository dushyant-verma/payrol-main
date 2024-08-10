import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { Table } from "antd";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import ShiftModelPopup from "../../../components/modelpopup/ShiftModelPopup";
import ScheduleModelPopup from "../../../components/modelpopup/ScheduleModelPopup";
import SearchBox from "../../../components/SearchBox";
import { GetApi } from "../../../utils/GetApi";

const ShiftList = () => {
  const [shiftsData, setShiftsData] = useState([]);
  const [deleteId, setDeleteId] = useState("");

  const me = 1;

  const columns = [
    {
      title: "Shift Name",
      dataIndex: "shiftName",
      className: me - 1,
      sorter: (a, b) => a.shiftName.length - b.shiftName.length,
    },
    {
      title: "Min Start Time",
      dataIndex: "minStartTime",
      className: me - 1,
      sorter: (a, b) => a.minStartTime.length - b.minStartTime.length,
    },

    {
      title: "Start Time",
      dataIndex: "startTime",
      className: me - 1,
      sorter: (a, b) => a.startTime.length - b.startTime.length,
    },

    {
      title: "Max Start Time",
      dataIndex: "maxStartTime",
      className: me - 1,

      sorter: (a, b) => a.maxStartTime.length - b.maxStartTime.length,
    },

    {
      title: "Min End Time",
      dataIndex: "minEndDay",

      sorter: (a, b) => a.minEndDay.length - b.minEndDay.length,
    },
    {
      title: "End Time",
      dataIndex: "endDay",

      sorter: (a, b) => a.endDay.length - b.endDay.length,
    },
    {
      title: "Max End Time",
      dataIndex: "maxEndDay",

      sorter: (a, b) => a.maxEndDay.length - b.maxEndDay.length,
    },
    {
      title: "Break Time",
      dataIndex: "breakTime",

      sorter: (a, b) => a.breakTime.length - b.breakTime.length,
    },

    {
      title: "Action",
      render: (record) => (
        <div className="dropdown dropdown-action">
          <Link
            to="#"
            className="action-icon dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete"
              onClick={() => setDeleteId(record.id)}
            >
              <i className="fa fa-trash m-r-5" /> Delete
            </Link>
          </div>
        </div>
      ),
      sorter: true,
    },
  ];

  useEffect(() => {
    getShiftList();
  }, []);

  const getShiftList = async () => {
    await GetApi("shifts", "companyId", localStorage.getItem("userId")).then(
      (res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log({ newData });
        setShiftsData(newData);
      }
    );
  };

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col">
                <h3 className="page-title">Shift List</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin-dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Employees</Link>
                  </li>
                  <li className="breadcrumb-item active">Shift List</li>
                </ul>
              </div>
              <div className="col-auto float-end ms-auto">
                <Link
                  to="#"
                  className="btn add-btn m-r-5"
                  data-bs-toggle="modal"
                  data-bs-target="#add_shift"
                >
                  Add Shifts
                </Link>
                <Link
                  to="#"
                  className="btn add-btn m-r-5"
                  data-bs-toggle="modal"
                  data-bs-target="#add_schedule"
                >
                  {" "}
                  Assign Shifts
                </Link>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Content Starts */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <SearchBox />
                <Table
                  className="table-striped"
                  columns={columns}
                  dataSource={shiftsData}
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
          {/* /Content End */}
        </div>
        {/* /Page Content */}
      </div>
      {/* /Page Wrapper */}
      {/* Add Shift Modal */}
      <ScheduleModelPopup />
      <ShiftModelPopup />
      <DeleteModal Name="Delete Shift" deleteId={deleteId} docName="shifts" />
    </>
  );
};

export default ShiftList;
