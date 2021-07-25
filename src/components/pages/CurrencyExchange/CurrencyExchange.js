import React, { useState, useEffect, useCallback } from "react";

import { HiArrowNarrowRight } from "react-icons/hi";
import Select from "../../UI/Select/Select";

import styles from "./CurrencyExchange.module.css";

const CurrencyExchange = () => {
  const [currToConvert, setCurrToConvert] = useState("EUR");
  const [convertedCurr, setConvertedCurr] = useState("USD");
  const [amountToConvert, setAmountToConvert] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(1);
  const [latestCurrToConvert, setLatestCurrToConvert] = useState([]);
  const [latestConvertedCurr, setLatestConvertedCurr] = useState([]);

  const fetchLatest = useCallback(
    async (curr) => {
      const latest = await fetch(
        `https://api.frankfurter.app/latest?from=${curr}`
      );
      const parsedLatest = await latest.json();
      let arrayOfLatest = Object.keys(parsedLatest.rates);
      curr === currToConvert
        ? setLatestCurrToConvert(arrayOfLatest)
        : setLatestConvertedCurr(arrayOfLatest);
    },
    [currToConvert]
  );

  const onChangeAmount = (event) => {
    setAmountToConvert(event.target.value);
  };

  const onConvert = useCallback(async () => {
    const converted = await fetch(
      `https://api.frankfurter.app/latest?amount=${String(
        amountToConvert
      )}&from=${currToConvert}&to=${convertedCurr}`
    );
    const parsedConverted = await converted.json();
    setConvertedAmount(Number(Object.values(parsedConverted.rates)));
  }, [amountToConvert, convertedCurr, currToConvert]);

  const onGetValueCurrToConvertHandler = (value) => {
    setCurrToConvert(value);
  };

  const onGetValueConvertedCurrHandler = (value) => {
    setConvertedCurr(value);
  };

  useEffect(() => {
    fetchLatest(currToConvert);
    fetchLatest(convertedCurr);
  }, [currToConvert, convertedCurr, fetchLatest]);

  useEffect(() => {
    onConvert();
  }, [currToConvert, convertedCurr, amountToConvert, onConvert]);

  console.log(latestCurrToConvert);

  return (
    <div className={styles.CurrencyExchangeContainer}>
      <h1 className={styles.Header}>Конвертувати валюту</h1>
      <div className={styles.InputsContainer}>
        <div className={styles.InputContainer}>
          <input
            className={styles.Input}
            type="number"
            value={amountToConvert}
            onChange={onChangeAmount}
          />
          <Select
            value={currToConvert}
            onGetValue={onGetValueCurrToConvertHandler}
          >
            {latestCurrToConvert}
          </Select>
        </div>

        <div className={styles.IconContainer}>
          <HiArrowNarrowRight />
        </div>

        <div className={styles.InputContainer}>
          <input
            className={styles.Input}
            type="number"
            disabled
            value={convertedAmount}
          />
          <Select
            value={convertedCurr}
            onGetValue={onGetValueConvertedCurrHandler}
          >
            {latestConvertedCurr}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CurrencyExchange;
