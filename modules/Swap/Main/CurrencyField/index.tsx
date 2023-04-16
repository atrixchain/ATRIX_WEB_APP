import { InputNumber } from "antd";
import styles from "./CurrencyField.module.sass";
import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

interface propsType {
  field?: string;
  getSwapPrice: (value: number) => void;
  balance?: number;
  value?: number;
}
const CurrencyField = (props: propsType) => {
  const { field, getSwapPrice, balance, value } = props;
  const getPrice = (value: number) => {
    getSwapPrice(value);
  };
  return (
    <div>
      <InputNumber
        className={styles.inputPlaceholder}
        onChange={(value: any) => {
          field === "input" ? getPrice(value) : null;
        }}
        defaultValue={0}
        placeholder={balance?.toFixed(3)}
        value={value ? value : 0}
        disabled={field === "input" ? false : true}
      />
    </div>
  );
};

export default CurrencyField;
