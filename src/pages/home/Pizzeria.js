import React from "react";
import { Link } from "react-router-dom";

function Pizzeria({ image, name }) {
  return (
    <Link className="pizzeria" to={`/pizzeria/${name}`}>
      <img className="pizzeria__image" src={image} alt={`pizzeria ${name}`} />

      <p className="pizzeria__name">{name}</p>
    </Link>
  );
}

export default Pizzeria;
