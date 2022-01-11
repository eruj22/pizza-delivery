import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notFound">
      <div className="container">
        <h1 className="notFound__title">not found</h1>

        <p className="notFound__subtitle">
          The page that you were looking for doesn't exist
        </p>

        <Link className="notFound__button" to="/">
          go to homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
