import { Divider, notification, Space } from "antd";
import styles from "./Card.module.sass";
import cn from "classnames";
import Button from "../Button";
import { CheckCircleTwoTone, DownOutlined } from "@ant-design/icons";
import { getTwitterOAuthUrl } from "@/helpers/OAuthProviderUrl";
import { useUniswapStore } from "stores/uniswap.store";
import { displayAddress, getTwitterDatas } from "@/constants/system.const";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ITwitterDatas } from "apis/Twitter.type";
import {
  useGetTwitter,
  usePostRequestAssets,
} from "queries/Twitter/Twitter.query";
import { openNotification } from "@/helpers/pushNotification";
import Loading from "../Loading";

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
  const router = useRouter();
  const { addedProvider, isConnected, addedWallet, setIsConnected } =
    useUniswapStore();
  const [api, contextHolder] = notification.useNotification();

  const [twitterDatas, setTwitterDatas] = useState<ITwitterDatas>();

  const wallet = displayAddress(addedWallet);
  const twUserName = twitterDatas?.twitter_username;
  const twId = twitterDatas?.twitter_id;

  const query = router.query;
  const [code, setCode] = useState<any>();
  const [state, setState] = useState<any>();

  useEffect(() => {
    if (router.isReady) {
      router.push(
        {
          query: {},
        },
        undefined,
        { shallow: true }
      );
      const code = query.code;
      const state = query.state;
      if (code && state) {
        setCode(code);
        setState(state);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const getTwitterParams = {
    state: state,
    code: code,
  };
  const { isFetching: isGetInfoLoading, data: twiiterDatas } =
    useGetTwitter(getTwitterParams);

  useEffect(() => {
    if (twiiterDatas) {
      const getTwitterDatas = twiiterDatas?.data?.data;
      setTwitterDatas(getTwitterDatas);
    } else {
      getTwitterDatas().then((datas: any) => {
        setTwitterDatas(datas);
      });
    }
  }, []);

  const handlePostRefSuccess = async (data: any) => {
    openNotification(
      "Successfully Requested Assets",
      data.message,
      "success",
      api,
      null
    );
  };
  const handlePostRefError = (err: any) => {
    openNotification(
      "Failed Requested Assets",
      err.message,
      "error",
      api,
      null
    );
  };
  const {
    mutate: requestAssets,
    data: getInfoResponse,
    isLoading: isPostRefLoading,
  } = usePostRequestAssets({
    onSuccess: handlePostRefSuccess,
    onError: handlePostRefError,
  });

  const handleRequestAssets = () => {
    const data = {
      wallet_address: addedWallet,
      twitter_id: twId,
    };
    requestAssets(data);
  };
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

  return (
    <Space
      direction="horizontal"
      className={!showButtons ? styles.cardFlexStart : styles.card}
    >
      {(isPostRefLoading && <Loading />) || (isGetInfoLoading && <Loading />)}
      {contextHolder}
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
              style={cn(styles.button, {
                [styles.purpleButton]: twitterDatas,
                [styles.disabledButton]: disable,
              })}
              onClick={() => router.push(getTwitterOAuthUrl())}
              title={
                twitterDatas ? (
                  <div>
                    <Space direction="horizontal">
                      <div className={styles.twitterChecked}>
                        Twitter Verified
                      </div>
                      <div className={styles.twitterNameChecked}>
                        {` @${twUserName}`}
                      </div>
                    </Space>
                  </div>
                ) : (
                  <div>{firstButtonTitle}</div>
                )
              }
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

            {isThirdButtonOpacity && twitterDatas && addedWallet ? (
              <Button
                style={styles.button}
                onClick={handleRequestAssets}
                title={<div>Request Assets</div>}
                type={"primary"}
              />
            ) : null}
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
