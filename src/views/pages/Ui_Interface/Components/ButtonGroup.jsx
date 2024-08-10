/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Header from '../../../layout/Header'
import Sidebar from '../../../layout/Sidebar'
const ButtonGroup = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="content-page-header">
                            <h5>Button Group</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card bg-white">
                                <div className="card-header">
                                    <h5 className="card-title">Horizontal</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-primary">
                                            Left
                                        </button>
                                        <button type="button" className="btn btn-primary">
                                            Middle
                                        </button>
                                        <button type="button" className="btn btn-primary">
                                            Right
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card bg-white">
                                <div className="card-header">
                                    <h5 className="card-title"> Input Group </h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-primary">
                                            1
                                        </button>
                                        <button type="button" className="btn btn-primary">
                                            2
                                        </button>
                                        <button type="button" className="btn btn-primary">
                                            3
                                        </button>
                                        <button type="button" className="btn btn-primary">
                                            4
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card bg-white mb-0">
                                <div className="card-header">
                                    <h5 className="card-title"> Vertical </h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-group">
                                        <div className="btn-group-vertical">
                                            <button type="button" className="btn btn-primary">
                                                Button
                                            </button>
                                            <div className="btn-group" role="group">
                                                <button
                                                    id="btngroupverticaldrop1"
                                                    type="button"
                                                    className="btn btn-primary dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Dropdown
                                                </button>
                                                <div
                                                    className="dropdown-menu"
                                                    aria-labelledby="btngroupverticaldrop1"
                                                >
                                                    <a className="dropdown-item" href="#">
                                                        Dropdown link
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Dropdown link
                                                    </a>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-primary">
                                                Button
                                            </button>
                                            <button type="button" className="btn btn-primary">
                                                Button
                                            </button>
                                            <div className="btn-group" role="group">
                                                <button
                                                    id="btngroupverticaldrop2"
                                                    type="button"
                                                    className="btn btn-primary dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Dropdown
                                                </button>
                                                <div
                                                    className="dropdown-menu"
                                                    aria-labelledby="btngroupverticaldrop2"
                                                >
                                                    <a className="dropdown-item" href="#">
                                                        Dropdown link
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Dropdown link
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ButtonGroup
