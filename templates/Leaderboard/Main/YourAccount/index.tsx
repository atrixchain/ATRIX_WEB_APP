import styles from "./YourAccount.module.sass";
import { Button, Space } from "antd";

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
        <Button className={styles.button} onClick={() => console.log(123)}>
          Connect Wallet
        </Button>
      </Space>
    </div>
  );
};

export default YourAccountTable;
