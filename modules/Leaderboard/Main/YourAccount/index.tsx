import React, { useEffect, useState } from "react";
import styles from "./YourAccount.module.sass";
import { Space } from "antd";
import Button from "@/components/Button";
import { useUniswapStore } from "stores/uniswap.store";
import Image from "@/components/Image";
import { getTwitterDatas } from "@/constants/system.const";
import { ITwitterDatas } from "apis/Twitter.type";

interface YourAccountProps {
  userPoint: number | null;
}

const YourAccountTable = ({ userPoint }: YourAccountProps) => {
  const { addedProvider, isConnected } = useUniswapStore();
  const [twitterDatas, setTwitterDatas] = useState<ITwitterDatas>();
  const twUserName = twitterDatas?.twitter_username;

  const getSigner = async (provider: any) => {
    provider?.send("eth_requestAccounts", []);
    const signer = await provider?.getSigner();
    if (signer) {
      setTimeout(() => {
        document.location.reload();
      }, 3000);
    }
    return signer;
  };

  const disconnectTwiiter = async () => {
    sessionStorage.clear();
    setTwitterDatas({});
  };
  useEffect(() => {
    getTwitterDatas().then((datas: any) => {
      setTwitterDatas(datas);
    });
  }, []);

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
        <Space direction="horizontal" className={styles.spacebetween}>
          <div className={styles.name}>Your ATRIX Points:</div>
          <div className={styles.name}>{userPoint}</div>
        </Space>

        <div className={styles.twitter}>Twitter:</div>
        <Space direction="horizontal" className={styles.spacebetween}>
          <div className={styles.name}>{`@${
            twUserName ? twUserName : "Please verify your twitter"
          }`}</div>
          {twUserName ? (
            <Button
              type="link"
              style={styles.status}
              title={<div>disconnect</div>}
              onClick={disconnectTwiiter}
            />
          ) : null}
        </Space>
        <Button
          style={styles.button}
          onClick={() =>
            isConnected ? console.log("Connected") : getSigner(addedProvider)
          }
          title={<div>{isConnected ? "Connected" : "Connect Wallet"}</div>}
        />
        <div className={styles.icon}>
          <Image
            src={"/images/Sicon.png"}
            width={142.65}
            height={229.13}
            alt="atrix"
            priority
          />
        </div>
      </Space>
    </div>
  );
};

export default YourAccountTable;
