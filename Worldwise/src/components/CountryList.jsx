import React from "react";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
  const countries = cities.reduce((arr, city) => {
    if (arr.map((el) => el.country).includes(city.country)) return arr;
    else return [...arr, { country: city.country, emoji: city.emoji }];
  }, []);

  return (
    <ul className={styles.countryList}>
      {!cities.length && (
        <Message message="Add your first city by clicking on the city on the map" />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        countries.map((country) => (
          <CountryItem key={country.country} country={country} />
        ))
      )}
    </ul>
  );
}

export default CountryList;
