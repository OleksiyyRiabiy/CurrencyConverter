import React, { useCallback, useEffect, useState } from "react";
import { FaEquals } from "react-icons/fa";
import Select from "../../UI/Select/Select";

import styles from "./ExchangeRates.module.css";

const ExchangeRates = () => {
  const [rates, setRates] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState("USD");
  const [latestCurr, setLatestCurr] = useState([]);

  const fetchLatestRatesForCertainCurr = useCallback(async () => {
    const latest = await fetch(
      `https://api.frankfurter.app/latest?from=${currentCurrency}`
    );
    const parsedLatest = await latest.json();
    let arrayOfRates = Object.entries(parsedLatest.rates);
    setRates(arrayOfRates);
  }, [currentCurrency]);

  const fetchLatestCurr = async () => {
    const latest = await fetch("https://api.frankfurter.app/latest");
    const parsedLatest = await latest.json();
    let arrayOfLatest = Object.keys(parsedLatest.rates);
    setLatestCurr(arrayOfLatest);
  };

  const onGetSelectedOption = (value) => {
    setCurrentCurrency(value);
  };

  useEffect(() => {
    fetchLatestRatesForCertainCurr();
    fetchLatestCurr();
  }, [currentCurrency, fetchLatestRatesForCertainCurr]);

  console.log(latestCurr);

  return (
    <div className={styles.CurrencyExchangeContainer}>
      <h1 className={styles.Header}>Поточний курс валют</h1>
      <div className={styles.InputsContainer}>
        <div className={styles.InputContainer}>
          <input className={styles.Input} type="number" value="1" disabled />
          <Select value={currentCurrency} onGetValue={onGetSelectedOption}>
            {latestCurr}
          </Select>
        </div>

        <div className={styles.IconContainer}>
          <FaEquals />
        </div>

        <div className={styles.Currencies}>
          {rates.map((rate) => (
            <div className={styles.Currency} key={rate[0]}>
              <div className={styles.FlagContainer}>
                <img
                  alt="alt"
                  src={`https://www.countryflags.io/${rate[0]
                    .split("")
                    .splice(0, 2)
                    .join("")}/flat/64.png`}
                ></img>
              </div>

              <p className={styles.CurrName}>{rate[0]}</p>
              <p className={styles.CurrAmount}>{rate[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExchangeRates;
