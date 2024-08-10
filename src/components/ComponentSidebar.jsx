import React from "react";

const ComponentSidebar = () => {
  return (
    <>
      {/* Sidebar */}
      <div className="sidebar stickyside" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">Components</li>
              <li>
                <a href="#comp_alerts" className="active">
                  Alerts
                </a>
              </li>
              <li>
                <a href="#comp_breadcrumbs">Breadcrumbs</a>
              </li>
              <li>
                <a href="#comp_buttons">Buttons</a>
              </li>
              <li>
                <a href="#comp_cards">Cards</a>
              </li>
              <li>
                <a href="#comp_dropdowns">Dropdowns</a>
              </li>
              <li>
                <a href="#comp_pagination">Pagination</a>
              </li>
              <li>
                <a href="#comp_progress">Progress</a>
              </li>
              <li>
                <a href="#comp_tabs">Tabs</a>
              </li>
              <li>
                <a href="#comp_typography">Typography</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* /Sidebar */}
    </>
  );
};

export default ComponentSidebar;
