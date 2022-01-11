import React, { useState, useEffect } from "react";
import { useOrderContext } from "../context/context-order";
import { AiOutlineClose } from "react-icons/ai";
import { useAppContext } from "../context/context";
import { availableSizes } from "../utils/functions";

function OrderModal() {
  const { isOrderModalOpen, closeOrderModal, selectedPizzaId, addToOrder } =
    useOrderContext();
  const { allPizzas } = useAppContext();
  const [inputPrice, setInputPrice] = useState("");

  const selectedPizzaDetails = allPizzas.find(
    (pizza) => pizza._id === selectedPizzaId
  );

  useEffect(() => {
    setInputPrice("");
  }, [isOrderModalOpen]);

  if (!selectedPizzaDetails) {
    return true;
  }

  const { image, ingredients, name, prices, _id, restaurant } =
    selectedPizzaDetails;

  const handleSubmit = (e) => {
    e.preventDefault();

    const priceIndex = prices.indexOf(inputPrice);

    const pizzaDetails = {
      id: _id,
      amount: 1,
      price: inputPrice,
      size: availableSizes[priceIndex],
      restaurant,
      name,
    };
    addToOrder(pizzaDetails);

    closeOrderModal();
  };

  return (
    <div
      className={
        isOrderModalOpen ? "orderModal orderModal--show" : "orderModal"
      }
    >
      <div className="orderModal__content">
        <img
          className="orderModal__image"
          src={image}
          alt={`pizza ${name} from restaurant ${restaurant}`}
        />

        <div className="orderModal__text">
          <p className="orderModal__name">{name}</p>

          <p className="orderModal__ingredients">{ingredients.join(", ")}</p>

          <div className="orderModal__form">
            {prices.map((price, index) => {
              return (
                <div key={price}>
                  <input
                    type="radio"
                    id={availableSizes[index]}
                    name="price"
                    value={price}
                    onChange={(e) => setInputPrice(e.target.value)}
                  />

                  <label htmlFor={availableSizes[index]}>
                    {availableSizes[index]} - {price} €
                  </label>
                </div>
              );
            })}

            <div className="orderModal__buttons">
              <button
                className="orderModal__submitBtn"
                type="submit"
                onClick={handleSubmit}
                disabled={!inputPrice}
              >
                <span>Add to order</span>
              </button>
            </div>
          </div>
        </div>

        <button className="orderModal__close" onClick={closeOrderModal}>
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
}

export default OrderModal;
