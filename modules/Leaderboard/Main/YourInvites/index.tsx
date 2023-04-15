import styles from "./YourInvites.module.sass";
import { Input, notification, Space } from "antd";
import Button from "@/components/Button";
import { ENTER_REF } from "@/constants/commom";
import { useState } from "react";
import { usePostRef, useGetTopPoint } from "queries/Twiiter/Twiiter.query";
import { useUniswapStore } from "stores/uniswap.store";
import { openNotification } from "@/helpers/pushNotification";
type YourInvitesProps = {};

const YourInvitesTable = ({}: YourInvitesProps) => {
  const [refAddress, setRefAddress] = useState<string>("");
  const { addedWallet } = useUniswapStore();
  const [api, contextHolder] = notification.useNotification();

  const handlePostRefSuccess = async (data: any) => {
    useGetTopPoint(addedWallet);
    data
      ? openNotification(
          "Successfully invited",
          data.message,
          "success",
          api,
          0,
          null
        )
      : null;
  };
  const handlePostRefError = (err: any) => {
    openNotification("Failed", err.message, "error", api, 0, null);
  };
  const {
    mutate: postRef,
    data: getInfoResponse,
    isLoading: isAddBankLoading,
  } = usePostRef({
    onSuccess: handlePostRefSuccess,
    onError: handlePostRefError,
  });

  const handleGetInfo = () => {
    const data = {
      wallet_address: addedWallet,
      ref_address: refAddress,
    };
    postRef(data);
  };
  return (
    <div className={styles.topAccountTable}>
      {contextHolder}
      <Space direction="vertical">
        <Space direction="horizontal" className={styles.tableHeader}>
          <div className={styles.bold}>Your Invites</div>
          <div className={styles.headerTotal}>Total Confirmed: 0</div>
        </Space>
        <div className={styles.description}>Enter your Referral Address</div>
        <Input
          onChange={(value: any) => setRefAddress(value.target.value)}
          className={styles.inputPlaceholder}
          placeholder={ENTER_REF}
        />
        <Button
          style={styles.button}
          onClick={handleGetInfo}
          title={<div>Invite to earn more ATRIX Points</div>}
        />
      </Space>
    </div>
  );
};

export default YourInvitesTable;
