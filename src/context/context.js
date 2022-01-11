import React, { useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/reducer";
import axios from "axios";

const initialState = {
  allPizzas: [],
  allPizzasLoading: true,
  pizzerias: [],
  pizzeriasLoading: true,
  searchResult: [],
};

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPizzas = async (url) => {
    dispatch({ type: "GET_PIZZA_LOADING" });
    try {
      const response = await axios.get(url);
      const pizzas = response.data.pizzas;
      dispatch({ type: "GET_PIZZAS_SUCCESS", payload: pizzas });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPizzerias = async (url) => {
    dispatch({ type: "GET_PIZZERIAS_LOADING" });
    try {
      const response = await axios.get(url);
      const pizzerias = response.data.pizzeria;
      dispatch({ type: "GET_PIZZERIAS_SUCCESS", payload: pizzerias });
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchQuery = (query) => {
    dispatch({ type: "SEARCH_QUERY", payload: query });
  };

  useEffect(() => {
    fetchPizzas(`${process.env.REACT_APP_URL}/pizzas`);
    fetchPizzerias(`${process.env.REACT_APP_URL}/pizzerias`);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSearchQuery: getSearchQuery }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
