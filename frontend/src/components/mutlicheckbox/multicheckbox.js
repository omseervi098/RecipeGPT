import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";

export default function MultiCheckBox({ dietType, handleChange, name }) {
  const onDietTypeChange = (e) => {
    let _dietType = [...dietType];

    if (e.checked) _dietType.push(e.value);
    else _dietType.splice(_dietType.indexOf(e.value), 1);

    handleChange({ name, value: _dietType });
  };

  return (
    <div className=" d-flex flex-wrap justify-content-center gap-3">
      <div className="d-flex align-items-center">
        <Checkbox
          inputId="ingredient1"
          name="vegan"
          value="Vegan"
          onChange={onDietTypeChange}
          checked={dietType.includes("Vegan")}
        />
        &nbsp;
        <label htmlFor="ingredient1" className="ml-2">
          Vegan
        </label>
      </div>
      <div className="d-flex align-items-center">
        <Checkbox
          inputId="ingredient2"
          name="veg"
          value="Vegetarian"
          onChange={onDietTypeChange}
          checked={dietType.includes("Vegetarian")}
        />
        &nbsp;
        <label htmlFor="ingredient2" className="ml-2">
          Vegetarian
        </label>
      </div>
      <div className="d-flex align-items-center">
        <Checkbox
          inputId="ingredient3"
          name="non-veg"
          value="Non-Vegetarian"
          onChange={onDietTypeChange}
          checked={dietType.includes("Non-Vegetarian")}
        />
        &nbsp;
        <label htmlFor="ingredient3" className="ml-2">
          Non-Vegetarian
        </label>
      </div>
    </div>
  );
}
