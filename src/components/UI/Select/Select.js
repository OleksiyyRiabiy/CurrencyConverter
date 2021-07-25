import React, { useState } from "react";

import { BsChevronDown } from "react-icons/bs";

import styles from "./Select.module.css";

const Select = (props) => {
  const [showOptions, setShowOptions] = useState(false);

  const [value, setValue] = useState(props.value);

  const onShowOptionsHandler = () => {
    setShowOptions((prevShow) => {
      return !prevShow;
    });
  };

  const onSelectOption = (value) => {
    setValue(value);
    setShowOptions(false);
    props.onGetValue(value);
  };

  console.log(props.children.length);

  return (
    <div className={styles.Select}>
      <div className={styles.OptionsContainer}>
        <div className={styles.SelectedOption}>{value}</div>
        <div
          className={
            showOptions ? styles.OtherOptionsShown : styles.OtherOptionsHidden
          }
        >
          {!props.children ? (
            <p>Loading...</p>
          ) : (
            props.children.map((curr) => (
              <div
                key={curr}
                className={styles.Option}
                onClick={() => onSelectOption(curr)}
              >
                {curr}
              </div>
            ))
          )}
        </div>
      </div>
      <div
        className={
          showOptions ? styles.IconContainerHide : styles.IconContainerShow
        }
        onClick={onShowOptionsHandler}
      >
        <BsChevronDown />
      </div>
    </div>
  );
};

export default Select;
