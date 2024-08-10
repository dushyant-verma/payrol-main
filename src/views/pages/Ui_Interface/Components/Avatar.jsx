/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Avatar_02, Avatar_03, Avatar_04 } from '../../../../Routes/ImagePath'
import Header from '../../../layout/Header'
import Sidebar from '../../../layout/Sidebar'

const Avatar = () => {
    return (
        <div>
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <Header />
                    <Sidebar />
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="content-page-header">
                            <h5>Avatar</h5>
                        </div>
                    </div>
                    {/* /Page Header */}
                    {/* Avatar */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card bg-white">
                                <div className="card-header">
                                    <h5 className="card-title">Sizing</h5>
                                </div>
                                <div className="card-body">
                                    <div className="avatar avatar-xxl">
                                        <img
                                            className="avatar-img rounded-circle"
                                            alt="User Image"
                                            src={Avatar_02}
                                        />
                                    </div>
                                    <div className="avatar avatar-xl">
                                        <img
                                            className="avatar-img rounded-circle"
                                            alt="User Image"
                                            src={Avatar_02}
                                        />
                                    </div>
                                    <div className="avatar avatar-lg">
                                        <img
                                            className="avatar-img rounded-circle"
                                            alt="User Image"
                                            src={Avatar_02}
                                        />
                                    </div>
                                    <div className="avatar">
                                        <img
                                            className="avatar-img rounded-circle"
                                            alt="User Image"
                                            src={Avatar_02}
                                        />
                                    </div>
                                    <div className="avatar avatar-sm">
                                        <img
                                            className="avatar-img rounded-circle"
                                            alt="User Image"
                                            src={Avatar_02}
                                        />
                                    </div>
                                    <div className="avatar avatar-xs">
                                        <img
                                            className="avatar-img rounded-circle"
                                            alt="User Image"
                                            src={Avatar_02}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card bg-white">
                                <div className="card-header">
                                    <h5 className="card-title">Avatar With Status</h5>
                                </div>
                                <div className="card-body">
                                    <div className="avatar avatar-online">
                                        <img
                                            className="avatar-img rounded-circle"
                                            alt="User Image"
                                            src={Avatar_02}
                                        />
                                    </div>
                                    <div className="avatar avatar-offline">
                                        <img
                                            className="avatar-img rounded-circle"
                                            alt="User Image"
                                            src={Avatar_02}
                                        />
                                    </div>
                                    <div className="avatar avatar-away">
                                        <img
                                            className="avatar-img rounded-circle"
                                            alt="User Image"
                                            src={Avatar_02}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card bg-white">
                                <div className="card-header">
                                    <h5 className="card-title">Shape</h5>
                                </div>
                                <div className="card-body">
                                    <div className="avatar">
                                        <img
                                            className="avatar-img rounded"
                                            alt="User Image"
                                            src={Avatar_02}
                                        />
                                    </div>
                                    <div className="avatar">
                                        <img
                                            className="avatar-img rounded-circle"
                                            alt="User Image"
                                            src={Avatar_02}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card bg-white mb-0">
                                <div className="card-header">
                                    <h5 className="card-title">Group</h5>
                                </div>
                                <div className="card-body">
                                    <div className="avatar-group">
                                        <div className="avatar">
                                            <img
                                                className="avatar-img rounded-circle border border-white"
                                                alt=""
                                                src={Avatar_02}
                                            />
                                        </div>
                                        <div className="avatar">
                                            <img
                                                className="avatar-img rounded-circle border border-white"
                                                alt=""
                                                src={Avatar_03}
                                            />
                                        </div>
                                        <div className="avatar">
                                            <img
                                                className="avatar-img rounded-circle border border-white"
                                                alt=""
                                                src={Avatar_04}
                                            />
                                        </div>
                                        <div className="avatar">
                                            <span className="avatar-title rounded-circle border border-white">
                                                CF
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Avatar */}

                </div>
            </div>
        </div>
    )
}

export default Avatar
