import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import axios from "axios";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import SearchBox from "../../../components/SearchBox";
import DepartmentModal from "../../../components/modelpopup/DepartmentModal";
import { base_url } from "../../../base_urls";
import { GetApi, GetDepartmentList } from "../../../utils/GetApi";
import { DeleteDepartment } from "../../../utils/DeleteApi";
import HolidayModal from "../../../components/modelpopup/HolidayModal";
import LeaveModal from "../../../components/modelpopup/LeaveAddModal";

const LeaveParameters = () => {
  const [leavesList, setLeavesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    getParameters();
  }, []);

  const getParameters = async () => {
    setLoading(true);
    await GetApi("leaveparameters", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setLeavesList(newData);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: "Leave",
      dataIndex: "leaveType",
      sorter: (a, b) => a.leaveType.length - b.leaveType.length,
      width: "20%",
    },

    {
      title: "Action",
      className: "text-end",
      render: (record) => (
        <div className="dropdown dropdown-action text-end">
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
              data-bs-target="#edit_leave"
              onClick={() => setEditData(record)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
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
      sorter: (a, b) => a.length - b.length,
      width: "10%",
    },
  ];
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Leave Parameter"
            title="Dashboard"
            subtitle="Leave"
            modal="#add_leave"
            name="Add Leave"
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
                  <Table
                    columns={columns}
                    dataSource={leavesList}
                    className="table-striped"
                    rowKey={(record, i) => i}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <LeaveModal data={editData} />
      <DeleteModal Name="Delete Leave" deleteId={deleteId} docName="holidays" />
    </>
  );
};

export default LeaveParameters;
