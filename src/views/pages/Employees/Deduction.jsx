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
import DeductionModal from "../../../components/modelpopup/DeductionModal";

const Deduction = () => {
  const [deductionList, setDeductionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    getDepartmentList();
  }, []);

  const getDepartmentList = async () => {
    setLoading(true);
    await GetApi("deductions", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        var result = newData.map(function (el) {
          var o = Object.assign({}, el);
          o.wef = el.wefDate.slice(4, 16);
          return o;
        });
        setDeductionList(result);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: "Deduction Name",
      dataIndex: "deductionName",
      sorter: (a, b) => a.deductionName.length - b.deductionName.length,
      width: "20%",
    },
    {
      title: "Deduction Display Name",
      dataIndex: "deductionDisplayName",
      sorter: (a, b) =>
        a.deductionDisplayName.length - b.deductionDisplayName.length,
      width: "30%",
    },
    {
      title: "W.E.F date",
      dataIndex: "wef",
      sorter: (a, b) => a.wef.length - b.wef.length,
      width: "30%",
    },
    {
      title: "Working Day Applicable",
      dataIndex: "dayApplicable",
      sorter: (a, b) => a.wef.length - b.wef.length,
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
              data-bs-target="#edit_deduction"
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
            maintitle="Deduction"
            title="Dashboard"
            subtitle="Deduction"
            modal="#add_deduction"
            name="Add Deduction"
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
                    dataSource={deductionList}
                    className="table-striped"
                    rowKey={(record, i) => i}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeductionModal data={editData} />
      <DeleteModal
        Name="Delete Deduction"
        deleteId={deleteId}
        docName="deductions"
      />
    </>
  );
};

export default Deduction;
