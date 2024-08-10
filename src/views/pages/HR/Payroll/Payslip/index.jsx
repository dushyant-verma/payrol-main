import React, { useEffect, useRef, useState } from "react";

import Breadcrumbs from "../../../../../components/Breadcrumbs";
import { Applogo } from "../../../../../Routes/ImagePath";
import { useLocation } from "react-router-dom";
import { GetApi } from "../../../../../utils/GetApi";
import { useReactToPrint } from "react-to-print";

const PaySlip = () => {
  const location = useLocation();
  // console.log({ location: location?.state });
  const [companyData, setCompanyData] = useState([]);
  const [epfData, setEpfData] = useState([]);
  const [esicData, setEsicData] = useState([]);
  const [tdsData, setTdsData] = useState([]);
  const [vpfData, setVpfData] = useState([]);

  const [printSalary, setPrintSalary] = useState(false);
  const [totalEmpEarning, setTotalEmpEarning] = useState(0);
  const [totalEmpDeduction, setTotalEmpDeduction] = useState(0);
  const [employeeData, setEmployeeData] = useState({});
  const [epf, setEpf] = useState(false);
  const [esic, setEsic] = useState(false);
  const [vpf, setVpf] = useState(false);
  const [tds, setTds] = useState(false);

  useEffect(() => {
    setEmployeeData(location?.state);
    getCompanyData();
    getEpfData();
    getEsicData();
    getTdsData();
  }, []);

  const getCompanyData = async () => {
    await GetApi("users", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log({ newData });
        setCompanyData(newData);
      })
      .catch((err) => console.log({ err }));
  };

  const getEpfData = async () => {
    await GetApi("epfparameters", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log({ newData });
        setEpfData(newData);
      })
      .catch((err) => console.log({ err }));
  };

  const getEsicData = async () => {
    await GetApi("esicparameters", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log({ newData });
        setEsicData(newData);
      })
      .catch((err) => console.log({ err }));
  };

  const getTdsData = async () => {
    await GetApi("tdsparameters", "companyId", localStorage.getItem("userId"))
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log({ newData });
        setTdsData(newData);
      })
      .catch((err) => console.log({ err }));
  };

  const componentRef = useRef();

  useEffect(() => {
    if (printSalary === true) {
      handlePrint();
    }
  }, [printSalary]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    let epfArray = employeeData?.empStatutory?.filter(
      (item) => item?.module === "EPF Applicable"
    );
    let esicArray = employeeData?.empStatutory?.filter(
      (item) => item?.module === "ESIC Applicable"
    );
    let vpfArray = employeeData?.empStatutory?.filter(
      (item) => item?.module === "VPF Applicable"
    );
    let tdsArray = employeeData?.empStatutory?.filter(
      (item) => item?.module === "TDS Applicable"
    );

    setVpfData(vpfArray);

    if (
      epfArray !== undefined &&
      esicArray !== undefined &&
      vpfArray !== undefined &&
      tdsArray !== undefined
    ) {
      setEpf(epfArray[0]?.yes);
      setEsic(esicArray[0]?.yes);
      setVpf(vpfArray[0]?.yes);
      setTds(tdsArray[0]?.yes);
    }

    if (employeeData?.salaryStructure === "Mannual entry") {
      const totalEarning = employeeData?.salaryForm?.reduce(
        (n, { value }) => n + parseInt(value),
        0
      );
      setTotalEmpEarning(totalEarning + parseInt(employeeData?.empSalary));

      const totaDeduction = employeeData?.salaryFormDeduction?.reduce(
        (n, { value }) => n + parseInt(value),
        0
      );
      setTotalEmpDeduction(totaDeduction);
    } else {
      const totalEarning =
        employeeData?.salaryStructur?.salaryDataAllowance?.reduce(
          (n, { amount }) => n + parseInt(amount),
          0
        );
      setTotalEmpEarning(
        totalEarning + parseInt(employeeData?.salaryStructur?.basicSalary)
      );

      const totaDeduction =
        employeeData?.salaryStructur?.salaryDataDeduction?.reduce(
          (n, { amount }) => n + parseInt(amount),
          0
        );
      setTotalEmpDeduction(totaDeduction);
    }
  }, [totalEmpDeduction, totalEmpEarning]);

  console.log({ employeeData });

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Payslip"
          title="Dashboard"
          subtitle="Payslip"
          modal="#add_categories"
          name="Add Salary"
          printSalary={printSalary}
          setPrintSalary={setPrintSalary}
        />

        <div className="row" ref={componentRef}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="payslip-title">
                  Payslip for the month of {new Date().toString().slice(3, 7)}{" "}
                  {new Date().toString().slice(11, 16)}
                </h4>
                <div className="row">
                  <div className="col-sm-6 m-b-20">
                    <img
                      src={companyData[0]?.avatar}
                      className="inv-logo"
                      alt="Logo"
                    />
                    <ul className="list-unstyled mb-0">
                      <li>
                        {companyData[0]?.companyName},{companyData[0]?.building}
                      </li>
                      <li>
                        {companyData[0]?.line1}, {companyData[0]?.line2},{" "}
                        {companyData[0]?.line3}
                      </li>
                      <li>
                        {companyData[0]?.district}, {companyData[0]?.state},{" "}
                        {companyData[0]?.zip}
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-6 m-b-20">
                    <div className="invoice-details">
                      <h3 className="text-uppercase">
                        Payslip #{employeeData?.empId}
                      </h3>
                      <ul className="list-unstyled">
                        <li>
                          Salary Month:{" "}
                          <span>
                            {new Date().toString().slice(3, 7)}{" "}
                            {new Date().toString().slice(11, 16)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 m-b-20">
                    <ul className="list-unstyled">
                      <li>
                        <h5 className="mb-0">
                          <strong>{employeeData?.name}</strong>
                        </h5>
                      </li>
                      <li>
                        <span>{employeeData?.empDesignationName}</span>
                      </li>
                      <li>Employee ID: {employeeData?.empId}</li>
                      <li>
                        Joining Date: {employeeData?.empJoinDate?.slice(0, 16)}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div>
                      <h4 className="m-b-10">
                        <strong>Earnings</strong>
                      </h4>
                      <table className="table table-bordered">
                        <tbody>
                          {employeeData?.salaryStructure === "Mannual entry" ? (
                            <tr>
                              <td>
                                <strong>Basic Salary</strong>{" "}
                                <span className="float-end">
                                  {employeeData?.empSalary}
                                </span>
                              </td>
                            </tr>
                          ) : (
                            <tr>
                              <td>
                                <strong>Basic Salary</strong>{" "}
                                <span className="float-end">
                                  {employeeData?.salaryStructur?.basicSalary}
                                </span>
                              </td>
                            </tr>
                          )}

                          {employeeData?.salaryStructure === "Mannual entry"
                            ? employeeData?.salaryForm?.map((item, i) => (
                                <tr key={i}>
                                  <td>
                                    <strong>{item?.name}</strong>{" "}
                                    <span className="float-end">
                                      {item?.value}
                                    </span>
                                  </td>
                                </tr>
                              ))
                            : employeeData?.salaryStructur?.salaryDataAllowance?.map(
                                (item, i) => (
                                  <tr key={i}>
                                    <td>
                                      <strong>{item?.allowance}</strong>{" "}
                                      <span className="float-end">
                                        {item?.amount}
                                      </span>
                                    </td>
                                  </tr>
                                )
                              )}

                          <tr>
                            <td>
                              <strong>Total Earnings</strong>{" "}
                              <span className="float-end">
                                <strong>{totalEmpEarning}</strong>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <h4 className="m-b-10">
                        <strong>Deductions</strong>
                      </h4>
                      <table className="table table-bordered">
                        <tbody>
                          {esic === true ? (
                            <tr>
                              <td>
                                <strong>ESIC</strong>{" "}
                                <span className="float-end">
                                  {((employeeData?.salaryStructure ===
                                  "Mannual entry"
                                    ? employeeData?.empSalary
                                    : employeeData?.salaryStructur
                                        ?.basicSalary) *
                                    esicData[0]?.employeeContributionRate) /
                                    100}
                                </span>
                              </td>
                            </tr>
                          ) : null}
                          {epf === true ? (
                            <tr>
                              <td>
                                <strong>EPF</strong>{" "}
                                <span className="float-end">
                                  {((employeeData?.salaryStructure ===
                                  "Mannual entry"
                                    ? employeeData?.empSalary
                                    : employeeData?.salaryStructur
                                        ?.basicSalary) *
                                    epfData[0]?.employeeContributionRate) /
                                    100}
                                </span>
                              </td>
                            </tr>
                          ) : null}
                          {vpf === true ? (
                            <tr>
                              <td>
                                <strong>VPF</strong>{" "}
                                <span className="float-end">
                                  {vpfData[0]?.value === ""
                                    ? 0
                                    : vpfData[0]?.value}
                                </span>
                              </td>
                            </tr>
                          ) : null}
                          {tds === true ? (
                            <tr>
                              <td>
                                <strong>TDS</strong>{" "}
                                <span className="float-end">
                                  {((employeeData?.salaryStructure ===
                                  "Mannual entry"
                                    ? employeeData?.empSalary
                                    : employeeData?.salaryStructur
                                        ?.basicSalary) *
                                    tdsData[0]?.tdsForm[0]?.tds) /
                                    100}
                                </span>
                              </td>
                            </tr>
                          ) : null}
                          {employeeData?.salaryStructure === "Mannual entry" ? (
                            employeeData?.salaryFormDeduction?.map(
                              (item, i) => (
                                <tr key={i}>
                                  <td>
                                    <strong>{item?.name}</strong>{" "}
                                    <span className="float-end">
                                      {item?.value}
                                    </span>
                                  </td>
                                </tr>
                              )
                            )
                          ) : (
                            <>
                              {employeeData?.salaryStructur?.salaryDataDeduction?.map(
                                (item, i) => (
                                  <tr key={i}>
                                    <td>
                                      <strong>{item?.deduction}</strong>{" "}
                                      <span className="float-end">
                                        {item?.amount}
                                      </span>
                                    </td>
                                  </tr>
                                )
                              )}
                            </>
                          )}

                          <tr>
                            <td>
                              <strong>Total Deductions</strong>{" "}
                              <span className="float-end">
                                <strong>
                                  {totalEmpDeduction +
                                    parseInt(
                                      ((employeeData?.salaryStructure ===
                                      "Mannual entry"
                                        ? employeeData?.empSalary
                                        : employeeData?.salaryStructur
                                            ?.basicSalary) *
                                        esicData[0]?.employeeContributionRate) /
                                        100
                                    ) +
                                    parseInt(
                                      ((employeeData?.salaryStructure ===
                                      "Mannual entry"
                                        ? employeeData?.empSalary
                                        : employeeData?.salaryStructur
                                            ?.basicSalary) *
                                        epfData[0]?.employeeContributionRate) /
                                        100
                                    ) +
                                    parseInt(
                                      ((employeeData?.salaryStructure ===
                                      "Mannual entry"
                                        ? employeeData?.empSalary
                                        : employeeData?.salaryStructur
                                            ?.basicSalary) *
                                        tdsData[0]?.tdsForm[0]?.tds) /
                                        100
                                    )}
                                </strong>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <p>
                      <strong>
                        Net Salary:{" "}
                        {totalEmpEarning -
                          (totalEmpDeduction +
                            parseInt(
                              ((employeeData?.salaryStructure ===
                              "Mannual entry"
                                ? employeeData?.empSalary
                                : employeeData?.salaryStructur?.basicSalary) *
                                esicData[0]?.employeeContributionRate) /
                                100
                            ) +
                            parseInt(
                              ((employeeData?.salaryStructure ===
                              "Mannual entry"
                                ? employeeData?.empSalary
                                : employeeData?.salaryStructur?.basicSalary) *
                                epfData[0]?.employeeContributionRate) /
                                100
                            ) +
                            parseInt(
                              ((employeeData?.salaryStructure ===
                              "Mannual entry"
                                ? employeeData?.empSalary
                                : employeeData?.salaryStructur?.basicSalary) *
                                tdsData[0]?.tdsForm[0]?.tds) /
                                100
                            ))}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaySlip;
