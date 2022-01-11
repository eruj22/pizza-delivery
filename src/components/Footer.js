import React from "react";

function Footer() {
  return (
    <>
      <div className="footer__shapeContainer">
        <div className="footer__shape">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer__text">
            <p>
              Disclaimer: rights to all the images goes to their rightful owners
            </p>
            <p>
              App made by:{" "}
              <a
                className="footer__link"
                href="https://github.com/eruj22"
                target="_blank"
                rel="noopener noreferrer"
              >
                eruj22
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
