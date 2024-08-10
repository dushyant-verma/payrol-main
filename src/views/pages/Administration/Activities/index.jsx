import React from "react";

import Breadcrumbs from "../../../../components/Breadcrumbs";
import { Link } from "react-router-dom";

import ActivitiesList from "../../../../assets/json/activities";

const Activities = () => {
  const data = ActivitiesList.ActivitiesList;
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Activities"
          title="Dashboard"
          subtitle="Activities"
        />

        <div className="row">
          <div className="col-md-12">
            <div className="activity">
              <div className="activity-box">
                <ul className="activity-list">
                  {data.map((activity, index) => (
                    <li key={index}>
                      <div className="activity-user">
                        <Link
                          to="/profile"
                          title={activity.user}
                          data-bs-toggle="tooltip"
                          className="avatar"
                        >
                          <img src={activity.avatar} alt={activity.user} />
                        </Link>
                      </div>
                      <div className="activity-content">
                        <div className="timeline-content">
                          <Link to="/profile" className="name">
                            {activity.user}
                          </Link>{" "}
                          {activity.activity}{" "}
                          <Link to="#">{activity.task}</Link>
                          <span className="time">{activity.timestamp}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
