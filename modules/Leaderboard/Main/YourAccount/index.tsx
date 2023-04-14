import React from "react";
import styles from "./YourAccount.module.sass";
import { Space } from "antd";
import Button from "@/components/Button";
import { useTwiiterStore } from "stores/twiiter.store";

interface YourAccountProps {
  userPoint: number | null;
}

const YourAccountTable = ({ userPoint }: YourAccountProps) => {
  return (
    <div className={styles.yourAccountTable}>
      <Space direction="vertical" >
        <div className={styles.tableHeader}>
          <div className={styles.bold}>Your Accounts</div>
        </div>
        <div className={styles.description}>
          In order to track your ATRIX points, you must verify your wallet and
          Twitter
        </div>
        <Space direction="horizontal" className={styles.spacebetween}>
          <div className={styles.name}>Your ATRIX Points:</div>
          <div className={styles.name}>{userPoint}</div>
        </Space>

        <div className={styles.twitter}>Twitter:</div>
        <Space direction="horizontal" className={styles.spacebetween}>
          <div className={styles.name}>@Henry102</div>
          <div className={styles.status}>disconnect</div>
        </Space>
        <Button
          style={styles.button}
          onClick={() => console.log(123)}
          title={<div>Connect Wallet</div>}
        />
      </Space>
    </div>
  );
};

export default YourAccountTable;
