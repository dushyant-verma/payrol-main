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
import BranchModal from "../../../components/modelpopup/BranchModal";


const Branch = () => {
  const [branchList, setBranchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    getBranchList();
  }, []);

  const getBranchList = async () => {
    setLoading(true);
    await GetApi("branch","createdBy",localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBranchList(newData);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: "Branch Name",
      dataIndex: "branchName",
      sorter: (a, b) => a.branchName.length - b.branchName.length,
      width: "30%",
    },
    {
      title: "Branch Display Name",
      dataIndex: "branchDisplayName",
      sorter: (a, b) => a.branchDisplayName.length - b.branchDisplayName.length,
      width: "30%",
    },
    {
      title: "Branch Address",
      dataIndex: "branchAddress",
      sorter: (a, b) => a.branchAddress.length - b.branchAddress.length,
      width: "40%",
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
              data-bs-target="#edit_branch"
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
            maintitle="Branch"
            title="Dashboard"
            subtitle="Branch"
            modal="#add_branch"
            name="Add Branch"
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
                    dataSource={branchList}
                    className="table-striped"
                    rowKey={(record, i) => i}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BranchModal data={editData} />
      <DeleteModal
        Name="Delete Branch"
        deleteId={deleteId}
        docName="branch"
      />
    </>
  );
};

export default Branch;
