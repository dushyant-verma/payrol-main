import React from "react";
import { Link } from "react-router-dom";
import Salary from "../../../../../assets/json/employeeSalary";
import { Table } from "antd";
import EditSalaryModal from "../../../../../components/modelpopup/EditSalaryModal";
import DeleteModal from "../../../../../components/modelpopup/deletePopup";

const SalaryTable = ({ employeeList }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="table-avatar">
          <Link to="" className="avatar">
            <img alt="" src={record.empImage} />
          </Link>
          <Link to="" state={record}>
            <span>{record.name}</span>
          </Link>
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Employee ID",
      dataIndex: "empId",
      sorter: (a, b) => a.empId.length - b.empId.length,
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: "Join Date",
      dataIndex: "joinDate",
      sorter: (a, b) => a.empJoinDate.length - b.empJoinDate.length,
    },
    {
      title: "Role",
      dataIndex: "empDesignationName",
    },
    
    {
      title: "Payslip",
      render: (record) => (
        <Link className="btn btn-sm btn-primary" state={record} to="/salary-view">
          Generate Slip
        </Link>
      ),
    },
  ];
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <Table
              className="table-striped"
              style={{ overflowX: "auto" }}
              columns={columns}
              dataSource={employeeList}
              rowKey={(record) => record.id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SalaryTable;
