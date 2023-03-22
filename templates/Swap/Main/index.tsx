import cn from "classnames";
import styles from "./Main.module.sass";
import Image from "@/components/Image";
import { Button, Input, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

import ModalForm from "./Modal";
import { useState } from "react";
type pickedCrypto = {
  title: string;
  image: string;
};
type MainProps = {
  handleChangeFirstData: (value: number) => void;
  handleChangeSecondData: (value: number) => void;
  setFirstPickedCrypto: (value: string) => void;
  firstPickedCrypto?: pickedCrypto;
  setSecondPickedCrypto: (value: string) => void;
  secondPickedCrypto?: pickedCrypto;
};

const transfer = "/images/transfer.svg";
const swap = "/images/swap.svg";

const Main = ({
  handleChangeFirstData,
  handleChangeSecondData,
  firstPickedCrypto,
  secondPickedCrypto,
  setFirstPickedCrypto,
  setSecondPickedCrypto,
}: MainProps) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);


  const showFirstModal = () => {
    setIsFirstModalOpen(true);
  };

  const showSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  const firstModalCancel = () => {
    setIsFirstModalOpen(false);
  };
  const secondModalCancel = () => {
    setIsSecondModalOpen(false);
  };

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("appHeader", styles.title)}>SWAP</div>
      <Space direction="vertical" className={styles.border}>
        <Space direction="horizontal" className={styles.input}>
          <Space direction="vertical" className={styles.iconSpace}>
            <Input
              className={styles.inputPlaceholder}
              onChange={(e: any) => handleChangeFirstData(e.target.value)}
              placeholder="You sen"
            />
            <Image src={transfer} width={25} height={25} />
          </Space>
          <Space direction="vertical" className={styles.iconSpace}>
            <Button
              type="primary"
              onClick={showFirstModal}
              className={styles.buttonModal}
            >
              <Image
                src={
                  firstPickedCrypto
                    ? firstPickedCrypto.image
                    : "/cryptos/BTC.svg"
                }
                width={35}
                height={35}
                alt={firstPickedCrypto ? firstPickedCrypto.title : "BTC"}
              />
              <div className={styles.bold}>
                {firstPickedCrypto ? firstPickedCrypto.title : "BTC"}
              </div>
              <DownOutlined />
            </Button>
            <Image src={swap} width={25} height={25} />
          </Space>
        </Space>

        <Space direction="horizontal" className={styles.input}>
          <Input
            className={styles.inputPlaceholder}
            onChange={(e: any) => handleChangeSecondData(e.target.value)}
            placeholder="You sen"
          />
          <Button
            type="primary"
            onClick={showSecondModal}
            className={styles.buttonModal}
          >
            <Image
              src={
                secondPickedCrypto
                  ? secondPickedCrypto.image
                  : "/cryptos/ETH.svg"
              }
              width={35}
              height={35}
              alt={secondPickedCrypto ? secondPickedCrypto.title : "ETH"}
            />
            <div className={styles.bold}>
              {secondPickedCrypto ? secondPickedCrypto.title : "ETH"}
            </div>
            <DownOutlined />
          </Button>
        </Space>
        <Button className={styles.button} onClick={() => console.log(123)}>
          Swap
        </Button>
      </Space>
      <ModalForm
        pickedCryptoItem={firstPickedCrypto?.title}
        title="Choose a token"
        open={isFirstModalOpen}
        setPickedCrypto={setFirstPickedCrypto}
        onCancel={firstModalCancel}
      />
      <ModalForm
        pickedCryptoItem={secondPickedCrypto?.title}
        title="Choose a token"
        open={isSecondModalOpen}
        setPickedCrypto={setSecondPickedCrypto}
        onCancel={secondModalCancel}
      />
    </div>
  );
};

export default Main;
