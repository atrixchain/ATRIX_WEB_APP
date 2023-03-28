import cn from "classnames";
import styles from "./Main.module.sass";
import { Button, Input, Space } from "antd";
import { ENTER_WALLET_TEXT } from "@/utils/commom";

type MainProps = {
  scrollToRef: any;
};

const Main = ({}: MainProps) => (
  <div className={cn("section", styles.section)}>
    <div className={cn("appHeader", styles.title)}>ATRIX FAUCET</div>

    <Space direction="horizontal" className={styles.input}>
      <Input
        className={styles.inputPlaceholder}
        placeholder={ENTER_WALLET_TEXT}
      />
      <Button className={styles.button} onClick={() => console.log(123)}>
        Send Me ATRIX
      </Button>
    </Space>
  </div>
);

export default Main;
