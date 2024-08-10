import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import AddDesingnationModelPopup from "../../../components/modelpopup/AddDesingnationModelPopup";
import SearchBox from "../../../components/SearchBox";
import { base_url } from "../../../base_urls";
import { GetApi } from "../../../utils/GetApi";

const Designation = () => {
  const [designationList, setDesignationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    getDesignationList();
  }, []);

  const getDesignationList = async () => {
    setLoading(true);
    await GetApi("designations","createdBy",localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDesignationList(newData);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const columns = [
    
    {
      title: "Department",
      dataIndex: "departmentName",
      sorter: (a, b) => a.departmentName.length - b.departmentName.length,
      width: "30%",
    },
    {
      title: "Designation Display Name",
      dataIndex: "displayDesignationName",
      sorter: (a, b) => a.displayDesignationName.length - b.displayDesignationName.length,
      width: "30%",
    },
    {
      title: "Designation",
      dataIndex: "designationName",
      sorter: (a, b) => a.designationName.length - b.designationName.length,
      width: "30%",
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
              data-bs-target="#edit_designation"
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
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Designations"
            title="Dashboard"
            subtitle="Designations"
            modal="#add_designation"
            name="Add  Designation"
          />
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
                    dataSource={designationList}
                    className="table-striped"
                    rowKey={(record) => record.id}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddDesingnationModelPopup data={editData} />
      <DeleteModal
        Name="Delete Designation"
        deleteId={deleteId}
        docName="designations"
      />
    </div>
  );
};

export default Designation;
