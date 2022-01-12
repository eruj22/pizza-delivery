import React, { useContext, useReducer } from "react";
import reducer from "../reducer/order-reducer";
import { getFromSessionStorage } from "../utils/functions";

const getSavedOrder = () => {
  let cart = getFromSessionStorage("orderList");

  if (cart) {
    return cart;
  }

  return [];
};

const initialState = {
  isOrderModalOpen: false,
  selectedPizzaId: null,
  orderList: getSavedOrder(),
};

const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openOrderModal = (id) => {
    dispatch({ type: "OPEN_ORDER_MODAL", payload: id });
  };

  const closeOrderModal = () => {
    dispatch({ type: "CLOSE_ORDER_MODAL" });
  };

  const addToOrder = (pizzaDetails) => {
    dispatch({
      type: "ADD_TO_ORDER",
      payload: { ...pizzaDetails },
    });
  };

  const toggleAmount = (pizzaDetails) => {
    dispatch({ type: "TOGGLE_PIZZA_AMOUNT", payload: pizzaDetails });
  };

  const deleteOrder = () => {
    sessionStorage.removeItem("orderList");
    dispatch({ type: "CLEAR_ORDER" });
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        openOrderModal,
        closeOrderModal,
        addToOrder,
        deleteOrder,
        toggleAmount,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
