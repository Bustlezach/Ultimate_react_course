import React from "react";
import styles from "./CityList.module.css";
import Spinner from "../components/Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();
  return (
    <ul className={styles.cityList}>
      {!cities.length && (
        <Message message="Add your first city by clicking on the city on the map" />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        cities.map((city) => <CityItem key={city.id} city={city} />)
      )}
    </ul>
  );
}

export default CityList;
