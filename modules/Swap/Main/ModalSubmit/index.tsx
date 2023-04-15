import styles from "./ModalSubmit.module.sass";
import Image from "@/components/Image";
import { Button, Space, Modal, notification } from "antd";
import { runSwap } from "@/helpers/AlphaRouterService";
import { useUniswapStore } from "stores/uniswap.store";
import { useState } from "react";
import { openNotification } from "@/helpers/pushNotification";

interface crypto {
  title: string;
  name: string;
  image: string;
}

interface ModalProps {
  title: string;
  firstCrypto: crypto;
  secondCrypto: crypto;
  open: boolean;
  onCancel: VoidFunction;
  transaction: object;
  swapInfo: any;
}

const ModalSumbitForm = ({
  title,
  open,
  onCancel,
  firstCrypto,
  secondCrypto,
  transaction,
  swapInfo,
}: ModalProps) => {
  const {
    slippageAmount,
    inputAmount,
    outputAmount,
    firstPickedCrypto,
    secondPickedCrypto,
    midPrice,
  } = swapInfo;

  const [api, contextHolder] = notification.useNotification();

  const handleSwap = async () => {
    const swapResponse = await runSwap(transaction, addedSigner);
    const swapRessponseHash = (await swapResponse) ? swapResponse.hash : "";

    swapRessponseHash
      ? openNotification(
          "Transaction Submitted",
          swapRessponseHash,
          "success",
          api,
          <Button
            type="link"
            size="small"
            onClick={() =>
              window
                ?.open(
                  `https://explorer-testnet.atrixchain.com/tx/${swapRessponseHash}`,
                  "_blank"
                )
                ?.focus()
            }
          >
            See block
          </Button>
        )
      : null;
    onCancel();
  };

  const { title: firstTitle, image: firstImage } = firstCrypto;

  const { title: secondTitle, image: secondImage } = secondCrypto;

  const imagePixel = 50;
  const iconPixel = 16;

  const { addedSigner } = useUniswapStore();

  return (
    <>
      {contextHolder}
      <Modal
        title={title}
        open={open}
        onCancel={onCancel}
        footer={null}
        width={550}
        style={{
          borderRadius: "30px",
        }}
        className={styles.modalStyle}
        wrapClassName="modal-radius"
      >
        <Space direction="vertical">
          <Space direction="horizontal" className={styles.cryptos}>
            <Space direction="horizontal">
              <Image
                src={firstImage}
                width={imagePixel}
                height={imagePixel}
                alt={firstImage}
                style={{ borderRadius: 30 }}
              />
              <div className={styles.value}>{inputAmount}</div>
            </Space>

            <div className={styles.value}> {firstTitle}</div>
          </Space>
          <Space direction="horizontal" className={styles.cryptos}>
            <Space direction="horizontal">
              <Image
                src={secondImage}
                width={imagePixel}
                height={imagePixel}
                alt={firstImage}
                style={{ borderRadius: 30 }}
              />
              <div className={styles.value}>{outputAmount}</div>
            </Space>
            <div className={styles.value}> {secondTitle}</div>
          </Space>
          <Space direction="horizontal" className={styles.cryptos}>
            <div className={styles.slippage}>{"SLIPPAGE TOLERANCE"}</div>
            <div className={styles.slippageValue}> {slippageAmount} %</div>
          </Space>
          <Space direction="vertical" style={{ marginTop: "15px" }}>
            <div className={styles.bodyText}>
              {"Output is estimated. You will receive at least"}
            </div>
            <div className={styles.bodyText}>
              {`${outputAmount} ATR or the transaction will revert.`}
            </div>
          </Space>

          <div className={styles.swapOutput}>
            <Space direction="vertical">
              <Space direction="horizontal" className={styles.confirmInfo}>
                <div className={styles.body}>{"Price"}</div>
                <Space direction="horizontal" className={styles.confirmInfo}>
                  <div className={styles.body}>
                    {" "}
                    {`${outputAmount} ${firstPickedCrypto}/${secondPickedCrypto}`}
                  </div>
                  <Button
                    className={styles.questionButton}
                    type="link"
                    onClick={() => console.log(123)}
                  >
                    <Image
                      src={"/images/swap2.svg"}
                      width={iconPixel}
                      height={iconPixel}
                      alt={firstImage}
                    />
                  </Button>
                </Space>
              </Space>
              <Space direction="horizontal" className={styles.confirmInfo}>
                <Space direction="horizontal" className={styles.confirmInfo}>
                  <div className={styles.body}>{"Minmum received"}</div>
                  <Button
                    type="link"
                    onClick={() => console.log(123)}
                    className={styles.questionButton}
                  >
                    <Image
                      src={"/images/question.svg"}
                      width={iconPixel}
                      height={iconPixel}
                      alt={firstImage}
                    />
                  </Button>
                </Space>

                <div className={styles.body}> {`${outputAmount} ATR`}</div>
              </Space>
              <Space direction="horizontal" className={styles.confirmInfo}>
                <Space direction="horizontal" className={styles.confirmInfo}>
                  <div className={styles.body}>{"Price Impact"}</div>
                  <Button
                    className={styles.questionButton}
                    type="link"
                    onClick={() => console.log(123)}
                  >
                    <Image
                      src={"/images/question.svg"}
                      width={iconPixel}
                      height={iconPixel}
                      alt={firstImage}
                    />
                  </Button>
                </Space>

                <div className={styles.bodyImpact}> {"<0.01%"}</div>
              </Space>
              <Space direction="horizontal" className={styles.confirmInfo}>
                <Space direction="horizontal" className={styles.confirmInfo}>
                  <div className={styles.body}>{"Liquidity Provider Fee"}</div>
                  <Button
                    className={styles.questionButton}
                    type="link"
                    onClick={() => console.log(123)}
                  >
                    <Image
                      src={"/images/question.svg"}
                      width={iconPixel}
                      height={iconPixel}
                      alt={firstImage}
                    />
                  </Button>
                </Space>

                <div className={styles.body}>
                  {" "}
                  {`${midPrice} ${secondPickedCrypto}`}
                </div>
              </Space>
              <Button className={styles.button} onClick={handleSwap}>
                Confirm Swap
              </Button>
            </Space>
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default ModalSumbitForm;
