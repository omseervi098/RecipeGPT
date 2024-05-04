import React, { useEffect, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import Ingredients from "../../utils/ingredients.json";
export default function MultiSelect({
  selectedIngredients,
  handleChange,
  name,
}) {
  const [ingredients, setIngredients] = useState(null);
  const [filteredIngredients, setFilteredIngredients] = useState(null);

  const search = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredCountries;

      if (!event.query.trim().length) {
        _filteredCountries = [...ingredients];
      } else {
        _filteredCountries = ingredients.filter((country) => {
          // check if it contains the search query
          return country.name.toLowerCase().includes(event.query.toLowerCase());
        });
        //if no results found then add the search query to the list
        if (_filteredCountries.length === 0) {
          _filteredCountries = [
            {
              name: event.query,
              icon: "🍽️",
            },
          ];
        }
      }

      setFilteredIngredients(_filteredCountries);
    }, 250);
  };
  const itemTemplate = (item) => {
    return (
      <div className="d-flex align-items-center">
        <span className="icon">{item.icon}</span>&nbsp; <div>{item.name}</div>
      </div>
    );
  };
  useEffect(() => {
    setIngredients(Ingredients);
  }, []);

  return (
    <div className="w-100 p-fluid">
      <AutoComplete
        field="name"
        multiple
        value={selectedIngredients}
        suggestions={filteredIngredients}
        completeMethod={search}
        onChange={(e) => {
          handleChange({ name, value: e.value });
        }}
        itemTemplate={itemTemplate}
        className="w-100"
        selectedItemTemplate={(e) => {
          return (
            <div className="d-flex align-items-center">
              <span className="icon">{e.icon ? e.icon : "🍽️"}</span>&nbsp;{" "}
              <div>{e.name}</div>
            </div>
          );
        }}
      />
    </div>
  );
}
