import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="success">
      <div className="container">
        <h1 className="success__title">Thank you for your order</h1>
        <p className="success__text">
          Order is being process and our currier will contact you soon
        </p>
        <Link className="success__button" to="/">
          go home
        </Link>
      </div>
    </div>
  );
}

export default Success;
