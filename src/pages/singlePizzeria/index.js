import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pizza from "../../components/Pizza";
import { useAppContext } from "../../context/context";
import { useOrderContext } from "../../context/context-order";
import OrderContainer from "./OrderContainer";

function SinglePizzeria() {
  const { name: urlName } = useParams();
  const { pizzerias, allPizzas } = useAppContext();
  const { deleteOrder } = useOrderContext();
  const [search, setSearch] = useState("");

  const selectedPizzeria = pizzerias.filter(
    (pizzeria) => pizzeria.name === urlName
  )[0];

  const selectedPizzas = allPizzas.filter(
    (pizza) => pizza.restaurant === urlName
  );

  const selectedPizzasFiltered = selectedPizzas.filter((pizza) =>
    pizza.name.includes(search)
  );

  useEffect(() => {
    deleteOrder();
    window.scrollTo({ top: 0 });
    // eslint-disable-next-line
  }, []);

  return (
    <section className="singlePizzeria">
      <div className="container">
        <div className="singlePizzeria__flex">
          <div className="singlePizzeria__text">
            <h1 className="singlePizzeria__title">
              Pizzeria {selectedPizzeria.name}
            </h1>

            <p className="singlePizzeria__description">
              {selectedPizzeria.description}
            </p>
          </div>

          <img
            className="singlePizzeria__image"
            src={selectedPizzeria.image}
            alt={`pizzeria ${selectedPizzeria.name}`}
          />
        </div>

        <div className="singlePizzeria__flex singlePizzeria__flex--center singlePizzeria__flex--margin">
          <h2 className="singlePizzeria__subtitle">Explore delicious pizzas</h2>

          <input
            className="singlePizzeria__search"
            type="search"
            placeholder="Search by pizza name"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        <div className="singlePizzeria__flex singlePizzeria__flex--reverse">
          <div className="singlePizzeria__pizzas">
            {selectedPizzasFiltered.map((pizza) => {
              return <Pizza {...pizza} key={pizza._id} />;
            })}
          </div>

          <div className="singlePizzeria__info">
            <div className="singlePizzeria__info--left">
              <h3>Restaurant information</h3>

              <h4>Address</h4>
              <p>{selectedPizzeria.address.street}</p>
              <p>{selectedPizzeria.address.city}</p>

              <h4>Opening hours</h4>
              {selectedPizzeria.openingHours.map((time) => {
                return <p key={time}>{time}</p>;
              })}
            </div>

            <div className="singlePizzeria__info--right">
              <OrderContainer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SinglePizzeria;
