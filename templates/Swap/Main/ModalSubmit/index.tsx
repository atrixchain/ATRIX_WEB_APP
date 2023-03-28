import styles from "./ModalSubmit.module.sass";
import Image from "@/components/Image";
import { Button, Space, Modal } from "antd";

interface crypto {
  title: string;
  name: string;
  image: string;
}

interface ModalProps {
  title: string;
  firstCrypto: crypto;
  secondCrypto: crypto;
  firstValue?: number;
  secondValue?: number;
  open: boolean;
  onCancel: VoidFunction;
}

const ModalSumbitForm = ({
  title,
  open,
  onCancel,
  firstCrypto,
  secondCrypto,
  firstValue,
  secondValue,
}: ModalProps) => {
  const { title: firstTitle, image: firstImage } = firstCrypto;

  const { title: secondTitle, image: secondImage } = secondCrypto;

  const imagePixel = 50;
  const iconPixel = 16;
  return (
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
            />
            <div className={styles.value}>{firstValue}</div>
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
            />
            <div className={styles.value}>{secondValue}</div>
          </Space>
          <div className={styles.value}> {secondTitle}</div>
        </Space>
        <Space direction="horizontal" className={styles.cryptos}>
          <div className={styles.slippage}>{"SLIPPAGE TOLERANCE"}</div>
          <div className={styles.slippageValue}> {"0.50%"}</div>
        </Space>
        <div className={styles.bodyText}>
          {"Output is estimated. You will receive at least"}
          {"\n"}
          {"0.0000107119 USTD or the transaction will revert."}
        </div>
        <div className={styles.swapOutput}>
          <Space direction="vertical">
            <Space direction="horizontal" className={styles.confirmInfo}>
              <div className={styles.body}>{"Price"}</div>
              <Space direction="horizontal" className={styles.confirmInfo}>
                <div className={styles.body}> {"0.000120616 USTD/ETH"}</div>
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

              <div className={styles.body}> {"0.00001075 USDT"}</div>
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

              <div className={styles.body}> {"0.000447549 ETH"}</div>
            </Space>
            <Button className={styles.button} onClick={() => console.log(123)}>
              Confirm Swap
            </Button>
          </Space>
        </div>
      </Space>
    </Modal>
  );
};

export default ModalSumbitForm;
