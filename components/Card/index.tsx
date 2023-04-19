import { Divider, Space } from "antd";
import { PropsWithChildren, ReactNode } from "react";
import styles from "./Card.module.sass";
import cn from "classnames";
import Button from "../Button";
import { CheckCircleTwoTone, DownOutlined } from "@ant-design/icons";
import { getTwitterOAuthUrl } from "@/helpers/OAuthProviderUrl";
import { useUniswapStore } from "stores/uniswap.store";
import { displayAddress } from "@/constants/system.const";

type CardProps = {
  title: string;
  firstContent: string;
  secondContent: string;
  firstButtonTitle: string;
  secondButtonTitle: string;
  thirdButtonTitle: string;
  isThirdButtonOpacity: boolean;
  opacityText: string;
  showButtons: boolean;
  viewAllButtonTitle: string;
  isEarnAtrixScreen: boolean;
  firstButtonPurple: boolean;
  secondButtonPurple: boolean;
  thirdButtonPurple: boolean;
  disable: boolean;
};

const AtrixCard = ({
  title,
  firstContent,
  secondContent,
  firstButtonTitle,
  secondButtonTitle,
  thirdButtonTitle,
  isThirdButtonOpacity,
  opacityText,
  showButtons,
  viewAllButtonTitle,
  isEarnAtrixScreen,
  firstButtonPurple,
  thirdButtonPurple,
  disable,
}: CardProps) => {
  const { addedProvider, isConnected, addedWallet, setIsConnected } =
    useUniswapStore();

  console.log("isConnected", isConnected);

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

  const wallet = displayAddress(addedWallet);

  return (
    <Space
      direction="horizontal"
      className={!showButtons ? styles.cardFlexStart : styles.card}
    >
      <Space direction="vertical">
        <div className={styles.title}>{title}</div>
        <div
          className={!showButtons ? styles.contextMaxWidth : styles.contentText}
        >
          {firstContent}
        </div>
        {secondContent && (
          <div className={styles.contentText}>{secondContent}</div>
        )}
        {viewAllButtonTitle && (
          <Space direction="horizontal" className={styles.viewAllButton}>
            <Button
              style={styles.viewAllButtonTitle}
              onClick={() => console.log(123)}
              title={
                <div>
                  {viewAllButtonTitle}
                  <DownOutlined />
                </div>
              }
              type={"link"}
            />
          </Space>
        )}
      </Space>
      <Space direction="vertical">
        {showButtons && (
          <div className={styles.buttonContainer}>
            <Button
              style={firstButtonPurple ? styles.buttonPurple : styles.button}
              onClick={() =>
                window?.open(getTwitterOAuthUrl(), "_blank")?.focus()
              }
              title={<div>{firstButtonTitle}</div>}
              type={"primary"}
            />
            {isEarnAtrixScreen && <Divider />}
            <Button
              style={cn(styles.button, {
                [styles.purpleButton]: isConnected && !disable,
                [styles.disabledButton]: disable,
              })}
              onClick={
                !isEarnAtrixScreen
                  ? () => getSigner(addedProvider)
                  : () => console.log(123)
              }
              title={
                !isConnected || isEarnAtrixScreen ? (
                  <div>{secondButtonTitle}</div>
                ) : (
                  <div>
                    <Space direction="horizontal">
                      <div className={styles.walletChecked}>
                        Request to Wallet
                      </div>
                      <div className={styles.accountChecked}>
                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                        {` ${wallet}`}
                      </div>
                    </Space>
                  </div>
                )
              }
              type={"primary"}
            />
            <div>
              {isThirdButtonOpacity ? (
                <div className={styles.opacityText}>{opacityText}</div>
              ) : (
                <Button
                  style={
                    thirdButtonPurple
                      ? styles.buttonPurple
                      : disable
                      ? styles.disabledButton
                      : styles.button
                  }
                  onClick={() => console.log(123)}
                  title={<div>{thirdButtonTitle}</div>}
                  type={"primary"}
                />
              )}
            </div>
          </div>
        )}
      </Space>
    </Space>
  );
};

export default AtrixCard;
