import React from "react";
import { useAppContext } from "../context/context";
import OrderModal from "./OrderModal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { searchSchema } from "../utils/form-schemas";

function Navigation() {
  const { getSearchQuery, allPizzas } = useAppContext();
  const { register, handleSubmit, watch } = useForm({
    resolver: yupResolver(searchSchema),
  });
  let navigate = useNavigate();

  let searchInput = watch("search");

  // get all values for name and ingredients and then extract unique values - for autocomplete
  const allPizzaNames = allPizzas.map((pizza) => pizza.name);
  const allPizzaIngredients = allPizzas.map((pizza) => pizza.ingredients);

  const uniqueSearchOptions = [
    ...new Set([...allPizzaNames, ...allPizzaIngredients.flat()]),
  ];

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_URL}search`, {
        query: data.search,
      })
      .then((res) => getSearchQuery(res.data))
      .catch((err) => console.log(err));

    navigate("/search");
  };

  return (
    <>
      <OrderModal />

      <div className="nav">
        <div className="container">
          <nav className="nav__flex">
            <div className="nav__logo">
              <Link to="/">MyPizza</Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="nav__form">
              <input
                className="nav__search"
                list="list"
                type="search"
                placeholder="Search all pizzas by name or ingredients"
                {...register("search")}
              />

              {searchInput?.length > 1 && (
                <datalist id="list">
                  {uniqueSearchOptions.map((option, index) => {
                    return <option key={index}>{option}</option>;
                  })}
                </datalist>
              )}

              <button
                className="nav__searchIcon"
                aria-label="button for search"
              >
                <AiOutlineSearch />
              </button>
            </form>

            <div></div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navigation;
