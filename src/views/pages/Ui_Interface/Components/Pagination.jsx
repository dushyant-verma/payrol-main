import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layout/Header';
import Sidebar from '../../../layout/Sidebar';

const Pagination = () => {
  return (
  <>
  <Header/>
  <Sidebar/>
  <div className="page-wrapper">
  <div className="content container-fluid">
    {/* Page Header */}
    <div className="page-header">
      <div className="content-page-header">
        <h5>Pagination</h5>
      </div>
    </div>
    {/* /Page Header */}
    {/* Pagination */}
    <div className="card bg-white mb-0">
      <div className="card-body">
        <div>
          <ul className="pagination mb-4">
            <li className="page-item disabled">
             <Link className="page-link" to="#" tabIndex={-1}>
                Previous
              </Link>
            </li>
            <li className="page-item">
             <Link className="page-link" to="#">
                1
              </Link>
            </li>
            <li className="page-item active">
             <Link className="page-link" to="#">
                2 <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="page-item">
             <Link className="page-link" to="#">
                3
              </Link>
            </li>
            <li className="page-item">
             <Link className="page-link" to="#">
                Next
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="pagination mb-4">
            <li className="page-item">
             <Link className="page-link" to="#" aria-label="Previous">
                <span aria-hidden="true">«</span>
                <span className="visually-hidden">Previous</span>
              </Link>
            </li>
            <li className="page-item">
             <Link className="page-link" to="#">
                1
              </Link>
            </li>
            <li className="page-item">
             <Link className="page-link" to="#">
                2
              </Link>
            </li>
            <li className="page-item">
             <Link className="page-link" to="#">
                3
              </Link>
            </li>
            <li className="page-item">
             <Link className="page-link" to="#" aria-label="Next">
                <span aria-hidden="true">»</span>
                <span className="visually-hidden">Next</span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="pagination pagination-lg mb-4">
            <li className="page-item disabled">
             <Link className="page-link" to="#" tabIndex={-1}>
                Previous
              </Link>
            </li>
            <li className="page-item">
             <Link className="page-link" to="#">
                1
              </Link>
            </li>
            <li className="page-item active">
             <Link className="page-link" to="#">
                2 <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="page-item">
             <Link className="page-link" to="#">
                3
              </Link>
            </li>
            <li className="page-item">
             <Link className="page-link" to="#">
                Next
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="pagination pagination-sm mb-0">
            <li className="page-item disabled">
             <Link className="page-link" to="#" tabIndex={-1}>
                Previous
              </Link>
            </li>
            <li className="page-item">
             <Link className="page-link" to="#">
                1
              </Link>
            </li>
            <li className="page-item active">
             <Link className="page-link" to="#">
                2 <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="page-item">
             <Link className="page-link" to="#">
                3
              </Link>
            </li>
            <li className="page-item">
             <Link className="page-link" to="#">
                Next
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    {/* /Pagination */}
  </div>
</div>

  </>
  );
}

export default Pagination;
