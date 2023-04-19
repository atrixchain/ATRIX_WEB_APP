import cn from "classnames";
import styles from "./Header.module.sass";
import Logo from "@/components/Logo";
import { headerNavigation } from "@/constants/navigation.const";
import NavLink from "../NavLink";
import { notification } from "antd";
import { useEffect, useState } from "react";
import Button from "../Button";
const { ethers } = require("ethers");
import { getMTKContract } from "@/helpers/AlphaRouterService";
import { useUniswapStore } from "stores/uniswap.store";
import { openNotification } from "@/helpers/pushNotification";
import { displayAddress } from "@/constants/system.const";
interface HeaderProps {}
export enum ToastifyStatus {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

const Header = ({}: HeaderProps) => {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState<any>(undefined);

  const [wethContract, setWethContract] = useState(undefined);
  const [uniContract, setUniContract] = useState(undefined);
  const [wethAmount, setWethAmount] = useState(undefined);

  const [uniAmount, setUniAmount] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const {
    setAddedProvider,
    setAddedWallet,
    setAddedSigner,
    setIsConnected,
    isConnected,
  } = useUniswapStore();

  useEffect(() => {
    onLoad();
  }, []);

  function disconnectMetamask() {}
  const onLoad = async () => {
    const { ethereum }: any = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    setProvider(provider);
    setAddedProvider(provider);

    if (!ethereum) {
      openNotification(
        "Please install MetaMask",
        "",
        ToastifyStatus.WARNING,
        api,
        null
      );
      return;
    } else {
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });

    ethereum.on("accountsChanged", handleAccountsChanged);

    if (accounts.length !== 0) {
      const account = accounts[0];
      setAddedWallet(account);
      setSignerAddress(account);
      getSigner(provider);
    } else {
      console.log("No authorized account found");
    }

    const uniContract = await getMTKContract();
    setUniContract(uniContract);
  };

  const handleAccountsChanged = (accounts: any) => {
    setSignerAddress(accounts);
    setAddedWallet(accounts);
  };

  const isWalletConnected = () => signer !== undefined;

  const getSigner = async (provider: any) => {
    await provider?.send("eth_requestAccounts", []);
    const signer = await provider?.getSigner();
    setSigner(signer);
    setAddedSigner(signer);

    signer.getAddress().then((address: any) => {
      setSignerAddress(address);
      setAddedWallet(address);
    });
  };

  const getWalletAddress = (signer: any, uniContract: any) => {
    {
      isWalletConnected()
        ? signer.getAddress().then((address: any) => {
            setSignerAddress(address);
            setAddedWallet(address);
            // todo: connect weth and uni contracts
            uniContract.balanceOf(address).then((res: any) => {
              setUniAmount(ethers.utils.formatEther(res));
            });
          })
        : null;
    }
  };
  useEffect(() => {
    if (signer !== undefined) {
      getWalletAddress(signer, uniContract);
      setIsConnected(true);
    }
  }, [signer, uniContract, isConnected, signerAddress]);

  const address = displayAddress(signerAddress);

  const connectWalletHandler = async () => {
    const { ethereum }: any = window;

    if (!ethereum) {
      openNotification(
        "Please install MetaMask",
        "",
        ToastifyStatus.WARNING,
        api,
        null
      );
    }

    try {
      await getSigner(provider);
      openNotification("Connected", "", ToastifyStatus.SUCCESS, api, null);
    } catch (err) {
      openNotification(
        "Failed to Connect",
        "",
        ToastifyStatus.ERROR,
        api,
        null
      );
    }
  };

  return (
    <header className={cn(styles.header)}>
      {contextHolder}
      <div className={cn("container-wide", styles.container)}>
        <Logo white className={styles.logo} />
        <div className={styles.menu}>
          {headerNavigation.map((link, index) =>
            link.external ? (
              <a
                className={styles.link}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                {link.title}
              </a>
            ) : (
              <NavLink
                className={styles.link}
                activeClassName={styles.active}
                href={link.url}
                key={index}
              >
                {link.title}
              </NavLink>
            )
          )}
        </div>
        <Button
          style={styles.balance}
          onClick={() => getWalletAddress(signer, uniContract)}
          title={
            <div>{`${
              !uniAmount ? "Loading..." : Number(uniAmount).toFixed(1)
            } ATR`}</div>
          }
          type={"primary"}
        />

        <Button
          style={styles.button}
          onClick={connectWalletHandler}
          title={
            <div>
              {signerAddress !== undefined ? address : "Connect wallet"}
            </div>
          }
          type={"primary"}
        />
      </div>
    </header>
  );
};

export default Header;
