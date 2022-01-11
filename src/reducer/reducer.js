const reducer = (state, action) => {
  const { payload, type } = action;

  if (type === "GET_PIZZA_LOADING") {
    return { ...state, allPizzasLoading: true };
  }

  if (type === "GET_PIZZAS_SUCCESS") {
    return { ...state, allPizzas: payload, allPizzasLoading: false };
  }

  if (type === "GET_PIZZERIAS_LOADING") {
    return { ...state, pizzeriasLoading: true };
  }

  if (type === "GET_PIZZERIAS_SUCCESS") {
    return { ...state, pizzerias: payload, pizzeriasLoading: false };
  }

  if (type === "SEARCH_QUERY") {
    return { ...state, searchResult: payload };
  }

  return { ...state };
};

export default reducer;
