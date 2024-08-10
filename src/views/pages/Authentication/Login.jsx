/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Applogo } from "../../../Routes/ImagePath";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useDispatch } from "react-redux";
import { login } from "../../../user";
import { resetFunctionwithlogin } from "../../../components/ResetFunction";
import { GetUser } from "../../../utils/GetApi";
import ErrorAlerts from "../Ui_Interface/Components/ErrorAlert";
import SuccessAlerts from "../Ui_Interface/Components/SuccessAlert";
// import { login } from "../../../user";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
});

const Login = () => {
  const details = localStorage.getItem("loginDetails");

  const loginData = JSON.parse(details);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [empLoginEnable, setEmpLoginEnable] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (email !== "" && password !== "") {
      setLoading(true);
      await GetUser(email, password, empLoginEnable).then((res) => {
        if (res) {
          const newData = res.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log({ newData });
          if (newData.length > 0 && newData[0].isActive === true) {
            setSuccessAlert(true);
            setLoading(false);
            localStorage.setItem("colorschema", "blue");
            localStorage.setItem("layout", "horizontal");
            localStorage.setItem("layoutwidth", "fixed");
            localStorage.setItem("layoutpos", "fluid");
            localStorage.setItem("topbartheme", "blue");
            localStorage.setItem("layoutSized", "lg");
            localStorage.setItem("layoutStyling", "default");
            localStorage.setItem("layoutSidebarStyle", "dark");
            localStorage.setItem("userEmail", newData[0].email);
            localStorage.setItem("userName", newData[0].name);
            localStorage.setItem("userRole", newData[0].role);
            localStorage.setItem("userId", newData[0].id);

            if (newData[0].role === "employee") {
              localStorage.setItem("employeeData", JSON.stringify(newData[0]));
            }

            setTimeout(() => {
              if (newData[0].role === "employee") {
                navigate("/attendance-employee");
              } else {
                navigate("/admin-dashboard");
              }
            }, 1000);
          } else {
            setShowAlert(true);
            setLoading(false);
          }
        }
      });
    } else {
      setShowAlert(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    // setValue("email", localStorage.getItem("email"));
    // setValue("password", localStorage.getItem("password"));
  }, []);

  const [eye, seteye] = useState(true);

  const onEyeClick = () => {
    seteye(!eye);
  };

  const [userIsDesktop, setUserIsDesktop] = useState(true);
  useEffect(() => {
    window.innerWidth < 1280 ? setUserIsDesktop(true) : setUserIsDesktop(false);
  }, [userIsDesktop]);

  return (
    <div>
      {showAlert && (
        <ErrorAlerts
          text="You enter wrong detail"
          setShowAlert={setShowAlert}
        />
      )}
      {showSuccessAlert && (
        <SuccessAlerts text="Login success" setSuccessAlert={setSuccessAlert} />
      )}
      <div
        className="account-page"
        style={{
          backgroundImage:
            'url("https://d6xcmfyh68wv8.cloudfront.net/learn-content/uploads/2020/10/Untitled-design-26.png")',
        }}
      >
        <div className="main-wrapper">
          <div className="account-content">
            {/* <Link to="/job-list" className="btn btn-primary apply-btn">
              Apply Job
            </Link> */}
            <div className="row">
              {/* Account Logo */}
              {userIsDesktop === true ? null : (
                <div className="col-sm-6" style={{ alignSelf: "center" }}>
                  {/* /Account Logo */}
                  <div className="account-box">
                    <div className="account-wrapper">
                      <h3 className="account-title">
                        Welcome to Jangidinfotech
                      </h3>
                      <p>
                        Welcome to Employer OnDemand HR Support Center, your
                        one-stop resource for HR-related workplace information.
                      </p>
                      <p>
                        Please login to find the answers, tools and resources to
                        address your Human Resources needs. If you do not
                        currently use the HR Support Center and would like to
                        have access to this outstanding business management
                        tool, we would be happy to make it available!
                      </p>
                      <p>
                        If you are not currently a subscriber, but would like to
                        have access to this outstanding business management
                        tool, we would be happy to make it available!
                      </p>
                      {/* Account Form */}

                      {/* /Account Form */}
                    </div>
                  </div>
                </div>
              )}

              <div className="col-sm-6">
                {/* /Account Logo */}
                {empLoginEnable === true ? (
                  <div className="account-box">
                    <div className="account-wrapper">
                      <h3 className="account-title">Login</h3>
                      <p className="account-subtitle">
                        Access to your dashboard
                      </p>
                      {/* Account Form */}
                      <div>
                        <form onSubmit={(e) => onSubmit(e)}>
                          <div className="input-block mb-4">
                            <label className="col-form-label">
                              Employee Id
                            </label>
                            <Controller
                              name="email"
                              control={control}
                              render={({ field }) => (
                                <input
                                  className={`form-control ${
                                    errors?.email ? "error-input" : ""
                                  }`}
                                  type="text"
                                  // defaultValue={localStorage.getItem("email")}
                                  onChange={(e) => setEmail(e.target.value)}
                                  value={email}
                                  autoComplete="true"
                                />
                              )}
                            />

                            <span className="text-danger">
                              {" "}
                              {errors.email?.message}{" "}
                            </span>
                          </div>
                          <div className="input-block mb-4">
                            <div className="row">
                              <div className="col">
                                <label className="col-form-label">
                                  Password
                                </label>
                              </div>
                            </div>
                            <div style={{ position: "relative" }}>
                              <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    className={`form-control ${
                                      errors?.password ? "error-input" : ""
                                    }`}
                                    type={eye ? "password" : "text"}
                                    // defaultValue={localStorage.getItem("password")}
                                    value={password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                  />
                                )}
                              />
                              <span
                                style={{
                                  position: "absolute",
                                  right: "5%",
                                  top: "30%",
                                }}
                                onClick={onEyeClick}
                                className={`fa-solid ${
                                  eye ? "fa-eye-slash" : "fa-eye"
                                } `}
                              />
                            </div>
                            <span className="text-danger">
                              {" "}
                              {errors.password?.message}{" "}
                            </span>
                          </div>
                          <div className="input-block text-center">
                            <button
                              className="btn btn-primary account-btn"
                              type="submit"
                            >
                              {loading === true ? (
                                <div
                                  className="spinner-border m-0"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                "Login"
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                      {/* /Account Form */}
                    </div>
                  </div>
                ) : (
                  <div className="account-box">
                    <div className="account-wrapper">
                      <h3 className="account-title">Login</h3>
                      <p className="account-subtitle">
                        Access to your dashboard
                      </p>
                      {/* Account Form */}
                      <div>
                        <form onSubmit={(e) => onSubmit(e)}>
                          <div className="input-block mb-4">
                            <label className="col-form-label">
                              Email Address
                            </label>
                            <Controller
                              name="email"
                              control={control}
                              render={({ field }) => (
                                <input
                                  className={`form-control ${
                                    errors?.email ? "error-input" : ""
                                  }`}
                                  type="text"
                                  // defaultValue={localStorage.getItem("email")}
                                  onChange={(e) => setEmail(e.target.value)}
                                  value={email}
                                  autoComplete="true"
                                />
                              )}
                            />

                            <span className="text-danger">
                              {" "}
                              {errors.email?.message}{" "}
                            </span>
                          </div>
                          <div className="input-block mb-4">
                            <div className="row">
                              <div className="col">
                                <label className="col-form-label">
                                  Password
                                </label>
                              </div>
                            </div>
                            <div style={{ position: "relative" }}>
                              <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    className={`form-control ${
                                      errors?.password ? "error-input" : ""
                                    }`}
                                    type={eye ? "password" : "text"}
                                    // defaultValue={localStorage.getItem("password")}
                                    value={password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                  />
                                )}
                              />
                              <span
                                style={{
                                  position: "absolute",
                                  right: "5%",
                                  top: "30%",
                                }}
                                onClick={onEyeClick}
                                className={`fa-solid ${
                                  eye ? "fa-eye-slash" : "fa-eye"
                                } `}
                              />
                            </div>
                            <span className="text-danger">
                              {" "}
                              {errors.password?.message}{" "}
                            </span>
                          </div>
                          <div className="input-block text-center">
                            <button
                              className="btn btn-primary account-btn"
                              type="submit"
                            >
                              {loading === true ? (
                                <div
                                  className="spinner-border m-0"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                "Login"
                              )}
                            </button>
                          </div>
                          <button
                            className="btn btn-primary "
                            onClick={() => setEmpLoginEnable(true)}
                          >
                            Employee Login
                          </button>
                        </form>
                      </div>
                      {/* /Account Form */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
