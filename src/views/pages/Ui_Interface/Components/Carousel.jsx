/* eslint-disable react/no-unescaped-entities */
import React from "react";

import { Link } from "react-router-dom";
import {  Img_01, img1,  img_05, img_03 } from "../../../../Routes/ImagePath";
import Header from "../../../layout/Header";
import Sidebar from "../../../layout/Sidebar";

const Carousel = () => {


    return (
        <div>
            <Header />
            <Sidebar />
            <div className="page-wrapper">
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="content-page-header">
                            <h5>Carousel</h5>
                        </div>
                    </div>
                    {/* /Page Header */}
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body card-buttons">
                                    <h4 className="header-title">Slides only</h4>
                                    <p className="sub-header">
                                        Here’s a carousel with slides only. Note the presence of the{" "}
                                        <code>.d-block</code> and <code>.img-fluid</code> on
                                        carousel images to prevent browser default image alignment.
                                    </p>
                                    <div
                                        id="carouselExampleSlidesOnly"
                                        className="carousel slide"
                                        data-bs-ride="carousel"
                                    >
                                        <div className="carousel-inner" role="listbox">
                                            <div className="carousel-item active">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={Img_01}
                                                    alt="First slide"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={img_05}
                                                    alt="Second slide"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={img_05}
                                                    alt="Third slide"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body card-buttons">
                                    <h4 className="header-title">With controls</h4>
                                    <p className="sub-header">
                                        Adding in the previous and next controls:
                                    </p>
                                    {/* START carousel*/}
                                    <div
                                        id="carouselExampleControls"
                                        className="carousel slide"
                                        data-bs-ride="carousel"
                                    >
                                        <div className="carousel-inner" role="listbox">
                                            <div className="carousel-item active">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={Img_01}
                                                    alt="First slide"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={img_05}
                                                    alt="Second slide"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={img_05}
                                                    alt="Third slide"
                                                />
                                            </div>
                                        </div>
                                        <Link
                                            className="carousel-control-prev"
                                            to="#carouselExampleControls"
                                            role="button"
                                            data-bs-slide="prev"
                                        >
                                            <span
                                                className="carousel-control-prev-icon"
                                                aria-hidden="true"
                                            />
                                            <span className="visually-hidden">Previous</span>
                                        </Link>
                                        <Link
                                            className="carousel-control-next"
                                            to="#carouselExampleControls"
                                            role="button"
                                            data-bs-slide="next"
                                        >
                                            <span
                                                className="carousel-control-next-icon"
                                                aria-hidden="true"
                                            />
                                            <span className="visually-hidden">Next</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* END carousel*/}
                        </div>
                    </div>
                    {/* end row */}
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body card-buttons">
                                    <h4 className="header-title">With indicators</h4>
                                    <p className="sub-header">
                                        You can also add the indicators to the carousel, alongside
                                        the controls, too.
                                    </p>
                                    <div
                                        id="carouselExampleIndicators"
                                        className="carousel slide"
                                        data-bs-ride="carousel"
                                    >
                                        <ol className="carousel-indicators">
                                            <li
                                                data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to={0}
                                                className="active"
                                            />
                                            <li
                                                data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to={1}
                                            />
                                            <li
                                                data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to={2}
                                            />
                                        </ol>
                                        <div className="carousel-inner" role="listbox">
                                            <div className="carousel-item active">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={img_03}
                                                    alt="First slide"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={img_05}
                                                    alt="Second slide"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={img_05}
                                                    alt="Third slide"
                                                />
                                            </div>
                                        </div>
                                        <Link
                                            className="carousel-control-prev"
                                            to="#carouselExampleIndicators"
                                            role="button"
                                            data-bs-slide="prev"
                                        >
                                            <span
                                                className="carousel-control-prev-icon"
                                                aria-hidden="true"
                                            />
                                            <span className="visually-hidden">Previous</span>
                                        </Link>
                                        <Link
                                            className="carousel-control-next"
                                            to="#carouselExampleIndicators"
                                            role="button"
                                            data-bs-slide="next"
                                        >
                                            <span
                                                className="carousel-control-next-icon"
                                                aria-hidden="true"
                                            />
                                            <span className="visually-hidden">Next</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                        {/* end col */}
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body card-buttons">
                                    <h4 className="header-title">With captions</h4>
                                    <p className="sub-header">
                                        Add captions to your slides easily with the{" "}
                                        <code>.carousel-caption</code> element within any{" "}
                                        <code>.carousel-item</code>.
                                    </p>
                                    <div
                                        id="carouselExampleCaption"
                                        className="carousel slide"
                                        data-bs-ride="carousel"
                                    >
                                        <div className="carousel-inner" role="listbox">
                                            <div className="carousel-item active">
                                                <img
                                                    src={img_03}
                                                    alt="..."
                                                    className="d-block img-fluid"
                                                />
                                                <div className="carousel-caption d-none d-md-block">
                                                    <h3 className="text-white">First slide label</h3>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing
                                                        elit.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    src={img1}
                                                    alt="..."
                                                    className="d-block img-fluid"
                                                />
                                                <div className="carousel-caption d-none d-md-block">
                                                    <h3 className="text-white">Second slide label</h3>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing
                                                        elit.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    src={img1}
                                                    alt="..."
                                                    className="d-block img-fluid"
                                                />
                                                <div className="carousel-caption d-none d-md-block">
                                                    <h3 className="text-white">Third slide label</h3>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing
                                                        elit.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <Link
                                            className="carousel-control-prev"
                                            to="#carouselExampleCaption"
                                            role="button"
                                            data-bs-slide="prev"
                                        >
                                            <span
                                                className="carousel-control-prev-icon"
                                                aria-hidden="true"
                                            />
                                            <span className="visually-hidden">Previous</span>
                                        </Link>
                                        <Link
                                            className="carousel-control-next"
                                            to="#carouselExampleCaption"
                                            role="button"
                                            data-bs-slide="next"
                                        >
                                            <span
                                                className="carousel-control-next-icon"
                                                aria-hidden="true"
                                            />
                                            <span className="visually-hidden">Next</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end col */}
                    </div>
                    {/* end row */}
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body card-buttons">
                                    <h4 className="header-title">Crossfade</h4>
                                    <p className="sub-header">
                                        Add <code>.carousel-fade</code> to your carousel to animate
                                        slides with a fade transition instead of a slide.
                                    </p>
                                    <div
                                        id="carouselExampleFade"
                                        className="carousel slide carousel-fade"
                                        data-bs-ride="carousel"
                                    >
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={Img_01}
                                                    alt="First slide"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={img_05}
                                                    alt="Second slide"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={Img_01}
                                                    alt="Third slide"
                                                />
                                            </div>
                                        </div>
                                        <Link
                                            className="carousel-control-prev"
                                            to="#carouselExampleFade"
                                            role="button"
                                            data-bs-slide="prev"
                                        >
                                            <span
                                                className="carousel-control-prev-icon"
                                                aria-hidden="true"
                                            />
                                            <span className="visually-hidden">Previous</span>
                                        </Link>
                                        <Link
                                            className="carousel-control-next"
                                            to="#carouselExampleFade"
                                            role="button"
                                            data-bs-slide="next"
                                        >
                                            <span
                                                className="carousel-control-next-icon"
                                                aria-hidden="true"
                                            />
                                            <span className="visually-hidden">Next</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                        {/* end col */}
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body card-buttons">
                                    <h4 className="header-title">Individual interval</h4>
                                    <p className="sub-header">
                                        Add <code>data-bs-interval=""</code> to a{" "}
                                        <code>.carousel-item</code> to change the amount of time to
                                        delay between automatically cycling to the next item.
                                    </p>
                                    <div
                                        id="carouselExampleInterval"
                                        className="carousel slide"
                                        data-bs-ride="carousel"
                                    >
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={Img_01}
                                                    alt="First slide"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={img_05}
                                                    alt="Second slide"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    className="d-block img-fluid"
                                                    src={Img_01}
                                                    alt="Third slide"
                                                />
                                            </div>
                                        </div>
                                        <Link
                                            className="carousel-control-prev"
                                            to="#carouselExampleInterval"
                                            role="button"
                                            data-bs-slide="prev"
                                        >
                                            <span
                                                className="carousel-control-prev-icon"
                                                aria-hidden="true"
                                            />
                                            <span className="visually-hidden">Previous</span>
                                        </Link>
                                        <Link
                                            className="carousel-control-next"
                                            to="#carouselExampleInterval"
                                            role="button"
                                            data-bs-slide="next"
                                        >
                                            <span
                                                className="carousel-control-next-icon"
                                                aria-hidden="true"
                                            />
                                            <span className="visually-hidden">Next</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end col */}
                    </div>
                    {/* end row */}
                </div>
                {/* content */}
            </div>
        </div>
    );
};

export default Carousel;
