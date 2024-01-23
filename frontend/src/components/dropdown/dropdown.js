import React from "react";
import { Dropdown } from "primereact/dropdown";
import style from "./dropdown.module.css";
export default function DropdownwithSearch({
  value,
  handleChange,
  name,
  type,
  className,
  options,
  placeholder,
}) {
  const countries = options;

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="d-flex align-items-center">
          <div className={`${style.dropdownname}`}>{option}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
    return (
      <div className="d-flex align-items-center">
        <div className={style.dropdownname}>{option}</div>
      </div>
    );
  };

  return (
    <div className={`${className} d-inline-flex justify-content-center`}>
      <Dropdown
        value={value}
        onChange={(e) => {
          const value = e.value;
          handleChange({ name, value, type });
        }}
        options={countries}
        optionLabel="name"
        placeholder={placeholder}
        valueTemplate={selectedCountryTemplate}
        itemTemplate={countryOptionTemplate}
        className="w-100"
      />
    </div>
  );
}
