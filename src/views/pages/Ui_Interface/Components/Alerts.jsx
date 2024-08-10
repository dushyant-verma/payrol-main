import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layout/Header';
import Sidebar from '../../../layout/Sidebar';

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'primary',
      message: 'You should check in on some of those fields below.',
    },
    {
      id: 2,
      type: 'secondary',
      message: 'You should check in on some of those fields below.',
    },
    {
      id: 3,
      type: 'warning',
      message: 'There was a problem with your network connection.',
    },
    {
      id: 4,
      type: 'danger',
      message: 'A problem has been occurred while submitting your data.',
    },
    {
      id: 5,
      type: 'success',
      message: 'Your message has been sent successfully.',
    },
    {
      id: 6,
      type: 'info',
      message: 'Please read the comments carefully.',
    },
    {
      id: 7,
      type: 'light',
      message: 'You should check in on some of those fields below.',
    },
    {
      id: 8,
      type: 'dark',
      message: 'You should check in on some of those fields below.',
    },
  ];

  return (
    <div>
      {/* Alerts */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Header />
          <Sidebar />
          <div className="page-header">
            <div className="content-page-header">
              <h5>Alert</h5>
            </div>
          </div>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert alert-${alert.type} alert-dismissible fade show`}
              role="alert"
            >
              <strong>
                {alert.type === 'danger'
                  ? 'Error!'
                  : alert.type === 'success'
                    ? 'Success!'
                    : 'Holy guacamole!'}
              </strong>{' '}
              {alert.message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          ))}
        </div>
      </div>
      {/* /Alerts */}
      
    </div>

  );
}

export default Alerts;
