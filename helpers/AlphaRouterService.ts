import { Fetcher, Route, Token, TokenAmount, Trade, TradeType } from "../sdk";
const { ethers } = require("ethers");
import ERC20ABI from "../abi.json";
import routerABI from "../router.abi.json";

// const V3_SWAP_ROUTER_ADDRESS = "0xC6F1Ea85655Fd0cACAB491b7569285A5B6Db1789";
const REACT_APP_TESTNET = "https://testnet.atrixchain.com/";

const chainId = 266;

const web3Provider = new ethers.providers.JsonRpcProvider(REACT_APP_TESTNET);

const name0 = "Atrix Token";
const symbol0 = "ATR";
const decimals0 = 18;
const address0 = "0xC5198C95d7f76081dA83698a128404361E0Dfd80";

const name1 = "My token";
const symbol1 = "MTK";
const decimals1 = 18;
const address1 = "0x9df341764580037A6A166B2D40798EEb507F1B6C";

const name3 = "WETH";
const symbol3 = "WETH";
const decimals3 = 18;
const address3 = "0xC5198C95d7f76081dA83698a128404361E0Dfd80";

const routerAddress = "0xfEE938f75ad47655561F7e5b03dF526566B054ca";

const ATR = new Token(chainId, address0, decimals0, symbol0, name0);
const MTK = new Token(chainId, address1, decimals1, symbol1, name1);
const WETH = new Token(chainId, address3, decimals3, symbol3, name3);

export const getWethContract = () =>
  new ethers.Contract(address0, ERC20ABI, web3Provider);
export const getMTKContract = () =>
  new ethers.Contract(address1, ERC20ABI, web3Provider);

export const getRouterContract = (signer: object) =>
  new ethers.Contract(routerAddress, routerABI, signer);

export const getPrice = async (
  firstSymbol: any,
  secondSymbol: any,
  inputAmount: number,
  slippageAmount: number,
  deadline: number,
  walletAddress: string,
  provider: any
) => {
  try {
    const { ethereum }: any = window;
    if (ethereum) {
      const wei = await ethers.utils.parseEther(inputAmount.toString());

      const pair = await Fetcher.fetchPairData(
        firstSymbol === "MTK" ? MTK : ATR,
        secondSymbol === "ATR" ? ATR : MTK,
        provider
      );
      const route = new Route([pair], secondSymbol === "ATR" ? ATR : MTK);

      const trade = new Trade(
        route,
        new TokenAmount(secondSymbol === "ATR" ? ATR : MTK, wei),
        TradeType.EXACT_INPUT
      );

      const executionPrice = trade.executionPrice.toSignificant(6);
      const nextMidPrice = trade.nextMidPrice.toSignificant(6);

      const transaction = {
        firstSymbol: firstSymbol,
        secondSymbol: secondSymbol,
        amountIn: ethers.utils.parseEther(inputAmount.toString()),
        amountOutMin: ethers.utils.parseEther(executionPrice),
        tokenIn: firstSymbol === "MTK" ? MTK.address : ATR.address,
        tokenOut: secondSymbol === "ATR" ? ATR.address : MTK.address,
        deadline: deadline,
        gasLimit: 1000000,
        gasPrice: ethers.utils.parseUnits("5", "gwei"),
      };

      return [transaction, executionPrice, nextMidPrice];
    }
  } catch (e) {
    console.log(e);
  }
};

export const runSwap = async (transaction: any, signer: any) => {
  const { ethereum }: any = window;
  try {
    if (ethereum) {
      const contract0 = await getRouterContract(signer);
      const {
        firstSymbol,
        tokenIn,
        tokenOut,
        amountIn,
        amountOutMin,
        deadline,
      } = transaction;
      const TX =
        (await firstSymbol) === symbol1
          ? contract0.swapExactTokensForETH(
              amountIn,
              amountOutMin,
              [tokenIn, tokenOut],
              signer.getAddress(),
              deadline,
              {
                gasLimit: 1000000,
                gasPrice: ethers.utils.parseUnits("5", "gwei"),
              }
            )
          : contract0.swapExactETHForTokens(
              amountOutMin,
              [tokenIn, tokenOut],
              signer.getAddress(),
              deadline,
              {
                value: amountIn,
                gasLimit: 1000000,
                gasPrice: ethers.utils.parseUnits("5", "gwei"),
              }
            );

      const txResponse = await TX;
      return txResponse;
    }
  } catch (e) {
    console.log(e);
  }
};
