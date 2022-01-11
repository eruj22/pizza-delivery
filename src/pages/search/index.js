import React from "react";
import { useAppContext } from "../../context/context";
import Pizza from "../../components/Pizza";

function Search() {
  const { searchResult } = useAppContext();

  return (
    <section className="search">
      <div className="container">
        <p className="search__title">
          {searchResult.length} {searchResult.length === 1 ? "item" : "items"}{" "}
          have been found
        </p>

        <div className="search__grid">
          {searchResult.map((result) => {
            return <Pizza key={result._id} {...result} search={true} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Search;
