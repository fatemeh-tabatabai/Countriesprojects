import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "./api";
import { Link } from "react-router-dom";

const CountryInfo = () => {
  const [country, setCountry] = useState([]);
  const [, setIsLoading] = useState(true);
  const [, setError] = useState("");

  const { countryName } = useParams();

  const borders = country.map((country) => country.borders);

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${apiURL}/name/${countryName}`);

        if (!res.ok) throw new Error("Could not found!");

        const data = await res.json();

        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);

  return (
    <div className="country__info__wrapper">
      <button>
        <Link to="/">Back</Link>
      </button>

      {country?.map((country, index) => (
        <div className="country__info__container" key={index}>
          <div className="country__info-img">
            <img src={country.flags.png} alt="" />
          </div>

          <div className="country__info">
            <h3>{country.name.common}</h3>

            <div className="country__infos">
              <div className="country__info-left">
                <h5>
                  nativeName: <span>{country.name.official}</span>
                </h5>
                <h5>
                  Population: <span>{country.population}</span>
                </h5>
                <h5>
                  Region: <span>{country.region}</span>
                </h5>
                <h5>
                  Sub Region: <span>{country.subregion}</span>
                </h5>
                <h5>
                  Capital: <span>{country.capital}</span>
                </h5>
              </div>
              <div className="country__info-right">
                <h5>
                  Top Level Domain: <span>{country.tld}</span>
                </h5>
                <h5>
                  Currencies: <span>{country.cca2}</span>
                </h5>
                <h5>
                  Languages: <span>{country.languages.key}</span>
                </h5>
              </div>
            </div>
            <div className="container-border">
              <span>
                Borders Countries: <span className="border">{borders}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryInfo;
