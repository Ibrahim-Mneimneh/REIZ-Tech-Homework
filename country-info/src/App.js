import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import CountryDetails from "./Components/CountryDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);

  const getCountries = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v2/all?fields=name,region,area"
      );

      const data = await response.json();
      console.log(data);
      setCountries(data);
    } catch (err) {
      console.log(err);
    }
  };

  const sortAsc = () => {
    const asc = [...countries].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setCountries(asc);
  };
  const sortDesc = () => {
    const desc = [...countries].sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
    setCountries(desc);
  };

  const reset = () => {
    getCountries();
  };

  const isInOceania = () => {
    const inOceania = countries.filter((country) => {
      return country.region === "Oceania";
    });
    setCountries(inOceania);
  };

  const isSmallerThanLithuania = () => {
    var LithuaniasArea = 65300;
    const isSmaller = countries.filter((country) => {
      return country.area < LithuaniasArea;
    });
    setCountries(isSmaller);
  };

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="Filter">
        <button
          onClick={() => {
            sortAsc();
          }}
          className="Button"
        >
          A-Z
        </button>
        <button
          onClick={() => {
            sortDesc();
          }}
          className="Button"
        >
          Z-A
        </button>
        <button
          className="Button"
          onClick={() => {
            isSmallerThanLithuania();
          }}
        >
          Smaller than Lithuania
        </button>
        <button
          className="Button"
          onClick={() => {
            isInOceania();
          }}
        >
          In Oceania
        </button>
        <button
          className="reset"
          onClick={() => {
            reset();
          }}
        >
          Reset Filter
        </button>
      </div>
      <div className="Countries">
        {countries &&
          currentCountries.map((country, id) => (
            <CountryDetails key={id} country={country} />
          ))}
      </div>
      {countries.length > countriesPerPage && (
        <Pagination
          countriesPerPage={countriesPerPage}
          totalCountries={countries.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}

function Pagination({
  countriesPerPage,
  totalCountries,
  paginate,
  currentPage,
}) {
  const pageNumbers = Math.ceil(totalCountries / countriesPerPage);

  return (
    <div className="Pagination">
      {Array.from({ length: pageNumbers }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => paginate(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
export default App;
