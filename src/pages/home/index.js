import React from "react";
import Pizzeria from "./Pizzeria";
import { useAppContext } from "../../context/context";
import { IoIosArrowDown } from "react-icons/io";
import Loader from "../../components/Loader";

function Home() {
  const { pizzeriasLoading, pizzerias } = useAppContext();

  if (pizzeriasLoading) {
    return (
      <div className="home__loader">
        <Loader />
      </div>
    );
  }

  return (
    <section className="home">
      <div className="home__hero">
        <div className="home__text">
          <h1 className="home__title">Order pizza from anywhere</h1>
          <p className="home__subtitle">
            Get your pizza easy and quickly to your doorstep
          </p>

          <a
            href="#pizzeria"
            className="home__arrowDown"
            aria-label="link to all pizzerias"
          >
            <IoIosArrowDown />
          </a>
        </div>
      </div>

      <div className="home__shapeContainer">
        <div className="home__shape">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container">
        <h2 className="home__sectionTitle" id="pizzeria">
          Pick your favorite pizzeria
        </h2>

        <div className="home__grid">
          {pizzerias.map((pizzeria) => {
            return <Pizzeria {...pizzeria} key={pizzeria._id} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Home;
