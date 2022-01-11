import React from "react";
import { useNavigate } from "react-router-dom";
import { useOrderContext } from "../context/context-order";
import { availableSizes } from "../utils/functions";

function Pizza({
  image,
  ingredients,
  name,
  prices,
  _id,
  restaurant,
  search = false,
}) {
  const { openOrderModal } = useOrderContext();
  const navigate = useNavigate();

  const handleClick = () => {
    if (search) {
      navigate(`/pizzeria/${restaurant}`);
      return;
    }

    openOrderModal(_id);
  };

  return (
    <button
      className={search ? "pizza pizza__column" : "pizza"}
      onClick={handleClick}
    >
      <img
        className={search ? "pizza__image pizza__fullWidth" : "pizza__image"}
        src={image}
        alt={`pizza ${name} from pizzeria ${restaurant}`}
      />

      <div className={search ? "pizza__text pizza__fullWidth" : "pizza__text"}>
        <p className="pizza__name">{name}</p>
        <p className="pizza__ingredients">{ingredients.join(", ")}</p>
        {search ? (
          ""
        ) : (
          <div className="pizza__prices">
            {prices.map((price, index) => {
              return (
                <p key={price}>
                  <span>{availableSizes[index]}:</span> {price} €
                </p>
              );
            })}
          </div>
        )}

        {search && (
          <p className="pizza__link">
            On click go to pizzeria{" "}
            <span className="pizza__link--capitalize">{restaurant}</span>
          </p>
        )}
      </div>
    </button>
  );
}

export default Pizza;
