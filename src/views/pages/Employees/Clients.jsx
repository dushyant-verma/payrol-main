import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Breadcrumbs from "../../../components/Breadcrumbs";
import ClientsFilter from "../../../components/ClientsFilter";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import { ClientModelPopup } from "../../../components/modelpopup/ClientModelPopup";
import { GetCompanyList } from "../../../utils/GetApi";

const Clients = () => {
  const [companyList, setCompanyList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchData, setSearchdata] = useState({});

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
      console.log(Object.keys(searchData).length);
      if (Object.keys(searchData).length > 0) {
        handleFilterCompanyList(newData);
      }
      setLoading(false);
    });
  };

  const handleFilterCompanyList = () => {
    console.log({ searchData });
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

  return (
    <div>
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

          {loading && (
            <div className="spinner-border m-0" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}

          <div className="row staff-grid-row">
            {companyList.map((item, i) => (
              <div
                key={i}
                className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
              >
                <div className="profile-widget">
                  <div className="profile-img">
                    <Link to="/client-profile" className="avatar">
                      <img alt="" src={item?.avatar} />
                    </Link>
                  </div>
                  <div className="dropdown profile-action">
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
                      >
                        <i className="fa fa-pencil m-r-5" /> Edit
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete"
                        onClick={() => setDeleteId(item?.id)}
                      >
                        <i className="fa fa-trash m-r-5" /> Delete
                      </Link>
                    </div>
                  </div>
                  <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                    <Link to="/client-profile">{item?.companyName}</Link>
                  </h4>
                  <h5 className="user-name m-t-10 mb-0 text-ellipsis">
                    <Link to="/client-profile">{item?.companyId}</Link>
                  </h5>
                  <div className="small text-muted">{item?.phone}</div>
                  <Link
                    onClick={() => localStorage.setItem("minheight", "true")}
                    to="/call/chat"
                    className="btn btn-white btn-sm m-t-10 me-1"
                  >
                    Message
                  </Link>
                  <Link
                    to="/client-profile"
                    className="btn btn-white btn-sm m-t-10"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ClientModelPopup />
      <DeleteModal
        Name="Delete Client"
        deleteId={deleteId}
        docName="users"
      />
    </div>
  );
};

export default Clients;
