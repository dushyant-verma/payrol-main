import React from "react";
import { Link } from "react-router-dom";
import PersonalInformationModelPopup from "../../../components/modelpopup/PersonalInformationModelPopup";
import { ListItem, ProjectDetails } from "./ProfileContent";

const ProfileTab = ({ data }) => {
  console.log({ data });

  const familyInfoData = [
    {
      id: 1,
      name: "Leo",
      relationship: "Brother",
      dob: "Feb 16th, 2019",
      phone: "9876543210",
    },
  ];

  const experienceData = [
    {
      id: 1,
      name: "Web Designer at Zen Corporation",
      time: "Jan 2023 - Present (5 years 2 months)",
    },
    {
      id: 2,
      name: "Web Designer at Ron-tech",
      time: "Jan 2023 - Present (5 years 2 months)",
    },
    {
      id: 3,
      name: "Web Designer at Dalt Technology",
      time: "2023 2023 - Present (5 years 2 months)",
    },
    // Add more experience info data as needed
  ];

  return (
    <>
      <div className="tab-content">
        <div
          id="emp_profile"
          className="pro-overview tab-pane fade show active"
        >
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Personal Informations </h3>
                  <ul className="personal-info">
                    <ListItem title="Aadhar Number" text={data?.empAadhar} />
                    <ListItem title="Pan Number" text={data?.empPan} />
                    <ListItem title="UAN Number" text={data?.empUan} />
                    <ListItem title="Passport Number" text={data?.passport} />
                    <ListItem
                      title="Passport Expiry Date"
                      text={data?.passportExpiryDate}
                    />
                    <ListItem title="Address" text={data?.empAddress} />
                  </ul>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Emergency Contact{" "}
                    <Link
                      to="#"
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#emergency_contact_modal"
                    >
                      <i className="fa fa-pencil" />
                    </Link>
                  </h3>
                  <h5 className="section-title">Primary</h5>
                  <ul className="personal-info">
                    {primaryContactData.map((item, index) => (
                      <ListItem
                        id={item.id}
                        key={index}
                        title={item.title}
                        text={item.text}
                      />
                    ))}
                  </ul>
                  <hr />
                  <h5 className="section-title">Secondary</h5>
                  <ul className="personal-info">
                    {secondaryContactData.map((item, index) => (
                      <ListItem
                        id={item.id}
                        key={index}
                        title={item.title}
                        text={item.text}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div> */}
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Bank information</h3>
                  <ul className="personal-info">
                    <ListItem title="Bank Name" text={data?.bankName} />
                    <ListItem
                      title="Account Number"
                      text={data?.bankAccountNumber}
                    />
                    <ListItem title="IFSC Code" text={data?.ifscCode} />
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Experience </h3>
                  <div className="experience-box">
                    <ul className="experience-list">
                      {experienceData.map((item) => (
                        <li key={item.id}>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <Link to="/" className="name">
                                {item.name}
                              </Link>
                              <span className="time">{item.time}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Family Informations{" "}
                    {/* <Link
                      to="#"
                      className="edit-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#family_info_modal"
                    >
                      <i className="fa fa-pencil" />
                    </Link> */}
                  </h3>
                  <div className="table-responsive">
                    <table className="table table-nowrap">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Relationship</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{data?.fatherName}</td>
                          <td>Father</td>
                        </tr>
                        <tr>
                          <td>{data?.motherName}</td>
                          <td>Mother</td>
                        </tr>
                        <tr>
                          <td>{data?.empSpouseName}</td>
                          <td>Spouse</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row"></div>
        </div>
        <ProjectDetails />
      </div>

      <PersonalInformationModelPopup />
    </>
  );
};

export default ProfileTab;
