/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import notifications from "../../assets/json/notifications";
import message from "../../assets/json/message";
import {
  Applogo,
  Avatar_02,
  headerlogo,
  lnEnglish,
  lnFrench,
  lnGerman,
  lnSpanish,
} from "../../Routes/ImagePath";

import { FaRegBell, FaRegComment } from "react-icons/fa";
import { useLocation } from "react-router-dom/dist";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Header = (props) => {
  const data = notifications.notifications;
  const datas = message.message;
  const [notification, setNotifications] = useState(false);
  const [flag, setflag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [flagImage, setFlagImage] = useState(lnEnglish);
  const [parameterOpen, setParameterOpen] = useState(true);
  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };
  const onMenuClik = () => {
    document.body.classList.toggle("slide-nav");
  };

  const themes = localStorage.getItem("theme");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setNotifications(false);
    setProfile(false);
    setflag(false);
  };

  // const handleFlags = () => {
  //   setflag(!flag);
  //   setIsOpen(false);
  //   setNotifications(false);
  //   setProfile(false);
  // };
  const handleNotification = () => {
    setNotifications(!notification);
    setflag(false);
    setIsOpen(false);
    setProfile(false);
  };
  const handleProfile = () => {
    setProfile(!profile);
    setNotifications(false);
    setflag(false);
    setIsOpen(false);
  };

  const location = useLocation();
  let pathname = location.pathname;
  // const { value } = useSelector((state) => state.user);
  const Credencial = localStorage.getItem("credential");
  const Value = JSON.parse(Credencial);
  const UserName = Value?.email?.split("@")[0];
  const ProfileName = UserName?.charAt(0).toUpperCase() + UserName?.slice(1);
  const [userRole, setUserRole] = useState("");
  const { t, i18n } = useTranslation();
  const [isSideMenu, setSideMenu] = useState("");
  const [isSideMenunew, setSideMenuNew] = useState("dashboard");
  const changeLanguage = (lng) => {
    // Debugging statement
    i18n.changeLanguage(lng);
    setFlagImage(
      lng === "en"
        ? lnEnglish
        : lng === "fr"
        ? lnFrench
        : lng === "es"
        ? lnSpanish
        : lnGerman
    );
  };

  const toggleSidebar = (value) => {
    setSideMenu(value);
    setSideMenuNew(value);
  };

  useEffect(() => {
    let userrole = localStorage.getItem("userRole");
    setUserRole(userrole);
  }, []);

  return (
    <div className="header" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left" style={{ width: "80px" }}>
        <Link to="#" className="logo">
          <img src={headerlogo} width={40} height={40} alt="img" />
        </Link>
        <Link to="#" className="logo2">
          <img src={Applogo} width={40} height={40} alt="img" />
        </Link>
      </div>
      {/* /Logo */}
      <Link
        id="toggle_btn"
        to="#"
        style={{
          display: pathname.includes("tasks")
            ? "none"
            : pathname.includes("compose")
            ? "none"
            : "",
        }}
        onClick={handlesidebar}
      >
        <span className="bar-icon">
          <span />
          <span />
          <span />
        </span>
      </Link>
      {/* Header Title */}

      {/* /Header Title */}
      <Link
        id="mobile_btn"
        className="mobile_btn"
        to="#"
        onClick={() => onMenuClik()}
      >
        <i className="fa fa-bars" />
      </Link>
      <div className="page-title-box">
        <h3 style={{ fontSize: 15 }}>
          Welcome {localStorage?.getItem?.("userName")}
        </h3>
      </div>
      {/* Header Menu */}
      <ul className="nav user-menu">
        <li className="nav-item dropdown has-arrow main-drop">
          <Link
            to="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
            onClick={handleProfile}
          >
            <span style={{ textTransform: "capitalize" }}>
              {localStorage?.getItem?.("userRole")
                ? `${localStorage?.getItem?.("userRole")}`
                : "Admin"}
            </span>
          </Link>
          <div
            className={`dropdown-menu dropdown-menu-end ${
              profile ? "show" : ""
            }`}
          >
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => localStorage.clear()}
            >
              Logout
            </Link>
          </div>
        </li>
      </ul>

      {userRole === "company" ? (
        <>
          <ul className="nav user-menu">
            <li className="nav-item dropdown has-arrow main-drop">
              <Link
                to="#"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
              >
                <span style={{ textTransform: "capitalize", fontSize: 14 }}>
                  Contractor
                </span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="#">
                  Coming Soon...
                </Link>
              </div>
            </li>
          </ul>

          <ul className="nav user-menu">
            <li className="nav-item dropdown has-arrow main-drop">
              <Link
                to="#"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
              >
                <span style={{ textTransform: "capitalize", fontSize: 14 }}>
                  Vender
                </span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="#">
                  Coming Soon...
                </Link>
              </div>
            </li>
          </ul>
          <ul className="nav user-menu">
            <li className="nav-item dropdown has-arrow main-drop">
              <Link
                to="#"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
              >
                <span style={{ textTransform: "capitalize", fontSize: 14 }}>
                  Stock
                </span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="#">
                  Coming Soon...
                </Link>
              </div>
            </li>
          </ul>
          <ul className="nav user-menu">
            <li className="nav-item dropdown has-arrow main-drop">
              <Link
                to="#"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
              >
                <span style={{ textTransform: "capitalize", fontSize: 14 }}>
                  Annual Reports
                </span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="#">
                  Coming Soon...
                </Link>
              </div>
            </li>
          </ul>
          <ul className="nav user-menu">
            <li className="nav-item dropdown has-arrow main-drop">
              <Link
                to="#"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
              >
                <span style={{ textTransform: "capitalize", fontSize: 14 }}>
                  Data Import-Export
                </span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="#">
                  Coming Soon...
                </Link>
              </div>
            </li>
          </ul>
          <ul className="nav user-menu">
            <li className="nav-item dropdown has-arrow main-drop">
              <Link
                to="#"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
              >
                <span style={{ textTransform: "capitalize", fontSize: 14 }}>
                  Salary Head
                </span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="/allowances">
                  Allowances
                </Link>
                <Link className="dropdown-item" to="/deduction">
                  Deductions
                </Link>{" "}
                <Link className="dropdown-item" to="/salarystructure">
                  Salary Structure
                </Link>
              </div>
            </li>
          </ul>

          <ul className="nav user-menu">
            <li className="nav-item dropdown has-arrow main-drop">
              <Link
                to="#"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
              >
                <span style={{ textTransform: "capitalize", fontSize: 14 }}>
                  Company Structure
                </span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end">
                <Link
                  className="dropdown-item"
                  to="/branch"

                  // onMouseEnter={()=> setParameterOpen(false)}
                >
                  Branch
                </Link>

                <Link
                  className="dropdown-item"
                  to="/departments"
                  // onMouseEnter={()=> setParameterOpen(false)}
                >
                  Department
                </Link>
                <Link
                  className="dropdown-item"
                  to="/designations"
                  // onMouseEnter={()=> setParameterOpen(false)}
                >
                  Designation
                </Link>
                <Link
                  className="dropdown-item"
                  to="/category"
                  // onMouseEnter={()=> setParameterOpen(false)}
                >
                  Category
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  // onMouseEnter={()=> setParameterOpen(true)}
                  // onMouseLeave={()=> setParameterOpen(false)}
                >
                  Parameters
                </Link>
                {parameterOpen === true ? (
                  <>
                    <Link
                      className="dropdown-item"
                      to="/epfparametres"
                      // onClick={() => setParameterOpen(!parameterOpen)}
                      style={{ marginLeft: 5 }}
                    >
                      • EPF Parameters
                    </Link>

                    <Link
                      className="dropdown-item"
                      to="/esicparametres"
                      // onClick={() => setParameterOpen(!parameterOpen)}
                      style={{ marginLeft: 5 }}
                    >
                      • ESIC Parameters
                    </Link>

                    <Link
                      className="dropdown-item"
                      to="/bonusparametres"
                      // onClick={() => setParameterOpen(!parameterOpen)}
                      style={{ marginLeft: 5 }}
                    >
                      • Bonus Parameters
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/generalparametres"
                      // onClick={() => setParameterOpen(!parameterOpen)}
                      style={{ marginLeft: 5 }}
                    >
                      • General Parameters
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/gratuityparametres"
                      // onClick={() => setParameterOpen(!parameterOpen)}
                      style={{ marginLeft: 5 }}
                    >
                      • Gratuity Parameters
                    </Link>

                    <Link
                      className="dropdown-item"
                      to="/leaveparametres"
                      // onClick={() => setParameterOpen(!parameterOpen)}
                      style={{ marginLeft: 5 }}
                    >
                      • Leave Parameters
                    </Link>

                    <Link
                      className="dropdown-item"
                      to="/combooffparametres"
                      // onClick={() => setParameterOpen(!parameterOpen)}
                      style={{ marginLeft: 5 }}
                    >
                      • Combo Off
                    </Link>

                    <Link
                      className="dropdown-item"
                      to="/overparametres"
                      // onClick={() => setParameterOpen(!parameterOpen)}
                      style={{ marginLeft: 5 }}
                    >
                      • Over time parameters
                    </Link>

                    <Link
                      className="dropdown-item"
                      to="/arrearparametres"
                      // onClick={() => setParameterOpen(!parameterOpen)}
                      style={{ marginLeft: 5 }}
                    >
                      • Arrear parameters
                    </Link>

                    <Link
                      className="dropdown-item"
                      to="/tdsparametres"
                      // onClick={() => setParameterOpen(!parameterOpen)}
                      style={{ marginLeft: 5 }}
                    >
                      • TDS parameters
                    </Link>

                    <Link
                      className="dropdown-item"
                      to="/advancepaymentparametres"
                      // onClick={() => setParameterOpen(!parameterOpen)}
                      style={{ marginLeft: 5 }}
                    >
                      • Advance payment parameters
                    </Link>

                    <Link
                      className="dropdown-item"
                      to="/professionaltaxparametres"
                      // onClick={() => setParameterOpen(!parameterOpen)}
                      style={{ marginLeft: 5 }}
                    >
                      • Professional tax parameters
                    </Link>
                  </>
                ) : null}
                <Link
                  className="dropdown-item"
                  to="/holiday"
                  // onMouseEnter={() => setParameterOpen(false)}
                >
                  Festival Holiday
                </Link>
              </div>
            </li>
          </ul>
        </>
      ) : null}

      {/* /Header Menu */}
      {/* Mobile Menu */}
      <div className="dropdown mobile-user-menu">
        <Link
          to="#"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v" />
        </Link>
        <div className="dropdown-menu dropdown-menu-end dropdown-menu-right">
          {/* <Link className="dropdown-item" to="/profile">
            My Profile
          </Link> */}
          {/* <Link className="dropdown-item" to="/settings/companysetting">
            Settings
          </Link> */}
          <Link
            className="dropdown-item"
            to="/"
            onClick={() => localStorage.clear()}
          >
            Logout
          </Link>
        </div>
      </div>
      {/* /Mobile Menu */}
    </div>
  );
};

export default Header;
