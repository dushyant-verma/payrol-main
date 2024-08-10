import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteDepartment } from "../../utils/DeleteApi";

const DeleteModal = (props) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteDepartment = async () => {
    setLoading(true);
    await DeleteDepartment(props.docName, props.deleteId)
      .then((res) => {
        if (res) {
          setLoading(false);
          window.location.reload();
        }
      })
      .catch((err) => setLoading(false));
  };
  return (
    <>
      {/* Delete Performance Indicator Modal */}
      <div className="modal custom-modal fade" id="delete" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>{props.Name}</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <Link
                      to="#"
                      className="btn btn-primary continue-btn"
                      onClick={handleDeleteDepartment}
                    >
                      {loading === true ? (
                        <div className="spinner-border m-0" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Delete"
                      )}
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link
                      to="#"
                      data-bs-dismiss="modal"
                      className="btn btn-primary cancel-btn"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Performance Indicator Modal */}
    </>
  );
};

export default DeleteModal;
