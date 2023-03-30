import styles from "./YourAccount.module.sass";
import { Space } from "antd";
import Button from "@/components/Button";

interface YourAccountProps {}

const YourAccountTable = ({}: YourAccountProps) => {
  return (
    <div className={styles.yourAccountTable}>
      <Space direction="vertical">
        <div className={styles.tableHeader}>
          <div className={styles.bold}>Your Accounts</div>
        </div>
        <div className={styles.description}>
          In order to track your ATRIX points, you must verify your wallet and
          Twitter
        </div>
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
