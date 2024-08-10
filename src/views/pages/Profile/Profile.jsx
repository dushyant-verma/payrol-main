/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Avatar_02, Avatar_16 } from "../../../Routes/ImagePath";
import { Link } from "react-router-dom";
import ProfileTab from "./ProfileTab";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  // console.log({location: location.state})

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Profile"
            title="Dashboard"
            subtitle="Profile"
            modal="#add_indicator"
            name="Add New"
          />
          <div className="card mb-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="profile-view">
                    <div className="profile-img-wrap">
                      <div className="profile-img">
                        <img src={location?.state?.empImage} alt="User Image" />
                      </div>
                    </div>
                    <div className="profile-basic">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="profile-info-left">
                            <h3 className="user-name m-t-0 mb-0">
                              {location?.state?.name}
                            </h3>
                            <h6 className="text-muted">
                              {location?.state?.empDesignationName}
                            </h6>
                            <small className="text-muted">
                              {location?.state?.empDepartmentName}
                            </small>
                            <div className="staff-id">
                              Employee ID : {location?.state?.empId}
                            </div>
                            <div className="small doj text-muted">
                              Date of Join :{" "}
                              {location?.state?.empJoinDate?.slice(0, 16)}
                            </div>
                            <div className="small doj text-muted">
                              Reference Number :{" "}
                              {location?.state?.refernceNumber}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <ul className="personal-info">
                            <li>
                              <div className="title">Phone:</div>
                              <div className="text">
                                {location?.state?.phone}
                              </div>
                            </li>
                            <li>
                              <div className="title">Email:</div>
                              <div className="text">
                                {location?.state?.email}
                              </div>
                            </li>
                            <li>
                              <div className="title">Birthday:</div>
                              <div className="text">
                                {location?.state?.dob?.slice(0, 16)}
                              </div>
                            </li>
                            <li>
                              <div className="title">Address:</div>
                              <div className="text">
                                {location?.state?.empAddress}
                              </div>
                            </li>
                            <li>
                              <div className="title">Gender:</div>
                              <div className="text">
                                {location?.state?.empGender}
                              </div>
                            </li>
                            <li>
                              <div className="title">Company:</div>
                              <div className="text">
                                <div className="avatar-box"></div>

                                {location?.state?.empCompanyName}
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <div className="pro-edit">
                      <Link
                        data-bs-target="#profile_info"
                        data-bs-toggle="modal"
                        className="edit-icon"
                        to="#"
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info Tab */}
          <ProfileTab data={location?.state} />
        </div>
      </div>
    </>
  );
};

export default Profile;
