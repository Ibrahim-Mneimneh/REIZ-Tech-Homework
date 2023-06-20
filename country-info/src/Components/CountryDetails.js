import React from "react";

function CountryDetails({ country }) {
  return (
    <div className="CountryDetails">
      <h4>{country.name}</h4>
      <p>
        <strong>Region: </strong> {country.region}
      </p>
      <p>
        <strong>Area: </strong> {country.area}
      </p>
    </div>
  );
}

export default CountryDetails;
