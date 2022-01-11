import React from "react";
import ChangeAmountButtons from "../../components/ChangeAmountButtons";
import { getTotalPrice } from "../../utils/functions";
import { Link } from "react-router-dom";
import { useOrderContext } from "../../context/context-order";
import { BsBasket } from "react-icons/bs";

function OrderContainer() {
  const { orderList } = useOrderContext();
  const totalAmount = getTotalPrice(orderList);

  return (
    <div className="orderContainer">
      <h3 className="orderContainer__title">Your order</h3>

      {orderList.length > 0 ? (
        orderList.map((item, index) => {
          const { id, size, name, price, amount } = item;
          return (
            <div className="orderContainer__item" key={index}>
              <div className="orderContainer__flex">
                <p className="orderContainer__amount">{amount}x</p>

                <div>
                  <p className="orderContainer__name">{name}</p>
                </div>

                <p className="orderContainer__price">
                  {(amount * price).toFixed(2)} €
                </p>
              </div>

              <ChangeAmountButtons id={id} size={size} />
            </div>
          );
        })
      ) : (
        <div className="orderContainer__emptyCart">
          <BsBasket className="orderContainer__icon" />
          <p>is empty</p>
        </div>
      )}

      {orderList.length > 0 && (
        <Link className="orderContainer__button" to="/cart">
          Order items for <span>{totalAmount} €</span>
        </Link>
      )}
    </div>
  );
}

export default OrderContainer;
