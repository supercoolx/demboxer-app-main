import React, { useState, useMemo } from "react";
import Select from "react-select";
import "./SelectCountry.css";

function CountrySelector(props) {
  return (
    <div style={{ width: "100%" }}>
      {/*  */}
      <Select
        placeholder={props.country}
        options={props.options}
        value={props.value}
        onChange={props.changeHandler}
        styles={{ backgroundColor: "#222" }}
      />
    </div>
  );
}

export default CountrySelector;
