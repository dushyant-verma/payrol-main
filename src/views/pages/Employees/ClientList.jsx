import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import { ClientModelPopup } from "../../../components/modelpopup/ClientModelPopup";
import SearchBox from "../../../components/SearchBox";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ClientsFilter from "../../../components/ClientsFilter";
import { GetCompanyList } from "../../../utils/GetApi";
import { UpdateUser } from "../../../utils/UpdateApi";

const ClientList = () => {
  const handleUserData = (email, name, role, id) => {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userId", id);
  };
  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      render: (text, record) => (
        <span className="table-avatar">
          <Link
            to="/employees-list"
            // target="_blank"
            className="avatar"
            onClick={() => {
              handleUserData(
                record?.email,
                record?.companyName,
                record?.role,
                record?.companyId
              );
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }}
          >
            <img alt="" src={record.avatar} />
          </Link>
          <Link
            to="/employees-list"
            // target="_blank"
            onClick={() => {
              handleUserData(
                record?.email,
                record?.companyName,
                record?.role,
                record?.companyId
              );
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }}
          >
            {text}
          </Link>
        </span>
      ),
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: "Company ID",
      dataIndex: "companyId",
      sorter: (a, b) => a.ClientId.length - b.ClientId.length,
    },

    {
      title: "Company Person",
      dataIndex: "contactPersonName",
      sorter: (a, b) => a.ContactPerson.length - b.ContactPerson.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.Email.length - b.Email.length,
    },

    {
      title: "Mobile",
      dataIndex: "phone",
      sorter: (a, b) => a.Mobile.length - b.Mobile.length,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => (
        <div className="dropdown">
          <Link
            to="#"
            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className={
                text === true
                  ? "far fa-dot-circle text-success"
                  : "far fa-dot-circle text-danger"
              }
            />{" "}
            {text === true ? "Active" : "Inactive"}
          </Link>
          <div className="dropdown-menu">
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => handleActiveCompany(true, record.id)}
            >
              <i className="far fa-dot-circle text-success" /> Active
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => handleActiveCompany(false, record.id)}
            >
              <i className="far fa-dot-circle text-danger" /> Inactive
            </Link>
          </div>
        </div>
      ),
      sorter: (a, b) => a.Status.length - b.Status.length,
    },
    {
      title: "Action",
      render: (text, record) => (
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
              data-bs-target="#edit_client"
              onClick={() => setEditData(record)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete"
              onClick={() => setDeleteId(record?.id)}
            >
              <i className="fa fa-trash m-r-5" /> Delete
            </Link>
          </div>
        </div>
      ),
      sorter: true,
    },
  ];

  const [companyList, setCompanyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchdata] = useState({});
  const [editData, setEditData] = useState({});
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    getCompanyList();
  }, [searchData]);

  const getCompanyList = async () => {
    setLoading(true);
    await GetCompanyList().then((res) => {
      const newData = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCompanyList(newData);
      if (Object.keys(searchData).length > 0) {
        handleFilterCompanyList(newData);
      }
      setLoading(false);
    });
  };

  const handleFilterCompanyList = () => {
    if (
      searchData.companyId !== "" ||
      searchData.companyName !== "" ||
      searchData.phone !== ""
    ) {
      if (searchData.companyId !== "") {
        const list = companyList.filter(
          (item) => item.companyId === searchData.companyId
        );
        setCompanyList(list);
      }
      if (searchData.companyName !== "") {
        const list = companyList.filter(
          (item) => item.companyName === searchData.companyName
        );
        setCompanyList(list);
      }
      if (searchData.phone !== "") {
        const list = companyList.filter(
          (item) => item.phone === searchData.phone
        );
        setCompanyList(list);
      }
      if (searchData.phone !== "" && searchData.companyId !== "") {
        const list = companyList.filter(
          (item) => item.companyId === searchData.companyId
        );
        setCompanyList(list);
      }
      if (searchData.phone !== "" && searchData.companyName !== "") {
        const list = companyList.filter(
          (item) => item.phone === searchData.phone
        );
        setCompanyList(list);
      }
      if (searchData.companyId !== "" && searchData.companyName !== "") {
        const list = companyList.filter(
          (item) => item.companyId === searchData.companyId
        );
        setCompanyList(list);
      }
    } else {
      setCompanyList([]);
      getCompanyList();
    }
  };

  const handleActiveCompany = async (status, id) => {
    const data = {
      isActive: status,
      updatedDate: new Date().toString(),
    };
    setLoading(true);
    await UpdateUser(data, id)
      .then((res) => {
        if (res === true) {
          getCompanyList();
        }
      })
      .catch((err) => setLoading(false));
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Company"
            title="Dashboard"
            subtitle="Company"
            modal="#add_client"
            name="Add Company"
            Linkname="/clients"
            Linkname1="/clients-list"
          />
          {/* /Page Header */}
          <ClientsFilter setSearchdata={setSearchdata} />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                {loading === true ? (
                  <div className="spinner-border m-0" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    {/* <SearchBox /> */}
                    <Table
                      className="table-striped"
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      dataSource={companyList}
                      rowKey={(record, i) => i}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ClientModelPopup data={editData} />
      <DeleteModal Name="Delete Client" deleteId={deleteId} docName="users" />
    </>
  );
};

export default ClientList;
