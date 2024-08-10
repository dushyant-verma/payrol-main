import React, { useEffect, useState } from "react";
import {
  Avatar_02,
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Avatar_11,
  Avatar_12,
  Avatar_13,
} from "../../../Routes/ImagePath";
import { Link } from "react-router-dom";
import { Table } from "antd";
import EmployeeListFilter from "../../../components/EmployeeListFilter";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AllEmployeeAddPopup from "../../../components/modelpopup/AllEmployeeAddPopup";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import SearchBox from "../../../components/SearchBox";
import { GetApi } from "../../../utils/GetApi";
import AllEmployeeEditPopup from "../../../components/modelpopup/AllEmployeeEditPopup";

const EmployeeList = () => {
  const [empList, setEmpList] = useState([]);
  const [editData, setEditData] = useState({});
  const [searchData, setSearchdata] = useState({});

  useEffect(() => {
    getEmployeeList();
  }, [searchData]);

  const getEmployeeList = async () => {
    await GetApi(
      "employee",
      "empCompanyId",
      localStorage.getItem("userId")
    ).then((res) => {
      const newData = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setEmpList(newData);


      if (Object.keys(searchData).length > 0) {
        handleFilterEmpList(newData);
      }
    });
  };

  const handleFilterEmpList = (newData) => {
    if (
      searchData.empId !== "" ||
      searchData.empName !== "" ||
      searchData.empPhone !== ""
    ) {
      if (searchData.empId !== "") {
        const list = newData.filter((item) => item.empId === searchData.empId);
        setEmpList(list);
      }
      if (searchData.empName !== "") {
        const list = newData.filter((item) => item.name === searchData.empName);
        setEmpList(list);
      }
      if (searchData.empPhone !== "") {
        const list = newData.filter(
          (item) => item.phone === searchData.empPhone
        );
        setEmpList(list);
      }
      if (searchData.empPhone !== "" && searchData.empId !== "") {
        const list = newData.filter((item) => item.empId === searchData.empId);
        setEmpList(list);
      }
      if (searchData.empPhone !== "" && searchData.empName !== "") {
        const list = newData.filter(
          (item) => item.phone === searchData.empPhone
        );
        setEmpList(list);
      }
      if (searchData.empId !== "" && searchData.empName !== "") {
        const list = newData.filter((item) => item.empId === searchData.empId);
        setEmpList(list);
      }
    } else {
      setEmpList([]);
      getEmployeeList();
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span className="table-avatar">
          <Link to="#" state={record} className="avatar">
            <img alt="" src={record.empImage} />
          </Link>
          <Link to="#" state={record}>
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
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: "Mobile",
      dataIndex: "phone",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },

    {
      title: "Join Date",
      dataIndex: "empJoinDate",
      render: (text, record) => (
        <span className="table-avatar">
          <Link to="">
            <span>{record.empJoinDate.slice(0, 16)}</span>
          </Link>
        </span>
      ),
      sorter: (a, b) => a.joindate.length - b.joindate.length,
    },
    {
      title: "Department",
      sorter: true,
      render: (i, record) => <span>{record.empDepartmentName}</span>,
    },
    {
      title: "Designation",
      sorter: true,
      render: (i, record) => <span>{record.empDesignationName}</span>,
    },
    {
      title: "Shift",
      sorter: true,
      render: (i, record) => <span>{record.shiftName}</span>,
    },
    {
      title: "Shift Start Date",
      sorter: true,
      render: (i, record) => <span>{record.effectiveDate}</span>,
    },
    {
      title: "Action",
      sorter: true,
      render: (i, record) => (
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
              data-bs-target="#edit_employee"
              onClick={() => setEditData(record)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Employee"
            title="Dashboard"
            subtitle="Employee"
            modal="#add_employee"
            name="Add Employee"
            Linkname="/employees"
            Linkname1="/employees-list"
          />
          {/* /Page Header */}
          <EmployeeListFilter setSearchdata={setSearchdata} />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                {/* <SearchBox /> */}
                <Table
                  className="table-striped"
                  columns={columns}
                  dataSource={empList}
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        <AllEmployeeAddPopup empLength={empList?.length} />

        <AllEmployeeEditPopup data={editData} />

        <DeleteModal Name="Delete Employee" />
      </div>
    </div>
  );
};

export default EmployeeList;
