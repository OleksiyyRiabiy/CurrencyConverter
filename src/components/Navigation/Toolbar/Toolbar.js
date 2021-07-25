import React, { useState } from "react";

import { Link } from "react-router-dom";

import styles from "./Toolbar.module.css";

const Toolbar = () => {
  const [isExchangeActive, setIsExchangeActive] = useState(true);
  return (
    <div className={isExchangeActive ? styles.Toolbar : styles.ReverseToolbar}>
      <Link
        to="/currency_exchange"
        onClick={() => {
          setIsExchangeActive(true);
        }}
        className={
          isExchangeActive ? styles.ActiveRedirectButton : styles.RedirectButton
        }
      >
        Обмін валют
      </Link>
      <Link
        to="/exchange_rates"
        onClick={() => {
          setIsExchangeActive(false);
        }}
        className={
          isExchangeActive ? styles.RedirectButton : styles.ActiveRedirectButton
        }
      >
        Курс валют
      </Link>
    </div>
  );
};

export default Toolbar;
