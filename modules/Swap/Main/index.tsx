import cn from "classnames";
import styles from "./Main.module.sass";
import Image from "@/components/Image";
import { Alert, Popover, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

import ModalForm from "./Modal";
import { useState } from "react";
import ModalSumbitForm from "./ModalSubmit";
import { cryptos } from "@/mocks/cryptos";
import Button from "@/components/Button";
import { getPrice } from "@/helpers/AlphaRouterService";
import CurrencyField from "./CurrencyField";
import { useUniswapStore } from "stores/uniswap.store";
import SettingPopover from "./SettingPopover";

interface pickedCrypto {
  title: string;
  name: string;
  image: string;
}
type MainProps = {};

const transfer = "/images/transfer.svg";
const swap = "/images/swap.svg";
const Main = ({}: MainProps) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isSwapPressed, setIsSwapPressed] = useState(false);

  const [inputAmount, setInputAmount] = useState(0);
  const [slippageAmount, setSlippageAmount] = useState(0.01);
  const [deadlineMinutes, setDeadlineMinutes] = useState<number>(30);

  const [firstPickedCrypto, setFirstPickedCrypto] = useState("MTK");
  const [secondPickedCrypto, setSecondPickedCrypto] = useState("ATR");
  const [outputAmount, setOutputAmount] = useState<any>(0);
  const [midPrice, setMidPrice] = useState<string>("");

  const [transaction, setTransaction] = useState({});

  // const filteredPersons = cryptos.filter((item) => {
  //   return item.title.toLowerCase().includes(searchField.toLowerCase());
  // });
  // const deadlineMinutesCalculate: any = Math.floor(
  //   Date.now() / 1000 + deadlineMinutes * 60
  // );
  const getSigner = async (provider: any) => {
    provider?.send("eth_requestAccounts", []);
    const signer = provider?.getSigner();
    if (signer) {
      setTimeout(() => {
        document.location.reload();
      }, 3000);
    }
    return signer;
  };

  const { addedProvider, addedWallet, isConnected } = useUniswapStore();

  const filteredFirstCrypto: pickedCrypto[] = cryptos.filter((crypto) => {
    return crypto.title === firstPickedCrypto;
  });
  const { title: firstTitle, image: firstImage } = filteredFirstCrypto[0];

  const filteredSecondCrypto: pickedCrypto[] = cryptos.filter(
    (crypto: pickedCrypto) => {
      return crypto.title === secondPickedCrypto;
    }
  );
  const { title: secondTitle, image: secondImage } = filteredSecondCrypto[0];

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

  const swapModalCancel = () => {
    setIsSwapPressed(false);
  };

  const getSwapPrice = (inputAmount: number) => {
    setInputAmount(inputAmount);

    const deadlineMinutesValue: number =
      Date.now() / 1000 + deadlineMinutes * 60;

    const swap =
      inputAmount > 0 &&
      getPrice(
        firstPickedCrypto,
        secondPickedCrypto,
        inputAmount,
        slippageAmount,
        Math.floor(deadlineMinutesValue),
        addedWallet,
        addedProvider
      ).then((data: any) => {
        setTransaction(data[0]);
        setOutputAmount(data[1]);
        setMidPrice(data[2]);
      });
  };
  const confirmSwap = {
    firstPickedCrypto: firstPickedCrypto,
    secondPickedCrypto: secondPickedCrypto,
    inputAmount: inputAmount,
    outputAmount: outputAmount,
    slippageAmount: slippageAmount,
    addedWallet: addedWallet,
    midPrice: midPrice,
  };
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("appHeader", styles.title)}>SWAP</div>
      <Space direction="vertical" className={styles.border}>
        <div className={styles.gearButton}>
          <SettingPopover
            deadlineMinutes={deadlineMinutes}
            slippageAmount={slippageAmount}
            setDeadlineMinutes={setDeadlineMinutes}
            setSlippageAmount={setSlippageAmount}
          />
        </div>

        <Space direction="horizontal" className={styles.input}>
          <Space direction="vertical" className={styles.iconSpace}>
            <CurrencyField
              field="input"
              value={inputAmount}
              getSwapPrice={getSwapPrice}
              balance={0}
            />
            <Image src={transfer} width={25} height={25} />
          </Space>

          <Space direction="vertical" className={styles.iconSpace}>
            <Button
              type="primary"
              onClick={showFirstModal}
              style={styles.buttonModal}
              title={
                <Space direction="horizontal">
                  <Image
                    src={firstImage}
                    width={35}
                    height={35}
                    alt={firstImage}
                    style={{ borderRadius: 30 }}
                  />
                  <div className={styles.bold}>{firstTitle}</div>
                  <DownOutlined />
                </Space>
              }
            />
            <Button
              style=""
              type="link"
              title={<Image src={swap} width={25} height={25} />}
              onClick={() => {
                setInputAmount(0);
                setOutputAmount(0);
                setFirstPickedCrypto(secondPickedCrypto);
                setSecondPickedCrypto(firstPickedCrypto);
              }}
            />
          </Space>
        </Space>

        <Space direction="horizontal" className={styles.input}>
          <CurrencyField
            field="output"
            value={outputAmount}
            getSwapPrice={() => console.log(123)}
          />
          <Button
            type="primary"
            onClick={showSecondModal}
            style={styles.buttonModal}
            title={
              <Space direction="horizontal">
                <Image
                  src={secondImage}
                  width={35}
                  height={35}
                  alt={secondTitle}
                  style={{ borderRadius: 30 }}
                />
                <div className={styles.bold}>{secondTitle}</div>
                <DownOutlined />
              </Space>
            }
          />
        </Space>
        {secondTitle === firstTitle && (
          <Alert
            className={styles.alert}
            description="Can't choose the same crypto"
            type="warning"
            showIcon
          />
        )}

        <Button
          style={styles.button}
          onClick={() =>
            isConnected ? setIsSwapPressed(true) : getSigner(addedProvider)
          }
          title={<div>{isConnected ? "Swap" : "Connect Wallet"}</div>}
        />
      </Space>

      <ModalForm
        pickedCryptoItem={firstTitle}
        title="Choose a token"
        open={isFirstModalOpen}
        setPickedCrypto={setFirstPickedCrypto}
        onCancel={firstModalCancel}
      />

      <ModalForm
        pickedCryptoItem={secondTitle}
        title="Choose a token"
        open={isSecondModalOpen}
        setPickedCrypto={setSecondPickedCrypto}
        onCancel={secondModalCancel}
      />

      <ModalSumbitForm
        firstCrypto={filteredFirstCrypto[0]}
        secondCrypto={filteredSecondCrypto[0]}
        transaction={transaction}
        swapInfo={confirmSwap}
        title="Confirm Swap"
        open={isSwapPressed}
        onCancel={swapModalCancel}
      />
    </div>
  );
};

export default Main;
