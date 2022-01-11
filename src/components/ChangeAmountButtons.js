import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { useOrderContext } from "../context/context-order";

function ChangeAmountButtons({ amount, id, size }) {
  const { toggleAmount } = useOrderContext();

  const increase = (pizzaDetails) => {
    toggleAmount(pizzaDetails);
  };

  const decrease = (pizzaDetails) => {
    toggleAmount(pizzaDetails);
  };

  return (
    <div className="changeAmount">
      <button
        className="changeAmount__button"
        onClick={() => decrease({ id, size, amountName: "dec" })}
      >
        <AiOutlineMinus />
      </button>
      <p className={amount ? "changeAmount__amount" : "changeAmount__size"}>
        {amount ? amount : size}
      </p>
      <button
        className="changeAmount__button"
        onClick={() => increase({ id, size, amountName: "inc" })}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
}

export default ChangeAmountButtons;
