import React from "react";

const ErrorAlerts = ({ text, setShowAlert }) => {
  const alerts = [
    {
      id: 1,
      type: "danger",
      message: text,
    },
  ];

  return (
    <div>
      {/* Alerts */}
      <div>
        <div className="content container-fluid">
          <div className="page-header"></div>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert alert-${alert.type} alert-dismissible fade show`}
              role="alert"
            >
              <strong>
                {alert.type === "danger"
                  ? "Error!"
                  : alert.type === "success"
                  ? "Success!"
                  : "Holy guacamole!"}
              </strong>{" "}
              {alert.message}
              <button
                type="button"
                className="btn-close"
                // data-bs-dismiss="alert"
                aria-label="Close"
                onClick={()=> setShowAlert(false)}
              ></button>
            </div>
          ))}
        </div>
      </div>
      {/* /Alerts */}
    </div>
  );
};

export default ErrorAlerts;
