const reducer = (state, action) => {
  const { payload, type } = action;

  if (type === "OPEN_ORDER_MODAL") {
    return { ...state, isOrderModalOpen: true, selectedPizzaId: payload };
  }

  if (type === "CLOSE_ORDER_MODAL") {
    return { ...state, isOrderModalOpen: false };
  }

  if (type === "ADD_TO_ORDER") {
    const { id, amount, price, restaurant, name, size } = payload;
    const tempItem = state.orderList.find(
      (item) => item.id === id && item.size === size
    );

    if (tempItem) {
      const tempOrder = state.orderList.map((listItem) => {
        if (listItem.id === id && listItem.size === size) {
          let newAmount = listItem.amount + amount;
          return { ...listItem, amount: newAmount };
        } else {
          return { ...listItem };
        }
      });
      return { ...state, orderList: tempOrder };
    }

    const newItem = { id, price, restaurant, name, size, amount };
    return { ...state, orderList: [...state.orderList, newItem] };
  }

  if (type === "TOGGLE_PIZZA_AMOUNT") {
    const { id, size, amountName } = payload;

    const tempOrder = state.orderList
      .map((item) => {
        if (item.id === id && item.size === size) {
          let newAmount;
          if (amountName === "inc") {
            newAmount = item.amount + 1;
          }

          if (amountName === "dec") {
            newAmount = item.amount - 1;

            if (newAmount <= 0) {
              return "delete";
            }
          }

          return { ...item, amount: newAmount };
        }

        return item;
      })
      .filter((item) => item !== "delete");

    return { ...state, orderList: tempOrder };
  }

  if (type === "CLEAR_ORDER") {
    return { ...state, orderList: [] };
  }

  return { ...state };
};

export default reducer;
