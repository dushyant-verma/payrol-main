import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import { GetApi, GetDepartmentList } from "../../../utils/GetApi";
import SalaryStructureModal from "../../../components/modelpopup/SalaryStructureModal";

const SalaryStructure = () => {
  const [allowancesList, setAllowancesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    getSalaryStructure();
  }, []);

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

        setAllowancesList(newData);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: "Structure Name",
      dataIndex: "structureName",
      sorter: (a, b) => a.structureName.length - b.structureName.length,
      width: "20%",
    },
    {
      title: "Structure Display Name",
      dataIndex: "structureDisplayName",
      sorter: (a, b) =>
        a.structureDisplayName.length - b.structureDisplayName.length,
      width: "20%",
    },
    {
      title: "Basic Salary",
      dataIndex: "basicSalary",
      sorter: (a, b) => a.basicSalary.length - b.basicSalary.length,
      width: "20%",
    },
    {
      title: "DA Salary",
      dataIndex: "daSalary",
      sorter: (a, b) => a.daSalary.length - b.daSalary.length,
      width: "20%",
    },
    {
      title: "Time Period Salary",
      dataIndex: "salarytimePeriod",
      sorter: (a, b) => a.salarytimePeriod.length - b.salarytimePeriod.length,
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
              data-bs-target="#edit_salarystructure"
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
            maintitle="Salary Structure"
            title="Dashboard"
            subtitle="Salary Structure"
            modal="#add_salarystructure"
            name="Add Salary Structure"
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
                    dataSource={allowancesList}
                    className="table-striped"
                    rowKey={(record, i) => i}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SalaryStructureModal data={editData} />
      <DeleteModal
        Name="Delete Salary Structure"
        deleteId={deleteId}
        docName="salarystructures"
      />
    </>
  );
};

export default SalaryStructure;
