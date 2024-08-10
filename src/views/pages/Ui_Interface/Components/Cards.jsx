import React from "react";
import { Img_01 } from "../../../../Routes/ImagePath";
import { Link } from "react-router-dom";
import Header from "../../../layout/Header";
import Sidebar from "../../../layout/Sidebar";

const Cards = () => {
  const cardData = [
    {
      imgSrc: Img_01,
      cardTitle: "Card with image and links",
      cardText:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      cardLinks: [
        { text: "Card link", href: "#" },
        { text: "Another link", href: "#" },
      ],
    },
    {
      imgSrc: Img_01,
      cardTitle: "Card with image and button",
      cardText:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      cardButton: { text: "Go somewhere", href: "#" },
    },
    {
      imgSrc: Img_01,
      cardTitle: "Card with image and list",
      cardListItems: [
        "Cras justo odio",
        "Dapibus ac facilisis in",
        "Vestibulum at eros",
      ],
    },
  ];
  const cardDataTwo = [
    {
      cardTitle: "Card with links",
      cardText:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      cardLinks: [
        { text: "Card link", href: "#" },
        { text: "Another link", href: "#" },
      ],
    },
    {
      cardTitle: "Card with button",
      cardText:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      cardButton: { text: "Go somewhere", href: "#" },
    },
    {
      cardTitle: "Card with list",
      cardListItems: [
        "Cras justo odio",
        "Dapibus ac facilisis in",
        "Vestibulum at eros",
      ],
    },
  ];
  const cardDataThree = [
    {
      cardHeader: "This is my header",
      cardTitle: "Special title treatment",
      cardText:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      cardFooter: "This is my footer",
      showButton: true,
    },
    {
      cardHeader: (
        <ul role="tablist" className="nav nav-tabs card-header-tabs float-end">
          <li className="nav-item">
            <Link to="#tab-1" data-bs-toggle="tab" className="nav-link active">
              Active
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#tab-2" data-bs-toggle="tab" className="nav-link">
              Link
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#tab-3" data-bs-toggle="tab" className="nav-link disabled">
              Disabled
            </Link>
          </li>
        </ul>
      ),
      cardTabContent: [
        {
          id: "tab-1",
          cardTitle: "Card with tabs",
          cardText:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
        },
        {
          id: "tab-2",
          cardTitle: "Card with tabs",
          cardText:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
        },
        {
          id: "tab-3",
          cardTitle: "Card with tabs",
          cardText:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
        },
      ],
    },
    {
      cardHeader: (
        <ul
          role="tablist"
          className="nav nav-pills card-header-pills float-end"
        >
          <li className="nav-item">
            <Link to="#tab-4" data-bs-toggle="tab" className="nav-link active">
              Active
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#tab-5" data-bs-toggle="tab" className="nav-link">
              Link
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#tab-6" data-bs-toggle="tab" className="nav-link disabled">
              Disabled
            </Link>
          </li>
        </ul>
      ),
      cardTabContent: [
        {
          id: "tab-4",
          cardTitle: "Card with pills",
          cardText:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
        },
        {
          id: "tab-5",
          cardTitle: "Card with pills",
          cardText:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
        },
        {
          id: "tab-6",
          cardTitle: "Card with pills",
          cardText:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
        },
      ],
    },
  ];
  return (
    <>
      {/* Cards */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Header />
          <Sidebar />
          <div className="page-header">
            <div className="content-page-header">
              <h3 className="section-title">Cards</h3>
            </div>
          </div>
          <div className="row">
            {cardData.map((card, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4 d-flex">
                <div className="card flex-fill">
                  <img
                    src={card.imgSrc}
                    alt="Card"
                    className="card-img-top"
                  />
                  <div className="card-header">
                    <h5 className="card-title mb-0">{card.cardTitle}</h5>
                  </div>

                  {card.cardLinks && (
                    <div className="card-body">
                      <p className="card-text">{card.cardText}</p>
                      <div>
                        {card.cardLinks.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            className="card-link"
                            to={link.href}
                          >
                            {link.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {card.cardButton && (
                    <div className="card-body">
                      <p className="card-text">{card.cardText}</p>
                      <Link className="btn btn-primary" to={card.cardButton.href}>
                        {card.cardButton.text}
                      </Link>
                    </div>
                  )}
                  {card.cardListItems && (
                    <ul className="list-group list-group-flush">
                      {card.cardListItems.map((item, itemIndex) => (
                        <li key={itemIndex} className="list-group-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            {cardDataTwo.map((card, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4 d-flex">
                <div className="card flex-fill">
                  <div className="card-header">
                    <h5 className="card-title mb-0">{card.cardTitle}</h5>
                  </div>

                  {card.cardLinks && (
                    <div className="card-body">
                      <p className="card-text">{card.cardText}</p>
                      <div>
                        {card.cardLinks.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            className="card-link"
                            to={link.href}
                          >
                            {link.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {card.cardButton && (
                    <div className="card-body">
                      <p className="card-text">{card.cardText}</p>
                      <Link className="btn btn-primary" to={card.cardButton.href}>
                        {card.cardButton.text}
                      </Link>
                    </div>
                  )}
                  {card.cardListItems && (
                    <ul className="list-group list-group-flush">
                      {card.cardListItems.map((item, itemIndex) => (
                        <li key={itemIndex} className="list-group-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            {cardDataThree.map((card, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4 d-flex">
                <div className="card flex-fill">
                  <div className="card-header">{card.cardHeader}</div>
                  <div className="card-body">
                    {typeof card.cardTitle === "string" ? (
                      <h5 className="card-title">{card.cardTitle}</h5>
                    ) : (
                      card.cardTitle
                    )}
                    {typeof card.cardText === "string" && (
                      <p className="card-text">{card.cardText}</p>
                    )}
                    {card.showButton && (
                      <Link className="btn btn-primary" to="#">
                        Go somewhere
                      </Link>
                    )}
                    {card.cardTabContent && (
                      <div className="tab-content pt-0">
                        {card.cardTabContent.map((tab, tabIndex) => (
                          <div
                            key={tabIndex}
                            role="tabpanel"
                            id={tab.id}
                            className={`tab-pane fade ${tabIndex === 0 ? "show active" : ""
                              }`}
                          >
                            {typeof tab.cardTitle === "string" ? (
                              <h5 className="card-title">{tab.cardTitle}</h5>
                            ) : (
                              tab.cardTitle
                            )}
                            {typeof tab.cardText === "string" && (
                              <p className="card-text">{tab.cardText}</p>
                            )}
                            <Link className="btn btn-primary" to="#">
                              Go somewhere
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {card.cardFooter && (
                    <div className="card-footer text-muted">
                      {card.cardFooter}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>


      {/* /Cards */}
    </>
  );
};

export default Cards;
