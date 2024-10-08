import React, { useState } from "react";
import Sidebar from "../../../layout/Sidebar";
import Header from "../../../layout/Header";
import { Avatar_03, Avatar_04, Avatar_05, Avatar_06, Avatar_07, Avatar_08, Img_01, Img_02, img_02, img_03, img_04, img_05, laptop } from "../../../../Routes/ImagePath";


const Lightbox = () => {
    const [menu, setMenu] = useState(false);

    const toggleMobileMenu = () => {
        setMenu(!menu);
    };
    return (
        <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
            <Header onMenuClick={() => toggleMobileMenu()} />
            <Sidebar />
            <div className="page-wrapper">
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="content-page-header">
                            <h5>Lightbox</h5>
                        </div>
                    </div>
                    {/* /Page Header */}
                    <div className="row">
                        {/* Lightbox */}
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Single Image Lightbox</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <a href={Img_01} className="image-popup">
                                                <img src={Img_01} className="img-fluid" alt="" />
                                            </a>
                                        </div>
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <a href={img_02} className="image-popup">
                                                <img src={img_02} className="img-fluid" alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Lightbox */}
                        {/* Lightbox */}
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Image with Description</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <a
                                                href={img_03}
                                                className="image-popup-desc"
                                                data-title="Title 01"
                                                data-description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
                                            >
                                                <img
                                                    src={img_03}
                                                    className="img-fluid"
                                                    alt="work-thumbnail"
                                                />
                                            </a>
                                        </div>
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <a
                                                href={img_04}
                                                className="image-popup-desc"
                                                data-title="Title 02"
                                                data-description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
                                            >
                                                <img
                                                    src={img_04}
                                                    className="img-fluid"
                                                    alt="work-thumbnail"
                                                />
                                            </a>
                                        </div>
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <a
                                                href={img_05}
                                                className="image-popup-desc"
                                                data-title="Title 03"
                                                data-description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
                                            >
                                                <img
                                                    src={img_05}
                                                    className="img-fluid"
                                                    alt="work-thumbnail"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Lightbox */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lightbox;
