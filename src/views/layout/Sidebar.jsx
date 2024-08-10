/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";
// import { withRouter } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  // console.log("pageurl", pathname);

  const MenuMore = () => {
    document.getElementById("more-menu-hidden").classList.toggle("hidden");
  };

  const [isSideMenu, setSideMenu] = useState("");
  const [isSideMenunew, setSideMenuNew] = useState("dashboard");
  const [level2Menu, setLevel2Menu] = useState("");
  const [level3Menu, setLevel3Menu] = useState("");
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMouseOverSidebar, setMouseOverSidebar] = useState(false);
  const [userRole, setUserRole] = useState("");

  const toggleSidebar = (value) => {
    setSideMenu(value);
    setSideMenuNew(value);
  };

  const toggleLvelTwo = (value) => {
    setLevel2Menu(value);
  };
  const toggleLevelThree = (value) => {
    setLevel3Menu(value);
  };

  useEffect(() => {
    let userrole = localStorage.getItem("userRole");
    setUserRole(userrole);
    if (
      isMouseOverSidebar &&
      document.body.classList.contains("mini-sidebar")
    ) {
      document.body.classList.add("expand-menu");
      return;
    }
    document.body.classList.remove("expand-menu");
  }, [isMouseOverSidebar]);

  const handleMouseEnter = () => {
    setMouseOverSidebar(true);
  };

  const handleMouseLeave = () => {
    setMouseOverSidebar(false);
  };
  const { t } = useTranslation();

  return (
    <div
      className={`sidebar ${isSidebarExpanded ? "" : "hidden"}`}
      id="sidebar"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar-inner slimscroll" style={{ overflow: false }}>
        <div id="sidebar-menu" className="sidebar-menu">
          <nav className="greedys sidebar-horizantal" id="horizantal-sidebar">
            <ul className="list-inline-item list-unstyled links">
              {userRole === "company" ? (
                <>
                  <li className="menu-title">
                    <span> {t("main")}</span>
                  </li>

                  <li className="submenu">
                    <Link
                      to="#"
                      className={isSideMenu == "dashboard" ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(
                          isSideMenu == "dashboard" ? "" : "dashboard"
                        )
                      }
                    >
                      <i className="la la-dashboard" />
                      <span> {t("dashboard")}</span>
                      <span className="menu-arrow" />
                    </Link>
                    {isSideMenu == "dashboard" ? (
                      <ul
                        style={{
                          display: isSideMenu == "dashboard" ? "block" : "none",
                        }}
                      >
                        <li>
                          {/* <Link
                            className={
                              pathname.includes("admin-dashboard")
                                ? "active"
                                : ""
                            }
                            to="/admin-dashboard"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "dashboard" ? "" : "dashboard"
                              )
                            }
                          >
                            {t("AdminDashboard")}
                          </Link> */}
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="menu-title">
                    <span>{t("employees")}</span>
                  </li>
                  <li className="submenu">

                    <Link
                      to="#"
                      className={isSideMenu == "employee" ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(
                          isSideMenu == "employee" ? "" : "employee"
                        )
                      }
                    >
                      <i className="la la-user" />
                      <span className="noti-dot"> {t("Employee")}</span>
                      <span className="menu-arrow" />
                    </Link>
                    {isSideMenu == "employee" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("employees")
                                ? "active"
                                : pathname.includes("employees-list")
                                  ? "active"
                                  : ""
                            }
                            to="/employees-list"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "employee" ? "" : "employee"
                              )
                            }
                          >
                            {t("All Employee")}
                          </Link>
                        </li>
                        {/* <li>
                          <Link
                            className={
                              pathname.includes("holidays") ? "active" : ""
                            }
                            to="/holidays"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "employee" ? "" : "employee"
                              )
                            }
                          >
                            {t("Holidays")}
                          </Link>
                        </li> */}
                        {/* <li>
                          <Link
                            className={
                              pathname.includes("adminleaves") ? "active" : ""
                            }
                            to="/adminleaves"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "employee" ? "" : "employee"
                              )
                            }
                          >
                            {t("Leaves (Admin)")}
                            <span className="badge rounded-pill bg-primary float-end">
                              1
                            </span>
                          </Link>
                        </li> */}
                        <li>
                          <Link
                            className={
                              pathname.includes("leaves-employee")
                                ? "active"
                                : ""
                            }
                            to="/leaves-employee"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "employee" ? "" : "employee"
                              )
                            }
                          >
                            {t("Leaves")}
                          </Link>
                        </li>
                        {/* <li>
                          <Link
                            className={
                              pathname.includes("leave-settings")
                                ? "active"
                                : ""
                            }
                            to="/leave-settings"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "employee" ? "" : "employee"
                              )
                            }
                          >
                            {t("Leave Setting")}
                          </Link>
                        </li> */}
                        {/* <li>
                          <Link
                            className={
                              pathname.includes("adminattendance")
                                ? "active"
                                : ""
                            }
                            to="/adminattendance"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "employee" ? "" : "employee"
                              )
                            }
                          >
                            {t("Attendance (Admin)")}
                          </Link>
                        </li> */}
                        {/* <li>
                          <Link
                            className={
                              pathname.includes("attendance-employee")
                                ? "active"
                                : ""
                            }
                            to="/attendance-employee"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "employee" ? "" : "employee"
                              )
                            }
                          >
                            {t("Attendance")}
                          </Link>
                        </li> */}

                        {/* <li>
                          <Link
                            className={
                              pathname.includes("timesheet") ? "active" : ""
                            }
                            to="/timesheet"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "employee" ? "" : "employee"
                              )
                            }
                          >
                            {t("Timesheet")}
                          </Link>
                        </li> */}
                        <li>
                          <Link
                            className={
                              pathname.includes("shift-scheduling") ||
                                pathname.includes("shift-list")
                                ? "active"
                                : ""
                            }
                            to="/shift-list"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "employee" ? "" : "employee"
                              )
                            }
                          >
                            {t("Shift & Schedule")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("overtime") ? "active" : ""
                            }
                            to="/overtime"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "employee" ? "" : "employee"
                              )
                            }
                          >
                            {t("Overtime")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                  {/* <li className="submenu">
                    <Link
                      to="#"
                      className={isSideMenu == "reports" ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(isSideMenu == "reports" ? "" : "reports")
                      }
                    >
                      <i className="la la-pie-chart" />{" "}
                      <span> {t("Reports")} </span>
                      <span className="menu-arrow" />
                    </Link>
                    {isSideMenu == "reports" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("expense-reports")
                                ? "active"
                                : ""
                            }
                            to="/expense-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Expense Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("invoice-reports")
                                ? "active"
                                : ""
                            }
                            to="/invoice-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Invoice Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("payments-reports")
                                ? "active"
                                : ""
                            }
                            to="/payments-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Payment Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("payments-reports")
                                ? "active"
                                : ""
                            }
                            to="/payments-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Project Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("task-reports") ? "active" : ""
                            }
                            to="/task-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Task Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("user-reports") ? "active" : ""
                            }
                            to="/user-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("User Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("employee-reports")
                                ? "active"
                                : ""
                            }
                            to="/employee-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Employee Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("payslip-reports")
                                ? "active"
                                : ""
                            }
                            to="/payslip-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Payslip Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("attendance-reports")
                                ? "active"
                                : ""
                            }
                            to="/attendance-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Attendence Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("leave-reports") ? "active" : ""
                            }
                            to="/leave-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Leave Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("daily-reports") ? "active" : ""
                            }
                            to="/daily-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Daily Report")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li> */}

                  <li className="submenu">
                    <Link
                      to="#"
                      className={isSideMenu == "payroll" ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(isSideMenu == "payroll" ? "" : "payroll")
                      }
                    >
                      <i className="la la-money" />
                      <span> {t("Payroll")} </span>
                      <span className="menu-arrow" />
                    </Link>
                    {isSideMenu == "payroll" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("salary") ? "active" : ""
                            }
                            to="/salary"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "payroll" ? "" : "payroll"
                              )
                            }
                          >
                            {t("Employee Salary")}
                          </Link>
                        </li>

                        {/* <li>
                          <Link
                            className={
                              pathname.includes("payroll-items") ? "active" : ""
                            }
                            to="/payroll-items"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "payroll" ? "" : "payroll"
                              )
                            }
                          >
                            {t("Payroll Items")}
                          </Link>
                        </li> */}
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="submenu">
                    <Link
                      to="#"
                      className={isSideMenu == "department" ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(
                          isSideMenu == "department" ? "" : "department"
                        )
                      }
                    >
                      <i className="la la-users" />
                      <span> {t("Departments")} </span>
                      <span className="menu-arrow" />
                    </Link>
                    {isSideMenu == "department" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("departments") ? "active" : ""
                            }
                            to="/departments"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "department" ? "" : "department"
                              )
                            }
                          >
                            {t("Departments")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("branch") ? "active" : ""
                            }
                            to="/branch"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "department" ? "" : "department"
                              )
                            }
                          >
                            {t("Branch")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("category") ? "active" : ""
                            }
                            to="/category"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "department" ? "" : "department"
                              )
                            }
                          >
                            {t("Category")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("designations") ? "active" : ""
                            }
                            to="/designations"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "department" ? "" : "department"
                              )
                            }
                          >
                            {t("Designation")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="submenu">
                    <Link
                      to="#"
                      className={isSideMenu == "parameters" ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(
                          isSideMenu == "parameters" ? "" : "parameters"
                        )
                      }
                    >
                      <i className="la la-tasks" />
                      <span> {t("Parameters")} </span>
                      <span className="menu-arrow" />
                    </Link>
                    {isSideMenu == "parameters" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("epfparametres") ? "active" : ""
                            }
                            to="/epfparametres"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "parameters" ? "" : "parameters"
                              )
                            }
                          >
                            {t("EPF Parameters")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("esicparametres")
                                ? "active"
                                : ""
                            }
                            to="/esicparametres"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "parameters" ? "" : "parameters"
                              )
                            }
                          >
                            {t("ESIC Parameters")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("bonusparametres")
                                ? "active"
                                : ""
                            }
                            to="/bonusparametres"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "parameters" ? "" : "parameters"
                              )
                            }
                          >
                            {t("Bonus Parameters")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("generalparametres")
                                ? "active"
                                : ""
                            }
                            to="/generalparametres"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "parameters" ? "" : "parameters"
                              )
                            }
                          >
                            {t("General Parameters")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("gratuityparametres")
                                ? "active"
                                : ""
                            }
                            to="/gratuityparametres"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "parameters" ? "" : "parameters"
                              )
                            }
                          >
                            {t("Gratuity Parameters")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("leaveparametres")
                                ? "active"
                                : ""
                            }
                            to="/leaveparametres"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "parameters" ? "" : "parameters"
                              )
                            }
                          >
                            {t("Leave Parameters")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("combooffparametres")
                                ? "active"
                                : ""
                            }
                            to="/combooffparametres"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "parameters" ? "" : "parameters"
                              )
                            }
                          >
                            {t("Combo Off")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("overparametres")
                                ? "active"
                                : ""
                            }
                            to="/overparametres"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "parameters" ? "" : "parameters"
                              )
                            }
                          >
                            {t("Over time parameters")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("arrearparametres")
                                ? "active"
                                : ""
                            }
                            to="/arrearparametres"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "parameters" ? "" : "parameters"
                              )
                            }
                          >
                            {t("Arrear parameters")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("tdsparametres") ? "active" : ""
                            }
                            to="/tdsparametres"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "parameters" ? "" : "parameters"
                              )
                            }
                          >
                            {t("TDS parameters")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("advancepaymentparametres")
                                ? "active"
                                : ""
                            }
                            to="/advancepaymentparametres"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "parameters" ? "" : "parameters"
                              )
                            }
                          >
                            {t("Advance payment parameters")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("professionaltaxparametres")
                                ? "active"
                                : ""
                            }
                            to="/professionaltaxparametres"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "parameters" ? "" : "parameters"
                              )
                            }
                          >
                            {t("Professional tax parameters")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="submenu">
                    <Link
                      to="#"
                      className={isSideMenu == "salaryhead" ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(
                          isSideMenu == "salaryhead" ? "" : "salaryhead"
                        )
                      }
                    >
                      <i className="la la-file" />
                      <span> {t("Salary Heads")} </span>
                      <span className="menu-arrow" />
                    </Link>
                    {isSideMenu == "salaryhead" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("allowances") ? "active" : ""
                            }
                            to="/allowances"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "salaryhead" ? "" : "salaryhead"
                              )
                            }
                          >
                            {t("Allowances")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("deduction") ? "active" : ""
                            }
                            to="/deduction"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "salaryhead" ? "" : "salaryhead"
                              )
                            }
                          >
                            {t("Deduction")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("holiday") ? "active" : ""
                            }
                            to="/holiday"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "salaryhead" ? "" : "salaryhead"
                              )
                            }
                          >
                            {t("Festival / National Holiday")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("salarystructure")
                                ? "active"
                                : ""
                            }
                            to="/salarystructure"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "salaryhead" ? "" : "salaryhead"
                              )
                            }
                          >
                            {t("Salary Structure")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="submenu">
                    <Link
                      to="#"
                      className={isSideMenu == "attendence" ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(
                          isSideMenu == "attendence" ? "" : "attendence"
                        )
                      }
                    >
                      <i className="la la-user-check" />
                      <span> {t("Attendence")} </span>
                      <span className="menu-arrow" />
                    </Link>
                    {isSideMenu == "attendence" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("attendance-employee")
                                ? "active"
                                : ""
                            }
                            to="/attendance-employee"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "attendence" ? "" : "attendence"
                              )
                            }
                          >
                            {t("Mark Attendence")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("daily-attend-employee")
                                ? "active"
                                : ""
                            }
                            to="/daily-attend-employee"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "attendence" ? "" : "attendence"
                              )
                            }
                          >
                            {t("Daily Basis Attendence")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("monthly-attend-employee")
                                ? "active"
                                : ""
                            }
                            to="/monthly-attend-employee"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "attendence" ? "" : "attendence"
                              )
                            }
                          >
                            {t("Monthly Basis Attendence")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                </>
              ) : (
                <li
                  className={pathname.includes("clients-list") ? "active" : ""}
                >
                  <Link to="/clients-list">
                    <i className="la la-building" /> <span>{t("Company")}</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <Scrollbars
            autoHide={false}
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMin={0}
            autoHeightMax="100vh"
            thumbMinSize={30}
            universal={false}
            hideTracksWhenNotNeeded={true}
          >
            <ul className="sidebar-vertical" id="veritical-sidebar">
              {userRole === "company" ? (
                <>
                  <li className="submenu">
                    <Link
                      to="#"
                      className={isSideMenu == "employee" ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(
                          isSideMenu == "employee" ? "" : "employee"
                        )
                      }
                    >
                      <i className="la la-user" />
                      <span> {t("Employee")}</span>
                      <span className="menu-arrow" />
                    </Link>
                    {isSideMenu == "employee" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("employees")
                                ? "active"
                                : pathname.includes("employees-list")
                                  ? "active"
                                  : ""
                            }
                            to="/employees-list"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "employee" ? "" : "employee"
                              )
                            }
                          >
                            {t("All Employee")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("leaves-employee")
                                ? "active"
                                : ""
                            }
                            to="#"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "employee" ? "" : "employee"
                              )
                            }
                          >
                            {t("Full and Final")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("overtime") ? "active" : ""
                            }
                            to="#"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "employee" ? "" : "employee"
                              )
                            }
                          >
                            {t("Issue Letter")}
                          </Link>
                        </li>


                        {/* Link added by dushyant */}


                     <li>
                          <Link
                            className={
                              pathname.includes("employees")
                                ? "active"
                                : pathname.includes("employees-list")
                                  ? "active"
                                  : ""
                            }
                            to="/employees-list"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "employee" ? "" : "employee"
                              )
                            }
                          >
                            {t("Employee Details")}
                          </Link>
                        </li>

                        {/* Link is being added by me */}


                      </ul>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="submenu">
                    <Link
                      className={
                        pathname.includes("employees")
                          ? "active"
                          : pathname.includes("employees-list")
                            ? "active"
                            : ""
                      }
                      to="#"
                      onClick={() =>
                        toggleSidebar(
                          isSideMenu == "empreport" ? "" : "empreport"
                        )
                      }
                    >
                      <i className="la la-pie-chart" />

                      <span> {t("Emp Reports")}</span>
                      <span className="menu-arrow" />
                    </Link>
                    {isSideMenu == "empreport" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("empreport")
                                ? "active"
                                : pathname.includes("empreport")
                                  ? "active"
                                  : ""
                            }
                            to="#"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "empreport" ? "" : "empreport"
                              )
                            }
                          >
                            {t("Identity card")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("leaves-employee")
                                ? "active"
                                : ""
                            }
                            to="#"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "empreport" ? "" : "empreport"
                              )
                            }
                          >
                            {t("Joining Kit")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="submenu">
                    <Link
                      to="#"
                      className={isSideMenu == "attendence" ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(
                          isSideMenu == "attendence" ? "" : "attendence"
                        )
                      }
                    >
                      <i className="la la-user-check" />
                      <span> {t("Attendence")} </span>
                      <span className="menu-arrow" />
                    </Link>
                    {isSideMenu == "attendence" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("attendance-employee")
                                ? "active"
                                : ""
                            }
                            to="/attendance-employee"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "attendence" ? "" : "attendence"
                              )
                            }
                          >
                            {t("Mark Attendence")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("daily-attend-employee")
                                ? "active"
                                : ""
                            }
                            to="/daily-attend-employee"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "attendence" ? "" : "attendence"
                              )
                            }
                          >
                            {t("Daily Basis Attendence")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("monthly-attend-employee")
                                ? "active"
                                : ""
                            }
                            to="/monthly-attend-employee"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "attendence" ? "" : "attendence"
                              )
                            }
                          >
                            {t("Monthly Basis Attendence")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("monthly-attend-employee")
                                ? "active"
                                : ""
                            }
                            to="#"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "attendence" ? "" : "attendence"
                              )
                            }
                          >
                            {t("Final Submit Attendance for Payroll")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("shift-scheduling") ||
                                pathname.includes("shift-list")
                                ? "active"
                                : ""
                            }
                            to="/shift-list"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "attendence" ? "" : "attendence"
                              )
                            }
                          >
                            {t("Shift & Schedule")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                  <li className="submenu">
                    <Link
                      className={
                        pathname.includes("employees")
                          ? "active"
                          : pathname.includes("employees-list")
                            ? "active"
                            : ""
                      }
                      to="#"
                      onClick={() =>
                        toggleSidebar(isSideMenu == "leaves" ? "" : "leaves")
                      }
                    >
                      <i className="la la-list" />

                      <span> {t("Leaves")}</span>
                      <span className="menu-arrow" />
                    </Link>
                    {isSideMenu == "leaves" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("attendance-employee")
                                ? "active"
                                : ""
                            }
                            to="#"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "leaves" ? "" : "leaves"
                              )
                            }
                          >
                            {t("Apply for Leave")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("daily-attend-employee")
                                ? "active"
                                : ""
                            }
                            to="#"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "leaves" ? "" : "leaves"
                              )
                            }
                          >
                            {t("Leave Report")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("monthly-attend-employee")
                                ? "active"
                                : ""
                            }
                            to="#"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "leaves" ? "" : "leaves"
                              )
                            }
                          >
                            {t("Leave Approval by Admin")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("monthly-attend-employee")
                                ? "active"
                                : ""
                            }
                            to="#"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "leaves" ? "" : "leaves"
                              )
                            }
                          >
                            {t("Lock Leave for This Month")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="submenu">
                    <Link
                      to="#"
                      className={isSideMenu == "payroll" ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(isSideMenu == "payroll" ? "" : "payroll")
                      }
                    >
                      <i className="la la-money" />
                      <span> {t("Payroll")} </span>
                      <span className="menu-arrow" />
                    </Link>
                    {isSideMenu == "payroll" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("salary") ? "active" : ""
                            }
                            to="/salary"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "payroll" ? "" : "payroll"
                              )
                            }
                          >
                            {t("Create Payroll Month")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="submenu">
                    <Link
                      to="#"
                      className={isSideMenu == "reports" ? "subdrop" : ""}
                    // onClick={() =>
                    //   toggleSidebar(isSideMenu == "reports" ? "" : "reports")
                    // }
                    >
                      <i className="la la-pie-chart" />{" "}
                      <span> {t("Reports")} </span>
                      <span className="menu-arrow" />
                    </Link>
                    {isSideMenu == "reports" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("expense-reports")
                                ? "active"
                                : ""
                            }
                            to="/expense-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Expense Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("invoice-reports")
                                ? "active"
                                : ""
                            }
                            to="/invoice-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Invoice Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("payments-reports")
                                ? "active"
                                : ""
                            }
                            to="/payments-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Payment Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("payments-reports")
                                ? "active"
                                : ""
                            }
                            to="/payments-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Project Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("task-reports") ? "active" : ""
                            }
                            to="/task-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Task Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("user-reports") ? "active" : ""
                            }
                            to="/user-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("User Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("employee-reports")
                                ? "active"
                                : ""
                            }
                            to="/employee-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Employee Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("payslip-reports")
                                ? "active"
                                : ""
                            }
                            to="/payslip-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Payslip Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("attendance-reports")
                                ? "active"
                                : ""
                            }
                            to="/attendance-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Attendence Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("leave-reports") ? "active" : ""
                            }
                            to="/leave-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Leave Report")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("daily-reports") ? "active" : ""
                            }
                            to="/daily-reports"
                            onClick={() =>
                              toggleSidebar(
                                isSideMenu == "reports" ? "" : "reports"
                              )
                            }
                          >
                            {t("Daily Report")}
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="submenu">
                    <Link to="#">
                      <i className="la la-file" />

                      <span> {t("Statutory")}</span>
                    </Link>
                  </li>

                  <li className="submenu">
                    <Link to="#">
                      <i className="la la-hourglass-start" />

                      <span> {t("Pending Approval")}</span>
                    </Link>
                  </li>
                </>
              ) : userRole === "employee" ? (
                <>
                  <li
                    className={
                      pathname.includes("attendance-employee") ? "active" : ""
                    }
                  >
                    <Link to="/attendance-employee">
                      <i className="la la-user-check" />{" "}
                      <span>{t("Attendence")}</span>
                    </Link>
                  </li>

                  <li
                    className={
                      pathname.includes("profile") ? "active" : ""
                    }
                  >
                    <Link to="/profile" state={JSON.parse(localStorage.getItem("employeeData"))}>
                      <i className="la la-user" />{" "}
                      <span>{t("Profile")}</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li
                  className={pathname.includes("clients-list") ? "active" : ""}
                >
                  <Link to="/clients-list">
                    <i className="la la-building" /> <span>{t("Company")}</span>
                  </Link>
                </li>
              )}
            </ul>
          </Scrollbars>
        </div>
      </div>

      <div className="two-col-bar" id="two-col-bar">
        <div className="sidebar sidebar-twocol">
          <div className="sidebar-left slimscroll">
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            ></div>
          </div>
          <div className="sidebar-right"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
