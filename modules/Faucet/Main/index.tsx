import { useState } from "react";
import cn from "classnames";
import styles from "./Main.module.sass";
import { Button, Input, notification, Space } from "antd";
import { ENTER_WALLET_TEXT } from "@/constants/commom";
import { useAddFaucet } from "queries/Faucet/Faucet.query";
import { openNotification } from "@/helpers/pushNotification";
import axios, { AxiosResponse } from "axios";
type MainProps = {
  scrollToRef: any;
};

const Main = ({}: MainProps) => {
  const [api, contextHolder] = notification.useNotification();
  const handleAddFaucetSuccess = (data: any) => {
    data
      ? openNotification(
          "Successfully added Faucet",
          data.message,
          "success",
          api,
          0,
        null
        )
      : null;
  };
  const handleFaucetError = (data: any) => {
    openNotification("Failed to sent ATRIX", "", "error", api, 0,
    null);
  };
  const { mutate: addFaucet, isLoading: isAddBankLoading } = useAddFaucet({
    onSuccess: handleAddFaucetSuccess,
    onError: handleFaucetError,
  });
  const [addedFaucet, setAddedFaucet] = useState<any>(null);

  const handleAddFaucet = () => {
    if(addedFaucet === "") {
      openNotification("Please enter your wallet", "", "warning", api, 0,
      null);
    }
    const data = {
      wallet_address: addedFaucet,
    };
    addFaucet(data);
  };

  return (
    <div className={cn("section", styles.section)}>
      {contextHolder}
      <div className={cn("appHeader", styles.title)}>ATRIX FAUCET</div>
      <Space direction="horizontal" className={styles.input}>
        <Input
          onChange={(value: any) => setAddedFaucet(value.target.value)}
          className={styles.inputPlaceholder}
          placeholder={ENTER_WALLET_TEXT}
        />
        <Button className={styles.button} onClick={handleAddFaucet}>
          Send Me ATRIX
        </Button>
      </Space>
    </div>
  );
};

export default Main;